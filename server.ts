/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';
import { runDeterministicAnalysis } from './src/services/deterministicEngine';
import { AnalysisResult } from './src/types/analyzer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Body parser
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Multer memory storage (max 12MB)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 12 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.pdf', '.docx', '.txt', '.doc'].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file format. Please upload a PDF, DOCX, or TXT file.'));
    }
  },
});

// Initialize Gemini client if API key is present
const geminiApiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (geminiApiKey && geminiApiKey.trim() !== '' && geminiApiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({
      apiKey: geminiApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
}

// Health & Config status endpoint
app.get('/api/status', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(aiClient),
    model: 'gemini-3.8-flash',
    features: ['pdf-extraction', 'docx-extraction', 'ats-scoring', 'gemini-enhancement']
  });
});

// File Extraction Endpoint
app.post('/api/extract-resume', upload.single('resumeFile'), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, error: 'No file was uploaded.' });
      return;
    }

    const { originalname, size, buffer } = req.file;
    const ext = path.extname(originalname).toLowerCase();
    let extractedText = '';
    let pageCountEstimate = 1;

    if (ext === '.pdf') {
      try {
        const parser = new PDFParse({ data: buffer });
        const textResult = await parser.getText();
        extractedText = textResult.text || '';
        pageCountEstimate = (textResult as any).pages?.length || 1;
        await parser.destroy().catch(() => {});

        // Check if scanned / unreadable PDF
        const cleanLen = extractedText.replace(/--\s*\d+\s*of\s*\d+\s*--/g, '').replace(/\s+/g, '').length;
        if (cleanLen < 40) {
          res.status(422).json({
            success: false,
            error: 'This PDF appears to be a scanned image or flattened graphic without selectable text. ATS parsers cannot read image-only resumes. Please upload a standard text PDF, DOCX, or TXT document.',
            isScannedPdf: true,
          });
          return;
        }
      } catch (pdfErr: any) {
        res.status(422).json({
          success: false,
          error: `Failed to extract text from PDF: ${pdfErr.message || 'File may be password-protected or corrupted.'}`,
        });
        return;
      }
    } else if (ext === '.docx' || ext === '.doc') {
      try {
        const docResult = await mammoth.extractRawText({ buffer });
        extractedText = docResult.value || '';
        if (!extractedText.trim()) {
          res.status(422).json({
            success: false,
            error: 'Could not extract text from the Word document. Please ensure it contains readable text.',
          });
          return;
        }
      } catch (docErr: any) {
        res.status(422).json({
          success: false,
          error: `Failed to extract text from DOCX: ${docErr.message}`,
        });
        return;
      }
    } else if (ext === '.txt') {
      extractedText = buffer.toString('utf-8');
    }

    // Word count calculation
    const words = extractedText.match(/\b[A-Za-z0-9+#.-]+\b/g) || [];

    res.json({
      success: true,
      text: extractedText.trim(),
      metadata: {
        filename: originalname,
        size,
        wordCount: words.length,
        pageCountEstimate,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Internal error extracting document text.',
    });
  }
});

// Resume Analysis Endpoint
app.post('/api/analyze-resume', async (req: Request, res: Response): Promise<void> => {
  try {
    const { resumeText, jobDescription, targetTitle, filename, fileSize } = req.body;

    if (!resumeText || typeof resumeText !== 'string' || resumeText.trim().length < 50) {
      res.status(400).json({
        success: false,
        error: 'Resume text is too brief or missing. Please upload a resume with at least 50 characters.',
      });
      return;
    }

    if (!jobDescription || typeof jobDescription !== 'string' || jobDescription.trim().length < 40) {
      res.status(400).json({
        success: false,
        error: 'Job description is required to perform ATS matching and skill gap analysis.',
      });
      return;
    }

    // 1. Run deterministic baseline analysis
    const baselineResult: AnalysisResult = runDeterministicAnalysis(
      resumeText,
      jobDescription,
      targetTitle || 'Target Role',
      filename || 'Resume.pdf'
    );

    // 2. If Gemini API is available, attempt to enrich with AI qualitative insights (with timeout & fallback)
    if (aiClient) {
      try {
        const prompt = `You are CareerLens AI, an expert Executive Resume Auditor and ATS optimization specialist.
Evaluate the candidate's actual resume text against the provided job description.

RULES:
- Never fabricate or invent experiences, degrees, companies, certifications, or hard skills not evidenced in the original resume.
- For bullet point rewrites, preserve the candidate's actual facts and tasks. Use placeholders like [X%] or [X team members] where specific metrics can be provided by the user.
- Focus on strong action verbs, ATS keyword alignment, and quantifiable business outcomes.

RESUME TEXT:
${resumeText.slice(0, 4000)}

JOB DESCRIPTION:
${jobDescription.slice(0, 3000)}

TARGET ROLE: ${targetTitle || 'Target Position'}

Return a valid JSON object matching this schema:
{
  "aiSummaryRewrite": {
    "suggested": "A punchy, 3-4 sentence professional summary tailored to this job posting using real background facts",
    "rationale": "Explanation of changes made and ATS keyword positioning",
    "keyChanges": ["bullet 1", "bullet 2"]
  },
  "aiBulletImprovements": [
    {
      "original": "Actual bullet snippet from resume",
      "improved": "Rewritten bullet starting with strong action verb and including metric placeholder",
      "reason": "Why this improves ATS parsing and recruiter impact",
      "actionVerbUsed": "Spearheaded/Engineered/Architected"
    }
  ],
  "aiStrengths": [
    "Specific verified strength evidenced in resume that aligns with the job",
    "Another strength"
  ],
  "aiActionableRecommendations": [
    {
      "title": "Clear action title",
      "priority": "high",
      "description": "Specific issue in this resume compared to this job",
      "actionableTip": "Concrete step the candidate can take right now"
    }
  ]
}`;

        // Set a 4.5-second timeout for Gemini call so user experience is snappy even during spikes
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('AI response timed out, using deterministic fallback')), 4500)
        );

        const geminiPromise = aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        });

        const response: any = await Promise.race([geminiPromise, timeoutPromise]);

        const rawText = response.text?.trim() || '';
        if (rawText) {
          const aiData = JSON.parse(rawText);

          // Merge AI data into baseline
          if (aiData.aiSummaryRewrite?.suggested) {
            baselineResult.summaryImprovement = {
              originalFound: baselineResult.summaryImprovement.originalFound,
              suggestedRewrite: aiData.aiSummaryRewrite.suggested,
              keyChanges: aiData.aiSummaryRewrite.keyChanges || baselineResult.summaryImprovement.keyChanges,
            };
          }

          if (Array.isArray(aiData.aiBulletImprovements) && aiData.aiBulletImprovements.length > 0) {
            baselineResult.bulletImprovements = aiData.aiBulletImprovements.slice(0, 5);
          }

          if (Array.isArray(aiData.aiStrengths) && aiData.aiStrengths.length > 0) {
            baselineResult.resumeStrengths = [
              ...aiData.aiStrengths.slice(0, 3),
              ...baselineResult.resumeStrengths.slice(0, 2),
            ];
          }

          if (Array.isArray(aiData.aiActionableRecommendations) && aiData.aiActionableRecommendations.length > 0) {
            baselineResult.improvementAreas = aiData.aiActionableRecommendations.slice(0, 4);
          }

          baselineResult.engineUsed = 'Gemini 3.8 Flash + Deterministic Engine';
          baselineResult.isAiEnhanced = true;
        }
      } catch (geminiError: any) {
        console.warn('Gemini enhancement unavailable (using deterministic engine):', geminiError.message);
        // Fallback is already baselineResult with isAiEnhanced: false
      }
    }

    res.json({
      success: true,
      analysis: baselineResult,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to complete resume analysis.',
    });
  }
});

// Configure Vite or Static Production build
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CareerLens AI server running on http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer().catch(err => {
    console.error('Failed to start server:', err);
  });
}

export default app;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnalysisResult, AnalyzePayload } from '../types/analyzer';
import { runDeterministicAnalysis } from './deterministicEngine';

export interface ExtractResponse {
  success: boolean;
  text?: string;
  metadata?: {
    filename: string;
    size: number;
    wordCount: number;
    pageCountEstimate: number;
  };
  error?: string;
  isScannedPdf?: boolean;
}

/**
 * Uploads resume file to backend extraction endpoint
 */
export async function uploadAndExtractResume(file: File): Promise<ExtractResponse> {
  const formData = new FormData();
  formData.append('resumeFile', file);

  try {
    const res = await fetch('/api/extract-resume', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json().catch(() => null);
    if (data && typeof data.success === 'boolean') {
      return data;
    }

    if (!res.ok) {
      throw new Error(`Server returned status ${res.status}`);
    }

    return {
      success: false,
      error: 'Unexpected server response format during file extraction.',
    };
  } catch (err: any) {
    console.warn('Backend extraction failed, attempting client-side extraction:', err.message);

    // Client-side fallback for TXT
    if (file.name.endsWith('.txt')) {
      try {
        const text = await file.text();
        const words = text.match(/\b[A-Za-z0-9+#.-]+\b/g) || [];
        return {
          success: true,
          text,
          metadata: {
            filename: file.name,
            size: file.size,
            wordCount: words.length,
            pageCountEstimate: 1,
          },
        };
      } catch (txtErr: any) {
        return {
          success: false,
          error: `Failed to read TXT file: ${txtErr.message}`,
        };
      }
    }

    // Client-side fallback for DOCX using mammoth in browser
    if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
      try {
        const mammothModule = await import('mammoth');
        const mammoth = (mammothModule as any).default || mammothModule;
        const arrayBuffer = await file.arrayBuffer();
        const docResult = await mammoth.extractRawText({ arrayBuffer });
        const text = docResult.value || '';
        if (text.trim().length > 30) {
          const words = text.match(/\b[A-Za-z0-9+#.-]+\b/g) || [];
          return {
            success: true,
            text,
            metadata: {
              filename: file.name,
              size: file.size,
              wordCount: words.length,
              pageCountEstimate: 1,
            },
          };
        }
      } catch (docxErr: any) {
        console.warn('Client-side DOCX extraction error:', docxErr);
      }
    }

    return {
      success: false,
      error: err.message || 'Could not connect to extraction service. Please verify your file or try uploading a .txt / .docx file.',
    };
  }
}

/**
 * Analyzes resume text against job description
 */
export async function analyzeResume(payload: AnalyzePayload): Promise<{ success: boolean; analysis: AnalysisResult; error?: string }> {
  try {
    const res = await fetch('/api/analyze-resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Server returned status ${res.status}`);
    }

    const data = await res.json();
    if (!data.success || !data.analysis) {
      throw new Error(data.error || 'Invalid analysis response format.');
    }

    return { success: true, analysis: data.analysis };
  } catch (err: any) {
    console.warn('Backend analyze call failed, utilizing client-side deterministic fallback:', err.message);

    // Guaranteed reliable deterministic fallback
    const fallbackResult = runDeterministicAnalysis(
      payload.resumeText,
      payload.jobDescription,
      payload.targetTitle || 'Target Role',
      payload.filename || 'Uploaded_Resume.pdf'
    );

    return {
      success: true,
      analysis: fallbackResult,
      error: `Note: Switched to deterministic analyzer (${err.message})`,
    };
  }
}

/**
 * Check backend status & Gemini availability
 */
export async function checkServerStatus(): Promise<{ hasGeminiKey: boolean; status: string }> {
  try {
    const res = await fetch('/api/status');
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // ignore
  }
  return { hasGeminiKey: false, status: 'client-only' };
}

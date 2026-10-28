/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ExtractedResume {
  text: string;
  filename: string;
  fileSize: number;
  wordCount: number;
  detectedName?: string;
  detectedEmail?: string;
  detectedPhone?: string;
  detectedSections: {
    hasContactInfo: boolean;
    hasSummary: boolean;
    hasExperience: boolean;
    hasEducation: boolean;
    hasSkills: boolean;
    hasProjects: boolean;
    hasCertifications: boolean;
  };
  sampleBulletsFound: string[];
}

export interface SkillItem {
  name: string;
  category: 'technical' | 'tools' | 'methodology' | 'soft';
  inResume: boolean;
  frequencyInResume: number;
  frequencyInJob: number;
  importance?: 'high' | 'medium' | 'low';
  contextSnippet?: string;
}

export interface ATSFinding {
  id: string;
  category: 'contact' | 'sections' | 'formatting' | 'keywords' | 'content';
  title: string;
  status: 'pass' | 'warning' | 'fail';
  description: string;
  recommendation: string;
  evidence?: string;
}

export interface BulletImprovement {
  original: string;
  improved: string;
  reason: string;
  actionVerbUsed: string;
}

export interface AnalysisResult {
  id: string;
  targetJobTitle: string;
  analyzedAt: string;
  engineUsed: 'Gemini 3.8 Flash + Deterministic Engine' | 'CareerLens Deterministic Engine (Local Fallback)';
  isAiEnhanced: boolean;

  // Scores
  overallScore: number;
  scoreGrade: {
    label: string;
    description: string;
    color: string;
  };
  scoreBreakdown: {
    atsReadability: number;     // 25%
    skillMatch: number;         // 35%
    keywordAlignment: number;   // 25%
    contentImpact: number;      // 15%
  };
  scoreExplanation: string;

  // Key findings
  atsFindings: ATSFinding[];
  matchedSkills: SkillItem[];
  missingSkills: SkillItem[];
  resumeStrengths: string[];
  improvementAreas: Array<{
    title: string;
    priority: 'high' | 'medium' | 'low';
    description: string;
    actionableTip: string;
  }>;

  // Rewriting recommendations
  summaryImprovement: {
    originalFound: string;
    suggestedRewrite: string;
    keyChanges: string[];
  };
  bulletImprovements: BulletImprovement[];

  // Keywords overview
  keywordCoverage: {
    totalJobKeywords: number;
    matchedKeywords: number;
    coveragePercentage: number;
    topUnmatchedKeywords: string[];
  };

  // Resume & Job metadata for report
  resumeMeta: {
    filename: string;
    wordCount: number;
    readingTimeMinutes: number;
    detectedEmail?: string;
    detectedPhone?: string;
  };
}

export interface AnalyzePayload {
  resumeText: string;
  jobDescription: string;
  targetTitle?: string;
  filename?: string;
  fileSize?: number;
}

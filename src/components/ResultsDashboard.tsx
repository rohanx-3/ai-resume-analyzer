/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Download,
  Share2,
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  FileText,
  Filter,
  Layers,
  Target,
  Wand2,
  HelpCircle,
  ExternalLink,
  ShieldAlert,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { AnalysisResult, SkillItem, ATSFinding } from '../types/analyzer';
import { CircularGauge } from './CircularGauge';
import { generatePdfReport, downloadMarkdownReport } from '../utils/exportReport';

interface ResultsDashboardProps {
  result: AnalysisResult;
  onAnalyzeAnother: () => void;
  onOpenATSGuide: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  result,
  onAnalyzeAnother,
  onOpenATSGuide,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'ats' | 'rewrites' | 'keywords'>('overview');
  const [skillCategoryFilter, setSkillCategoryFilter] = useState<string>('all');
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [copiedBulletIdx, setCopiedBulletIdx] = useState<number | null>(null);

  const handleCopySummary = () => {
    navigator.clipboard.writeText(result.summaryImprovement.suggestedRewrite);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleCopyBullet = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletIdx(idx);
    setTimeout(() => setCopiedBulletIdx(null), 2500);
  };

  // Filter skills
  const filterSkill = (item: SkillItem) => {
    if (skillCategoryFilter === 'all') return true;
    return item.category === skillCategoryFilter;
  };

  const filteredMatched = result.matchedSkills.filter(filterSkill);
  const filteredMissing = result.missingSkills.filter(filterSkill);

  return (
    <div id="results-dashboard" className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Action Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onAnalyzeAnother}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Analyze another resume or edit inputs"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Audit Report: {result.targetJobTitle}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  <Sparkles className="w-3 h-3" />
                  {result.engineUsed.includes('Gemini') ? 'Gemini 3.8 Flash AI' : 'Deterministic Engine'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                File: <strong className="text-slate-700">{result.resumeMeta.filename}</strong> ({result.resumeMeta.wordCount} words) • Analyzed on {result.analyzedAt}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => generatePdfReport(result)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Report</span>
            </button>

            <button
              onClick={() => downloadMarkdownReport(result)}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
              title="Export Markdown copy"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Markdown</span>
            </button>

            <button
              onClick={onAnalyzeAnother}
              className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Analyze Another
            </button>
          </div>
        </div>

        {/* HERO SCORE & PILLARS CARD */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Overall Score Dial */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-slate-100">
              <CircularGauge score={result.overallScore} size={190} strokeWidth={16} />
              <div className={`mt-3 px-3 py-1 rounded-full text-xs font-bold border ${result.scoreGrade.color}`}>
                {result.scoreGrade.label}
              </div>
              <p className="text-xs text-slate-500 text-center max-w-xs mt-2">
                {result.scoreGrade.description}
              </p>
            </div>

            {/* Score Pillars Grid */}
            <div className="lg:col-span-8 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-slate-900">4-Pillar Evaluation Breakdown</h3>
                  <button
                    onClick={onOpenATSGuide}
                    className="text-xs text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>How is this calculated?</span>
                  </button>
                </div>
                <p className="text-xs text-slate-500">
                  Calculated using verified text parsing, taxonomy cross-referencing, and structural readability.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Pillar 1: Skills */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-800">1. Skill Match</span>
                    <span className="font-bold text-blue-700">{result.scoreBreakdown.skillMatch}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-700"
                      style={{ width: `${result.scoreBreakdown.skillMatch}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>{result.matchedSkills.length} matched / {result.missingSkills.length} missing</span>
                    <span className="font-medium text-slate-400">35% weight</span>
                  </div>
                </div>

                {/* Pillar 2: ATS Readability */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-800">2. ATS Formatting & Sections</span>
                    <span className="font-bold text-emerald-700">{result.scoreBreakdown.atsReadability}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-700"
                      style={{ width: `${result.scoreBreakdown.atsReadability}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Standard headers & contact format</span>
                    <span className="font-medium text-slate-400">25% weight</span>
                  </div>
                </div>

                {/* Pillar 3: Keyword Alignment */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-800">3. Job Keyword Density</span>
                    <span className="font-bold text-indigo-700">{result.scoreBreakdown.keywordAlignment}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-700"
                      style={{ width: `${result.scoreBreakdown.keywordAlignment}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>{result.keywordCoverage.matchedKeywords} of {result.keywordCoverage.totalJobKeywords} keywords</span>
                    <span className="font-medium text-slate-400">25% weight</span>
                  </div>
                </div>

                {/* Pillar 4: Content Impact */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-800">4. Measurable Content Impact</span>
                    <span className="font-bold text-purple-700">{result.scoreBreakdown.contentImpact}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-700"
                      style={{ width: `${result.scoreBreakdown.contentImpact}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Action verbs & metrics ratio</span>
                    <span className="font-medium text-slate-400">15% weight</span>
                  </div>
                </div>
              </div>

              {/* Disclaimer callout box */}
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-blue-900 leading-relaxed">
                <strong>Transparent Scoring Model:</strong> {result.scoreExplanation}
              </div>
            </div>

          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="border-b border-slate-200">
          <nav className="flex space-x-2 sm:space-x-8 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-1 border-b-2 font-bold text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Overview & Priorities
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`py-3 px-1 border-b-2 font-bold text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === 'skills'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <span>Skills Matrix</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[10px]">
                {result.matchedSkills.length + result.missingSkills.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('ats')}
              className={`py-3 px-1 border-b-2 font-bold text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === 'ats'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <span>ATS Formatting Audit</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[10px]">
                {result.atsFindings.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('rewrites')}
              className={`py-3 px-1 border-b-2 font-bold text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === 'rewrites'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>AI Content Rewrites</span>
            </button>

            <button
              onClick={() => setActiveTab('keywords')}
              className={`py-3 px-1 border-b-2 font-bold text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'keywords'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Keyword Coverage
            </button>
          </nav>
        </div>

        {/* TAB 1: OVERVIEW & PRIORITIES */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Strengths & Improvement Areas Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Strengths Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Resume Strengths</h3>
                </div>
                <div className="space-y-3">
                  {result.resumeStrengths.map((strength, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-2.5 text-xs text-slate-800">
                      <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                      <span className="leading-relaxed">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prioritized Action Items */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Prioritized Action Items</h3>
                </div>
                <div className="space-y-3">
                  {result.improvementAreas.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-amber-50/40 border border-amber-200/80 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs">{item.title}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.priority === 'high' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {item.priority} priority
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                      <div className="pt-1 text-[11px] font-semibold text-blue-700 flex items-center gap-1">
                        <span>Action tip:</span>
                        <span className="font-normal text-slate-700">{item.actionableTip}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Quick Skills Snapshot Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Key Skills Match Snapshot</h3>
                  <p className="text-xs text-slate-500">High-priority tools and competencies extracted from the job posting</p>
                </div>
                <button
                  onClick={() => setActiveTab('skills')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>View Full Skills Matrix</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Matched Preview */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-emerald-800 block mb-2">
                    Matched Skills ({result.matchedSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matchedSkills.slice(0, 8).map((s, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                        ✓ {s.name}
                      </span>
                    ))}
                    {result.matchedSkills.length > 8 && (
                      <span className="px-2 py-1 text-xs text-slate-500 font-medium">
                        +{result.matchedSkills.length - 8} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Missing Preview */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-amber-800 block mb-2">
                    Missing Job Requirements ({result.missingSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingSkills.slice(0, 8).map((s, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                        ! {s.name}
                      </span>
                    ))}
                    {result.missingSkills.length > 8 && (
                      <span className="px-2 py-1 text-xs text-slate-500 font-medium">
                        +{result.missingSkills.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SKILLS MATRIX */}
        {activeTab === 'skills' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Technical & Professional Skills Matrix</h3>
                <p className="text-xs text-slate-500">Cross-referenced against our 300+ item standard industry ontology</p>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-medium">
                <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
                {['all', 'technical', 'tools', 'methodology', 'soft'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSkillCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-lg capitalize cursor-pointer transition-all ${
                      skillCategoryFilter === cat ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Matched Skills Grid */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <h4 className="text-sm font-bold text-slate-900">
                  Matched Skills in Resume ({filteredMatched.length})
                </h4>
              </div>
              {filteredMatched.length === 0 ? (
                <p className="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-xl">
                  No matched skills found in this category filter.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredMatched.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-200/80 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="text-xs font-bold text-slate-900">{s.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider block mt-0.5">
                          {s.category}
                        </span>
                      </div>
                      <div className="text-right text-[11px] text-emerald-800 font-semibold bg-emerald-100 px-2 py-0.5 rounded-md">
                        {s.frequencyInJob}x in job
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Missing Skills Grid */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <h4 className="text-sm font-bold text-slate-900">
                  Missing Skills & Requirements From Job Description ({filteredMissing.length})
                </h4>
              </div>
              {filteredMissing.length === 0 ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold">
                  Excellent! All required skills in this category were found in your resume text.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredMissing.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-amber-50/40 border border-amber-200 flex flex-col justify-between space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                            <span className="text-xs font-bold text-slate-900">{s.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider block mt-0.5">
                            {s.category}
                          </span>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                          s.importance === 'high' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {s.importance || 'medium'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Appears <strong>{s.frequencyInJob} times</strong> in the job posting. Add to your skills list or project highlights if experienced.
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: ATS FORMATTING AUDIT */}
        {activeTab === 'ats' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">ATS Parseability & Section Audit</h3>
              <p className="text-xs text-slate-500">
                Verified against standard parser ingestion criteria (Workday, Greenhouse, Taleo, Lever)
              </p>
            </div>

            <div className="space-y-3.5">
              {result.atsFindings.map((finding) => {
                const isPass = finding.status === 'pass';
                const isWarn = finding.status === 'warning';
                const isFail = finding.status === 'fail';

                return (
                  <div
                    key={finding.id}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-start justify-between gap-3 ${
                      isPass
                        ? 'bg-emerald-50/30 border-emerald-200'
                        : isWarn
                        ? 'bg-amber-50/40 border-amber-200'
                        : 'bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {isPass ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : isWarn ? (
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                        <h4 className="text-xs font-bold text-slate-900">{finding.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                        {finding.description}
                      </p>
                      <div className="text-[11px] text-slate-700 pl-6 pt-1">
                        <strong className="text-blue-700">Recommended fix:</strong> {finding.recommendation}
                      </div>
                    </div>

                    <span
                      className={`self-start sm:self-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isPass
                          ? 'bg-emerald-100 text-emerald-800'
                          : isWarn
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {finding.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: AI CONTENT REWRITES */}
        {activeTab === 'rewrites' && (
          <div className="space-y-8">
            {/* Summary Rewrite Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Tailored Professional Summary Rewrite</h3>
                    <p className="text-xs text-slate-500">
                      Optimized for recruiter scan & target job keywords (without fabricating credentials)
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Summary</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm leading-relaxed font-normal">
                "{result.summaryImprovement.suggestedRewrite}"
              </div>

              {result.summaryImprovement.keyChanges && result.summaryImprovement.keyChanges.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-700 block mb-1.5">Optimization Rationale:</span>
                  <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                    {result.summaryImprovement.keyChanges.map((change, i) => (
                      <li key={i}>{change}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bullet Point Enhancer (Action Verbs & Google XYZ formula) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Experience Bullet Point Transformations (Google XYZ Formula)
                </h3>
                <p className="text-xs text-slate-500">
                  Transformed using strong executive action verbs and metric placeholders <code>[X%]</code> preserving your authentic background.
                </p>
              </div>

              <div className="space-y-4">
                {result.bulletImprovements.map((b, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                    {/* Original */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                        Original Bullet in Resume:
                      </span>
                      <p className="text-xs text-slate-600 italic bg-white p-2.5 rounded-lg border border-slate-200">
                        "{b.original}"
                      </p>
                    </div>

                    {/* Improved */}
                    <div>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Action-Verb Rewritten Bullet:</span>
                        </span>
                        <button
                          onClick={() => handleCopyBullet(b.improved, idx)}
                          className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium cursor-pointer"
                        >
                          {copiedBulletIdx === idx ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-600 font-semibold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-slate-900 bg-blue-50/60 p-2.5 rounded-lg border border-blue-200 leading-relaxed">
                        {b.improved}
                      </p>
                    </div>

                    {/* Rationale */}
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 font-bold rounded text-[10px]">
                        Verb: {b.actionVerbUsed}
                      </span>
                      <span>{b.reason}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: KEYWORD COVERAGE */}
        {activeTab === 'keywords' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Job Description Keyword Density</h3>
              <p className="text-xs text-slate-500">
                Key terms extracted from the job posting and whether they appear in your resume text layer
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-2xl font-extrabold text-blue-600">
                  {result.keywordCoverage.matchedKeywords} / {result.keywordCoverage.totalJobKeywords}
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-1">Matched Keywords</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-2xl font-extrabold text-indigo-600">
                  {result.keywordCoverage.coveragePercentage}%
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-1">Coverage Rate</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-2xl font-extrabold text-amber-600">
                  {result.keywordCoverage.topUnmatchedKeywords.length}
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-1">Key Unmatched Terms</div>
              </div>
            </div>

            {/* Unmatched Keywords Chips */}
            {result.keywordCoverage.topUnmatchedKeywords.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
                <span className="text-xs font-bold text-amber-900 block mb-2">
                  High-Frequency Job Terms Missing From Resume:
                </span>
                <div className="flex flex-wrap gap-2">
                  {result.keywordCoverage.topUnmatchedKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white text-amber-800 border border-amber-300"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-amber-800 mt-2.5">
                  Tip: Intersperse these natural words organically into your job bullets and summary where you have genuine experience. Do not hide text or stuff keywords in headers.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

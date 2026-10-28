/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, CheckCircle2, FileCheck2, Sparkles, UploadCloud, Shield, Cpu, Zap } from 'lucide-react';
import { SAMPLE_PROFILES } from '../data/sampleData';

interface HeroProps {
  onAnalyzeClick: () => void;
  onSelectSample: (profileId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onAnalyzeClick, onSelectSample }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/40">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-96 bg-gradient-to-tr from-blue-100/40 via-indigo-50/30 to-cyan-50/20 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline and Call-to-actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/80 text-blue-800 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>Next-Gen ATS Parser & Job Match Engine</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span className="text-blue-600 font-medium">Free & Private</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Make Your Resume <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Stand Out.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Analyze your resume, uncover skill gaps, and improve your chances of passing ATS screening with actionable, data-backed feedback.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onAnalyzeClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-md shadow-blue-600/25 transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                <UploadCloud className="w-5 h-5" />
                <span>Analyze My Resume</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={() => onSelectSample(SAMPLE_PROFILES[0].id)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-300 shadow-xs hover:border-slate-400 transition-all cursor-pointer"
              >
                <span>Try Sample Resume</span>
              </button>
            </div>

            {/* Trust Points */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left max-w-xl mx-auto lg:mx-0 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>PDF, DOCX & TXT support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero fake score guarantees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant downloadable PDF</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Resume Analysis Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 p-5 overflow-hidden">
              {/* Scan simulation beam */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse" />

              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-100">
                    ATS
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Alex_Morgan_Resume.pdf</h3>
                    <p className="text-[11px] text-slate-500">Target: Senior Full Stack Engineer</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-extrabold text-blue-600">88<span className="text-xs text-slate-400 font-normal">/100</span></div>
                  <span className="inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    High ATS Readiness
                  </span>
                </div>
              </div>

              {/* Progress bars preview */}
              <div className="py-4 space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Technical Skill Alignment</span>
                    <span className="text-blue-600 font-bold">92%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-2 rounded-full w-[92%] transition-all duration-500" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>ATS Section Formatting & Headers</span>
                    <span className="text-emerald-600 font-bold">100%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-2 rounded-full w-[100%] transition-all duration-500" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Measurable Impact & Action Verbs</span>
                    <span className="text-amber-600 font-bold">78%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-2 rounded-full w-[78%] transition-all duration-500" />
                  </div>
                </div>
              </div>

              {/* Sample Tag Badges */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-500 block mb-2">Detected Keyword Matches</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">✓ React</span>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">✓ TypeScript</span>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">✓ Node.js</span>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">✓ PostgreSQL</span>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">! Kubernetes (Missing)</span>
                </div>
              </div>

              {/* Quick AI Tip Callout */}
              <div className="mt-3.5 p-2.5 rounded-lg bg-blue-50/70 border border-blue-200/70 flex items-start gap-2 text-xs text-blue-900">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-tight">
                  <strong className="font-semibold text-blue-950">AI Action Tip:</strong> Quantify 2 bullets with Google's XYZ formula to push your impact score past 90.
                </p>
              </div>
            </div>

            {/* Floating floating badge */}
            <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl px-3.5 py-2 shadow-lg items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                ✓
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900">Deterministic + AI Auditing</div>
                <div className="text-[10px] text-slate-500">Transparent mathematical scoring</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, FileSearch, ShieldCheck, BookOpen, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onNavigateToAnalyzer: () => void;
  onOpenATSGuide: () => void;
  onOpenPrivacyModal: () => void;
  hasActiveResults: boolean;
  onViewResults: () => void;
  isAiReady?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateToAnalyzer,
  onOpenATSGuide,
  onOpenPrivacyModal,
  hasActiveResults,
  onViewResults,
  isAiReady = false,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={onNavigateToAnalyzer}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            <FileSearch className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                CareerLens<span className="text-blue-600">.ai</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
                <Sparkles className="w-2.5 h-2.5 text-blue-600" />
                ATS Checker
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden md:block">
              Intelligent Resume & ATS Auditor
            </p>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={onNavigateToAnalyzer}
            className="hover:text-blue-600 transition-colors py-1 cursor-pointer"
          >
            Workspace
          </button>
          <button
            onClick={onOpenATSGuide}
            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors py-1 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            ATS Guide & Myths
          </button>
          <button
            onClick={onOpenPrivacyModal}
            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors py-1 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Privacy & Trust
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {hasActiveResults && (
            <button
              onClick={onViewResults}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors cursor-pointer"
            >
              View Last Audit
            </button>
          )}

          <button
            onClick={onNavigateToAnalyzer}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/20 transition-all hover:shadow-md cursor-pointer"
          >
            <span>Analyze Resume</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

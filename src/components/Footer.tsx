/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FileSearch, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenATSGuide: () => void;
  onOpenPrivacyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenATSGuide, onOpenPrivacyModal }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <FileSearch className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold tracking-tight">
                CareerLens<span className="text-blue-400">.ai</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Intelligent Resume Analyzer & ATS Checker helping job seekers evaluate resume-to-job relevance, eliminate formatting bottlenecks, and craft high-impact achievements.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Private • Local Processing • Zero Account Sign-up Required</span>
            </div>
          </div>

          {/* Quick Resources */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">
              Resources & Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenATSGuide}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ATS Rules & Common Myths
                </button>
              </li>
              <li>
                <a href="#analyzer-workspace" className="hover:text-white transition-colors">
                  Resume Match Workspace
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacyModal}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy & Data Handling
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Disclaimer */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">
              Independent Platform
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              CareerLens AI calculates an empirical relevance score based on extracted text and job requirements. Match scores represent document alignment, not an automated guarantee of employment.
            </p>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} CareerLens AI. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Powered by Deterministic NLP & Gemini 3.8 Flash</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

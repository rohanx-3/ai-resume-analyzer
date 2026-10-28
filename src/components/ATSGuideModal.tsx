/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, CheckCircle, AlertTriangle, XCircle, BookOpen, ShieldAlert } from 'lucide-react';

interface ATSGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ATSGuideModal: React.FC<ATSGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-950">ATS Realities, Rules & Common Myths</h3>
              <p className="text-xs text-slate-500">How modern Applicant Tracking Systems really evaluate your resume</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 text-sm text-slate-700">
          {/* Notice box */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex items-start gap-3 text-blue-900">
            <ShieldAlert className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <strong>The Golden Rule of ATS:</strong> ATS platforms (Workday, Greenhouse, Lever, Taleo, iCIMS) do not "hire" or automatically reject candidates on a secret binary algorithm. Instead, they parse your resume into database fields and rank keyword relevance for human recruiters.
            </div>
          </div>

          {/* Do's and Don'ts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 font-bold text-emerald-800 text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Verified Best Practices</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Standard Section Headings:</strong> Use clear titles like "Work Experience", "Education", and "Skills".</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Single-Column Layouts:</strong> Multi-column tables often cause text scrambles across chronological work entries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Contextual Keyword Matching:</strong> Mention skills both in a dedicated list and in active project descriptions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Clean PDF or DOCX:</strong> Always generate PDFs directly from Word/Docs to preserve a searchable text layer.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 space-y-3">
              <div className="flex items-center gap-2 font-bold text-rose-800 text-sm">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Dangerous Myths & Traps</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✗</span>
                  <span><strong>White Font Keyword Stuffing:</strong> Modern ATS parsers render all text in plain ASCII; white text is immediately flagged as cheating.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✗</span>
                  <span><strong>Canva Graphic Elements:</strong> Skill bars, circular infographics, and complex canvas exports are completely invisible to parsers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✗</span>
                  <span><strong>Contact Info in Headers/Footers:</strong> Some ATS software strips headers/footers during ingestion, losing your phone and email.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✗</span>
                  <span><strong>Fabricated Metrics:</strong> Never make up numbers. Use brackets like [X%] during draft phase, then fill with your genuine data.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* How Score is Computed in CareerLens */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">How CareerLens Calculates Your Match Score:</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our analyzer uses a 4-pillar deterministic framework calibrated against real recruitment criteria:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="text-blue-600 font-bold text-sm">35%</div>
                <div className="text-[11px] font-semibold text-slate-700">Skill Match</div>
                <div className="text-[10px] text-slate-400">Hard & Tool requirements</div>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="text-indigo-600 font-bold text-sm">25%</div>
                <div className="text-[11px] font-semibold text-slate-700">ATS Formatting</div>
                <div className="text-[10px] text-slate-400">Headers, structure, contact</div>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="text-purple-600 font-bold text-sm">25%</div>
                <div className="text-[11px] font-semibold text-slate-700">Keyword Density</div>
                <div className="text-[10px] text-slate-400">Job posting terminology</div>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="text-emerald-600 font-bold text-sm">15%</div>
                <div className="text-[11px] font-semibold text-slate-700">Impact & Metrics</div>
                <div className="text-[10px] text-slate-400">Action verbs & numbers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3.5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Got It, Close
          </button>
        </div>
      </div>
    </div>
  );
};

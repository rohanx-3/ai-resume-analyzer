/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, ShieldCheck, Lock, EyeOff, Server, FileText } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasGeminiKey: boolean;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose, hasGeminiKey }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Privacy, Security & Data Handling</h3>
              <p className="text-xs text-slate-500">How CareerLens protects your sensitive career data</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-sm text-slate-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-900 text-xs">
                <Lock className="w-4 h-4 text-blue-600" />
                <span>Zero Permanent Storage</span>
              </div>
              <p className="text-xs text-slate-600">
                Uploaded resumes and job descriptions are held in transient memory only during your session. We do not store resumes in permanent databases.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-900 text-xs">
                <EyeOff className="w-4 h-4 text-emerald-600" />
                <span>No Third-Party Brokers</span>
              </div>
              <p className="text-xs text-slate-600">
                Your personal details, contact info, and work history are never sold, rented, or distributed to recruiters, advertisers, or third parties.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-900 text-xs">
                <Server className="w-4 h-4 text-indigo-600" />
                <span>AI Processing Transparency</span>
              </div>
              <p className="text-xs text-slate-600">
                {hasGeminiKey
                  ? 'When qualitative feedback is generated, relevant resume snippets are passed server-side to the configured Gemini 3.8 Flash model. API keys are strictly kept server-side.'
                  : 'Currently operating in deterministic local mode. All parsing and scoring are performed locally with zero external AI calls.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-900 text-xs">
                <FileText className="w-4 h-4 text-purple-600" />
                <span>Client-Side PDF Generation</span>
              </div>
              <p className="text-xs text-slate-600">
                When you click "Download Report", the PDF is assembled securely in your browser session using jsPDF, without requiring server-side rendering.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-blue-50/60 border border-blue-200 text-xs text-blue-900">
            <strong>No Authentication Needed:</strong> You can test and optimize as many resumes as you wish without creating an account or providing a credit card.
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3.5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

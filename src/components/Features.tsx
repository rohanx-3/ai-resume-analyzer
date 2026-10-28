/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, ShieldCheck, Target, Wand2, FileDown, Layers, Search, BarChart3 } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: Layers,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      title: 'ATS Formatting & Section Audit',
      description: 'Scans for vital resume sections (Contact, Summary, Experience, Education, Skills), readability, date formatting, and layout parseability.',
    },
    {
      icon: Target,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      title: 'Deterministic Job Matching Engine',
      description: 'Cross-references your resume against 300+ categorized technical, tooling, and methodological skills extracted directly from the target job posting.',
    },
    {
      icon: Wand2,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      title: 'Action-Verb & Google XYZ Rewrites',
      description: 'Replaces passive openings with high-impact executive verbs and provides quantitative metric placeholders without fabricating credentials.',
    },
    {
      icon: FileDown,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      title: 'Executive PDF Audit Report',
      description: 'Download a clean, multi-page PDF summary detailing verified findings, matched and missing skills, and step-by-step optimization priorities.',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            Engineered For Modern Recruitment
          </h2>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
            Everything You Need To Pass The First 6 Seconds
          </h3>
          <p className="mt-3 text-base text-slate-600">
            Most applicants never make it to human eyes due to parsing bottlenecks or mismatched keyword frequencies. CareerLens gives you transparency into both.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50/60 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 ${feature.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2.5">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

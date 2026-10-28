/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CircularGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export const CircularGauge: React.FC<CircularGaugeProps> = ({
  score,
  size = 180,
  strokeWidth = 14,
  label = 'Overall Score',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(100, Math.max(0, score));
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Determine color based on score
  let strokeColor = '#10b981'; // emerald
  let bgColor = '#ecfdf5';
  let textColor = '#065f46';

  if (score < 55) {
    strokeColor = '#f43f5e'; // rose
    bgColor = '#fff1f2';
    textColor = '#9f1239';
  } else if (score < 72) {
    strokeColor = '#f59e0b'; // amber
    bgColor = '#fffbeb';
    textColor = '#92400e';
  } else if (score < 85) {
    strokeColor = '#2563eb'; // blue
    bgColor = '#eff6ff';
    textColor = '#1e40af';
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Inner Score Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
            {score}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-0.5">
            out of 100
          </span>
        </div>
      </div>
      {label && (
        <span className="mt-2.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
          {label}
        </span>
      )}
    </div>
  );
};

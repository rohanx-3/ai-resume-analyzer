/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { jsPDF } from 'jspdf';
import { AnalysisResult } from '../types/analyzer';

/**
 * Generates and downloads a clean, multi-page PDF analysis report
 */
export function generatePdfReport(result: AnalysisResult) {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let y = 45;

  const checkPageOverflow = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = 45;
      // Add subtle header on continuation pages
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(`CareerLens AI Audit Report — ${result.targetJobTitle}`, margin, 30);
      doc.setDrawColor(226, 232, 240);
      doc.line(margin, 34, pageWidth - margin, 34);
    }
  };

  // Header Bar
  doc.setFillColor(15, 23, 42); // Navy 900
  doc.rect(margin, y, contentWidth, 54, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('CareerLens AI', margin + 14, y + 24);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text('Intelligent Resume Analyzer & ATS Audit Report', margin + 14, y + 40);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(56, 189, 248); // Sky blue
  doc.text(`Score: ${result.overallScore}/100`, pageWidth - margin - 85, y + 32);

  y += 72;

  // Metadata block
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, y, contentWidth, 48, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, y, contentWidth, 48, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.text('Target Role:', margin + 12, y + 18);
  doc.setFont('helvetica', 'normal');
  doc.text(result.targetJobTitle, margin + 80, y + 18);

  doc.setFont('helvetica', 'bold');
  doc.text('File Name:', margin + 12, y + 34);
  doc.setFont('helvetica', 'normal');
  doc.text(`${result.resumeMeta.filename} (${result.resumeMeta.wordCount} words)`, margin + 80, y + 34);

  doc.setFont('helvetica', 'bold');
  doc.text('Date Analyzed:', margin + 300, y + 18);
  doc.setFont('helvetica', 'normal');
  doc.text(result.analyzedAt, margin + 375, y + 18);

  doc.setFont('helvetica', 'bold');
  doc.text('Analysis Mode:', margin + 300, y + 34);
  doc.setFont('helvetica', 'normal');
  doc.text(result.isAiEnhanced ? 'Gemini 3.8 Flash AI' : 'Deterministic Engine', margin + 375, y + 34);

  y += 62;

  // Overall Score Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('Overall ATS & Job Relevance Assessment', margin, y);
  y += 18;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  const splitExplanation = doc.splitTextToSize(result.scoreExplanation, contentWidth);
  doc.text(splitExplanation, margin, y);
  y += splitExplanation.length * 12 + 10;

  // Metric breakdown grid
  const boxWidth = (contentWidth - 18) / 4;
  const metrics = [
    { label: 'Skill Match', score: `${result.scoreBreakdown.skillMatch}%`, weight: '35% Weight' },
    { label: 'ATS Readability', score: `${result.scoreBreakdown.atsReadability}%`, weight: '25% Weight' },
    { label: 'Keyword Align', score: `${result.scoreBreakdown.keywordAlignment}%`, weight: '25% Weight' },
    { label: 'Content Impact', score: `${result.scoreBreakdown.contentImpact}%`, weight: '15% Weight' },
  ];

  metrics.forEach((m, idx) => {
    const xPos = margin + idx * (boxWidth + 6);
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(xPos, y, boxWidth, 42, 3, 3, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text(m.score, xPos + 10, y + 18);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(m.label, xPos + 10, y + 30);
    doc.setTextColor(148, 163, 184);
    doc.text(m.weight, xPos + 10, y + 38);
  });

  y += 56;

  // Skills Matrix Section
  checkPageOverflow(100);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text(`Skills Analysis (${result.matchedSkills.length} Matched / ${result.missingSkills.length} Gaps)`, margin, y);
  y += 16;

  // Matched Skills
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(22, 101, 52); // green 800
  doc.text('Matched Technical & Professional Skills in Resume:', margin, y);
  y += 12;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  const matchedText = result.matchedSkills.length > 0
    ? result.matchedSkills.map(s => `[x] ${s.name} (${s.frequencyInJob}x in job)`).join('  •  ')
    : 'No direct skills matched from required job keywords.';
  const splitMatched = doc.splitTextToSize(matchedText, contentWidth);
  doc.text(splitMatched, margin, y);
  y += splitMatched.length * 11 + 10;

  // Missing Skills
  checkPageOverflow(60);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(180, 83, 9); // amber 700
  doc.text('High-Priority Skills in Job Description Not Found in Resume:', margin, y);
  y += 12;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const missingText = result.missingSkills.length > 0
    ? result.missingSkills.slice(0, 12).map(s => `[!] ${s.name} (${s.importance || 'medium'} priority)`).join('  •  ')
    : 'All critical job skills detected in resume!';
  const splitMissing = doc.splitTextToSize(missingText, contentWidth);
  doc.text(splitMissing, margin, y);
  y += splitMissing.length * 11 + 16;

  // ATS Findings Section
  checkPageOverflow(120);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('ATS Readability & Formatting Findings', margin, y);
  y += 16;

  result.atsFindings.forEach((finding) => {
    checkPageOverflow(34);
    const badgeColor = finding.status === 'pass' ? [22, 163, 74] : finding.status === 'warning' ? [217, 119, 6] : [220, 38, 38];
    doc.setFillColor(badgeColor[0], badgeColor[1], badgeColor[2]);
    doc.circle(margin + 5, y + 4, 3.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(`${finding.title} [${finding.status.toUpperCase()}]`, margin + 14, y + 6);
    y += 12;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    const descLines = doc.splitTextToSize(`${finding.description} Tip: ${finding.recommendation}`, contentWidth - 14);
    doc.text(descLines, margin + 14, y + 4);
    y += descLines.length * 10 + 6;
  });

  y += 10;

  // Prioritized Recommendations
  checkPageOverflow(100);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('Prioritized Action Items for Optimization', margin, y);
  y += 16;

  result.improvementAreas.forEach((area, i) => {
    checkPageOverflow(40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(AreaPriorityColors(area.priority));
    doc.text(`${i + 1}. ${area.title} (${area.priority.toUpperCase()} PRIORITY)`, margin, y);
    y += 12;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    const tipText = doc.splitTextToSize(`${area.description} Actionable Step: ${area.actionableTip}`, contentWidth);
    doc.text(tipText, margin, y);
    y += tipText.length * 10 + 6;
  });

  // Bullet Rewrites
  if (result.bulletImprovements.length > 0) {
    checkPageOverflow(120);
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('Action-Verb Bullet Point Rewriting Examples', margin, y);
    y += 14;

    result.bulletImprovements.slice(0, 3).forEach((bullet) => {
      checkPageOverflow(48);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      const origLines = doc.splitTextToSize(`Original: "${bullet.original}"`, contentWidth);
      doc.text(origLines, margin, y);
      y += origLines.length * 9 + 3;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(2, 132, 199);
      const impLines = doc.splitTextToSize(`Improved: "${bullet.improved}"`, contentWidth);
      doc.text(impLines, margin, y);
      y += impLines.length * 10 + 8;
    });
  }

  // Footer on all pages
  const totalPages = (doc.internal as any).getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('CareerLens AI — Generated for job seeker personal career advancement. No proprietary ATS reproduction claimed.', margin, pageHeight - 20);
    doc.text(`Page ${p} of ${totalPages}`, pageWidth - margin - 50, pageHeight - 20);
  }

  const cleanName = (result.resumeMeta.filename || 'Resume').replace(/\.[^/.]+$/, '');
  doc.save(`CareerLens_Analysis_${cleanName}.pdf`);
}

function AreaPriorityColors(priority: string) {
  if (priority === 'high') return 185; // dark red / amber
  return 30; // dark slate
}

/**
 * Downloads analysis in clean Markdown format
 */
export function downloadMarkdownReport(result: AnalysisResult) {
  const md = `# CareerLens AI — Resume Analysis & ATS Audit Report
**Target Role:** ${result.targetJobTitle}  
**Analyzed File:** ${result.resumeMeta.filename} (${result.resumeMeta.wordCount} words)  
**Date:** ${result.analyzedAt}  
**Engine:** ${result.engineUsed}  

---

## Overall Assessment
- **Overall Score:** ${result.overallScore} / 100 (${result.scoreGrade.label})
- **Skill Match Score:** ${result.scoreBreakdown.skillMatch}% (35% weight)
- **ATS Readability Score:** ${result.scoreBreakdown.atsReadability}% (25% weight)
- **Keyword Alignment Score:** ${result.scoreBreakdown.keywordAlignment}% (25% weight)
- **Content Impact Score:** ${result.scoreBreakdown.contentImpact}% (15% weight)

> ${result.scoreExplanation}

---

## Skills Analysis
### Matched Skills (${result.matchedSkills.length})
${result.matchedSkills.map(s => `- **${s.name}** (${s.category}) — mentioned in resume, appears ${s.frequencyInJob}x in job posting`).join('\n')}

### Missing or Under-Evidenced Skills (${result.missingSkills.length})
${result.missingSkills.map(s => `- **${s.name}** [Priority: ${s.importance || 'medium'}] — appears ${s.frequencyInJob}x in job posting`).join('\n')}

---

## ATS Compatibility Findings
${result.atsFindings.map(f => `### [${f.status.toUpperCase()}] ${f.title}
- **Observation:** ${f.description}
- **Recommendation:** ${f.recommendation}
`).join('\n')}

---

## Resume Strengths
${result.resumeStrengths.map(s => `- ${s}`).join('\n')}

---

## Prioritized Action Items
${result.improvementAreas.map((area, idx) => `### ${idx + 1}. ${area.title} (${area.priority.toUpperCase()} Priority)
${area.description}
*Tip: ${area.actionableTip}*
`).join('\n')}

---

## AI Summary Recommendation
**Suggested Summary:**
> ${result.summaryImprovement.suggestedRewrite}

---

## Bullet Point Optimization (Google XYZ Formula)
${result.bulletImprovements.map(b => `
- **Original:** "${b.original}"
  **Rewritten:** "${b.improved}"
  *Reason: ${b.reason} (Action verb: ${b.actionVerbUsed})*
`).join('\n')}
`;

  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `CareerLens_Report_${result.targetJobTitle.replace(/\s+/g, '_')}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

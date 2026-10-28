/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnalysisResult, ATSFinding, BulletImprovement, ExtractedResume, SkillItem } from '../types/analyzer';

// Curated comprehensive dictionary of skills across domains
export const SKILLS_TAXONOMY: { name: string; category: SkillItem['category']; aliases?: string[] }[] = [
  // Programming & Web
  { name: 'JavaScript', category: 'technical', aliases: ['js', 'es6', 'ecmascript'] },
  { name: 'TypeScript', category: 'technical', aliases: ['ts'] },
  { name: 'Python', category: 'technical', aliases: ['py'] },
  { name: 'Java', category: 'technical' },
  { name: 'C++', category: 'technical', aliases: ['cpp'] },
  { name: 'C#', category: 'technical', aliases: ['csharp', '.net'] },
  { name: 'Golang', category: 'technical', aliases: ['go'] },
  { name: 'Rust', category: 'technical' },
  { name: 'PHP', category: 'technical' },
  { name: 'Ruby', category: 'technical', aliases: ['ruby on rails', 'rails'] },
  { name: 'HTML5', category: 'technical', aliases: ['html'] },
  { name: 'CSS3', category: 'technical', aliases: ['css', 'scss', 'sass', 'tailwind', 'bootstrap'] },
  { name: 'React', category: 'technical', aliases: ['react.js', 'reactjs'] },
  { name: 'Next.js', category: 'technical', aliases: ['nextjs'] },
  { name: 'Vue.js', category: 'technical', aliases: ['vue', 'vuejs'] },
  { name: 'Angular', category: 'technical', aliases: ['angularjs'] },
  { name: 'Node.js', category: 'technical', aliases: ['nodejs', 'node'] },
  { name: 'Express.js', category: 'technical', aliases: ['express'] },
  { name: 'FastAPI', category: 'technical' },
  { name: 'Django', category: 'technical' },
  { name: 'Flask', category: 'technical' },
  { name: 'Spring Boot', category: 'technical', aliases: ['spring'] },
  { name: 'GraphQL', category: 'technical' },
  { name: 'REST APIs', category: 'technical', aliases: ['restful', 'api design', 'rest api', 'apis'] },
  { name: 'Microservices', category: 'technical', aliases: ['distributed systems'] },

  // Databases & Cloud
  { name: 'SQL', category: 'technical', aliases: ['relational database'] },
  { name: 'PostgreSQL', category: 'technical', aliases: ['postgres'] },
  { name: 'MySQL', category: 'technical' },
  { name: 'MongoDB', category: 'technical', aliases: ['nosql', 'mongo'] },
  { name: 'Redis', category: 'technical' },
  { name: 'Firebase', category: 'technical', aliases: ['firestore'] },
  { name: 'Amazon Web Services (AWS)', category: 'tools', aliases: ['aws', 'ec2', 's3', 'lambda'] },
  { name: 'Google Cloud Platform (GCP)', category: 'tools', aliases: ['gcp', 'google cloud'] },
  { name: 'Microsoft Azure', category: 'tools', aliases: ['azure'] },
  { name: 'Docker', category: 'tools', aliases: ['containerization'] },
  { name: 'Kubernetes', category: 'tools', aliases: ['k8s'] },
  { name: 'Terraform', category: 'tools', aliases: ['iac', 'infrastructure as code'] },
  { name: 'CI/CD', category: 'methodology', aliases: ['continuous integration', 'github actions', 'jenkins', 'gitlab ci'] },
  { name: 'Git', category: 'tools', aliases: ['github', 'version control', 'gitlab'] },
  { name: 'Linux', category: 'tools', aliases: ['bash', 'unix', 'shell'] },

  // Data, AI & Analytics
  { name: 'Machine Learning', category: 'technical', aliases: ['ml', 'deep learning'] },
  { name: 'Artificial Intelligence', category: 'technical', aliases: ['ai', 'llm', 'genai', 'gemini'] },
  { name: 'Data Analysis', category: 'technical', aliases: ['data analytics', 'data mining'] },
  { name: 'Pandas', category: 'tools', aliases: ['numpy', 'scipy'] },
  { name: 'TensorFlow', category: 'tools', aliases: ['pytorch', 'keras'] },
  { name: 'Tableau', category: 'tools', aliases: ['power bi', 'looker', 'data visualization'] },
  { name: 'Data Modeling', category: 'technical', aliases: ['etl', 'data warehouse', 'snowflake', 'bigquery'] },

  // Architecture & Engineering Practices
  { name: 'System Design', category: 'methodology', aliases: ['system architecture', 'software architecture'] },
  { name: 'Unit Testing', category: 'methodology', aliases: ['jest', 'vitest', 'cypress', 'tdd', 'test automation'] },
  { name: 'Agile & Scrum', category: 'methodology', aliases: ['agile', 'scrum', 'kanban', 'sprint planning'] },
  { name: 'Code Review', category: 'methodology', aliases: ['peer review', 'clean code'] },
  { name: 'Performance Optimization', category: 'methodology', aliases: ['latency reduction', 'caching', 'load balancing'] },
  { name: 'Cybersecurity', category: 'technical', aliases: ['security', 'owasp', 'oauth', 'jwt', 'encryption'] },

  // Product, Design & Soft Skills
  { name: 'Product Management', category: 'methodology', aliases: ['roadmap', 'product strategy', 'user stories'] },
  { name: 'UI/UX Design', category: 'tools', aliases: ['figma', 'wireframing', 'user research', 'prototyping'] },
  { name: 'Cross-functional Leadership', category: 'soft', aliases: ['stakeholder management', 'leadership', 'mentoring', 'team lead'] },
  { name: 'Problem Solving', category: 'soft', aliases: ['analytical thinking', 'troubleshooting'] },
  { name: 'Communication', category: 'soft', aliases: ['written communication', 'presentation skills', 'documentation'] },
  { name: 'Project Management', category: 'methodology', aliases: ['jira', 'confluence', 'asana', 'delivery'] }
];

// Strong action verbs for impact detection
export const STRONG_ACTION_VERBS = [
  'spearheaded', 'architected', 'engineered', 'developed', 'optimized', 'accelerated',
  'streamlined', 'delivered', 'orchestrated', 'implemented', 'scaled', 'reduced',
  'increased', 'launched', 'designed', 'automated', 'transformed', 'refactored',
  'maximized', 'eliminated', 'formulated', 'standardized', 'mentored', 'championed'
];

export const WEAK_ACTION_VERBS = [
  'worked on', 'responsible for', 'helped with', 'assisted', 'handled', 'participated in',
  'involved with', 'did', 'was tasked with', 'supported'
];

/**
 * Parses resume text into structured section blocks and metadata
 */
export function parseResumeSections(text: string): ExtractedResume {
  const normalized = text.replace(/\r\n/g, '\n');
  const lines = normalized.split('\n').map(l => l.trim()).filter(Boolean);

  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);

  // Section header patterns
  const sectionPatterns = {
    summary: /(professional\s+summary|executive\s+summary|career\s+summary|summary\s+statement|about\s+me|profile)/i,
    experience: /(work\s+experience|professional\s+experience|employment\s+history|experience|work\s+history)/i,
    education: /(education|academic\s+background|qualifications|academic\s+history|degrees)/i,
    skills: /(skills|technical\s+skills|core\s+competencies|technologies|proficiencies|tools\s+&\s+technologies)/i,
    projects: /(projects|key\s+projects|selected\s+projects|portfolio|personal\s+projects)/i,
    certifications: /(certifications|licenses|credentials|courses|training)/i,
  };

  const detectedSections = {
    hasContactInfo: Boolean(emailMatch || phoneMatch),
    hasSummary: sectionPatterns.summary.test(text),
    hasExperience: sectionPatterns.experience.test(text),
    hasEducation: sectionPatterns.education.test(text),
    hasSkills: sectionPatterns.skills.test(text),
    hasProjects: sectionPatterns.projects.test(text),
    hasCertifications: sectionPatterns.certifications.test(text),
  };

  // Extract bullets from experience/projects
  const sampleBulletsFound: string[] = [];
  for (const line of lines) {
    if (/^[•\-–*]\s+[A-Za-z]/.test(line) || (/^[A-Z][a-z]+/.test(line) && line.length > 35 && line.length < 220)) {
      const cleanBullet = line.replace(/^[•\-–*]\s+/, '').trim();
      if (cleanBullet.split(' ').length >= 5) {
        sampleBulletsFound.push(cleanBullet);
      }
    }
  }

  // Detect likely name from first 3 non-empty lines
  let detectedName: string | undefined;
  for (let i = 0; i < Math.min(3, lines.length); i++) {
    const line = lines[i];
    if (line.length > 2 && line.length < 40 && !line.includes('@') && !line.includes('http') && !line.match(/\d/)) {
      detectedName = line;
      break;
    }
  }

  const words = text.match(/\b[A-Za-z0-9+#.-]+\b/g) || [];

  return {
    text,
    filename: 'Uploaded_Resume.pdf',
    fileSize: text.length * 2,
    wordCount: words.length,
    detectedName,
    detectedEmail: emailMatch ? emailMatch[0] : undefined,
    detectedPhone: phoneMatch ? phoneMatch[0] : undefined,
    detectedSections,
    sampleBulletsFound: sampleBulletsFound.slice(0, 15),
  };
}

/**
 * Extracts skills from given text based on taxonomy
 */
export function extractSkillsFromText(text: string): { skill: typeof SKILLS_TAXONOMY[0]; count: number }[] {
  const lowerText = ` ${text.toLowerCase()} `;
  const results: { skill: typeof SKILLS_TAXONOMY[0]; count: number }[] = [];

  for (const item of SKILLS_TAXONOMY) {
    const variations = [item.name.toLowerCase(), ...(item.aliases || []).map(a => a.toLowerCase())];
    let occurrences = 0;

    for (const v of variations) {
      // Escape for regex
      const escaped = v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Word boundary matching (protecting C++, C#, .NET)
      const regex = new RegExp(`(?<=[^a-z0-9_]|^)${escaped}(?=[^a-z0-9_]|$)`, 'gi');
      const matches = lowerText.match(regex);
      if (matches) {
        occurrences += matches.length;
      }
    }

    if (occurrences > 0) {
      results.push({ skill: item, count: occurrences });
    }
  }

  return results;
}

/**
 * Extracts key domain terminology/keywords from Job Description
 */
export function extractJobKeywords(jobText: string): string[] {
  const commonStopWords = new Set([
    'and', 'the', 'for', 'with', 'you', 'will', 'are', 'this', 'that', 'our', 'team', 'have',
    'work', 'role', 'about', 'join', 'opportunity', 'company', 'experience', 'ability', 'years',
    'must', 'should', 'candidate', 'responsibilities', 'qualifications', 'requirements', 'skills',
    'working', 'ideal', 'looking', 'plus', 'including', 'knowledge', 'understanding', 'strong',
    'good', 'degree', 'preferred', 'equal', 'employment', 'salary', 'benefits', 'apply'
  ]);

  const words = jobText.toLowerCase().match(/\b[a-z]{3,20}\b/g) || [];
  const freqMap: Record<string, number> = {};

  for (const w of words) {
    if (!commonStopWords.has(w)) {
      freqMap[w] = (freqMap[w] || 0) + 1;
    }
  }

  return Object.entries(freqMap)
    .filter(([_, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([w]) => w);
}

/**
 * Full deterministic analysis run when offline or as transparent benchmark
 */
export function runDeterministicAnalysis(
  resumeText: string,
  jobDescription: string,
  targetTitle = 'Target Role',
  filename = 'Resume'
): AnalysisResult {
  const parsed = parseResumeSections(resumeText);
  const resumeSkills = extractSkillsFromText(resumeText);
  const jobSkills = extractSkillsFromText(jobDescription);

  const resumeSkillNames = new Set(resumeSkills.map(s => s.skill.name.toLowerCase()));
  const jobKeywords = extractJobKeywords(jobDescription);

  // Skill categorization
  const matchedSkills: SkillItem[] = [];
  const missingSkills: SkillItem[] = [];

  for (const js of jobSkills) {
    const isMatched = resumeSkillNames.has(js.skill.name.toLowerCase());
    const matchedResumeSkill = resumeSkills.find(rs => rs.skill.name.toLowerCase() === js.skill.name.toLowerCase());

    const item: SkillItem = {
      name: js.skill.name,
      category: js.skill.category,
      inResume: isMatched,
      frequencyInResume: matchedResumeSkill ? matchedResumeSkill.count : 0,
      frequencyInJob: js.count,
      importance: js.count >= 3 ? 'high' : js.count === 2 ? 'medium' : 'low',
    };

    if (isMatched) {
      matchedSkills.push(item);
    } else {
      missingSkills.push(item);
    }
  }

  // Sort missing skills by importance
  missingSkills.sort((a, b) => {
    const order = { high: 3, medium: 2, low: 1 };
    return (order[b.importance || 'low'] - order[a.importance || 'low']) || (b.frequencyInJob - a.frequencyInJob);
  });

  // Calculate ATS Findings
  const atsFindings: ATSFinding[] = [];

  // 1. Contact Info Check
  if (parsed.detectedEmail && parsed.detectedPhone) {
    atsFindings.push({
      id: 'contact-pass',
      category: 'contact',
      title: 'Contact Information Present',
      status: 'pass',
      description: `Verified email (${parsed.detectedEmail}) and telephone format found.`,
      recommendation: 'Ensure your phone number includes country/area code and LinkedIn URL is included.',
    });
  } else if (parsed.detectedEmail || parsed.detectedPhone) {
    atsFindings.push({
      id: 'contact-warn',
      category: 'contact',
      title: 'Partial Contact Information',
      status: 'warning',
      description: parsed.detectedEmail ? 'Email detected, but telephone number may be missing or unformatted.' : 'Phone detected, but professional email address is missing.',
      recommendation: 'Place both an email address, phone number, and city/state at the very top of your document.',
    });
  } else {
    atsFindings.push({
      id: 'contact-fail',
      category: 'contact',
      title: 'Missing Core Contact Information',
      status: 'fail',
      description: 'Could not reliably parse standard email or phone number in the resume text.',
      recommendation: 'ATS parsers frequently discard resumes lacking direct contact details. Put email and phone in plain text header.',
    });
  }

  // 2. Standard Section Headers
  const sectionsPresentCount = Object.values(parsed.detectedSections).filter(Boolean).length;
  if (parsed.detectedSections.hasExperience && parsed.detectedSections.hasEducation && parsed.detectedSections.hasSkills) {
    atsFindings.push({
      id: 'sec-core-pass',
      category: 'sections',
      title: 'Standard ATS Section Headers Detected',
      status: 'pass',
      description: 'Standard headers (Experience, Education, Skills) detected for predictable ATS parser routing.',
      recommendation: 'Keep section headers clear and traditional (e.g. "Work Experience", "Education") rather than creative titles.',
    });
  } else {
    const missing: string[] = [];
    if (!parsed.detectedSections.hasExperience) missing.push('Experience');
    if (!parsed.detectedSections.hasEducation) missing.push('Education');
    if (!parsed.detectedSections.hasSkills) missing.push('Skills');
    atsFindings.push({
      id: 'sec-core-fail',
      category: 'sections',
      title: 'Missing Critical Resume Sections',
      status: 'fail',
      description: `Missing standard header(s): ${missing.join(', ')}.`,
      recommendation: `Add explicit standard headings for: ${missing.join(', ')} so ATS algorithms can index your history.`,
    });
  }

  // 3. Summary Check
  if (parsed.detectedSections.hasSummary) {
    atsFindings.push({
      id: 'sec-summary-pass',
      category: 'sections',
      title: 'Professional Summary Section Present',
      status: 'pass',
      description: 'A dedicated summary or profile section introduces your candidacy and provides immediate context.',
      recommendation: 'Ensure your summary is customized to highlight target role qualifications within 3-4 concise lines.',
    });
  } else {
    atsFindings.push({
      id: 'sec-summary-warn',
      category: 'sections',
      title: 'No Professional Summary Section Found',
      status: 'warning',
      description: 'A summary section is missing. Recruiter scans typically spend 6 seconds reviewing the top third.',
      recommendation: 'Add a 3-line "Professional Summary" tailored to the job description with your years of experience and top skills.',
    });
  }

  // 4. Word Count & Document Length
  if (parsed.wordCount >= 350 && parsed.wordCount <= 1100) {
    atsFindings.push({
      id: 'length-pass',
      category: 'formatting',
      title: 'Optimal Resume Word Count',
      status: 'pass',
      description: `Resume contains approximately ${parsed.wordCount} words (ideal 1–2 page target range: 400–1,000 words).`,
      recommendation: 'Maintain this concise density; avoid expanding past 2 pages unless you have 10+ years of senior executive experience.',
    });
  } else if (parsed.wordCount < 350) {
    atsFindings.push({
      id: 'length-short',
      category: 'formatting',
      title: 'Resume is Relatively Brief',
      status: 'warning',
      description: `Resume has only ${parsed.wordCount} words. It may lack sufficient project depth or keyword depth.`,
      recommendation: 'Expand upon specific technologies used, system architecture decisions, and business impact for each role.',
    });
  } else {
    atsFindings.push({
      id: 'length-long',
      category: 'formatting',
      title: 'High Word Count / Length Warning',
      status: 'warning',
      description: `Resume has ${parsed.wordCount} words. Resumes over 1,100 words risk recruiter skimming fatigue and truncation.`,
      recommendation: 'Condense older positions (over 7 years ago) to 1-2 bullet points and focus on high-impact achievements.',
    });
  }

  // 5. Action Verb & Impact Bullet Analysis
  let strongVerbCount = 0;
  let weakVerbCount = 0;
  let quantifiedCount = 0;

  for (const bullet of parsed.sampleBulletsFound) {
    const firstTwoWords = bullet.toLowerCase().split(' ').slice(0, 2).join(' ');
    if (STRONG_ACTION_VERBS.some(v => firstTwoWords.includes(v))) {
      strongVerbCount++;
    }
    if (WEAK_ACTION_VERBS.some(v => firstTwoWords.includes(v))) {
      weakVerbCount++;
    }
    if (/\d+[%kM$]?|\b(increased|reduced|doubled|tripled|decreased)\b/i.test(bullet)) {
      quantifiedCount++;
    }
  }

  if (strongVerbCount >= 4) {
    atsFindings.push({
      id: 'verbs-pass',
      category: 'content',
      title: 'Strong Action Verb Usage',
      status: 'pass',
      description: `Detected strong action verbs (e.g. spearheaded, engineered, optimized) leading bullet statements.`,
      recommendation: 'Continue opening every achievement bullet with a high-impact dynamic verb.',
    });
  } else {
    atsFindings.push({
      id: 'verbs-warn',
      category: 'content',
      title: 'Passive or Repetitive Verb Usage',
      status: 'warning',
      description: 'Bullets frequently begin with passive statements like "responsible for" or general nouns instead of active verbs.',
      recommendation: 'Replace passive phrases with impactful verbs (e.g., replace "Responsible for testing" with "Engineered end-to-end automated testing suite").',
    });
  }

  if (quantifiedCount >= 3) {
    atsFindings.push({
      id: 'quant-pass',
      category: 'content',
      title: 'Quantified Metrics & Data Evidence',
      status: 'pass',
      description: 'Multiple bullet points feature concrete numbers, percentages, or scale metrics.',
      recommendation: 'Recruiters and hiring managers favor data-backed claims (e.g., "reduced latency by 35%").',
    });
  } else {
    atsFindings.push({
      id: 'quant-warn',
      category: 'content',
      title: 'Limited Quantifiable Achievements',
      status: 'warning',
      description: 'Only a few or no numerical metrics detected in experience descriptions.',
      recommendation: 'Use the Google "XYZ formula": Accomplished [X], as measured by [Y], by doing [Z]. Add metrics like team size, % speedup, or users served.',
    });
  }

  // 6. Keyword Coverage Analysis
  let matchedKeywordCount = 0;
  const resumeLower = resumeText.toLowerCase();
  const unmatchedKeywords: string[] = [];

  for (const kw of jobKeywords) {
    if (resumeLower.includes(kw)) {
      matchedKeywordCount++;
    } else {
      unmatchedKeywords.push(kw);
    }
  }

  const keywordCoveragePct = jobKeywords.length > 0
    ? Math.round((matchedKeywordCount / jobKeywords.length) * 100)
    : 70;

  // Calculate Sub-Scores (0 to 100)
  // ATS Readability Score: based on findings
  let atsReadability = 70;
  if (parsed.detectedEmail && parsed.detectedPhone) atsReadability += 10;
  if (parsed.detectedSections.hasExperience && parsed.detectedSections.hasEducation && parsed.detectedSections.hasSkills) atsReadability += 15;
  if (parsed.detectedSections.hasSummary) atsReadability += 5;
  if (parsed.wordCount >= 350 && parsed.wordCount <= 1100) atsReadability += 5;
  atsReadability = Math.min(100, Math.max(30, atsReadability));

  // Skill Match Score:
  const totalJobSkillsCount = jobSkills.length;
  let skillMatch = 65;
  if (totalJobSkillsCount > 0) {
    const ratio = matchedSkills.length / totalJobSkillsCount;
    skillMatch = Math.min(100, Math.round(ratio * 100));
  }

  // Keyword Alignment Score:
  const keywordAlignment = Math.min(100, Math.max(25, keywordCoveragePct));

  // Content Impact Score:
  let contentImpact = 55;
  if (strongVerbCount >= 4) contentImpact += 20;
  if (quantifiedCount >= 3) contentImpact += 20;
  if (weakVerbCount > 2) contentImpact -= 10;
  contentImpact = Math.min(100, Math.max(30, contentImpact));

  // Overall Weighted Score:
  // 35% Skill Match + 25% ATS Readability + 25% Keyword Alignment + 15% Content Impact
  const overallScore = Math.round(
    skillMatch * 0.35 +
    atsReadability * 0.25 +
    keywordAlignment * 0.25 +
    contentImpact * 0.15
  );

  // Score Grade & Rationale
  let scoreGrade = {
    label: 'Needs Attention',
    description: 'Significant gaps detected between resume content and job specifications.',
    color: 'text-rose-600 bg-rose-50 border-rose-200'
  };
  if (overallScore >= 85) {
    scoreGrade = {
      label: 'Strong Match — High ATS Readiness',
      description: 'Your resume shows exceptional alignment with core job requirements and ATS structure.',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    };
  } else if (overallScore >= 72) {
    scoreGrade = {
      label: 'Good Alignment — Minor Gaps',
      description: 'Solid profile with strong foundations, but missing a few high-value skills or metrics.',
      color: 'text-blue-700 bg-blue-50 border-blue-200'
    };
  } else if (overallScore >= 55) {
    scoreGrade = {
      label: 'Moderate Alignment',
      description: 'Relevant experience detected, but lacks key terminology and measurable accomplishments.',
      color: 'text-amber-700 bg-amber-50 border-amber-200'
    };
  }

  // Generate Bullet Improvements (preserving original facts)
  const bulletImprovements: BulletImprovement[] = [];
  const candidateBullets = parsed.sampleBulletsFound.slice(0, 4);

  const improvementsTemplates = [
    {
      verb: 'Spearheaded',
      transform: (b: string) => {
        const cleaned = b.replace(/^(responsible for|helped with|worked on|assisted in)\s+/i, '');
        return `Spearheaded ${cleaned.charAt(0).toLowerCase() + cleaned.slice(1)}, improving efficiency by [X%] and reducing cycle time.`;
      },
      reason: 'Replaces passive phrasing with executive leadership verb and adds quantitative metric placeholder.'
    },
    {
      verb: 'Architected',
      transform: (b: string) => {
        const cleaned = b.replace(/^(responsible for|worked on|developed)\s+/i, '');
        return `Architected and deployed scalable solution for ${cleaned.charAt(0).toLowerCase() + cleaned.slice(1)}, supporting [X,000+] active users with [Y%] uptime.`;
      },
      reason: 'Demonstrates architectural ownership and system scale rather than routine task execution.'
    },
    {
      verb: 'Optimized',
      transform: (b: string) => {
        const cleaned = b.replace(/^(handled|maintained|supported)\s+/i, '');
        return `Optimized ${cleaned.charAt(0).toLowerCase() + cleaned.slice(1)}, resulting in [X%] cost reduction and enhanced reliability across [Team/System].`;
      },
      reason: 'Highlights optimization and tangible business value with concrete metric fields.'
    }
  ];

  candidateBullets.forEach((bullet, idx) => {
    const tmpl = improvementsTemplates[idx % improvementsTemplates.length];
    bulletImprovements.push({
      original: bullet,
      improved: tmpl.transform(bullet),
      reason: tmpl.reason,
      actionVerbUsed: tmpl.verb
    });
  });

  // Strengths
  const resumeStrengths: string[] = [];
  if (matchedSkills.length > 0) {
    resumeStrengths.push(`Direct match on ${matchedSkills.length} core technical requirements including ${matchedSkills.slice(0, 3).map(s => s.name).join(', ')}.`);
  }
  if (parsed.detectedSections.hasExperience && parsed.detectedSections.hasEducation) {
    resumeStrengths.push('Clean foundational structure with recognized professional headers for seamless ATS ingestion.');
  }
  if (quantifiedCount >= 2) {
    resumeStrengths.push('Includes numerical evidence and scale indicators that demonstrate tangible business output.');
  } else {
    resumeStrengths.push('Demonstrates solid career progression and clear role tenure.');
  }

  // Improvement Areas
  const improvementAreas = [];
  if (missingSkills.length > 0) {
    improvementAreas.push({
      title: `Incorporate High-Priority Skill Keywords (${missingSkills.slice(0, 3).map(s => s.name).join(', ')})`,
      priority: 'high' as const,
      description: `The job posting explicitly emphasizes ${missingSkills.slice(0, 4).map(s => s.name).join(', ')}. If you possess relevant familiarity, embed them into your technical skills summary or past project bullets.`,
      actionableTip: 'Ensure skills are mentioned in both the dedicated Skills list and within context under Work Experience.'
    });
  }

  if (quantifiedCount < 3) {
    improvementAreas.push({
      title: 'Quantify Accomplishments Using the Google XYZ Framework',
      priority: 'high' as const,
      description: 'Resumes featuring specific metrics (e.g. "% increase in performance", "$ saved", "hours automated") receive 40% more recruiter callbacks.',
      actionableTip: 'Review each bullet point and ask: "By how much? Over what timeframe? For how many users?"'
    });
  }

  if (!parsed.detectedSections.hasSummary) {
    improvementAreas.push({
      title: 'Craft a Targeted 3-Line Professional Summary',
      priority: 'medium' as const,
      description: 'Recruiters spend an average of 6 seconds during initial triage. A punchy summary guarantees they immediately see your years of experience and core domain fit.',
      actionableTip: 'Format: [Target Title] with [X] years of experience specializing in [Top 3 Job Skills]. Track record of [Top Achievement].'
    });
  }

  const topJobSkillsNames = jobSkills.slice(0, 3).map(s => s.skill.name).join(', ');
  const summaryRewrite = {
    originalFound: parsed.detectedSections.hasSummary ? 'Summary detected in document.' : 'No dedicated summary found in document.',
    suggestedRewrite: `Results-driven ${targetTitle || 'Professional'} with hands-on expertise in ${topJobSkillsNames || 'modern software engineering and scalable systems'}. Proven track record of architecting resilient solutions, optimizing operational workflows, and collaborating across multidisciplinary teams. Eager to leverage deep technical capabilities to accelerate product velocity and technical excellence.`,
    keyChanges: [
      `Incorporates target role terminology: "${targetTitle || 'Professional'}"`,
      `Embeds top required skills: ${topJobSkillsNames || 'core skills'}`,
      'Positions candidate around results, architecture, and impact'
    ]
  };

  const scoreExplanation = `Overall Score (${overallScore}/100) is calculated using a transparent weighted ATS index: 35% Skill Match (${skillMatch} pts), 25% ATS Formatting & Parseability (${atsReadability} pts), 25% Keyword Coverage (${keywordAlignment} pts), and 15% Content Impact & Action Verbs (${contentImpact} pts). This reflects resume-to-job document relevance, not a proprietary hiring promise.`;

  return {
    id: `CL-${Date.now()}`,
    targetJobTitle: targetTitle || 'Target Position',
    analyzedAt: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
    engineUsed: 'CareerLens Deterministic Engine (Local Fallback)',
    isAiEnhanced: false,
    overallScore,
    scoreGrade,
    scoreBreakdown: {
      atsReadability,
      skillMatch,
      keywordAlignment,
      contentImpact
    },
    scoreExplanation,
    atsFindings,
    matchedSkills,
    missingSkills,
    resumeStrengths,
    improvementAreas,
    summaryImprovement: summaryRewrite,
    bulletImprovements,
    keywordCoverage: {
      totalJobKeywords: jobKeywords.length,
      matchedKeywords: matchedKeywordCount,
      coveragePercentage: keywordCoveragePct,
      topUnmatchedKeywords: unmatchedKeywords.slice(0, 8)
    },
    resumeMeta: {
      filename: filename || 'resume.pdf',
      wordCount: parsed.wordCount,
      readingTimeMinutes: Math.max(1, Math.round(parsed.wordCount / 200)),
      detectedEmail: parsed.detectedEmail,
      detectedPhone: parsed.detectedPhone
    }
  };
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Eye,
  X,
  FileCode,
  Briefcase,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { SAMPLE_PROFILES, SampleProfile } from '../data/sampleData';
import { uploadAndExtractResume } from '../services/api';

interface AnalyzerWorkspaceProps {
  onStartAnalysis: (params: {
    resumeText: string;
    jobDescription: string;
    targetTitle: string;
    filename: string;
    fileSize: number;
  }) => void;
  isAnalyzing: boolean;
  selectedSampleProfileId?: string;
}

export const AnalyzerWorkspace: React.FC<AnalyzerWorkspaceProps> = ({
  onStartAnalysis,
  isAnalyzing,
  selectedSampleProfileId,
}) => {
  const [resumeText, setResumeText] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [targetTitle, setTargetTitle] = useState<string>('');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [uploadedFileSize, setUploadedFileSize] = useState<number>(0);
  const [isSampleLoaded, setIsSampleLoaded] = useState<boolean>(false);

  // Upload status
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isScannedPdf, setIsScannedPdf] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Raw text drawer
  const [showRawTextModal, setShowRawTextModal] = useState<boolean>(false);
  const [inputMode, setInputMode] = useState<'upload' | 'paste'>('upload');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load sample profile
  const handleLoadSample = (profile: SampleProfile) => {
    setResumeText(profile.resumeText);
    setJobDescription(profile.jobDescription);
    setTargetTitle(profile.jobTitle);
    setUploadedFileName(profile.resumeFileName);
    setUploadedFileSize(profile.resumeText.length * 2);
    setIsSampleLoaded(true);
    setUploadError(null);
    setIsScannedPdf(false);
  };

  // Clear inputs
  const handleClearAll = () => {
    setResumeText('');
    setJobDescription('');
    setTargetTitle('');
    setUploadedFileName('');
    setUploadedFileSize(0);
    setIsSampleLoaded(false);
    setUploadError(null);
    setIsScannedPdf(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Process File
  const processUploadedFile = async (file: File) => {
    setUploadError(null);
    setIsScannedPdf(false);
    setIsUploading(true);
    setUploadProgress(20);

    const validExtensions = ['.pdf', '.docx', '.txt', '.doc'];
    const hasValidExt = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

    if (!hasValidExt) {
      setUploadError('Unsupported file type. Please upload a PDF (.pdf), Microsoft Word (.docx), or plain text (.txt) file.');
      setIsUploading(false);
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      setUploadError('File size exceeds the 12MB limit.');
      setIsUploading(false);
      return;
    }

    try {
      setUploadProgress(50);
      const res = await uploadAndExtractResume(file);
      setUploadProgress(90);

      if (res.success && res.text) {
        if (res.text.trim().length < 50) {
          setUploadError('The extracted text from this file is too short (< 50 characters). Please ensure your document contains standard text rather than scanned images.');
          setIsUploading(false);
          return;
        }

        setResumeText(res.text);
        setUploadedFileName(file.name);
        setUploadedFileSize(file.size);
        setIsSampleLoaded(false);
        setUploadProgress(100);
      } else {
        if (res.isScannedPdf) {
          setIsScannedPdf(true);
        }
        setUploadError(res.error || 'Failed to extract text from file. Please ensure the document is not password protected.');
      }
    } catch (err: any) {
      setUploadError(err.message || 'An unexpected error occurred during extraction.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processUploadedFile(e.target.files[0]);
    }
  };

  // Submit Analysis
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim()) {
      setUploadError('Please upload a resume or paste your resume text before analyzing.');
      return;
    }
    if (!jobDescription.trim()) {
      alert('Please paste the target job description to calculate ATS match and skill gaps.');
      return;
    }

    onStartAnalysis({
      resumeText,
      jobDescription,
      targetTitle: targetTitle.trim() || 'Target Role',
      filename: uploadedFileName || 'Resume.pdf',
      fileSize: uploadedFileSize || resumeText.length * 2,
    });
  };

  const wordCount = resumeText ? (resumeText.match(/\b[A-Za-z0-9+#.-]+\b/g) || []).length : 0;
  const jobWordCount = jobDescription ? (jobDescription.match(/\b[A-Za-z0-9+#.-]+\b/g) || []).length : 0;

  return (
    <div id="analyzer-workspace" className="py-12 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Workspace Title & Sample Pickers */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>ATS Resume Audit Workspace</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Compare Your Resume Against Any Job
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Upload your resume in PDF/DOCX or select a preloaded sample profile for an instant live audit.
            </p>
          </div>

          {/* Quick Sample Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Quick Samples:</span>
            {SAMPLE_PROFILES.map((profile) => (
              <button
                key={profile.id}
                type="button"
                onClick={() => handleLoadSample(profile)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/50 shadow-xs transition-colors cursor-pointer"
              >
                {profile.category}: {profile.title.split(' ')[1] || profile.title}
              </button>
            ))}
            {(resumeText || jobDescription) && (
              <button
                type="button"
                onClick={handleClearAll}
                className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                title="Clear all fields"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Sample notification badge if sample is active */}
        {isSampleLoaded && (
          <div className="mb-6 p-3 rounded-xl bg-indigo-50/90 border border-indigo-200 flex items-center justify-between text-xs text-indigo-900">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
              <span>
                <strong>Sample Profile Active:</strong> Loaded <em>{uploadedFileName}</em> with matching job description for demonstration.
              </span>
            </div>
            <button
              onClick={handleClearAll}
              className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 underline cursor-pointer"
            >
              Reset to upload my own
            </button>
          </div>
        )}

        {/* Workspace Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* COLUMN 1: RESUME UPLOAD */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Your Resume</h3>
                      <p className="text-xs text-slate-500">PDF, DOCX, or TXT (Max 12MB)</p>
                    </div>
                  </div>

                  {/* Mode switcher: Upload vs Paste */}
                  <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => setInputMode('upload')}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        inputMode === 'upload' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      File Upload
                    </button>
                    <button
                      type="button"
                      onClick={() => setInputMode('paste')}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        inputMode === 'paste' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Paste Text
                    </button>
                  </div>
                </div>

                {/* Upload Mode */}
                {inputMode === 'upload' ? (
                  <div>
                    {/* Drag and Drop Dropzone */}
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                        isDragOver
                          ? 'border-blue-500 bg-blue-50/50'
                          : resumeText
                          ? 'border-emerald-300 bg-emerald-50/20 hover:bg-emerald-50/40'
                          : 'border-slate-300 hover:border-blue-400 bg-slate-50/50 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.docx,.doc,.txt"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                      {isUploading ? (
                        <div className="py-4 space-y-3">
                          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
                          <div className="text-sm font-semibold text-slate-800">
                            Extracting text & section layout...
                          </div>
                          <div className="w-48 bg-slate-200 h-1.5 rounded-full mx-auto overflow-hidden">
                            <div
                              className="bg-blue-600 h-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      ) : resumeText ? (
                        <div className="py-2 space-y-2">
                          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">
                              {uploadedFileName || 'Resume Document Ready'}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {wordCount} words extracted • {(uploadedFileSize / 1024).toFixed(1)} KB
                            </p>
                          </div>
                          <p className="text-xs text-blue-600 font-medium hover:underline">
                            Click or drag to replace file
                          </p>
                        </div>
                      ) : (
                        <div className="py-4 space-y-2">
                          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-1">
                            <UploadCloud className="w-6 h-6" />
                          </div>
                          <p className="text-sm font-semibold text-slate-800">
                            Drop your resume here, or <span className="text-blue-600 underline">browse files</span>
                          </p>
                          <p className="text-xs text-slate-400">
                            Standard PDF or Microsoft Word DOCX formats recommended
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Scanned PDF specific warning */}
                    {isScannedPdf && (
                      <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>Scanned Image Detected:</strong> This PDF contains flat image graphics rather than machine-readable text. ATS systems and recruiters cannot read image scans. Please export your resume as a standard PDF from Microsoft Word, Google Docs, or Canva.
                        </div>
                      </div>
                    )}

                    {/* Error message */}
                    {uploadError && !isScannedPdf && (
                      <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2 text-xs text-rose-800">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{uploadError}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Paste Mode */
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      Paste Plain Resume Content:
                    </label>
                    <textarea
                      rows={8}
                      value={resumeText}
                      onChange={(e) => {
                        setResumeText(e.target.value);
                        setUploadedFileName('Pasted_Resume_Text.txt');
                        setUploadedFileSize(e.target.value.length * 2);
                        setIsSampleLoaded(false);
                      }}
                      placeholder="Paste your contact info, summary, work experience, education, and skills..."
                      className="w-full text-xs font-mono p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y"
                    />
                  </div>
                )}
              </div>

              {/* Bottom Resume Meta & Inspect Drawer Link */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>{wordCount} words extracted</span>
                </span>

                {resumeText && (
                  <button
                    type="button"
                    onClick={() => setShowRawTextModal(true)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Extracted Text</span>
                  </button>
                )}
              </div>
            </div>

            {/* COLUMN 2: JOB DESCRIPTION */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Job Description</h3>
                      <p className="text-xs text-slate-500">Paste the job posting you are targeting</p>
                    </div>
                  </div>

                  <span className="text-xs font-medium text-slate-500">
                    {jobWordCount} words
                  </span>
                </div>

                {/* Target Job Title (Optional but recommended) */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Job Title (Optional):
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={targetTitle}
                      onChange={(e) => setTargetTitle(e.target.value)}
                      placeholder="e.g. Senior Full Stack Engineer, Product Manager, Data Analyst"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <Briefcase className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                  </div>
                </div>

                {/* Job Description Textarea */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Job Requirements & Responsibilities <span className="text-rose-500">*</span>:
                    </label>
                    <button
                      type="button"
                      onClick={() => handleLoadSample(SAMPLE_PROFILES[0])}
                      className="text-[11px] font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      Insert sample job
                    </button>
                  </div>
                  <textarea
                    rows={8}
                    required
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the full job posting here (including about the role, key responsibilities, required technical skills, qualifications, and tool stack)..."
                    className="w-full text-xs p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Bottom helper text */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>More detail gives more accurate skill & keyword alignment.</span>
                {jobDescription && (
                  <button
                    type="button"
                    onClick={() => setJobDescription('')}
                    className="text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Primary Action Button */}
          <div className="mt-8 flex flex-col items-center justify-center">
            <button
              type="submit"
              disabled={isAnalyzing || !resumeText.trim() || !jobDescription.trim()}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-bold shadow-md transition-all cursor-pointer ${
                isAnalyzing || !resumeText.trim() || !jobDescription.trim()
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-600/30 hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Cross-Referencing ATS Criteria & Skills...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Run ATS & Skill Gap Audit</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            <p className="text-xs text-slate-500 mt-2.5">
              Strictly confidential • Mathematical deterministic match + Gemini AI insights
            </p>
          </div>
        </form>

      </div>

      {/* Extracted Text Inspector Modal */}
      {showRawTextModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Extracted Resume Text Layer
                </h3>
              </div>
              <button
                onClick={() => setShowRawTextModal(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1 font-mono text-xs text-slate-800 bg-slate-50 whitespace-pre-wrap leading-relaxed">
              {resumeText || 'No text extracted yet.'}
            </div>
            <div className="p-3 bg-white border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
              <span>{wordCount} words detected by parser</span>
              <button
                onClick={() => setShowRawTextModal(false)}
                className="px-3 py-1.5 font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

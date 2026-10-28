/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { AnalyzerWorkspace } from './components/AnalyzerWorkspace';
import { ResultsDashboard } from './components/ResultsDashboard';
import { ATSGuideModal } from './components/ATSGuideModal';
import { PrivacyModal } from './components/PrivacyModal';
import { Footer } from './components/Footer';
import { AnalysisResult, AnalyzePayload } from './types/analyzer';
import { analyzeResume, checkServerStatus } from './services/api';
import { SAMPLE_PROFILES } from './data/sampleData';

export default function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'landing' | 'results'>('landing');
  const [selectedSampleId, setSelectedSampleId] = useState<string | undefined>(undefined);
  const [isATSGuideOpen, setIsATSGuideOpen] = useState<boolean>(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);
  const [serverStatus, setServerStatus] = useState<{ hasGeminiKey: boolean; status: string }>({
    hasGeminiKey: false,
    status: 'checking',
  });

  useEffect(() => {
    checkServerStatus().then(status => {
      setServerStatus(status);
    });
  }, []);

  const handleStartAnalysis = async (params: {
    resumeText: string;
    jobDescription: string;
    targetTitle: string;
    filename: string;
    fileSize: number;
  }) => {
    setIsAnalyzing(true);
    try {
      const payload: AnalyzePayload = {
        resumeText: params.resumeText,
        jobDescription: params.jobDescription,
        targetTitle: params.targetTitle,
        filename: params.filename,
        fileSize: params.fileSize,
      };

      const res = await analyzeResume(payload);
      if (res.success && res.analysis) {
        setAnalysisResult(res.analysis);
        setCurrentView('results');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert(res.error || 'Failed to complete resume audit. Please check your inputs.');
      }
    } catch (err: any) {
      alert(`Analysis error: ${err.message || 'Unknown error occurred.'}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectSample = (profileId: string) => {
    setSelectedSampleId(profileId);
    setCurrentView('landing');
    setTimeout(() => {
      const el = document.getElementById('analyzer-workspace');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleNavigateToAnalyzer = () => {
    setCurrentView('landing');
    setTimeout(() => {
      const el = document.getElementById('analyzer-workspace');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Navbar */}
      <Navbar
        onNavigateToAnalyzer={handleNavigateToAnalyzer}
        onOpenATSGuide={() => setIsATSGuideOpen(true)}
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        hasActiveResults={Boolean(analysisResult)}
        onViewResults={() => setCurrentView('results')}
        isAiReady={serverStatus.hasGeminiKey}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'landing' ? (
          <>
            <Hero
              onAnalyzeClick={handleNavigateToAnalyzer}
              onSelectSample={handleSelectSample}
            />
            <Features />
            <AnalyzerWorkspace
              onStartAnalysis={handleStartAnalysis}
              isAnalyzing={isAnalyzing}
              selectedSampleProfileId={selectedSampleId}
            />
          </>
        ) : (
          analysisResult && (
            <ResultsDashboard
              result={analysisResult}
              onAnalyzeAnother={() => {
                setCurrentView('landing');
                setTimeout(() => {
                  const el = document.getElementById('analyzer-workspace');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              onOpenATSGuide={() => setIsATSGuideOpen(true)}
            />
          )
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenATSGuide={() => setIsATSGuideOpen(true)}
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
      />

      {/* Modals */}
      <ATSGuideModal
        isOpen={isATSGuideOpen}
        onClose={() => setIsATSGuideOpen(false)}
      />
      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        hasGeminiKey={serverStatus.hasGeminiKey}
      />
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { CurriculumModule, CurriculumLevel } from '@/types';
import { useWeekAccess } from '@/hooks/useWeekAccess';
import { LiveCountdown } from './LiveCountdown';
import { QuizEngine } from './QuizEngine';
import {
  PlayCircle,
  FileText,
  Code2,
  Award,
  Download,
  BookOpen,
  CheckCircle2,
  Lock,
  Clock,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { PythonSandbox } from '../sandbox/PythonSandbox';

interface WeekContentViewerProps {
  module: CurriculumModule;
  level?: CurriculumLevel;
  onBack: () => void;
}

export function WeekContentViewer({ module, level, onBack }: WeekContentViewerProps) {
  const access = useWeekAccess(module.week, module.level);
  const [activeTab, setActiveTab] = useState<'video' | 'notes' | 'code' | 'quiz'>('video');
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number>(0);

  const activeLesson = module.lessons[selectedLessonIndex] || module.lessons[0];

  // If time-locked or not accessible, display locked view
  if (!access.isUnlocked) {
    return (
      <div className="space-y-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Curriculum Index</span>
        </button>

        {access.lockReason === 'TIME_LOCKED' ? (
          <div className="max-w-2xl mx-auto py-8">
            <LiveCountdown
              days={access.countdown.days}
              hours={access.countdown.hours}
              minutes={access.countdown.minutes}
              seconds={access.countdown.seconds}
              targetUnlockTime={access.targetUnlockTime}
              weekTitle={module.title}
            />
          </div>
        ) : (
          <div className="max-w-xl mx-auto p-8 bg-white rounded-3xl border border-amber-200 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Module Access Restricted</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {access.lockMessage}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Navigation and Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 bg-white rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                WEEK {module.week}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Level {module.level} • {module.durationHours} Hours Total
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
              {module.title}
            </h1>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center space-x-1.5 bg-slate-200/80 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('video')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'video' ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5 text-indigo-600" />
            <span>Lessons</span>
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'notes' ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span>Lecture Notes</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'code' ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Code Lab</span>
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'quiz' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Certification Quiz</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'quiz' ? (
        <QuizEngine quiz={module.quiz} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Stage View (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {activeTab === 'video' && (
              <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
                <div className="aspect-video relative bg-slate-900 flex items-center justify-center">
                  <video
                    key={activeLesson.id}
                    controls
                    className="w-full h-full object-cover"
                    poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
                  >
                    <source src={activeLesson.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="p-5 bg-slate-900 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-400">
                        Lesson {selectedLessonIndex + 1} of {module.lessons.length}
                      </span>
                      <h3 className="text-base font-bold text-white mt-0.5">{activeLesson.title}</h3>
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded-md">
                      {activeLesson.duration}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Comprehensive Lecture Notes: {activeLesson.title}
                </h3>
                <div className="prose prose-sm max-w-none text-slate-700 text-xs leading-relaxed space-y-3">
                  <p>{activeLesson.notes}</p>
                  <p>
                    In this session, we investigate the underlying matrix multiplication pipelines, kernel dispatch latencies, and distributed communication primitives that enable large-scale AI applications.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="space-y-4">
                <PythonSandbox
                  initialCode={activeLesson.codeSnippet || '# Production code snippet\nimport numpy as np\n\nx = np.random.randn(5, 5)\nprint("Random Matrix Shape:", x.shape)\nprint("Frobenius Norm:", np.linalg.norm(x))\nprint("Vectorized Dot Product:", np.dot(x[0], x[1]))'}
                  expectedOutputSnippet="Vectorized Dot Product"
                  weekTitle={`Week ${module.week} Interactive Code Lab: ${activeLesson.title}`}
                />
              </div>
            )}

            {/* Outcomes Block */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Weekly Learning Mastery Outcomes
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {module.outcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Playlist / Lesson Queue (Right 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Module Video Lessons ({module.lessons.length})
              </h3>
              <div className="space-y-2">
                {module.lessons.map((lesson, idx) => {
                  const isSelected = selectedLessonIndex === idx;
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => { setSelectedLessonIndex(idx); setActiveTab('video'); }}
                      className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50 shadow-xs ring-1 ring-indigo-600'
                          : 'border-slate-100 hover:border-slate-200 bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                          isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {idx + 1}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-slate-900 truncate">{lesson.title}</p>
                          <p className="text-[11px] text-slate-500">{lesson.duration}</p>
                        </div>
                      </div>
                      <PlayCircle className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Take Assessment CTA */}
              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => setActiveTab('quiz')}
                  className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-2xl text-xs font-bold shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center space-x-2"
                >
                  <Award className="w-4 h-4" />
                  <span>Take Week {module.week} Certification Exam</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
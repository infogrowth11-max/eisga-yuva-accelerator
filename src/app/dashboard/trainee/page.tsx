'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCurriculum } from '@/context/CurriculumContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { WeekCard } from '@/components/curriculum/WeekCard';
import { WeekContentViewer } from '@/components/curriculum/WeekContentViewer';
import { LiveCountdown } from '@/components/curriculum/LiveCountdown';
import { CheckoutModal } from '@/components/payment/CheckoutModal';
import { useWeekAccess } from '@/hooks/useWeekAccess';
import {
  Sparkles,
  BookOpen,
  Award,
  CreditCard,
  Clock,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Flame,
  Layers,
  ArrowRight
} from 'lucide-react';

export function TraineeDashboardContent() {
  const { user } = useAuth();
  const { levels, modules, isLoading } = useCurriculum();
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [checkoutLevel, setCheckoutLevel] = useState<number | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Focus on current progression week (e.g. Week 2)
  const nextTargetWeek = (user?.passed_quizzes?.length || 0) + 1;
  const targetWeekAccess = useWeekAccess(Math.min(nextTargetWeek, 12));

  const activeLevelCount = user?.activeLevels?.length || 1;
  const passedQuizCount = user?.passed_quizzes?.length || 0;

  const handleOpenCheckout = (levelNumber: number) => {
    setCheckoutLevel(levelNumber);
    setIsCheckoutOpen(true);
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center text-slate-500">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm font-semibold">Hydrating Curriculum & Drip Feed Engine...</p>
      </div>
    );
  }

  // If a week studio is open, render viewer
  if (selectedWeek !== null) {
    const mod = modules.find(m => m.week === selectedWeek);
    if (mod) {
      const lvl = levels.find(l => l.level === mod.level);
      return (
        <WeekContentViewer
          module={mod}
          level={lvl}
          onBack={() => setSelectedWeek(null)}
        />
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Hero Welcome & Next Milestone Banner */}
      <div className="bg-gradient-to-r from-[#1e1b4b] via-indigo-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white border border-indigo-900/60 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>YUVA AI Accelerator Fellowship</span>
              </span>
              <span className="text-xs text-indigo-300 font-mono">
                Cohort: {user?.cohort || 'AUG-2026'}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Welcome back, {user?.displayName || 'Trainee'}!
            </h2>
            <p className="text-xs md:text-sm text-indigo-200/80 leading-relaxed max-w-xl">
              Your 2-Factor Drip-Feed progression is actively tracked. Complete weekly assessments and maintain pace with the 7-day scheduled lock engine.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-md">
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
                <span className="text-[10px] uppercase font-bold text-indigo-300 block">Enrolled Levels</span>
                <span className="text-lg font-black text-white">{activeLevelCount} / 5</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
                <span className="text-[10px] uppercase font-bold text-indigo-300 block">Passed Quizzes</span>
                <span className="text-lg font-black text-emerald-400">{passedQuizCount} Completed</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
                <span className="text-[10px] uppercase font-bold text-indigo-300 block">Passing Rule</span>
                <span className="text-lg font-black text-amber-300">≥ 60%</span>
              </div>
            </div>
          </div>

          {/* Right: Next Week Live Status Card */}
          <div className="lg:col-span-5">
            {targetWeekAccess.lockReason === 'TIME_LOCKED' ? (
              <LiveCountdown
                days={targetWeekAccess.countdown.days}
                hours={targetWeekAccess.countdown.hours}
                minutes={targetWeekAccess.countdown.minutes}
                seconds={targetWeekAccess.countdown.seconds}
                targetUnlockTime={targetWeekAccess.targetUnlockTime}
                weekTitle={`Week ${targetWeekAccess.week}: Next Drip Module`}
              />
            ) : (
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/15 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Ready to Learn
                  </span>
                  <h4 className="text-base font-bold text-white mt-0.5">
                    Week 1: High-Performance Python & Vectorization
                  </h4>
                  <p className="text-xs text-indigo-200 mt-1">
                    Begin the foundation video lessons and prepare for the Week 1 Assessment.
                  </p>
                </div>
                <button
                  onClick={() => setSelectedWeek(1)}
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>Open Week 1 Learning Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Weekly Modules Curriculum Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Curriculum Roadmap & Drip Feed Engine
            </h3>
            <p className="text-xs text-slate-500">
              Each week requires passing the previous week&apos;s quiz (≥60%) and the 7-day cohort timeline gate.
            </p>
          </div>

          <button
            onClick={() => handleOpenCheckout(2)}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold border border-indigo-200 transition-colors self-start sm:self-auto"
          >
            <CreditCard className="w-4 h-4 text-indigo-600" />
            <span>Upgrade to Higher Level</span>
          </button>
        </div>

        {/* 12 Weekly Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => {
            const lvl = levels.find(l => l.level === mod.level);
            return (
              <WeekCard
                key={mod.week}
                module={mod}
                level={lvl}
                onSelectWeek={(w) => setSelectedWeek(w)}
                onOpenCheckout={handleOpenCheckout}
              />
            );
          })}
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          initialLevel={checkoutLevel || 2}
        />
      )}
    </div>
  );
}

export default function TraineeDashboardPage() {
  return (
    <DashboardLayout>
      <TraineeDashboardContent />
    </DashboardLayout>
  );
}
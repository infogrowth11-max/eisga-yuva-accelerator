'use client';

import React from 'react';
import { CurriculumModule, CurriculumLevel } from '@/types';
import { useWeekAccess } from '@/hooks/useWeekAccess';
import { LiveCountdown } from './LiveCountdown';
import {
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  Award,
  PlayCircle,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  CreditCard,
  FileCheck
} from 'lucide-react';

interface WeekCardProps {
  module: CurriculumModule;
  level?: CurriculumLevel;
  onSelectWeek: (week: number) => void;
  onOpenCheckout?: (level: number) => void;
}

export function WeekCard({
  module,
  level,
  onSelectWeek,
  onOpenCheckout
}: WeekCardProps) {
  const access = useWeekAccess(module.week, module.level);

  const isUnlocked = access.isUnlocked;
  const isTimeLocked = access.lockReason === 'TIME_LOCKED';
  const isQuizLocked = access.lockReason === 'QUIZ_INCOMPLETE';
  const isLevelLocked = access.lockReason === 'LEVEL_NOT_PURCHASED';

  return (
    <div className={`rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
      isUnlocked
        ? 'bg-white border-slate-200 shadow-md hover:shadow-xl hover:border-indigo-400'
        : isTimeLocked
        ? 'bg-gradient-to-b from-[#1e1b4b]/95 to-slate-900 border-indigo-500/40 shadow-xl text-white'
        : isQuizLocked
        ? 'bg-white border-amber-200/80 shadow-xs'
        : 'bg-slate-50/80 border-slate-200/80 opacity-90'
    }`}>
      {/* Top Banner & Week Indicator */}
      <div className="p-6">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-black px-2.5 py-1 rounded-xl ${
              isUnlocked ? 'bg-indigo-100 text-indigo-800' :
              isTimeLocked ? 'bg-amber-400 text-slate-950 font-extrabold' :
              isQuizLocked ? 'bg-amber-100 text-amber-800' :
              'bg-slate-200 text-slate-700'
            }`}>
              WEEK {module.week}
            </span>
            <span className={`text-[11px] font-semibold ${isTimeLocked ? 'text-indigo-200' : 'text-slate-500'}`}>
              Level {module.level} • {module.durationHours}h of Content
            </span>
          </div>

          {/* Access Status Pill */}
          {isUnlocked && (
            <span className="flex items-center space-x-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Unlocked & Active</span>
            </span>
          )}

          {isTimeLocked && (
            <span className="flex items-center space-x-1 text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Drip Time-Lock</span>
            </span>
          )}

          {isQuizLocked && (
            <span className="flex items-center space-x-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300">
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>Quiz Gate Pending</span>
            </span>
          )}

          {isLevelLocked && (
            <span className="flex items-center space-x-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-200 text-slate-700 border border-slate-300">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Level Locked</span>
            </span>
          )}
        </div>

        {/* Dynamic Module Title from JSON */}
        <h3 className={`text-base md:text-lg font-bold tracking-tight mb-2 ${
          isTimeLocked ? 'text-white' : 'text-slate-900'
        }`}>
          {module.title}
        </h3>

        <p className={`text-xs line-clamp-2 mb-4 ${
          isTimeLocked ? 'text-indigo-200/90' : 'text-slate-600'
        }`}>
          {module.overview}
        </p>

        {/* Conditional Middle View depending on 2-Factor Drip Feed State */}
        {isTimeLocked ? (
          /* Locked State UX: Time Lock Active with Live Countdown */
          <div className="my-2">
            <LiveCountdown
              days={access.countdown.days}
              hours={access.countdown.hours}
              minutes={access.countdown.minutes}
              seconds={access.countdown.seconds}
              targetUnlockTime={access.targetUnlockTime}
              weekTitle=""
            />
          </div>
        ) : isQuizLocked ? (
          /* Quiz Prerequisite Pending Notice */
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-2 mb-2">
            <div className="flex items-start space-x-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-900">
                  Prerequisite Assessment Incomplete
                </p>
                <p className="text-[11px] text-amber-800 leading-relaxed mt-0.5">
                  To satisfy <strong>Factor 1</strong>, you must score at least <strong>60%</strong> on the <strong className="underline">Week {access.requiredQuizWeek} Quiz</strong>.
                </p>
              </div>
            </div>
            {access.requiredQuizWeek && (
              <button
                onClick={() => onSelectWeek(access.requiredQuizWeek!)}
                className="w-full mt-2 py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Go to Week {access.requiredQuizWeek} Certification Exam</span>
              </button>
            )}
          </div>
        ) : isLevelLocked ? (
          /* Level Locked: Prompt UPI Checkout */
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 space-y-2 mb-2">
            <div className="flex items-start space-x-2">
              <CreditCard className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Level {module.level} Requires Enrollment
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Unlock this tier with manual UPI payment verification (₹{level?.price || 1299}).
                </p>
              </div>
            </div>
            {onOpenCheckout && (
              <button
                onClick={() => onOpenCheckout(module.level)}
                className="w-full mt-2 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enroll in Level {module.level} (₹{level?.price || 1299})</span>
              </button>
            )}
          </div>
        ) : (
          /* Unlocked Outcomes List */
          <div className="space-y-1.5 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Core Technical Outcomes:
            </span>
            {module.outcomes.slice(0, 2).map((outcome, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{outcome}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer Actions */}
      <div className={`p-4 border-t flex items-center justify-between ${
        isTimeLocked ? 'border-indigo-900/60 bg-indigo-950/60' : 'border-slate-100 bg-slate-50/70'
      }`}>
        <div className="flex items-center space-x-3 text-xs text-slate-500">
          <span className="flex items-center space-x-1">
            <PlayCircle className="w-3.5 h-3.5 text-indigo-500" />
            <span>{module.lessons.length} Video Lessons</span>
          </span>
          <span className="flex items-center space-x-1">
            <Award className="w-3.5 h-3.5 text-emerald-500" />
            <span>Pass Grade: 60%</span>
          </span>
        </div>

        {isUnlocked ? (
          <button
            onClick={() => onSelectWeek(module.week)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5 active:scale-95"
          >
            <span>Open Studio</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : isTimeLocked ? (
          <button
            disabled
            className="px-4 py-2 bg-white/10 text-slate-300 rounded-xl text-xs font-bold cursor-not-allowed flex items-center space-x-1"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Locked by Time</span>
          </button>
        ) : (
          <button
            onClick={() => onSelectWeek(module.week)}
            className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
}
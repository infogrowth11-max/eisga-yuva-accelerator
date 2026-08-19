'use client';

import React from 'react';
import { Lock, Clock, Calendar, ShieldAlert, Sparkles } from 'lucide-react';

interface LiveCountdownProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  targetUnlockTime: string | null;
  weekTitle?: string;
  isCompact?: boolean;
}

export function LiveCountdown({
  days,
  hours,
  minutes,
  seconds,
  targetUnlockTime,
  weekTitle,
  isCompact = false
}: LiveCountdownProps) {
  const pad = (n: number) => n.toString().padStart(2, '0');

  const formattedTargetDate = targetUnlockTime
    ? new Date(targetUnlockTime).toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'Upcoming Drip Release';

  if (isCompact) {
    return (
      <div className="flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl text-amber-300">
        <Lock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span className="font-mono text-xs font-bold tracking-wider">
          {pad(days)}d : {pad(hours)}h : {pad(minutes)}m : {pad(seconds)}s
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#1e1b4b] via-slate-900 to-indigo-950 p-6 rounded-3xl border border-indigo-500/30 shadow-2xl text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Padlock Badge */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 p-0.5 shadow-lg shadow-amber-950/50 mb-3 flex items-center justify-center">
          <div className="w-full h-full bg-[#1e1b4b] rounded-[14px] flex items-center justify-center">
            <Lock className="w-6 h-6 text-amber-400 animate-bounce" />
          </div>
        </div>

        <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30 mb-1 flex items-center space-x-1.5">
          <Clock className="w-3 h-3" />
          <span>7-Day Drip-Feed Time Lock Active</span>
        </span>

        {weekTitle && (
          <h4 className="text-base font-bold text-slate-100 mt-2 max-w-md line-clamp-1">
            {weekTitle}
          </h4>
        )}

        <p className="text-xs text-indigo-200/80 mt-1 max-w-sm">
          You have passed the prerequisite quiz! This advanced module unlocks automatically when the 7-day cohort pace timer reaches zero.
        </p>

        {/* Live Countdown Grid */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 my-5 w-full max-w-sm">
          {/* Days */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/15 flex flex-col items-center">
            <span className="font-mono text-2xl sm:text-3xl font-black text-white tracking-tight">
              {pad(days)}
            </span>
            <span className="text-[10px] uppercase font-bold text-indigo-300 mt-0.5">Days</span>
          </div>

          {/* Hours */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/15 flex flex-col items-center">
            <span className="font-mono text-2xl sm:text-3xl font-black text-white tracking-tight">
              {pad(hours)}
            </span>
            <span className="text-[10px] uppercase font-bold text-indigo-300 mt-0.5">Hours</span>
          </div>

          {/* Minutes */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/15 flex flex-col items-center">
            <span className="font-mono text-2xl sm:text-3xl font-black text-white tracking-tight">
              {pad(minutes)}
            </span>
            <span className="text-[10px] uppercase font-bold text-indigo-300 mt-0.5">Mins</span>
          </div>

          {/* Seconds */}
          <div className="bg-emerald-500/20 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-emerald-400/40 flex flex-col items-center ring-2 ring-emerald-400/20">
            <span className="font-mono text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight animate-pulse">
              {pad(seconds)}
            </span>
            <span className="text-[10px] uppercase font-bold text-emerald-300 mt-0.5">Secs</span>
          </div>
        </div>

        {/* Release Timestamp Info */}
        <div className="flex items-center space-x-2 text-xs text-slate-300 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
          <span>Scheduled Unlock: <strong className="text-white font-mono">{formattedTargetDate}</strong></span>
        </div>
      </div>
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  FastForward,
  RotateCcw,
  Clock,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Calendar
} from 'lucide-react';

export function TimeMachineWidget() {
  const { simulatedOffsetMs, effectiveTimeMs, advanceSimulatedDays, resetSimulatedTime } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const daysSimulated = Math.round(simulatedOffsetMs / (24 * 60 * 60 * 1000));
  const effectiveDate = new Date(effectiveTimeMs);

  return (
    <aside aria-label="Drip Feed Simulator" className="fixed bottom-4 right-4 z-40">
      {isOpen ? (
        <div className="bg-[#1e1b4b] text-white p-4 rounded-3xl border border-indigo-500/40 shadow-2xl w-80 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-indigo-900/60 mb-2">
            <div className="flex items-center space-x-2">
              <FastForward className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-slate-100">Drip-Feed Time Machine</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-indigo-200/80 mb-3">
            Advance the simulated system clock by +7 or +14 days to observe the live padlock countdown reach zero and unlock the next week!
          </p>

          <div className="bg-indigo-950/80 p-2.5 rounded-xl border border-indigo-800/60 mb-3">
            <span className="text-[10px] text-slate-400 block font-semibold">Simulated Clock (System Time):</span>
            <span className="font-mono text-xs font-bold text-emerald-400">
              {effectiveDate.toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </span>
            {daysSimulated > 0 && (
              <span className="ml-2 text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded-full font-extrabold">
                +{daysSimulated} days
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => advanceSimulatedDays(7)}
              className="px-2 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex flex-col items-center"
            >
              <span className="text-[10px] font-normal text-indigo-200">Fast Forward</span>
              <span>+7 Days</span>
            </button>
            <button
              onClick={() => advanceSimulatedDays(14)}
              className="px-2 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex flex-col items-center"
            >
              <span className="text-[10px] font-normal text-indigo-200">Fast Forward</span>
              <span>+14 Days</span>
            </button>
            <button
              onClick={resetSimulatedTime}
              className="px-2 py-2 bg-rose-600/30 hover:bg-rose-600 text-rose-200 hover:text-white rounded-xl text-xs font-bold border border-rose-500/30 transition-all flex flex-col items-center justify-center"
            >
              <RotateCcw className="w-3.5 h-3.5 mb-0.5" />
              <span>Real Time</span>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 bg-[#1e1b4b] hover:bg-indigo-900 text-white px-3.5 py-2.5 rounded-full shadow-2xl border border-indigo-500/50 text-xs font-bold transition-transform hover:scale-105 active:scale-95 group"
        >
          <Clock className="w-4 h-4 text-emerald-400 group-hover:rotate-45 transition-transform" />
          <span>Drip Feed Time Machine</span>
          {daysSimulated > 0 && (
            <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] px-1.5 rounded-full">
              +{daysSimulated}d
            </span>
          )}
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        </button>
      )}
    </aside>
  );
}
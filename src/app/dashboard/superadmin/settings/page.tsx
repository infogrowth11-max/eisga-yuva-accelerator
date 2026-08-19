'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Settings, Shield, Clock, Award, CheckCircle2, RotateCcw } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function SuperAdminSettingsPage() {
  const { advanceSimulatedDays, resetSimulatedTime, simulatedOffsetMs } = useAuth();
  const daysSimulated = Math.round(simulatedOffsetMs / (24 * 60 * 60 * 1000));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center space-x-2">
            <span className="bg-purple-50 text-purple-700 font-bold text-xs px-2.5 py-1 rounded-md border border-purple-200 uppercase tracking-wider">
              Engine Parameters
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-2">
            Two-Factor Drip Feed Engine Configuration
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Control the global mathematical gating factors governing curriculum pacing and certification thresholds.
          </p>
        </div>

        {/* Engine Parameters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Factor 2 Pacing Multiplier</h3>
                <p className="text-xs text-slate-500">Days per sequential week release</p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Formula Rule:</span>
                <code className="font-mono text-indigo-700 font-bold">T_enroll + (X - 1) * 7 days</code>
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Default Pacing:</span>
                <span className="font-bold text-slate-900">7 Calendar Days</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Factor 1 Quiz Threshold</h3>
                <p className="text-xs text-slate-500">Minimum passing grade required on Week X-1</p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Minimum Passing Percentage:</span>
                <span className="font-bold text-emerald-700">≥ 60% Passing Score</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Evaluation Engine:</span>
                <span className="font-bold text-slate-900">Automatic Real-Time Grading</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dev Time Machine Scrubber Box */}
        <div className="bg-gradient-to-r from-[#1e1b4b] to-slate-900 text-white p-6 rounded-3xl border border-indigo-500/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold">Live Simulation Time Override</h3>
                <p className="text-xs text-indigo-200">Current simulation offset: <strong>+{daysSimulated} days</strong></p>
              </div>
            </div>
            <button
              onClick={resetSimulatedTime}
              className="px-4 py-2 bg-rose-600/30 hover:bg-rose-600 border border-rose-500/30 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Real Time</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <button
              onClick={() => advanceSimulatedDays(7)}
              className="py-3 px-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-xs font-bold transition-all flex items-center justify-center space-x-2"
            >
              <span>+ 7 Days (Unlock Week 2)</span>
            </button>
            <button
              onClick={() => advanceSimulatedDays(14)}
              className="py-3 px-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-xs font-bold transition-all flex items-center justify-center space-x-2"
            >
              <span>+ 14 Days (Unlock Week 3)</span>
            </button>
            <button
              onClick={() => advanceSimulatedDays(28)}
              className="py-3 px-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-xs font-bold transition-all flex items-center justify-center space-x-2"
            >
              <span>+ 28 Days (Unlock Week 5)</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
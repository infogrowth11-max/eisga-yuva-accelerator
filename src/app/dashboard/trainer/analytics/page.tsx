'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useCurriculum } from '@/context/CurriculumContext';
import { useAuth } from '@/context/AuthContext';
import { BarChart3, Award, TrendingUp, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';

export default function TrainerAnalyticsPage() {
  const { modules } = useCurriculum();
  const { users } = useAuth();

  const trainees = users.filter(u => u.role === 'Trainee');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-50 text-blue-700 font-bold text-xs px-2.5 py-1 rounded-md border border-blue-200 uppercase tracking-wider">
              Cohort Performance Matrix
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-2">
            Assessment Analytics & 2-Factor Drip Retention
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Real-time analytics on weekly assessment pass rates, time-to-unlock intervals, and knowledge retention benchmarks.
          </p>
        </div>

        {/* Weekly Pass Rate Breakdown */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Weekly Assessment Pass Curve (Threshold: ≥60%)
          </h3>

          <div className="space-y-3">
            {modules.map((m) => {
              const passedForThisWeek = trainees.filter(t => t.passed_quizzes?.some(q => q.weekId === m.week)).length;
              const rate = trainees.length > 0 ? Math.round((passedForThisWeek / trainees.length) * 100) : 100;

              return (
                <div key={m.week} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">
                      Week {m.week}: {m.title.split(': ')[1] || m.title}
                    </span>
                    <span className="font-mono font-bold text-emerald-600">
                      {passedForThisWeek}/{trainees.length} Passed ({rate}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(rate, 8)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
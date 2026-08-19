'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Users, Award, Search, CheckCircle2, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function TrainerTraineesPage() {
  const { users } = useAuth();
  const [search, setSearch] = useState('');

  const trainees = users.filter(u => u.role === 'Trainee' && (
    u.displayName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.cohort.toLowerCase().includes(search.toLowerCase())
  ));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-50 text-blue-700 font-bold text-xs px-2.5 py-1 rounded-md border border-blue-200 uppercase tracking-wider">
                Cohort Student Registry
              </span>
              <span className="text-xs text-slate-500 font-semibold">{trainees.length} Trainees</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-2">
              Trainee Assessment & Progression Directory
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Inspect candidate quiz pass records, enrolled level tiers, and drip-feed pacing compliance.
            </p>
          </div>

          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search trainees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase text-slate-500">
                  <th className="py-3.5 px-4">Candidate</th>
                  <th className="py-3.5 px-4">Cohort</th>
                  <th className="py-3.5 px-4">Active AI Levels</th>
                  <th className="py-3.5 px-4">Passed Quizzes</th>
                  <th className="py-3.5 px-4">Enrolled Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {trainees.map((t) => (
                  <tr key={t.uid} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                          {t.displayName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{t.displayName}</p>
                          <p className="text-[11px] text-slate-500">{t.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-medium text-slate-600">
                      {t.cohort}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      Level {t.activeLevels?.join(', ') || '1'}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-emerald-600">
                      {t.passed_quizzes?.length || 0} Cleared (≥60%)
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                      {new Date(t.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href="/dashboard/trainee/curriculum"
                        className="text-xs font-bold text-indigo-600 hover:underline"
                      >
                        Inspect Progress →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
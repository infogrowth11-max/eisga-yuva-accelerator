'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCurriculum } from '@/context/CurriculumContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  Users,
  Award,
  BookOpen,
  TrendingUp,
  Sparkles,
  BarChart3,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function TrainerDashboard() {
  const { users } = useAuth();
  const { modules } = useCurriculum();

  const trainees = users.filter(u => u.role === 'Trainee');
  const totalPassedQuizzes = trainees.reduce((acc, curr) => acc + (curr.passed_quizzes?.length || 0), 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1e1b4b] via-indigo-950 to-slate-900 p-6 md:p-8 rounded-3xl text-white border border-indigo-900/60 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1.5">
                  <Award className="w-3.5 h-3.5 text-blue-400" />
                  <span>Faculty & Cohort Lead Suite</span>
                </span>
                <span className="text-xs text-indigo-300 font-mono">
                  Instructor Analytics
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Trainee Batch Analytics & Assessment Monitor
              </h1>
              <p className="text-xs md:text-sm text-indigo-200/80 max-w-xl leading-relaxed">
                Monitor trainee progression through the 12 weekly modules, assess pass rates on technical certifications (≥60%), and evaluate curriculum mastery.
              </p>
            </div>

            <div className="flex items-center space-x-3 self-start md:self-auto">
              <Link
                href="/dashboard/trainer/trainees"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>View Trainee Roster</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Instructor KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-400 block">Active Candidates</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">{trainees.length}</span>
              <span className="text-[11px] text-emerald-600 font-medium">100% active retention</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-400 block">Total Quizzes Cleared</span>
              <span className="text-2xl font-black text-emerald-600 mt-1 block">{totalPassedQuizzes}</span>
              <span className="text-[11px] text-emerald-700 font-medium">Scored ≥ 60%</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-400 block">Cohort Velocity</span>
              <span className="text-2xl font-black text-indigo-900 mt-1 block">94.2%</span>
              <span className="text-[11px] text-indigo-600 font-medium">On-pace with 7-day drip</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-400 block">Curriculum Breadth</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">{modules.length} Weeks</span>
              <span className="text-[11px] text-slate-500 font-medium">5 Specialized Tiers</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Trainees Performance Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Trainee Assessment Gradebook & Drip Feed Pace
            </h3>
            <Link href="/dashboard/trainer/trainees" className="text-xs font-bold text-indigo-600 hover:underline">
              Full Directory →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase text-slate-500">
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Cohort</th>
                  <th className="py-3 px-4">Active Tiers</th>
                  <th className="py-3 px-4">Passed Quizzes</th>
                  <th className="py-3 px-4">Pace Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {trainees.map((t) => (
                  <tr key={t.uid} className="hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                          {t.displayName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{t.displayName}</p>
                          <p className="text-[11px] text-slate-400">{t.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-600 font-medium">
                      {t.cohort}
                    </td>

                    <td className="py-3 px-4 font-bold text-slate-800">
                      Level {t.activeLevels?.join(', ') || '1'}
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {t.passed_quizzes?.length || 0} Cleared (≥60%)
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>On Schedule</span>
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <Link
                        href="/dashboard/trainee/curriculum"
                        className="text-xs font-semibold text-indigo-600 hover:underline"
                      >
                        Inspect Progress
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
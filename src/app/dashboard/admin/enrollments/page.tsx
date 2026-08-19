'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Users, Calendar, CheckCircle2, Award, Clock, Search, ShieldCheck } from 'lucide-react';

export default function EnrollmentsPage() {
  const { users } = useAuth();
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter(u =>
    u.displayName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-indigo-50 text-indigo-700 font-bold text-xs px-2.5 py-1 rounded-md border border-indigo-100 uppercase tracking-wider">
                Registry Ledger
              </span>
              <span className="text-xs text-slate-500 font-semibold">RBAC & Enrollment Timestamps</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-2">
              Trainee Directory & Timestamp Registry
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Inspect user profile documents, active tiers, injected <code>enrollment_timestamps</code> for Drip-Feed calculation, and passed quiz arrays.
            </p>
          </div>

          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by candidate name, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Directory Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase text-slate-500">
                  <th className="py-3.5 px-4">User Details</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Active Levels</th>
                  <th className="py-3.5 px-4">Level 1 Enrollment Timestamp</th>
                  <th className="py-3.5 px-4">Passed Quizzes</th>
                  <th className="py-3.5 px-4 text-right">Cohort</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => (
                  <tr key={u.uid} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                          {u.displayName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{u.displayName}</p>
                          <p className="text-[11px] text-slate-500">{u.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                        u.role === 'SuperAdmin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        u.role === 'OfficeAdmin' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        u.role === 'Trainer' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {u.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {u.activeLevels && u.activeLevels.length > 0 ? (
                        <div className="flex items-center space-x-1">
                          {u.activeLevels.map((lvl) => (
                            <span key={lvl} className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-[10px] border border-indigo-200 font-bold">
                              L{lvl}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400">None</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                      {u.enrollment_timestamps?.[1] ? (
                        new Date(u.enrollment_timestamps[1]).toLocaleString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      ) : (
                        <span className="text-slate-400 italic">Not set</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-emerald-600">
                      {u.passed_quizzes?.length || 0} Quizzes
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-slate-600 font-semibold">
                      {u.cohort || 'DEFAULT-2026'}
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
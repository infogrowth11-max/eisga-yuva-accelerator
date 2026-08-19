'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCurriculum } from '@/context/CurriculumContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  ShieldCheck,
  Users,
  CreditCard,
  Settings,
  TrendingUp,
  Activity,
  Layers,
  Sparkles,
  Award,
  CheckCircle2
} from 'lucide-react';

export default function SuperAdminDashboard() {
  const { users, transactions } = useAuth();
  const { modules, levels } = useCurriculum();

  const totalGMV = transactions
    .filter(t => t.status === 'approved')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingApprovals = transactions.filter(t => t.status === 'pending').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* SuperAdmin Header */}
        <div className="bg-gradient-to-r from-[#1e1b4b] via-purple-950 to-slate-900 p-6 md:p-8 rounded-3xl text-white border border-purple-900/60 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>Executive Command Suite</span>
                </span>
                <span className="text-xs text-indigo-300 font-mono">
                  SuperAdmin RBAC Tier
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                EISGA YUVA AI Master Platform Controller
              </h1>
              <p className="text-xs md:text-sm text-purple-200/80 max-w-xl leading-relaxed">
                Global platform oversight: Role-Based Access Control (RBAC), UPI Clearinghouse throughput, GMV metrics, and Two-Factor Drip Feed configuration.
              </p>
            </div>

            <div className="flex items-center space-x-3 self-start md:self-auto">
              <Link
                href="/dashboard/superadmin/users"
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>Manage User Roles</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 SuperAdmin KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-400 block">Total Gross GMV</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">₹{totalGMV.toLocaleString('en-IN')}</span>
              <span className="text-[11px] text-emerald-600 font-medium">Cleared via UPI Gateway</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-400 block">Total Platform Users</span>
              <span className="text-2xl font-black text-indigo-900 mt-1 block">{users.length}</span>
              <span className="text-[11px] text-indigo-600 font-medium">4 RBAC Personas</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-400 block">Pending Clearinghouse</span>
              <span className="text-2xl font-black text-amber-600 mt-1 block">{pendingApprovals}</span>
              <span className="text-[11px] text-amber-700 font-medium">Manual UPI reconciliations</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-400 block">System Engine Status</span>
              <span className="text-2xl font-black text-emerald-600 mt-1 block">99.98%</span>
              <span className="text-[11px] text-emerald-700 font-medium">All 12 modules healthy</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/dashboard/superadmin/users"
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-purple-500 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">User Role Management (RBAC)</h3>
            <p className="text-xs text-slate-500 mt-1">
              Assign and modify roles: Trainee, Trainer, OfficeAdmin, and SuperAdmin.
            </p>
          </Link>

          <Link
            href="/dashboard/admin/clearinghouse"
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-amber-500 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Office Admin Clearinghouse</h3>
            <p className="text-xs text-slate-500 mt-1">
              Inspect 12-digit UTR bank receipts and trigger automated level unlocks.
            </p>
          </Link>

          <Link
            href="/dashboard/superadmin/settings"
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-indigo-500 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Settings className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Drip Feed & Engine Settings</h3>
            <p className="text-xs text-slate-500 mt-1">
              Configure progression rules, passing percentage thresholds, and pace days.
            </p>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
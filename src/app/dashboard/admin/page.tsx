'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ClearinghouseTable } from '@/components/admin/ClearinghouseTable';
import {
  CreditCard,
  CheckCircle2,
  Users,
  TrendingUp,
  ShieldCheck,
  Clock,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Receipt
} from 'lucide-react';

export default function OfficeAdminDashboard() {
  const { transactions, users } = useAuth();

  const pendingTxns = transactions.filter(t => t.status === 'pending');
  const approvedTxns = transactions.filter(t => t.status === 'approved');
  const totalGrossRevenue = approvedTxns.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-[#1e1b4b] via-indigo-950 to-slate-900 p-6 md:p-8 rounded-3xl text-white border border-indigo-900/60 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Office Admin Clearinghouse Hub</span>
                </span>
                <span className="text-xs text-indigo-300 font-mono">
                  Financial Operations
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                UPI Verification & Student Clearinghouse
              </h1>
              <p className="text-xs md:text-sm text-indigo-200/80 max-w-xl leading-relaxed">
                Verify 12-digit UTR bank receipts submitted by trainees, inspect screenshots in high-resolution, and approve level activations with precise enrollment timestamp injection.
              </p>
            </div>

            <div className="flex items-center space-x-3 self-start md:self-auto">
              <Link
                href="/dashboard/admin/clearinghouse"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Open Clearinghouse ({pendingTxns.length} Pending)</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Financial KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-400 block">Pending Clearing</span>
              <span className="text-2xl font-black text-amber-600 mt-1 block">{pendingTxns.length}</span>
              <span className="text-[11px] text-amber-700 font-medium">Requires UTR verification</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-400 block">Gross Revenue Cleared</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">₹{totalGrossRevenue.toLocaleString('en-IN')}</span>
              <span className="text-[11px] text-emerald-600 font-medium">{approvedTxns.length} transactions cleared</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-400 block">Enrolled Candidates</span>
              <span className="text-2xl font-black text-indigo-900 mt-1 block">{users.length}</span>
              <span className="text-[11px] text-indigo-600 font-medium">Across 5 AI Tiers</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-400 block">Clearing SLA</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">&lt; 15 mins</span>
              <span className="text-[11px] text-slate-500 font-medium">Manual NPCI audit loop</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Receipt className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Real-time Clearinghouse Table Component */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Live Manual UPI Verification Clearinghouse
            </h3>
            <span className="text-xs text-slate-500">
              Click any transaction row to inspect receipt screenshot & UTR
            </span>
          </div>

          <ClearinghouseTable />
        </div>
      </div>
    </DashboardLayout>
  );
}
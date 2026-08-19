'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ClearinghouseTable } from '@/components/admin/ClearinghouseTable';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ClearinghouseDedicatedPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-amber-50 text-amber-700 font-bold text-xs px-2.5 py-1 rounded-md border border-amber-200 uppercase tracking-wider">
                Clearinghouse Portal
              </span>
              <span className="text-xs text-slate-500 font-semibold">12-Digit UTR Bank Reconciler</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-2">
              UPI Manual Verification & Clearinghouse
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Inspect uploaded payment receipt screenshots, verify 12-digit UTR numbers against your ICICI bank statement, and approve or reject submissions.
            </p>
          </div>
        </div>

        <ClearinghouseTable />
      </div>
    </DashboardLayout>
  );
}
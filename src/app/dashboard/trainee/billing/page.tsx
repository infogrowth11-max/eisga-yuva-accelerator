'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCurriculum } from '@/context/CurriculumContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CheckoutModal } from '@/components/payment/CheckoutModal';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Receipt,
  FileText,
  AlertCircle
} from 'lucide-react';

export default function BillingPage() {
  const { user, transactions } = useAuth();
  const { levels } = useCurriculum();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCheckoutLevel, setSelectedCheckoutLevel] = useState<number>(2);

  // Filter transactions submitted by this user
  const userTransactions = transactions.filter(
    t => t.userId === user?.uid || t.userEmail === user?.email
  );

  const handleOpenCheckout = (levelNumber: number) => {
    setSelectedCheckoutLevel(levelNumber);
    setIsCheckoutOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-indigo-50 text-indigo-700 font-bold text-xs px-2.5 py-1 rounded-md border border-indigo-100 uppercase tracking-wider">
                Financial Engine
              </span>
              <span className="text-xs text-slate-500 font-semibold">Tiered Acceleration Levels</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-2">
              Tier Upgrades & UPI Clearing History
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Enroll in advanced AI tiers through our manual UPI gateway. Once the Office Admin clears your 12-digit UTR, the level is activated instantly.
            </p>
          </div>

          <button
            onClick={() => handleOpenCheckout(2)}
            className="px-5 py-2.5 bg-[#1e1b4b] hover:bg-indigo-900 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-2 self-start md:self-auto"
          >
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span>Make New UPI Payment</span>
          </button>
        </div>

        {/* 5 Tiered Pricing Cards */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Available Acceleration Levels (1 to 5)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { level: 1, name: 'Level 1: AI & Python', price: 999, original: 2999, weeks: 'Weeks 1-2', badge: 'Foundations' },
              { level: 2, name: 'Level 2: Vision & PyTorch', price: 1299, original: 3499, weeks: 'Weeks 3-4', badge: 'Deep Vision' },
              { level: 3, name: 'Level 3: NLP & Attention', price: 1499, original: 3999, weeks: 'Weeks 5-6', badge: 'Transformers' },
              { level: 4, name: 'Level 4: GenAI & RAG', price: 1699, original: 4499, weeks: 'Weeks 7-9', badge: 'Agents & RAG' },
              { level: 5, name: 'Level 5: Enterprise Capstone', price: 1999, original: 4999, weeks: 'Weeks 10-12', badge: 'vLLM Serving' },
            ].map((tier) => {
              const isEnrolled = user?.activeLevels?.includes(tier.level);
              return (
                <div
                  key={tier.level}
                  className={`p-5 rounded-3xl border flex flex-col justify-between transition-all ${
                    isEnrolled
                      ? 'bg-emerald-50/50 border-emerald-300 ring-2 ring-emerald-500/20'
                      : 'bg-white border-slate-200 shadow-xs hover:border-indigo-400 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                        {tier.weeks}
                      </span>
                      {isEnrolled ? (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                          Active
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400">
                          Available
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-black text-slate-900 mt-1">{tier.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-1">{tier.badge}</p>

                    <div className="mt-4 mb-4">
                      <div className="flex items-baseline space-x-1.5">
                        <span className="text-2xl font-black text-slate-900">₹{tier.price}</span>
                        <span className="text-xs text-slate-400 line-through">₹{tier.original}</span>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-semibold">One-time enrollment</span>
                    </div>
                  </div>

                  {isEnrolled ? (
                    <button
                      disabled
                      className="w-full py-2 bg-emerald-600/20 text-emerald-800 text-xs font-bold rounded-xl flex items-center justify-center space-x-1 cursor-default"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Enrolled & Active</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOpenCheckout(tier.level)}
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1"
                    >
                      <span>Enroll via UPI</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Trainee Payment History & UTR Clearing Ledger */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              My UPI Payment Verification Ledger
            </h3>
            <span className="text-xs text-slate-400">
              Real-time synchronization with Office Admin Clearinghouse
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase text-slate-500">
                  <th className="py-3 px-4">Level</th>
                  <th className="py-3 px-4">12-Digit UTR</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Submitted At</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Audit Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {userTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      No payment submissions recorded yet. Click &quot;Make New UPI Payment&quot; above.
                    </td>
                  </tr>
                ) : (
                  userTransactions.map((txn) => (
                    <tr key={txn.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-800">{txn.levelName}</td>
                      <td className="py-3 px-4 font-mono font-bold text-indigo-900">{txn.utrNumber}</td>
                      <td className="py-3 px-4 font-bold text-emerald-600">₹{txn.amount}</td>
                      <td className="py-3 px-4 text-slate-500 font-mono">
                        {new Date(txn.createdAt).toLocaleString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                          txn.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' :
                          txn.status === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-300' :
                          'bg-amber-50 text-amber-700 border-amber-300 animate-pulse'
                        }`}>
                          {txn.status === 'pending' ? 'Pending Admin Audit' : txn.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-slate-500">
                        {txn.status === 'approved' ? (
                          <span className="text-emerald-700 font-medium">Level active & timestamped</span>
                        ) : txn.status === 'rejected' ? (
                          <span className="text-rose-600 font-medium">{txn.rejectionReason || 'Rejected'}</span>
                        ) : (
                          <span className="text-slate-400 italic">Awaiting Office Admin Clearing</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          initialLevel={selectedCheckoutLevel}
        />
      )}
    </DashboardLayout>
  );
}
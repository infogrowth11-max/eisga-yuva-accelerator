'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { PaymentTransaction, TransactionStatus } from '@/types';
import { ReceiptModal } from './ReceiptModal';
import {
  CheckCircle2,
  XCircle,
  Eye,
  Search,
  Filter,
  Check,
  AlertCircle,
  FileText,
  CreditCard,
  User,
  Clock,
  ArrowUpDown,
  Sparkles
} from 'lucide-react';

export function ClearinghouseTable() {
  const { transactions, approveTransaction, rejectTransaction } = useAuth();
  const [filterStatus, setFilterStatus] = useState<TransactionStatus | 'all'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTxn, setSelectedTxn] = useState<PaymentTransaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  const pendingCount = transactions.filter(t => t.status === 'pending').length;
  const approvedCount = transactions.filter(t => t.status === 'approved').length;
  const rejectedCount = transactions.filter(t => t.status === 'rejected').length;

  const filteredTransactions = transactions.filter(txn => {
    const matchesFilter = filterStatus === 'all' ? true : txn.status === filterStatus;
    const matchesSearch =
      txn.utrNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.levelName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleOpenReceipt = (txn: PaymentTransaction) => {
    setSelectedTxn(txn);
    setIsModalOpen(true);
  };

  const handleQuickApprove = async (txn: PaymentTransaction, e: React.MouseEvent) => {
    e.stopPropagation();
    await approveTransaction(txn.id);
    setActionSuccessMsg(`Approved Level ${txn.level} for ${txn.userName}! Enrollment timestamp injected.`);
    setTimeout(() => setActionSuccessMsg(''), 4000);
  };

  const handleQuickReject = async (txn: PaymentTransaction, e: React.MouseEvent) => {
    e.stopPropagation();
    await rejectTransaction(txn.id, '12-digit UTR mismatch with bank clearing gateway.');
    setActionSuccessMsg(`Rejected transaction ${txn.utrNumber}`);
    setTimeout(() => setActionSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-4">
      {/* Toast Notification */}
      {actionSuccessMsg && (
        <div className="p-4 bg-emerald-900 text-emerald-100 rounded-2xl border border-emerald-500/30 flex items-center justify-between shadow-xl animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold">{actionSuccessMsg}</span>
          </div>
          <button onClick={() => setActionSuccessMsg('')} className="text-emerald-300 text-xs hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Top Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              filterStatus === 'pending'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Pending Clearing</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
              filterStatus === 'pending' ? 'bg-slate-950 text-amber-300' : 'bg-slate-300 text-slate-800'
            }`}>
              {pendingCount}
            </span>
          </button>

          <button
            onClick={() => setFilterStatus('approved')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              filterStatus === 'approved'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Approved</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-950/40 text-white font-extrabold">
              {approvedCount}
            </span>
          </button>

          <button
            onClick={() => setFilterStatus('rejected')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              filterStatus === 'rejected'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Rejected</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-950/40 text-white font-extrabold">
              {rejectedCount}
            </span>
          </button>

          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterStatus === 'all'
                ? 'bg-[#1e1b4b] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({transactions.length})
          </button>
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by 12-digit UTR, candidate, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white text-slate-900"
          />
        </div>
      </div>

      {/* Main Clearinghouse Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Trainee Candidate</th>
                <th className="py-3.5 px-4">Enrolling Tier</th>
                <th className="py-3.5 px-4">12-Digit UTR</th>
                <th className="py-3.5 px-4">Receipt Preview</th>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Clearing Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <FileText className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="font-semibold text-sm">No transactions found matching your criteria</p>
                    <p className="text-xs text-slate-400 mt-0.5">Switch filters or submit a new test transaction from the checkout modal.</p>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((txn) => (
                  <tr
                    key={txn.id}
                    onClick={() => handleOpenReceipt(txn)}
                    className="hover:bg-indigo-50/40 transition-colors cursor-pointer group"
                  >
                    {/* Candidate */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                          {txn.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{txn.userName}</p>
                          <p className="text-[11px] text-slate-500">{txn.userEmail}</p>
                        </div>
                      </div>
                    </td>

                    {/* Level */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-800 block">{txn.levelName.split(':')[0]}</span>
                      <span className="text-[11px] text-emerald-600 font-bold">₹{txn.amount}</span>
                    </td>

                    {/* 12-Digit UTR */}
                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-950 tracking-wider">
                      <span className="bg-slate-100 group-hover:bg-white px-2 py-1 rounded-md border border-slate-200">
                        {txn.utrNumber}
                      </span>
                    </td>

                    {/* Receipt Screenshot Thumbnail */}
                    <td className="py-3.5 px-4">
                      {txn.receiptData ? (
                        <div className="flex items-center space-x-2">
                          <img
                            src={txn.receiptData}
                            alt="Receipt"
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200 shadow-xs"
                          />
                          <span className="text-[11px] text-indigo-600 font-semibold group-hover:underline flex items-center space-x-0.5">
                            <Eye className="w-3 h-3" />
                            <span>Inspect</span>
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">No file</span>
                      )}
                    </td>

                    {/* Timestamp */}
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {new Date(txn.createdAt).toLocaleString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full border ${
                        txn.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' :
                        txn.status === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-300' :
                        'bg-amber-50 text-amber-700 border-amber-300 animate-pulse'
                      }`}>
                        {txn.status === 'pending' ? 'Pending Audit' : txn.status.toUpperCase()}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      {txn.status === 'pending' ? (
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={(e) => handleQuickReject(txn, e)}
                            title="Reject Transaction"
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => handleQuickApprove(txn, e)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center space-x-1 active:scale-95"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleOpenReceipt(txn)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                        >
                          View Audit Log
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lightbox / Inspector Modal */}
      {isModalOpen && selectedTxn && (
        <ReceiptModal
          transaction={selectedTxn}
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setSelectedTxn(null); }}
          onApprove={approveTransaction}
          onReject={rejectTransaction}
        />
      )}
    </div>
  );
}
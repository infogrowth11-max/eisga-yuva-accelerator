'use client';

import React, { useState } from 'react';
import { PaymentTransaction } from '@/types';
import {
  X,
  CheckCircle2,
  XCircle,
  ZoomIn,
  ZoomOut,
  RotateCw,
  ExternalLink,
  ShieldCheck,
  Calendar,
  User,
  CreditCard,
  Hash,
  AlertTriangle
} from 'lucide-react';

interface ReceiptModalProps {
  transaction: PaymentTransaction | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (transactionId: string) => Promise<void>;
  onReject: (transactionId: string, reason?: string) => Promise<void>;
}

export function ReceiptModal({
  transaction,
  isOpen,
  onClose,
  onApprove,
  onReject
}: ReceiptModalProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState('12-digit UTR does not match bank clearing record.');

  if (!isOpen || !transaction) return null;

  const handleApprove = async () => {
    try {
      setIsProcessing(true);
      await onApprove(transaction.id);
      onClose();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    try {
      setIsProcessing(true);
      await onReject(transaction.id, rejectReason);
      onClose();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Receipt Verification & Financial Audit
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Transaction ID: {transaction.id} • UTR: <strong className="text-slate-800">{transaction.utrNumber}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split view of Details & Image */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-y-auto">
          {/* Left Details Panel */}
          <div className="md:col-span-5 p-6 border-r border-slate-100 space-y-4 bg-white">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs text-slate-500">Status</span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  transaction.status === 'approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                  transaction.status === 'rejected' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                  'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                }`}>
                  {transaction.status.toUpperCase()}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">Trainee Candidate</span>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-indigo-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">{transaction.userName}</p>
                    <p className="text-[11px] text-slate-500">{transaction.userEmail}</p>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">Level to Unlock</span>
                <p className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{transaction.levelName}</span>
                </p>
              </div>

              <div className="flex justify-between items-center pt-1">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block">Amount</span>
                  <span className="text-lg font-black text-slate-900">₹{transaction.amount}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold text-slate-400 block">Submitted At</span>
                  <span className="text-xs font-mono text-slate-600">
                    {new Date(transaction.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">Reported 12-Digit UTR</span>
                <div className="bg-indigo-950 text-emerald-400 font-mono font-extrabold text-sm p-2 rounded-xl text-center tracking-widest border border-indigo-800">
                  {transaction.utrNumber}
                </div>
              </div>
            </div>

            {/* Reject reason input view */}
            {showRejectReason && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
                <label className="block text-xs font-bold text-rose-800">Rejection Reason</label>
                <textarea
                  rows={2}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-rose-300 focus:outline-none focus:ring-1 focus:ring-rose-500 bg-white"
                />
              </div>
            )}

            {/* Audit Checklist Notice */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1.5">
              <span className="font-bold text-slate-800 flex items-center space-x-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span>Clearinghouse Verification Checklist:</span>
              </span>
              <ul className="list-disc list-inside space-y-0.5 text-slate-500 pl-1">
                <li>Check that UTR on screenshot matches reported UTR.</li>
                <li>Ensure transaction date is recent and amount is exact.</li>
                <li>Verify recipient VPA shows <code>eisga-yuva@icici</code>.</li>
              </ul>
            </div>
          </div>

          {/* Right Image Inspector Panel */}
          <div className="md:col-span-7 p-6 bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden min-h-[400px]">
            {/* Inspector Controls */}
            <div className="absolute top-4 right-4 flex items-center space-x-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-700 z-10">
              <button
                onClick={() => setZoom(z => Math.min(z + 0.25, 3))}
                title="Zoom In"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoom(z => Math.max(z - 0.25, 0.5))}
                title="Zoom Out"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setRotation(r => (r + 90) % 360)}
                title="Rotate"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
              >
                <RotateCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => { setZoom(1); setRotation(0); }}
                title="Reset"
                className="text-[11px] px-2 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg font-semibold"
              >
                Reset
              </button>
            </div>

            {/* Receipt Image Display with Interactive Zoom and Rotation */}
            <div className="w-full h-full flex items-center justify-center overflow-auto p-4 max-h-[500px]">
              {transaction.receiptData ? (
                <img
                  src={transaction.receiptData}
                  alt="Uploaded Receipt"
                  className="max-h-[460px] max-w-full rounded-xl shadow-2xl object-contain transition-transform duration-200"
                  style={{
                    transform: `scale(${zoom}) rotate(${rotation}deg)`
                  }}
                />
              ) : (
                <div className="text-center text-slate-400 text-xs">
                  No receipt image attached.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer with Direct Actions */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="text-xs text-slate-500">
            {transaction.status === 'pending' ? (
              <span className="text-amber-600 font-semibold">⚠️ Awaiting Office Admin verification decision</span>
            ) : (
              <span>Reviewed by {transaction.reviewedBy || 'Admin'} on {new Date(transaction.reviewedAt || transaction.createdAt).toLocaleDateString()}</span>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {transaction.status === 'pending' && (
              <>
                {showRejectReason ? (
                  <button
                    onClick={handleReject}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow transition-colors flex items-center space-x-1.5"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Confirm Rejection</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setShowRejectReason(true)}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                )}

                <button
                  onClick={handleApprove}
                  disabled={isProcessing}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-700/20 transition-all flex items-center space-x-1.5 active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve & Unlock Level {transaction.level}</span>
                </button>
              </>
            )}

            {transaction.status !== 'pending' && (
              <button
                onClick={onClose}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
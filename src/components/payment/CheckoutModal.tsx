'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCurriculum } from '@/context/CurriculumContext';
import { UpiQrCode } from './UpiQrCode';
import {
  X,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Loader2,
  FileCheck,
  Check
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLevel?: number;
}

export function CheckoutModal({ isOpen, onClose, initialLevel = 2 }: CheckoutModalProps) {
  const { user, submitUpiTransaction } = useAuth();
  const { levels } = useCurriculum();

  const [selectedLevel, setSelectedLevel] = useState<number>(initialLevel);
  const [utrNumber, setUtrNumber] = useState<string>('');
  const [receiptFileName, setReceiptFileName] = useState<string>('');
  const [receiptData, setReceiptData] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const currentLevelObj = levels.find(l => l.level === selectedLevel) || {
    level: selectedLevel,
    name: `Level ${selectedLevel}: Specialized AI Engineering`,
    price: selectedLevel === 1 ? 999 : selectedLevel === 2 ? 1299 : selectedLevel === 3 ? 1499 : selectedLevel === 4 ? 1699 : 1999,
    originalPrice: 3999,
    tagline: 'Enterprise-grade curriculum with live drip feed engine'
  };

  const isLevelAlreadyActive = user?.activeLevels?.includes(selectedLevel);

  // File upload handler converting screenshot to data URL
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (PNG, JPEG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Receipt image size exceeds 5MB limit.');
      return;
    }

    setErrorMsg('');
    setReceiptFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setReceiptData(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Strict 12-digit UTR validation
    const cleanUtr = utrNumber.trim();
    if (!/^\d{12}$/.test(cleanUtr)) {
      setErrorMsg('Transaction ID must be exactly 12 numeric digits (e.g. 482910482910).');
      return;
    }

    // Receipt validation
    if (!receiptData) {
      setErrorMsg('Please upload a screenshot of your successful UPI payment receipt.');
      return;
    }

    try {
      setIsSubmitting(true);
      await submitUpiTransaction({
        level: selectedLevel,
        levelName: currentLevelObj.name,
        amount: currentLevelObj.price,
        utrNumber: cleanUtr,
        receiptData,
        receiptFileName: receiptFileName || 'upi_payment_screenshot.png'
      });

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to submit transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* Success Screen */
          <div className="p-10 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Payment Submitted for Clearing!</h2>
            <p className="text-slate-600 max-w-md text-sm leading-relaxed">
              Your 12-digit UTR (<span className="font-mono font-bold text-slate-800">{utrNumber}</span>) and payment screenshot have been submitted to the <strong className="text-indigo-950">Office Admin Clearinghouse</strong>.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left max-w-md w-full text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Tier Selected:</span>
                <span className="font-bold text-slate-800">{currentLevelObj.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="font-bold text-emerald-600">₹{currentLevelObj.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Verification Status:</span>
                <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Pending Admin Approval
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 italic">
              Upon approval, Level {selectedLevel} will automatically activate with a precise enrollment timestamp.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-[#1e1b4b] hover:bg-indigo-900 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        ) : (
          /* Main Checkout Modal Body */
          <div className="p-6 md:p-8">
            <div className="border-b border-slate-100 pb-5 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                EISGA YUVA FOUNDATION (Section 8 Non-Profit)
              </span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-2">
                Level Enrollment & Manual UPI Verification
              </h2>
              <p className="text-slate-500 text-xs mt-1">
                Scan the dynamic UPI QR code, complete payment on your mobile app, and submit your 12-digit UTR + screenshot.
              </p>
            </div>

            {/* Step 1: Select Tiered Level */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Step 1: Select Your Acceleration Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                {[
                  { level: 1, name: 'Level 1: AI & Python', price: 999 },
                  { level: 2, name: 'Level 2: Deep Vision', price: 1299 },
                  { level: 3, name: 'Level 3: NLP & LLMs', price: 1499 },
                  { level: 4, name: 'Level 4: GenAI & RAG', price: 1699 },
                  { level: 5, name: 'Level 5: Capstone vLLM', price: 1999 },
                ].map((tier) => {
                  const isSelected = selectedLevel === tier.level;
                  const isEnrolled = user?.activeLevels?.includes(tier.level);

                  return (
                    <button
                      key={tier.level}
                      type="button"
                      onClick={() => { setSelectedLevel(tier.level); setErrorMsg(''); }}
                      className={`p-3 rounded-2xl border text-left transition-all relative ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/70 shadow-md ring-2 ring-indigo-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {isEnrolled && (
                        <span className="absolute -top-2 -right-1 bg-emerald-500 text-slate-950 font-extrabold text-[9px] px-1.5 py-0.5 rounded-full shadow">
                          Active
                        </span>
                      )}
                      <p className="text-xs font-bold text-slate-900 line-clamp-1">{tier.name.split(':')[0]}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{tier.name.split(':')[1]}</p>
                      <p className="text-sm font-extrabold text-indigo-900 mt-2">₹{tier.price}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {isLevelAlreadyActive && (
              <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-2 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>You already have <strong>Level {selectedLevel}</strong> active. You can still submit a re-verification if required.</span>
              </div>
            )}

            {/* Grid Layout: QR Code (Left) and Submission Form (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Left: Dynamic UPI QR Code */}
              <div className="md:col-span-5">
                <UpiQrCode
                  amount={currentLevelObj.price}
                  levelName={currentLevelObj.name}
                />
              </div>

              {/* Right: Manual Verification Form */}
              <div className="md:col-span-7 space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Step 2: 12-Digit Transaction ID (UTR) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-800">
                        12-Digit UPI Transaction ID / UTR Number <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[11px] font-mono text-slate-400">
                        {utrNumber.length} / 12 digits
                      </span>
                    </div>
                    <input
                      type="text"
                      maxLength={12}
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 482910482910"
                      className="w-full font-mono text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-slate-900 tracking-wider bg-slate-50/50"
                      required
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Found in Google Pay / PhonePe transaction details as &apos;UPI Ref ID&apos; or &apos;UTR&apos;.
                    </p>
                  </div>

                  {/* Step 3: Payment Screenshot Upload */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Upload Payment Screenshot Receipt <span className="text-rose-500">*</span>
                    </label>

                    {receiptData ? (
                      <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between">
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <img
                            src={receiptData}
                            alt="Receipt Preview"
                            className="w-12 h-12 rounded-lg object-cover border border-indigo-300 bg-white"
                          />
                          <div className="overflow-hidden">
                            <p className="text-xs font-bold text-slate-900 truncate">{receiptFileName}</p>
                            <p className="text-[11px] text-emerald-600 font-semibold flex items-center space-x-1">
                              <Check className="w-3 h-3" />
                              <span>Ready for verification</span>
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => { setReceiptData(''); setReceiptFileName(''); }}
                          className="text-xs font-semibold text-rose-600 hover:text-rose-700 px-2 py-1"
                        >
                          Change
                        </button>
                      </div>
                    ) : (
                      <label className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-indigo-50/30 group">
                        <UploadCloud className="w-7 h-7 text-indigo-500 group-hover:scale-110 transition-transform mb-1.5" />
                        <span className="text-xs font-bold text-slate-700">Click to upload payment receipt screenshot</span>
                        <span className="text-[10px] text-slate-400 mt-0.5">Supports PNG, JPG, JPEG up to 5MB</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {/* Error Notification */}
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || utrNumber.length !== 12 || !receiptData}
                    className="w-full py-3 px-4 bg-gradient-to-r from-indigo-700 via-indigo-800 to-[#1e1b4b] hover:from-indigo-800 hover:to-indigo-950 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-950/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 active:scale-98"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                        <span>Submitting to Clearinghouse...</span>
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="w-4 h-4 text-emerald-400" />
                        <span>Submit for Admin Clearing (₹{currentLevelObj.price})</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
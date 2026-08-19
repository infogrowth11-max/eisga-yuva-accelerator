'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Bell,
  Sparkles,
  FastForward,
  RotateCcw,
  CreditCard,
  Shield,
  Layers,
  Clock,
  Calendar
} from 'lucide-react';
import { CheckoutModal } from '@/components/payment/CheckoutModal';

export function AppHeader() {
  const { user, role, effectiveTimeMs, simulatedOffsetMs, advanceSimulatedDays, resetSimulatedTime } = useAuth();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showTimeMenu, setShowTimeMenu] = useState(false);

  const formattedDate = new Date(effectiveTimeMs).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const simulatedDays = Math.round(simulatedOffsetMs / (24 * 60 * 60 * 1000));

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        {/* Left Side: System Title & Dynamic Breadcrumb */}
        <div className="flex items-center space-x-4">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-sm font-bold text-slate-900 tracking-tight">
                EISGA YUVA FOUNDATION
              </h1>
              <span className="text-[11px] font-semibold text-slate-400">/</span>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                {role === 'Trainee' ? 'Trainee Learning Suite' :
                 role === 'Trainer' ? 'Instructor Operations' :
                 role === 'OfficeAdmin' ? 'Financial Clearinghouse' :
                 'Executive Command Center'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Time Machine Simulator, Level Upgrade & Profile */}
        <div className="flex items-center space-x-3">
          {/* Time Machine Simulator Pill */}
          <div className="relative">
            <button
              onClick={() => setShowTimeMenu(!showTimeMenu)}
              className={`flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                simulatedOffsetMs > 0
                  ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 animate-pulse'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
              title="Click to simulate advancing time to test 7-day drip feed lock"
            >
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span className="font-mono text-[11px]">{formattedDate}</span>
              {simulatedDays > 0 && (
                <span className="bg-amber-500 text-white text-[10px] font-extrabold px-1.5 rounded-full">
                  +{simulatedDays}d
                </span>
              )}
            </button>

            {/* Time Machine Dropdown */}
            {showTimeMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                    <FastForward className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Drip-Feed Time Machine</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Dev Tool</span>
                </div>
                <p className="text-[11px] text-slate-500 my-2 leading-relaxed">
                  Fast-forward simulated system time to instantly test the 7-day drip-feed unlock countdowns!
                </p>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <button
                    onClick={() => { advanceSimulatedDays(7); setShowTimeMenu(false); }}
                    className="px-2 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold border border-indigo-200 transition-colors"
                  >
                    + 7 Days (1 Wk)
                  </button>
                  <button
                    onClick={() => { advanceSimulatedDays(14); setShowTimeMenu(false); }}
                    className="px-2 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold border border-indigo-200 transition-colors"
                  >
                    + 14 Days (2 Wks)
                  </button>
                  <button
                    onClick={() => { advanceSimulatedDays(1); setShowTimeMenu(false); }}
                    className="px-2 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-colors"
                  >
                    + 1 Day
                  </button>
                  <button
                    onClick={() => { resetSimulatedTime(); setShowTimeMenu(false); }}
                    className="px-2 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold border border-rose-200 transition-colors flex items-center justify-center space-x-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Real</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Upgrade Level CTA for Trainee */}
          {role === 'Trainee' && (
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-all active:scale-95"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Unlock New Level</span>
            </button>
          )}

          {/* Role Badge */}
          <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
              role === 'SuperAdmin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
              role === 'OfficeAdmin' ? 'bg-amber-50 text-amber-700 border-amber-200' :
              role === 'Trainer' ? 'bg-blue-50 text-blue-700 border-blue-200' :
              'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              {role}
            </span>
          </div>
        </div>
      </header>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      )}
    </>
  );
}
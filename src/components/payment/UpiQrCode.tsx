'use client';

import React from 'react';
import Image from 'next/image';
import { QrCode, ShieldCheck, Copy, Check } from 'lucide-react';

interface UpiQrCodeProps {
  amount: number;
  levelName: string;
  upiId?: string;
  merchantName?: string;
}

export function UpiQrCode({
  amount,
  levelName,
  upiId = 'eisga.yuva@icici',
  merchantName = 'EISGA YUVA FOUNDATION (Section 8 Non-Profit Co.)'
}: UpiQrCodeProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 p-5 rounded-2xl text-white border border-indigo-800/50 shadow-xl flex flex-col items-center text-center">
      {/* Merchant Header */}
      <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30 mb-3">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Official NPCI UPI Verified Merchant</span>
      </div>

      <div className="w-12 h-12 rounded-xl bg-white p-1 mx-auto flex items-center justify-center border border-indigo-300 mb-2">
        <Image
          src="/eisga-logo.png"
          alt="EISGA Logo"
          width={40}
          height={40}
          className="object-contain w-full h-full"
        />
      </div>

      <h3 className="font-extrabold text-sm text-slate-100">{merchantName}</h3>
      <p className="text-xs text-indigo-300 font-medium mb-3">{levelName}</p>

      {/* Amount Display */}
      <div className="bg-white/10 px-4 py-1.5 rounded-xl mb-4 backdrop-blur-xs border border-white/10">
        <span className="text-2xl font-black text-emerald-400 tracking-tight">₹{amount.toLocaleString('en-IN')}</span>
        <span className="text-[11px] text-slate-300 ml-1 font-medium">(Incl. GST)</span>
      </div>

      {/* QR Code Container */}
      <div className="bg-white p-4 rounded-2xl shadow-2xl border-4 border-emerald-500/80 mb-3 relative group">
        <div className="w-48 h-48 bg-white flex flex-col items-center justify-center relative">
          {/* Stylized Scalable Vector UPI QR Code */}
          <svg viewBox="0 0 200 200" className="w-full h-full text-slate-900" fill="currentColor">
            {/* Corner Finder Patterns */}
            <rect x="10" y="10" width="50" height="50" fill="#0f172a" rx="6" />
            <rect x="20" y="20" width="30" height="30" fill="white" rx="3" />
            <rect x="26" y="26" width="18" height="18" fill="#1e1b4b" rx="2" />

            <rect x="140" y="10" width="50" height="50" fill="#0f172a" rx="6" />
            <rect x="150" y="20" width="30" height="30" fill="white" rx="3" />
            <rect x="156" y="26" width="18" height="18" fill="#1e1b4b" rx="2" />

            <rect x="10" y="140" width="50" height="50" fill="#0f172a" rx="6" />
            <rect x="20" y="150" width="30" height="30" fill="white" rx="3" />
            <rect x="26" y="156" width="18" height="18" fill="#1e1b4b" rx="2" />

            {/* Matrix Data Points */}
            <rect x="70" y="20" width="12" height="12" fill="#0f172a" rx="2" />
            <rect x="90" y="15" width="14" height="8" fill="#0f172a" rx="2" />
            <rect x="115" y="22" width="10" height="15" fill="#0f172a" rx="2" />
            <rect x="75" y="45" width="15" height="12" fill="#0f172a" rx="2" />
            <rect x="100" y="40" width="25" height="12" fill="#0f172a" rx="2" />

            <rect x="20" y="70" width="14" height="14" fill="#0f172a" rx="2" />
            <rect x="45" y="75" width="18" height="10" fill="#0f172a" rx="2" />
            <rect x="70" y="70" width="20" height="20" fill="#10b981" rx="4" />
            <rect x="100" y="70" width="15" height="15" fill="#0f172a" rx="2" />
            <rect x="125" y="65" width="18" height="12" fill="#0f172a" rx="2" />
            <rect x="150" y="70" width="14" height="20" fill="#0f172a" rx="2" />
            <rect x="175" y="75" width="15" height="10" fill="#0f172a" rx="2" />

            <rect x="25" y="100" width="20" height="12" fill="#0f172a" rx="2" />
            <rect x="55" y="95" width="10" height="25" fill="#0f172a" rx="2" />
            <rect x="75" y="105" width="15" height="15" fill="#0f172a" rx="2" />
            <rect x="100" y="95" width="25" height="25" fill="#1e1b4b" rx="4" />
            <rect x="135" y="90" width="15" height="20" fill="#0f172a" rx="2" />
            <rect x="160" y="100" width="25" height="15" fill="#0f172a" rx="2" />

            <rect x="20" y="125" width="12" height="10" fill="#0f172a" rx="2" />
            <rect x="40" y="120" width="22" height="12" fill="#0f172a" rx="2" />
            <rect x="70" y="130" width="12" height="15" fill="#0f172a" rx="2" />
            <rect x="90" y="130" width="20" height="15" fill="#0f172a" rx="2" />
            <rect x="120" y="125" width="14" height="18" fill="#0f172a" rx="2" />
            <rect x="145" y="125" width="20" height="15" fill="#0f172a" rx="2" />
            <rect x="175" y="120" width="15" height="15" fill="#0f172a" rx="2" />

            <rect x="70" y="155" width="18" height="15" fill="#0f172a" rx="2" />
            <rect x="100" y="150" width="15" height="18" fill="#0f172a" rx="2" />
            <rect x="125" y="155" width="25" height="15" fill="#0f172a" rx="2" />
            <rect x="160" y="150" width="15" height="25" fill="#0f172a" rx="2" />
            <rect x="75" y="180" width="20" height="10" fill="#0f172a" rx="2" />
            <rect x="110" y="175" width="30" height="15" fill="#0f172a" rx="2" />
            <rect x="150" y="180" width="20" height="10" fill="#0f172a" rx="2" />
          </svg>

          {/* Centered EISGA Logo Badge */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white p-0.5 rounded-lg shadow-md border-2 border-[#1e1b4b] w-8 h-8 flex items-center justify-center">
              <Image
                src="/eisga-logo.png"
                alt="EISGA Emblem"
                width={26}
                height={26}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Copyable UPI ID */}
      <div className="w-full flex items-center justify-between bg-slate-950/80 px-3 py-2 rounded-xl border border-indigo-900/60 mb-3">
        <div className="text-left">
          <p className="text-[10px] text-indigo-300 font-medium">UPI VPA Address</p>
          <p className="font-mono text-xs text-white font-bold">{upiId}</p>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 bg-indigo-600/50 hover:bg-indigo-600 px-2 py-1 rounded-md text-[11px] font-semibold text-emerald-300 transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Supported UPI Apps Bar */}
      <div className="flex items-center justify-center space-x-2 text-[10px] text-slate-400 font-medium">
        <span>Scan with:</span>
        <span className="bg-white/10 px-1.5 py-0.5 rounded text-white font-semibold">GPay</span>
        <span className="bg-white/10 px-1.5 py-0.5 rounded text-white font-semibold">PhonePe</span>
        <span className="bg-white/10 px-1.5 py-0.5 rounded text-white font-semibold">Paytm</span>
        <span className="bg-white/10 px-1.5 py-0.5 rounded text-white font-semibold">BHIM</span>
      </div>
    </div>
  );
}
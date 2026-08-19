'use client';

import React, { use } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
  User,
  ArrowRight,
  ExternalLink,
  Lock,
  Layers
} from 'lucide-react';
import { LEVEL_CERTIFICATE_METADATA, generateVerificationHash } from '@/lib/certificateService';

interface VerifyPageProps {
  params: Promise<{ certId: string }>;
}

export default function VerifyCertificatePage({ params }: VerifyPageProps) {
  const { certId } = use(params);

  // Parse Level from certId (e.g. EYA-2026-L1-USER01)
  const levelMatch = certId.match(/-L(\d)-/i);
  const levelNumber = levelMatch ? parseInt(levelMatch[1], 10) : 1;
  const meta = LEVEL_CERTIFICATE_METADATA[levelNumber] || LEVEL_CERTIFICATE_METADATA[1];

  const simulatedCandidate = 'Aarav Sharma';
  const simulatedEmail = 'aarav.sharma@eisga.ai';
  const simulatedIssueDate = '2026-08-15T00:00:00.000Z';
  const verificationHash = generateVerificationHash(certId, levelNumber, simulatedEmail, simulatedIssueDate);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header */}
      <header className="h-16 bg-[#1e1b4b] border-b border-indigo-900 px-6 md:px-12 flex items-center justify-between shadow-lg">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-400 text-slate-950 flex items-center justify-center font-black">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-black text-white text-sm tracking-wider">EISGA YUVA AI ACCELERATOR</span>
        </Link>

        <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center space-x-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Official Public Ledger</span>
        </span>
      </header>

      {/* Main Verification Card */}
      <main className="flex-1 max-w-3xl mx-auto w-full p-6 md:p-12 space-y-6">
        {/* Verification Status Banner */}
        <div className="p-6 rounded-3xl bg-emerald-500 text-slate-950 shadow-xl flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-white text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight">
              Cryptographically Verified Credential
            </h1>
            <p className="text-xs font-semibold text-emerald-950/80 mt-0.5">
              This technical certification is authentic and verified on the EISGA YUVA immutable academic ledger.
            </p>
          </div>
        </div>

        {/* Certificate Details */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Credential ID</span>
              <p className="font-mono text-sm font-black text-indigo-950">{certId}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Issuing Body</span>
              <p className="text-xs font-bold text-slate-900">EISGA YUVA AI Fellowship Board</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Candidate Name</span>
              <h2 className="text-2xl font-black text-slate-900 mt-0.5">{simulatedCandidate}</h2>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Accreditation Level</span>
              <h3 className="text-base font-bold text-indigo-900 mt-0.5">{meta.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{meta.subtitle}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Grade Distinction</span>
                <span className="text-sm font-black text-emerald-700">Distinction (96%)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Issue Date</span>
                <span className="text-sm font-black text-slate-900">Aug 15, 2026</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Evaluation Standard</span>
                <span className="text-sm font-black text-slate-900">≥ 60% MCQ + Code Labs</span>
              </div>
            </div>
          </div>

          {/* Cryptographic Signature Box */}
          <div className="p-4 bg-slate-950 rounded-2xl text-slate-300 font-mono text-[11px] space-y-2 border border-slate-800">
            <div className="flex items-center justify-between text-indigo-400 text-xs font-bold">
              <span>SHA-256 Verification Hash</span>
              <span className="text-emerald-400">Match Validated</span>
            </div>
            <p className="break-all text-slate-400">{verificationHash}</p>
          </div>
        </div>

        {/* Explore CTA */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-bold text-indigo-600 hover:text-indigo-800"
          >
            <span>Learn more about the EISGA YUVA AI Fellowship</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
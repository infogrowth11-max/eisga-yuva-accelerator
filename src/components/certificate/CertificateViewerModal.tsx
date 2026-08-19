'use client';

import React from 'react';
import Image from 'next/image';
import { IssuedCertificate } from '@/lib/certificateService';
import { X, Download, Printer, ShieldCheck, Award, Sparkles, CheckCircle2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface CertificateViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: IssuedCertificate;
}

export function CertificateViewerModal({ isOpen, onClose, certificate }: CertificateViewerModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 border border-slate-200">
        {/* Modal Top Control Bar */}
        <div className="bg-[#1e1b4b] px-6 py-4 flex items-center justify-between text-white border-b border-indigo-900/80">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">Verified Credentials Certificate</span>
            <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              {certificate.certificateId}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              href={`/verify/${certificate.certificateId}`}
              target="_blank"
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-xl flex items-center space-x-1 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Verification</span>
            </Link>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl flex items-center space-x-1 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-indigo-300 hover:text-white rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="p-8 md:p-12 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 relative" id="printable-certificate">
          {/* Ornate Outer Border */}
          <div className="border-4 border-[#1e1b4b] rounded-2xl p-6 md:p-8 relative bg-white shadow-inner">
            <div className="border border-amber-600/40 rounded-xl p-6 relative">
              
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-600" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-600" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-600" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-600" />

              {/* Certificate Header */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-white p-1 mx-auto flex items-center justify-center border-2 border-indigo-200 shadow-sm mb-2">
                  <Image
                    src="/eisga-logo.png"
                    alt="EISGA Logo"
                    width={56}
                    height={56}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="inline-flex items-center space-x-2 bg-indigo-50 px-4 py-1 rounded-full border border-indigo-200 text-indigo-900 text-xs font-bold uppercase tracking-widest">
                  <span>EISGA YUVA FOUNDATION</span>
                </div>
                <p className="text-[10px] text-slate-600 font-medium max-w-xl mx-auto">
                  A Section 8 Non-Profit Company Registered with Ministry of Finance, Government of India<br />
                  <span className="font-mono text-slate-700 font-bold">CIN: U88900DL2025NPL445748</span>
                </p>

                <h1 className="text-2xl sm:text-4xl font-serif font-black text-[#1e1b4b] tracking-tight pt-1">
                  Certificate of Technical Mastery
                </h1>
                <p className="text-xs text-slate-500 font-sans tracking-wider uppercase">
                  This certifies that
                </p>
              </div>

              {/* Candidate Name */}
              <div className="text-center my-6">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 border-b-2 border-amber-500/40 pb-2 inline-block px-8">
                  {certificate.candidateName}
                </h2>
                <p className="text-xs text-slate-500 mt-2 font-sans">
                  has successfully demonstrated rigorous mastery and passed all weekly assessments for
                </p>
              </div>

              {/* Level Title & Grade */}
              <div className="text-center space-y-2 my-6">
                <h3 className="text-lg sm:text-xl font-bold text-[#1e1b4b]">
                  {certificate.levelTitle}
                </h3>
                <div className="inline-flex items-center space-x-2">
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
                    Grade: {certificate.grade} ({certificate.averageScorePercentage}% Average Score)
                  </span>
                  <span className="bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-bold px-3 py-1 rounded-full">
                    Level {certificate.level} Fellowship
                  </span>
                </div>
              </div>

              {/* Signatures, QR & Cryptographic Seal Footer */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end pt-6 border-t border-slate-200 mt-8 text-center sm:text-left">
                {/* Left: Instructor Sign */}
                <div className="space-y-1">
                  <div className="h-10 flex items-end justify-center sm:justify-start">
                    <span className="font-serif italic text-lg font-bold text-indigo-950">Priya Venkatesh</span>
                  </div>
                  <div className="border-t border-slate-400 pt-1">
                    <p className="text-xs font-bold text-slate-900">Dr. Priya Venkatesh, Ph.D.</p>
                    <p className="text-[10px] text-slate-500">Chief AI Scientist & Cohort Lead</p>
                  </div>
                </div>

                {/* Center: Official Gold Seal */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-500 p-0.5 shadow-lg flex items-center justify-center">
                    <div className="w-full h-full bg-[#1e1b4b] rounded-full flex flex-col items-center justify-center text-center p-1">
                      <Award className="w-6 h-6 text-amber-400" />
                      <span className="text-[7px] font-black text-amber-300 tracking-tighter uppercase">VERIFIED</span>
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 font-mono">
                    Issued: {new Date(certificate.issueDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                {/* Right: Cryptographic Verification QR & Hash */}
                <div className="space-y-1 text-center sm:text-right">
                  <div className="flex items-center justify-center sm:justify-end space-x-2">
                    <div className="w-12 h-12 bg-white p-1 rounded-lg border border-slate-300 shadow-xs">
                      {/* Stylized QR Code SVG */}
                      <svg viewBox="0 0 24 24" className="w-full h-full text-[#1e1b4b]">
                        <path fill="currentColor" d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v4h-4v-4zm-4 4h4v4h-4v-4zm4-4h4v4h-4v-4z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-mono block truncate">
                      SHA-256: {certificate.verificationHash}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 flex items-center justify-center sm:justify-end space-x-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Tamper-Proof Verification</span>
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
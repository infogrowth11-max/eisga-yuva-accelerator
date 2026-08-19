'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCurriculum } from '@/context/CurriculumContext';
import { CheckoutModal } from '@/components/payment/CheckoutModal';
import {
  Sparkles,
  ShieldCheck,
  Award,
  BookOpen,
  CreditCard,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight,
  Layers,
  Terminal,
  Zap,
  Users,
  Star,
  Check
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { switchPersona } = useAuth();
  const { levels } = useCurriculum();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(1);

  const handleLaunchPersona = (role: 'Trainee' | 'Trainer' | 'OfficeAdmin' | 'SuperAdmin', targetPath: string) => {
    switchPersona(role);
    router.push(targetPath);
  };

  const handleOpenCheckout = (lvl: number) => {
    setSelectedLevel(lvl);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Corporate Navigation */}
      <header className="h-20 bg-[#1e1b4b] border-b border-indigo-900/60 px-6 md:px-12 flex items-center justify-between sticky top-0 z-40 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-emerald-400 p-0.5 shadow-lg shadow-indigo-950/50 flex items-center justify-center">
            <div className="w-full h-full bg-[#1e1b4b] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-black text-base text-white tracking-wider">EISGA</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950">YUVA</span>
            </div>
            <p className="text-[11px] text-indigo-300 font-semibold tracking-tight">AI Accelerator SaaS</p>
          </div>
        </div>

        {/* Nav Links & CTAs */}
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="text-xs font-bold text-indigo-200 hover:text-white transition-colors hidden sm:block"
          >
            Sign In (RBAC)
          </Link>
          <button
            onClick={() => handleLaunchPersona('Trainee', '/dashboard/trainee')}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-1.5 active:scale-95"
          >
            <span>Launch Trainee Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#1e1b4b] via-indigo-950 to-slate-900 text-white pt-16 pb-24 px-6 md:px-12 relative overflow-hidden border-b border-indigo-900/60">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 rounded-full text-emerald-300 text-xs font-bold shadow-inner">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Enterprise-Grade EdTech SaaS Platform Rivaling UpGrad</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            EISGA YUVA <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">AI Accelerator</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-indigo-200/90 max-w-3xl mx-auto leading-relaxed font-medium">
            India&apos;s premier fellowship in Computational AI, Neural Architectures, LangGraph Multi-Agents, and Enterprise vLLM Deployment. Featuring <strong className="text-white">Strict 2-Factor Drip-Feed Gating</strong> and <strong className="text-white">Manual UPI Clearinghouse Loop</strong>.
          </p>

          {/* Persona Launch Matrix (Interactive Quick Switcher) */}
          <div className="pt-6 pb-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-300 block mb-3">
              ⚡ Instant 1-Click Persona Simulator
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
              <button
                onClick={() => handleLaunchPersona('Trainee', '/dashboard/trainee')}
                className="p-3 bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl text-left transition-all group backdrop-blur-xs"
              >
                <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider block">Candidate</span>
                <p className="text-xs font-bold text-white group-hover:text-emerald-300 flex items-center justify-between mt-1">
                  <span>👤 Trainee</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </p>
              </button>

              <button
                onClick={() => handleLaunchPersona('Trainer', '/dashboard/trainer')}
                className="p-3 bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl text-left transition-all group backdrop-blur-xs"
              >
                <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-wider block">Faculty</span>
                <p className="text-xs font-bold text-white group-hover:text-blue-300 flex items-center justify-between mt-1">
                  <span>👨‍🏫 Trainer</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </p>
              </button>

              <button
                onClick={() => handleLaunchPersona('OfficeAdmin', '/dashboard/admin')}
                className="p-3 bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl text-left transition-all group backdrop-blur-xs"
              >
                <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block">Clearinghouse</span>
                <p className="text-xs font-bold text-white group-hover:text-amber-300 flex items-center justify-between mt-1">
                  <span>🏛️ OfficeAdmin</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </p>
              </button>

              <button
                onClick={() => handleLaunchPersona('SuperAdmin', '/dashboard/superadmin')}
                className="p-3 bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl text-left transition-all group backdrop-blur-xs"
              >
                <span className="text-[10px] font-extrabold text-purple-400 uppercase tracking-wider block">Executive</span>
                <p className="text-xs font-bold text-white group-hover:text-purple-300 flex items-center justify-between mt-1">
                  <span>⚡ SuperAdmin</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Tiered Pricing & Enrollment Section */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto w-full space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-100">
            Phase 3: Financial Engine & Tiered Pricing
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Transparent Tiered Acceleration Pricing
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            Pay directly via UPI QR code. Submit your 12-digit UTR and payment screenshot for instant Office Admin verification and level activation.
          </p>
        </div>

        {/* 5 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-stretch">
          {[
            {
              level: 1,
              name: 'Level 1: AI Foundations',
              price: 999,
              originalPrice: 2999,
              weeks: 'Weeks 1-2',
              desc: 'Vectorized NumPy, Matrix Math, and Optimization Gradients.',
              popular: false
            },
            {
              level: 2,
              name: 'Level 2: Neural Vision',
              price: 1299,
              originalPrice: 3499,
              weeks: 'Weeks 3-4',
              desc: 'PyTorch Autograd, ResNets, and Vision Transformers.',
              popular: true
            },
            {
              level: 3,
              name: 'Level 3: NLP & Attention',
              price: 1499,
              originalPrice: 3999,
              weeks: 'Weeks 5-6',
              desc: 'Byte-level BPE, Bahdanau Attention, and RoPE Transformers.',
              popular: false
            },
            {
              level: 4,
              name: 'Level 4: GenAI & RAG',
              price: 1699,
              originalPrice: 4499,
              weeks: 'Weeks 7-9',
              desc: 'LangGraph Multi-Agents, HNSW Vector DBs, and Advanced RAG.',
              popular: false
            },
            {
              level: 5,
              name: 'Level 5: Enterprise Capstone',
              price: 1999,
              originalPrice: 4999,
              weeks: 'Weeks 10-12',
              desc: 'QLoRA Fine-tuning, vLLM PagedAttention, and Capstone Defense.',
              popular: false
            },
          ].map((tier) => (
            <div
              key={tier.level}
              className={`rounded-3xl p-6 flex flex-col justify-between transition-all relative ${
                tier.popular
                  ? 'bg-[#1e1b4b] text-white shadow-2xl border-2 border-emerald-400 ring-4 ring-emerald-400/20'
                  : 'bg-white text-slate-900 border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-300'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
                  Most Popular Tier
                </div>
              )}

              <div>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                  tier.popular ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-50 text-indigo-700'
                }`}>
                  {tier.weeks}
                </span>

                <h3 className="text-base font-black mt-2 leading-snug">{tier.name}</h3>
                <p className={`text-xs mt-1 leading-relaxed ${tier.popular ? 'text-indigo-200' : 'text-slate-500'}`}>
                  {tier.desc}
                </p>

                <div className="my-6 pt-4 border-t border-slate-100/20">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-black">₹{tier.price}</span>
                    <span className={`text-xs line-through ${tier.popular ? 'text-indigo-300' : 'text-slate-400'}`}>
                      ₹{tier.originalPrice}
                    </span>
                  </div>
                  <span className={`text-[10px] font-semibold ${tier.popular ? 'text-emerald-300' : 'text-emerald-600'}`}>
                    One-time Manual UPI Payment
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleOpenCheckout(tier.level)}
                className={`w-full py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-md active:scale-95 ${
                  tier.popular
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black'
                    : 'bg-[#1e1b4b] hover:bg-indigo-900 text-white'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Enroll via UPI</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Two-Factor Drip Feed Engine Feature Highlight */}
      <section className="py-16 bg-white border-y border-slate-200 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
              Phase 4: Two-Factor Drip-Feed Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Rigorous Mathematical Progression Gate
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Trainees cannot speed-run or bypass learning. Access to Week X is strictly forbidden unless BOTH conditions are verified simultaneously:
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 flex items-start space-x-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Factor 1: Assessment Certification Gate</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    User document <code>passed_quizzes</code> array must include Week X-1 with score <strong>≥ 60%</strong>.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start space-x-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Factor 2: 7-Day Drip-Feed System Clock</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Current System Time must satisfy <code>enrollment_timestamp + ((X - 1) * 7 days)</code>. Displays a <strong>live ticking countdown timer</strong> when time-locked!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Drip Lock Mockup Box */}
          <div className="bg-[#1e1b4b] p-6 rounded-3xl text-white border border-indigo-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-indigo-900/60 pb-3">
              <span className="text-xs font-bold text-indigo-300">Live Drip Feed Preview</span>
              <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                Locked State UX
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-950/80 border border-indigo-800/60 text-center space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center mx-auto">
                <Clock className="w-5 h-5 animate-pulse" />
              </div>
              <h4 className="text-sm font-bold text-white">
                Week 2: Advanced Feature Engineering & Mathematical Optimization
              </h4>
              <p className="text-[11px] text-indigo-300">
                Quiz passed (100%). Time-lock unlocks in:
              </p>
              <div className="grid grid-cols-4 gap-2 font-mono font-black text-lg max-w-xs mx-auto">
                <div className="bg-white/10 p-2 rounded-xl border border-white/10">02<span className="text-[9px] block text-indigo-300 font-sans font-bold">DAYS</span></div>
                <div className="bg-white/10 p-2 rounded-xl border border-white/10">18<span className="text-[9px] block text-indigo-300 font-sans font-bold">HOURS</span></div>
                <div className="bg-white/10 p-2 rounded-xl border border-white/10">44<span className="text-[9px] block text-indigo-300 font-sans font-bold">MINS</span></div>
                <div className="bg-emerald-500/20 p-2 rounded-xl border border-emerald-400 text-emerald-400">12<span className="text-[9px] block text-emerald-300 font-sans font-bold">SECS</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e1b4b] text-indigo-300 py-12 px-6 md:px-12 border-t border-indigo-900/60 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="font-extrabold text-white text-sm">EISGA YUVA AI Accelerator</span>
            <span className="text-indigo-400">|</span>
            <span>Enterprise EdTech SaaS</span>
          </div>
          <p className="text-indigo-400">
            © 2026 EISGA YUVA AI. Built with Next.js App Router, Tailwind CSS, Firebase, and NPCI UPI Gateway.
          </p>
        </div>
      </footer>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          initialLevel={selectedLevel}
        />
      )}
    </div>
  );
}
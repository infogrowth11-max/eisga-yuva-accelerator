'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import { Sparkles, ShieldCheck, ArrowRight, User, KeyRound, AlertCircle, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, switchPersona } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleQuickLogin = (role: UserRole, targetRoute: string) => {
    switchPersona(role);
    router.push(targetRoute);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your email.');
      return;
    }
    setIsLoading(true);
    try {
      await login(email);
      router.push('/dashboard/trainee');
    } catch {
      setErrorMsg('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e1b4b] via-indigo-950 to-slate-900 flex items-center justify-center p-6 text-slate-900">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md p-8 space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-400 p-0.5 mx-auto flex items-center justify-center shadow-lg shadow-indigo-950/40">
            <div className="w-full h-full bg-[#1e1b4b] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            EISGA YUVA AI Portal
          </h2>
          <p className="text-xs text-slate-500">
            Role-Based Access Control (RBAC) Authentication
          </p>
        </div>

        {/* 1-Click Persona Simulator Quick Logins */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
          <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-500 block">
            ⚡ Quick 1-Click Persona Sign-In:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickLogin('Trainee', '/dashboard/trainee')}
              className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-bold text-left transition-colors"
            >
              👤 Trainee
            </button>
            <button
              onClick={() => handleQuickLogin('Trainer', '/dashboard/trainer')}
              className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-xl text-xs font-bold text-left transition-colors"
            >
              👨‍🏫 Trainer
            </button>
            <button
              onClick={() => handleQuickLogin('OfficeAdmin', '/dashboard/admin')}
              className="p-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold text-left transition-colors"
            >
              🏛️ Office Admin
            </button>
            <button
              onClick={() => handleQuickLogin('SuperAdmin', '/dashboard/superadmin')}
              className="p-2 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-xl text-xs font-bold text-left transition-colors"
            >
              ⚡ SuperAdmin
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="trainee@eisga.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#1e1b4b] hover:bg-indigo-900 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 active:scale-98"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Sign In to Studio</span>}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          New candidate?{' '}
          <Link href="/register" className="text-indigo-600 font-bold hover:underline">
            Register for Fellowship
          </Link>
        </div>
      </div>
    </div>
  );
}
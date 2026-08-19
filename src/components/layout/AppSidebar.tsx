'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  BookOpen,
  GraduationCap,
  Award,
  CreditCard,
  Users,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Layers,
  Clock,
  Settings,
  ChevronRight,
  LogOut
} from 'lucide-react';

export function AppSidebar() {
  const pathname = usePathname();
  const { user, role, switchPersona, logout } = useAuth();

  // Define navigation items dynamically based on active RBAC role
  const getNavSections = () => {
    switch (role) {
      case 'Trainee':
        return [
          {
            title: 'Learning Hub',
            items: [
              { name: 'My Curriculum', href: '/dashboard/trainee', icon: BookOpen },
              { name: 'Drip Feed Tracker', href: '/dashboard/trainee/curriculum', icon: Clock },
              { name: 'Quiz & Certifications', href: '/dashboard/trainee/quizzes', icon: Award },
            ]
          },
          {
            title: 'Financial & Upgrades',
            items: [
              { name: 'Upgrade Levels', href: '/dashboard/trainee/billing', icon: Layers },
              { name: 'Payment History', href: '/dashboard/trainee/billing?tab=history', icon: CreditCard },
            ]
          }
        ];

      case 'Trainer':
        return [
          {
            title: 'Cohort Management',
            items: [
              { name: 'Trainer Dashboard', href: '/dashboard/trainer', icon: BarChart3 },
              { name: 'Trainee Directory', href: '/dashboard/trainer/trainees', icon: Users },
              { name: 'Assessment Analytics', href: '/dashboard/trainer/analytics', icon: Award },
              { name: 'Curriculum Master', href: '/dashboard/trainee/curriculum', icon: BookOpen },
            ]
          }
        ];

      case 'OfficeAdmin':
        return [
          {
            title: 'Financial Operations',
            items: [
              { name: 'Admin Dashboard', href: '/dashboard/admin', icon: BarChart3 },
              { name: 'UPI Clearinghouse', href: '/dashboard/admin/clearinghouse', icon: CheckCircle2, badge: 'Live' },
              { name: 'Enrollment Records', href: '/dashboard/admin/enrollments', icon: Users },
              { name: 'Course Catalog', href: '/dashboard/trainee/curriculum', icon: BookOpen },
            ]
          }
        ];

      case 'SuperAdmin':
        return [
          {
            title: 'Executive Suite',
            items: [
              { name: 'System Overview', href: '/dashboard/superadmin', icon: ShieldCheck },
              { name: 'Role & User Access', href: '/dashboard/superadmin/users', icon: Users },
              { name: 'UPI Clearinghouse', href: '/dashboard/admin/clearinghouse', icon: CheckCircle2 },
              { name: 'Drip Feed Controller', href: '/dashboard/superadmin/settings', icon: Settings },
            ]
          }
        ];

      default:
        return [];
    }
  };

  const sections = getNavSections();

  return (
    <aside className="w-64 bg-[#1e1b4b] text-white flex flex-col flex-shrink-0 min-h-screen border-r border-indigo-900/50 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-indigo-900/60 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-emerald-400 p-0.5 shadow-lg shadow-indigo-950/50 flex items-center justify-center">
            <div className="w-full h-full bg-[#1e1b4b] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-sm tracking-wider text-white">EISGA</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">YUVA</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-tight">AI Accelerator SaaS</p>
          </div>
        </Link>
      </div>

      {/* Role Switcher Pill (Quick Tester Utility) */}
      <div className="px-4 py-3 bg-indigo-950/80 border-b border-indigo-900/40">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-indigo-300">Active Role (RBAC)</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            role === 'SuperAdmin' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
            role === 'OfficeAdmin' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
            role === 'Trainer' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
            'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
          }`}>
            {role}
          </span>
        </div>
        <select
          value={role}
          onChange={(e) => switchPersona(e.target.value as any)}
          className="w-full bg-slate-900/90 text-xs text-slate-200 border border-indigo-700/50 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-400 cursor-pointer"
        >
          <option value="Trainee">👤 Trainee (Aarav Sharma)</option>
          <option value="Trainer">👨‍🏫 Trainer (Dr. Priya Venkatesh)</option>
          <option value="OfficeAdmin">🏛️ Office Admin (Clearinghouse)</option>
          <option value="SuperAdmin">⚡ Super Admin (Executive)</option>
        </select>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <h3 className="px-3 text-[11px] font-semibold tracking-wider text-indigo-300/80 uppercase">
              {section.title}
            </h3>
            <div className="space-y-1 pt-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/dashboard/trainee' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-950/40 font-semibold'
                        : 'text-indigo-100/80 hover:bg-indigo-900/50 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-emerald-400' : 'text-indigo-400 group-hover:text-emerald-300'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Trainee Level Progress summary in sidebar */}
      {role === 'Trainee' && user && (
        <div className="p-3 mx-3 mb-3 rounded-xl bg-indigo-950/60 border border-indigo-800/40">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-slate-300 font-medium">Active Enrolled Levels</span>
            <span className="text-emerald-400 font-bold">{user.activeLevels?.length || 1} / 5</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${((user.activeLevels?.length || 1) / 5) * 100}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] text-indigo-300">
            <span>Passed Quizzes: {user.passed_quizzes?.length || 0}</span>
            <Link href="/dashboard/trainee/billing" className="text-emerald-400 hover:underline font-semibold">
              + Upgrade
            </Link>
          </div>
        </div>
      )}

      {/* User Footer Profile */}
      <div className="p-3 border-t border-indigo-900/60 bg-indigo-950/90 flex items-center justify-between">
        <div className="flex items-center space-x-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-xs text-white border border-indigo-400/30 overflow-hidden flex-shrink-0">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.displayName} className="w-full h-full object-cover" />
            ) : (
              <span>{user?.displayName?.charAt(0) || 'U'}</span>
            )}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">{user?.displayName || 'User'}</p>
            <p className="text-[10px] text-indigo-300/70 truncate">{user?.email || 'user@eisga.ai'}</p>
          </div>
        </div>
        <button
          onClick={logout}
          title="Sign Out"
          className="p-1.5 rounded-lg text-indigo-300 hover:text-white hover:bg-indigo-900/60 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
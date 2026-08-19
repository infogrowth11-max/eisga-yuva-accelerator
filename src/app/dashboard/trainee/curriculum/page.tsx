'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCurriculum } from '@/context/CurriculumContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { WeekCard } from '@/components/curriculum/WeekCard';
import { WeekContentViewer } from '@/components/curriculum/WeekContentViewer';
import { CheckoutModal } from '@/components/payment/CheckoutModal';
import { BookOpen, Layers, Filter, CheckCircle2 } from 'lucide-react';

export default function CurriculumPage() {
  const { user } = useAuth();
  const { levels, modules, isLoading } = useCurriculum();
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<number | 'all'>('all');
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [checkoutLevel, setCheckoutLevel] = useState<number | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="py-20 text-center text-slate-500">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold">Loading Curriculum Roadmap...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (selectedWeek !== null) {
    const mod = modules.find(m => m.week === selectedWeek);
    if (mod) {
      const lvl = levels.find(l => l.level === mod.level);
      return (
        <DashboardLayout>
          <WeekContentViewer
            module={mod}
            level={lvl}
            onBack={() => setSelectedWeek(null)}
          />
        </DashboardLayout>
      );
    }
  }

  const filteredModules = selectedLevelFilter === 'all'
    ? modules
    : modules.filter(m => m.level === selectedLevelFilter);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-indigo-50 text-indigo-700 font-bold text-xs px-2.5 py-1 rounded-md border border-indigo-100 uppercase tracking-wider">
                Full 12-Week Syllabus
              </span>
              <span className="text-xs text-slate-500 font-semibold">5 Progressive Tiers</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-2">
              Master Bootcamp Curriculum & Drip Roadmap
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Curriculum data is dynamically hydrated from master schema JSON. Progression is guarded by the strict 2-Factor Drip-Feed rule.
            </p>
          </div>

          {/* Level Filter Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 bg-slate-100 p-1.5 rounded-2xl">
            <button
              onClick={() => setSelectedLevelFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedLevelFilter === 'all' ? 'bg-white text-indigo-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Weeks (12)
            </button>
            {levels.map((lvl) => (
              <button
                key={lvl.level}
                onClick={() => setSelectedLevelFilter(lvl.level)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                  selectedLevelFilter === lvl.level ? 'bg-white text-indigo-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>L{lvl.level}</span>
                {user?.activeLevels?.includes(lvl.level) && (
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((mod) => {
            const lvl = levels.find(l => l.level === mod.level);
            return (
              <WeekCard
                key={mod.week}
                module={mod}
                level={lvl}
                onSelectWeek={(w) => setSelectedWeek(w)}
                onOpenCheckout={(l) => { setCheckoutLevel(l); setIsCheckoutOpen(true); }}
              />
            );
          })}
        </div>
      </div>

      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          initialLevel={checkoutLevel || 2}
        />
      )}
    </DashboardLayout>
  );
}
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCurriculum } from '@/context/CurriculumContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CertificateViewerModal } from '@/components/certificate/CertificateViewerModal';
import { checkLevelCompletion, createCertificate, IssuedCertificate } from '@/lib/certificateService';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  BookOpen,
  Clock,
  Printer,
  ShieldCheck,
  ChevronRight,
  Lock
} from 'lucide-react';
import Link from 'next/link';

export default function QuizzesPage() {
  const { user } = useAuth();
  const { modules, levels } = useCurriculum();
  const [selectedCert, setSelectedCert] = useState<IssuedCertificate | null>(null);

  const passedQuizzes = user?.passed_quizzes || [];

  const handleOpenCertificate = (lvlNumber: number, avgScore: number) => {
    if (!user) return;
    const cert = createCertificate(user, lvlNumber, avgScore);
    setSelectedCert(cert);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-50 text-emerald-700 font-bold text-xs px-2.5 py-1 rounded-md border border-emerald-200 uppercase tracking-wider">
                Factor 1 Verification & Credentials Ledger
              </span>
              <span className="text-xs text-slate-500 font-semibold">Passing Threshold: ≥ 60%</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-2">
              Technical Certification Assessments & Credentials
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Passing weekly certification assessments satisfies Condition 1 of the 2-Factor Drip Feed Engine. Complete all weeks in a level to claim your verified digital certificate.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-right">
              <span className="text-[10px] uppercase font-bold text-emerald-600 block">Total Quizzes Cleared</span>
              <span className="text-xl font-black text-emerald-800">{passedQuizzes.length} / 12</span>
            </div>
          </div>
        </div>

        {/* Level Certificates Showcase Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                Official Level Accreditation Certificates
              </h3>
              <p className="text-xs text-slate-500">
                Earned upon clearing all weekly modules in a level with score ≥ 60%.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((lvlNum) => {
              const { isEligible, completedWeeks, totalWeeks, averageScore } = checkLevelCompletion(
                lvlNum,
                passedQuizzes,
                modules
              );

              return (
                <div
                  key={lvlNum}
                  className={`p-6 rounded-3xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                    isEligible
                      ? 'bg-gradient-to-b from-[#1e1b4b] to-slate-900 text-white border-indigo-500 shadow-xl'
                      : 'bg-white text-slate-900 border-slate-200 shadow-xs'
                  }`}
                >
                  {isEligible && (
                    <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 font-black text-[9px] uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                      Verified
                    </div>
                  )}

                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        isEligible ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-100 text-slate-600'
                      }`}>
                        Level {lvlNum} Certification
                      </span>
                      <span className={`text-[10px] ${isEligible ? 'text-indigo-300' : 'text-slate-400'}`}>
                        {completedWeeks}/{totalWeeks} Weeks Cleared
                      </span>
                    </div>

                    <h4 className={`text-base font-black mt-1 leading-snug ${isEligible ? 'text-white' : 'text-slate-900'}`}>
                      {lvlNum === 1 ? 'Foundations of Computational AI' :
                       lvlNum === 2 ? 'Deep Learning & Neural Vision' :
                       lvlNum === 3 ? 'NLP & Transformer Architectures' :
                       lvlNum === 4 ? 'Generative AI & LangGraph Agents' :
                       'Enterprise LLM Deployment Capstone'}
                    </h4>

                    {/* Progress Bar */}
                    <div className="my-4 space-y-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span className={isEligible ? 'text-indigo-200' : 'text-slate-500'}>Level Progress</span>
                        <span className={`font-bold ${isEligible ? 'text-emerald-400' : 'text-slate-700'}`}>
                          {Math.round((completedWeeks / (totalWeeks || 1)) * 100)}%
                        </span>
                      </div>
                      <div className={`w-full h-2 rounded-full overflow-hidden ${isEligible ? 'bg-white/10' : 'bg-slate-100'}`}>
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${(completedWeeks / (totalWeeks || 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {isEligible ? (
                    <button
                      onClick={() => handleOpenCertificate(lvlNum, averageScore)}
                      className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-black shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-1.5 active:scale-95 mt-2"
                    >
                      <Award className="w-4 h-4" />
                      <span>View & Download Certificate</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
                      <span className="flex items-center space-x-1">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Pass all level quizzes</span>
                      </span>
                      <span className="font-semibold text-slate-500">
                        {totalWeeks - completedWeeks} weeks left
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Passed Assessments Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Passed Certification Records (Factor 1 Satisfied)
            </h3>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              {passedQuizzes.length} Quizzes Cleared
            </span>
          </div>

          {passedQuizzes.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <Award className="w-10 h-10 mx-auto text-slate-300" />
              <p className="font-bold text-slate-700 text-sm">No quizzes passed yet</p>
              <p className="text-xs text-slate-400">
                Go to Week 1 learning studio and take the assessment to record your first certification.
              </p>
              <Link
                href="/dashboard/trainee"
                className="inline-block mt-3 px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Go to Week 1 Studio
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {passedQuizzes.map((pq) => {
                const mod = modules.find(m => m.week === pq.weekId);
                return (
                  <div key={pq.weekId} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start space-x-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                            WEEK {pq.weekId}
                          </span>
                          <span className="text-xs font-bold text-slate-800">
                            {mod?.title || `Week ${pq.weekId} Certification`}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Completed on {new Date(pq.passedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 block font-medium">Final Score</span>
                        <span className="text-sm font-black text-emerald-600">
                          {pq.score} / {pq.totalQuestions} ({pq.percentage}%)
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300 flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <CertificateViewerModal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          certificate={selectedCert}
        />
      )}
    </DashboardLayout>
  );
}
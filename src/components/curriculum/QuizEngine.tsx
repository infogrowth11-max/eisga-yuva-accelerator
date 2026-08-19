'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CurriculumQuiz, QuizQuestion } from '@/types';
import { useAuth } from '@/context/AuthContext';
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Check,
  X,
  ChevronRight,
  ShieldCheck,
  PartyPopper
} from 'lucide-react';

interface QuizEngineProps {
  quiz: CurriculumQuiz;
  onQuizCompleted?: (passed: boolean, score: number) => void;
}

export function QuizEngine({ quiz, onQuizCompleted }: QuizEngineProps) {
  const { recordQuizPass, user } = useAuth();

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [passed, setPassed] = useState<boolean>(false);

  const totalQuestions = quiz.questions.length;
  const passingScore = quiz.passingScore || 60;

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const calculatedPercentage = Math.round((correctCount / totalQuestions) * 100);
    const isPass = calculatedPercentage >= passingScore;

    setScore(correctCount);
    setPercentage(calculatedPercentage);
    setPassed(isPass);
    setIsSubmitted(true);

    if (isPass) {
      // Record quiz pass in user profile to fulfill Factor 1 of Two-Factor Drip Feed Engine
      recordQuizPass(quiz.week, correctCount, totalQuestions);

      // Trigger celebratory confetti animation
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log('Confetti triggered');
      }
    }

    if (onQuizCompleted) {
      onQuizCompleted(isPass, correctCount);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
    setPercentage(0);
    setPassed(false);
  };

  const allAnswered = quiz.questions.every(q => selectedAnswers[q.id] !== undefined);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 md:p-8 space-y-6">
      {/* Assessment Header */}
      <div className="border-b border-slate-100 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-50 text-indigo-700 font-bold text-xs px-2.5 py-1 rounded-md border border-indigo-100 uppercase tracking-wider">
              Certification Exam
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Week {quiz.week} Module
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1.5">
            {quiz.title}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Passing Criteria: Score ≥ <strong className="text-indigo-900">{passingScore}%</strong> ({Math.ceil(totalQuestions * (passingScore / 100))}/{totalQuestions} correct) to unlock subsequent progression factors.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-slate-50 px-3.5 py-2 rounded-2xl border border-slate-200 text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Questions</span>
            <span className="text-sm font-black text-slate-800">{totalQuestions} MCQs</span>
          </div>
          <div className="bg-emerald-50 px-3.5 py-2 rounded-2xl border border-emerald-200 text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-600 block">Threshold</span>
            <span className="text-sm font-black text-emerald-700">≥ 60% Pass</span>
          </div>
        </div>
      </div>

      {/* Result Banner if Submitted */}
      {isSubmitted && (
        <div className={`p-6 rounded-3xl border animate-in zoom-in-95 duration-200 ${
          passed
            ? 'bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white border-emerald-500/40 shadow-xl'
            : 'bg-rose-50 border-rose-200 text-rose-950'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center space-x-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                passed ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30' : 'bg-rose-500 text-white'
              }`}>
                {passed ? <PartyPopper className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
              </div>
              <div>
                <h3 className="text-lg font-black">
                  {passed ? '🎉 Congratulations! You Passed Factor 1 Assessment' : 'Assessment Threshold Not Met'}
                </h3>
                <p className={`text-xs mt-0.5 ${passed ? 'text-emerald-300' : 'text-rose-700'}`}>
                  {passed
                    ? `You scored ${score}/${totalQuestions} (${percentage}%). Factor 1 prerequisite is now marked as PASSED in your profile!`
                    : `You scored ${score}/${totalQuestions} (${percentage}%). A minimum score of 60% is required to satisfy the prerequisite.`}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleRetake}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition-colors flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {quiz.questions.map((q, qIndex) => {
          const selectedOption = selectedAnswers[q.id];
          const isCorrect = isSubmitted && selectedOption === q.correctIndex;
          const isWrong = isSubmitted && selectedOption !== undefined && selectedOption !== q.correctIndex;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-2xl border transition-all ${
                isSubmitted
                  ? isCorrect
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : isWrong
                    ? 'bg-rose-50/50 border-rose-200'
                    : 'bg-slate-50 border-slate-200'
                  : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start space-x-3 mb-3">
                <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {qIndex + 1}
                </span>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {q.question}
                </h4>
              </div>

              {/* 4 MCQ Choices */}
              <div className="space-y-2 pl-9">
                {q.options.map((optionText, optIndex) => {
                  const isSelected = selectedOption === optIndex;
                  const isThisCorrect = isSubmitted && optIndex === q.correctIndex;
                  const isThisWrongSelection = isSubmitted && isSelected && !isThisCorrect;

                  return (
                    <label
                      key={optIndex}
                      onClick={() => handleSelectOption(q.id, optIndex)}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs font-medium cursor-pointer transition-all ${
                        isThisCorrect
                          ? 'bg-emerald-100/80 border-emerald-400 text-emerald-950 font-bold shadow-xs'
                          : isThisWrongSelection
                          ? 'bg-rose-100/80 border-rose-400 text-rose-950 line-through'
                          : isSelected
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-950 font-bold ring-1 ring-indigo-600'
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span>{optionText}</span>
                      </div>

                      {isThisCorrect && (
                        <span className="flex items-center space-x-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-200/70 px-2 py-0.5 rounded-md">
                          <Check className="w-3 h-3" />
                          <span>Correct Answer</span>
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>

              {/* Pedagogical Explanation when Submitted */}
              {isSubmitted && (
                <div className="mt-3.5 ml-9 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1">
                  <span className="font-bold text-slate-800 flex items-center space-x-1">
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Technical Architecture Explanation:</span>
                  </span>
                  <p className="text-slate-600 leading-relaxed pl-4">
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Submit Action */}
      {!isSubmitted && (
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {Object.keys(selectedAnswers).length} of {totalQuestions} answered
          </span>
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-700 to-[#1e1b4b] hover:from-indigo-800 hover:to-indigo-950 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-950/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center space-x-2 active:scale-95"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Submit Assessment & Evaluate</span>
          </button>
        </div>
      )}
    </div>
  );
}
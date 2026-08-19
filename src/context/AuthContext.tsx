'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, UserRole, PaymentTransaction, PassedQuiz } from '@/types';
import {
  getStoredUsers,
  saveStoredUsers,
  getStoredTransactions,
  saveStoredTransactions,
  getStoredCurrentUser,
  saveStoredCurrentUser,
  getSimulatedTimeOffset,
  setSimulatedTimeOffset,
  INITIAL_USERS
} from '@/lib/db';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  users: UserProfile[];
  transactions: PaymentTransaction[];
  simulatedOffsetMs: number;
  effectiveTimeMs: number;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  switchPersona: (role: UserRole) => void;
  recordQuizPass: (weekId: number, score: number, totalQuestions: number) => void;
  submitUpiTransaction: (data: {
    level: number;
    levelName: string;
    amount: number;
    utrNumber: string;
    receiptData: string;
    receiptFileName: string;
  }) => Promise<PaymentTransaction>;
  approveTransaction: (transactionId: string) => Promise<void>;
  rejectTransaction: (transactionId: string, reason?: string) => Promise<void>;
  advanceSimulatedDays: (days: number) => void;
  resetSimulatedTime: () => void;
  refreshState: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
  const [simulatedOffsetMs, setSimOffsetMs] = useState<number>(0);
  const [clockTick, setClockTick] = useState<number>(Date.now());

  // Initialize from storage on client mount
  useEffect(() => {
    const loadedUsers = getStoredUsers();
    const loadedTxns = getStoredTransactions();
    const loadedCurrent = getStoredCurrentUser();
    const loadedOffset = getSimulatedTimeOffset();

    setUsers(loadedUsers);
    setTransactions(loadedTxns);
    setCurrentUser(loadedCurrent);
    setSimOffsetMs(loadedOffset);
  }, []);

  // Tick clock every 1 second for live countdown precision
  useEffect(() => {
    const timer = setInterval(() => {
      setClockTick(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const effectiveTimeMs = clockTick + simulatedOffsetMs;

  const refreshState = useCallback(() => {
    const u = getStoredUsers();
    const t = getStoredTransactions();
    const c = getStoredCurrentUser();
    setUsers(u);
    setTransactions(t);
    setCurrentUser(c);
  }, []);

  const login = async (email: string): Promise<boolean> => {
    const allUsers = getStoredUsers();
    const found = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      saveStoredCurrentUser(found);
      return true;
    }
    // Create new trainee if not found
    const newUser: UserProfile = {
      uid: `user-${Date.now()}`,
      email,
      displayName: email.split('@')[0],
      role: 'Trainee',
      activeLevels: [1],
      enrollment_timestamps: {
        1: new Date().toISOString()
      },
      passed_quizzes: [],
      cohort: 'YUVA-AI-NEW',
      createdAt: new Date().toISOString()
    };
    const updated = [...allUsers, newUser];
    setUsers(updated);
    saveStoredUsers(updated);
    setCurrentUser(newUser);
    saveStoredCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    saveStoredCurrentUser(null);
  };

  const switchPersona = (role: UserRole) => {
    const allUsers = getStoredUsers();
    const persona = allUsers.find(u => u.role === role) || INITIAL_USERS.find(u => u.role === role);
    if (persona) {
      setCurrentUser(persona);
      saveStoredCurrentUser(persona);
    }
  };

  const recordQuizPass = (weekId: number, score: number, totalQuestions: number) => {
    if (!currentUser) return;
    const percentage = Math.round((score / totalQuestions) * 100);
    const newRecord: PassedQuiz = {
      weekId,
      score,
      totalQuestions,
      percentage,
      passedAt: new Date(effectiveTimeMs).toISOString()
    };

    const existingPassed = currentUser.passed_quizzes || [];
    const filtered = existingPassed.filter(q => q.weekId !== weekId);
    const updatedPassed = [...filtered, newRecord];

    const updatedUser: UserProfile = {
      ...currentUser,
      passed_quizzes: updatedPassed
    };

    setCurrentUser(updatedUser);
    saveStoredCurrentUser(updatedUser);

    // Update in users table
    const allUsers = getStoredUsers().map(u => u.uid === currentUser.uid ? updatedUser : u);
    setUsers(allUsers);
    saveStoredUsers(allUsers);
  };

  const submitUpiTransaction = async (data: {
    level: number;
    levelName: string;
    amount: number;
    utrNumber: string;
    receiptData: string;
    receiptFileName: string;
  }): Promise<PaymentTransaction> => {
    const newTxn: PaymentTransaction = {
      id: `txn-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId: currentUser?.uid || 'anonymous',
      userName: currentUser?.displayName || 'Trainee Student',
      userEmail: currentUser?.email || 'trainee@eisga.ai',
      level: data.level,
      levelName: data.levelName,
      amount: data.amount,
      utrNumber: data.utrNumber,
      receiptData: data.receiptData,
      receiptFileName: data.receiptFileName,
      status: 'pending',
      createdAt: new Date(effectiveTimeMs).toISOString()
    };

    const allTxns = [newTxn, ...getStoredTransactions()];
    setTransactions(allTxns);
    saveStoredTransactions(allTxns);
    return newTxn;
  };

  const approveTransaction = async (transactionId: string): Promise<void> => {
    const allTxns = getStoredTransactions();
    const targetTxn = allTxns.find(t => t.id === transactionId);
    if (!targetTxn) return;

    // 1. Mark transaction as approved
    const updatedTxns: PaymentTransaction[] = allTxns.map(t =>
      t.id === transactionId
        ? {
            ...t,
            status: 'approved',
            reviewedAt: new Date(effectiveTimeMs).toISOString(),
            reviewedBy: currentUser?.displayName || 'OfficeAdmin'
          }
        : t
    );
    setTransactions(updatedTxns);
    saveStoredTransactions(updatedTxns);

    // 2. Database Trigger: Update user's document to activate level and inject precise enrollment_timestamp
    const allUsers = getStoredUsers();
    const updatedUsers = allUsers.map(user => {
      if (user.uid === targetTxn.userId || user.email === targetTxn.userEmail) {
        const activeLevels = Array.from(new Set([...(user.activeLevels || []), targetTxn.level])).sort();
        const currentTimestamps = user.enrollment_timestamps || {};
        const preciseEnrollmentTimestamp = new Date(effectiveTimeMs).toISOString();

        return {
          ...user,
          activeLevels,
          enrollment_timestamps: {
            ...currentTimestamps,
            [targetTxn.level]: preciseEnrollmentTimestamp
          }
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    saveStoredUsers(updatedUsers);

    // If current logged-in user is the one approved, sync their profile in real-time
    if (currentUser && (currentUser.uid === targetTxn.userId || currentUser.email === targetTxn.userEmail)) {
      const refreshedSelf = updatedUsers.find(u => u.uid === currentUser.uid);
      if (refreshedSelf) {
        setCurrentUser(refreshedSelf);
        saveStoredCurrentUser(refreshedSelf);
      }
    }
  };

  const rejectTransaction = async (transactionId: string, reason?: string): Promise<void> => {
    const allTxns = getStoredTransactions();
    const updatedTxns: PaymentTransaction[] = allTxns.map(t =>
      t.id === transactionId
        ? {
            ...t,
            status: 'rejected',
            rejectionReason: reason || 'Invalid 12-digit UTR or unverified receipt screenshot.',
            reviewedAt: new Date(effectiveTimeMs).toISOString(),
            reviewedBy: currentUser?.displayName || 'OfficeAdmin'
          }
        : t
    );
    setTransactions(updatedTxns);
    saveStoredTransactions(updatedTxns);
  };

  const advanceSimulatedDays = (days: number) => {
    const additionalMs = days * 24 * 60 * 60 * 1000;
    const newOffset = simulatedOffsetMs + additionalMs;
    setSimOffsetMs(newOffset);
    setSimulatedTimeOffset(newOffset);
  };

  const resetSimulatedTime = () => {
    setSimOffsetMs(0);
    setSimulatedTimeOffset(0);
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        role: currentUser?.role || 'Trainee',
        users,
        transactions,
        simulatedOffsetMs,
        effectiveTimeMs,
        login,
        logout,
        switchPersona,
        recordQuizPass,
        submitUpiTransaction,
        approveTransaction,
        rejectTransaction,
        advanceSimulatedDays,
        resetSimulatedTime,
        refreshState
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
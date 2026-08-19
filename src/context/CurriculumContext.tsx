'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MasterCurriculum, CurriculumModule, CurriculumLevel } from '@/types';
import { fetchMasterCurriculum, getLevelForWeek, getModuleByWeek } from '@/lib/curriculumService';

interface CurriculumContextType {
  curriculum: MasterCurriculum | null;
  levels: CurriculumLevel[];
  modules: CurriculumModule[];
  isLoading: boolean;
  error: string | null;
  selectedWeek: number;
  setSelectedWeek: (week: number) => void;
  getLevelForWeekNumber: (week: number) => CurriculumLevel | undefined;
  getModuleByWeekNumber: (week: number) => CurriculumModule | undefined;
  refetchCurriculum: () => Promise<void>;
}

const CurriculumContext = createContext<CurriculumContextType | undefined>(undefined);

export function CurriculumProvider({ children }: { children: React.ReactNode }) {
  const [curriculum, setCurriculum] = useState<MasterCurriculum | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchMasterCurriculum();
      setCurriculum(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load master curriculum JSON');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const levels = curriculum?.bootcamp?.levels || [];
  const modules = curriculum?.bootcamp?.modules || [];

  const getLevelForWeekNumber = (week: number) => getLevelForWeek(week, levels);
  const getModuleByWeekNumber = (week: number) => getModuleByWeek(week, modules);

  return (
    <CurriculumContext.Provider
      value={{
        curriculum,
        levels,
        modules,
        isLoading,
        error,
        selectedWeek,
        setSelectedWeek,
        getLevelForWeekNumber,
        getModuleByWeekNumber,
        refetchCurriculum: loadData
      }}
    >
      {children}
    </CurriculumContext.Provider>
  );
}

export function useCurriculum() {
  const context = useContext(CurriculumContext);
  if (!context) {
    throw new Error('useCurriculum must be used within a CurriculumProvider');
  }
  return context;
}
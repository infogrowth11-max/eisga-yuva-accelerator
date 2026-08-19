'use client';

import { useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCurriculum } from '@/context/CurriculumContext';
import { calculateWeekAccess, formatTimeRemaining } from '@/lib/dripFeed';
import { WeekAccessState } from '@/types';

export function useWeekAccess(weekNumber: number, explicitLevel?: number): WeekAccessState & {
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    formatted: string;
  };
} {
  const { user, effectiveTimeMs } = useAuth();
  const { getLevelForWeekNumber } = useCurriculum();

  const levelNumber = useMemo(() => {
    if (explicitLevel) return explicitLevel;
    const foundLevel = getLevelForWeekNumber(weekNumber);
    return foundLevel ? foundLevel.level : 1;
  }, [explicitLevel, weekNumber, getLevelForWeekNumber]);

  const accessState = useMemo(() => {
    return calculateWeekAccess(weekNumber, levelNumber, user, effectiveTimeMs);
  }, [weekNumber, levelNumber, user, effectiveTimeMs]);

  const countdown = useMemo(() => {
    return formatTimeRemaining(accessState.secondsRemaining);
  }, [accessState.secondsRemaining]);

  return {
    ...accessState,
    countdown
  };
}
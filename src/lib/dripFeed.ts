import { UserProfile, WeekAccessState, CurriculumLevel } from '@/types';

export const DAYS_PER_WEEK = 7;
export const MS_PER_DAY = 24 * 60 * 60 * 1000;
export const MS_PER_WEEK = DAYS_PER_WEEK * MS_PER_DAY;
export const PASSING_PERCENTAGE = 60;

/**
 * Calculates the exact two-factor drip-feed access status for a given week.
 *
 * Condition 1: passed_quizzes includes 'Week X-1' with Score >= 60%
 * Condition 2: Current Time >= enrollment_timestamp + ((X - 1) * 7 days)
 */
export function calculateWeekAccess(
  weekNumber: number,
  levelNumber: number,
  userProfile: UserProfile | null | undefined,
  currentSimulatedTimeMs: number = Date.now()
): WeekAccessState {
  // Default state for unauthenticated or missing profile
  if (!userProfile) {
    return {
      week: weekNumber,
      level: levelNumber,
      isUnlocked: false,
      isLevelPurchased: false,
      isQuizPassed: false,
      isTimeUnlocked: false,
      requiredQuizWeek: weekNumber > 1 ? weekNumber - 1 : null,
      targetUnlockTime: null,
      secondsRemaining: 0,
      lockReason: 'LEVEL_NOT_PURCHASED',
      lockMessage: `Please sign in and enroll in Level ${levelNumber} to access this module.`
    };
  }

  // 1. Check Level Purchase
  const isLevelPurchased = userProfile.activeLevels.includes(levelNumber);
  if (!isLevelPurchased) {
    return {
      week: weekNumber,
      level: levelNumber,
      isUnlocked: false,
      isLevelPurchased: false,
      isQuizPassed: false,
      isTimeUnlocked: false,
      requiredQuizWeek: weekNumber > 1 ? weekNumber - 1 : null,
      targetUnlockTime: null,
      secondsRemaining: 0,
      lockReason: 'LEVEL_NOT_PURCHASED',
      lockMessage: `Level ${levelNumber} is locked. Complete manual UPI verification to activate.`
    };
  }

  // 2. Determine enrollment timestamp for this Level (or fallback to user creation)
  const enrollmentIso = userProfile.enrollment_timestamps?.[levelNumber] || userProfile.createdAt || new Date().toISOString();
  const enrollmentTimeMs = new Date(enrollmentIso).getTime();

  // 3. Condition 1: Check Quiz Prerequisite for Week X - 1
  let isQuizPassed = false;
  let previousQuizScore: number | undefined = undefined;
  const requiredQuizWeek = weekNumber > 1 ? weekNumber - 1 : null;

  if (weekNumber === 1) {
    // Week 1 has no previous quiz requirement
    isQuizPassed = true;
  } else {
    const passedQuizRecord = userProfile.passed_quizzes?.find(
      q => q.weekId === weekNumber - 1
    );

    if (passedQuizRecord) {
      previousQuizScore = passedQuizRecord.percentage;
      if (passedQuizRecord.percentage >= PASSING_PERCENTAGE) {
        isQuizPassed = true;
      }
    }
  }

  // 4. Condition 2: Calculate Time-lock Gate
  // Target Time = enrollment_timestamp + ((X - 1) * 7 days)
  const targetUnlockTimeMs = enrollmentTimeMs + (weekNumber - 1) * MS_PER_WEEK;
  const targetUnlockTimeIso = new Date(targetUnlockTimeMs).toISOString();

  const isTimeUnlocked = currentSimulatedTimeMs >= targetUnlockTimeMs;
  const diffMs = targetUnlockTimeMs - currentSimulatedTimeMs;
  const secondsRemaining = isTimeUnlocked ? 0 : Math.max(0, Math.ceil(diffMs / 1000));

  // Determine Overall Access & Status
  if (isQuizPassed && isTimeUnlocked) {
    return {
      week: weekNumber,
      level: levelNumber,
      isUnlocked: true,
      isLevelPurchased: true,
      isQuizPassed: true,
      isTimeUnlocked: true,
      requiredQuizWeek,
      previousQuizScore,
      targetUnlockTime: targetUnlockTimeIso,
      secondsRemaining: 0,
      lockReason: 'UNLOCKED',
      lockMessage: 'Module is fully unlocked and ready.'
    };
  }

  if (isQuizPassed && !isTimeUnlocked) {
    return {
      week: weekNumber,
      level: levelNumber,
      isUnlocked: false,
      isLevelPurchased: true,
      isQuizPassed: true,
      isTimeUnlocked: false,
      requiredQuizWeek,
      previousQuizScore,
      targetUnlockTime: targetUnlockTimeIso,
      secondsRemaining,
      lockReason: 'TIME_LOCKED',
      lockMessage: `Quiz requirement satisfied (Score: ${previousQuizScore}%). Module is time-locked until scheduled drip release.`
    };
  }

  return {
    week: weekNumber,
    level: levelNumber,
    isUnlocked: false,
    isLevelPurchased: true,
    isQuizPassed: false,
    isTimeUnlocked,
    requiredQuizWeek,
    previousQuizScore,
    targetUnlockTime: targetUnlockTimeIso,
    secondsRemaining,
    lockReason: 'QUIZ_INCOMPLETE',
    lockMessage: `Prerequisite Incomplete: You must pass the Week ${requiredQuizWeek} Certification Quiz with ≥ ${PASSING_PERCENTAGE}% score.`
  };
}

export function formatTimeRemaining(seconds: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
} {
  if (seconds <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, formatted: '00:00:00:00' };
  }

  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');
  const formatted = `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(secs)}s`;

  return { days, hours, minutes, seconds: secs, formatted };
}
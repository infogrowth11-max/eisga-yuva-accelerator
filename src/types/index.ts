export type UserRole = 'Trainee' | 'Trainer' | 'OfficeAdmin' | 'SuperAdmin';

export interface PassedQuiz {
  weekId: number;
  score: number;
  totalQuestions: number;
  percentage: number;
  passedAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  avatarUrl?: string;
  activeLevels: number[];
  enrollment_timestamps: Record<number, string>;
  passed_quizzes: PassedQuiz[];
  cohort: string;
  phone?: string;
  createdAt: string;
}

export type TransactionStatus = 'pending' | 'approved' | 'rejected';

export interface PaymentTransaction {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  level: number;
  levelName: string;
  amount: number;
  utrNumber: string; // 12-digit transaction reference
  receiptUrl?: string;
  receiptData?: string; // base64 screenshot
  receiptFileName?: string;
  status: TransactionStatus;
  rejectionReason?: string;
  adminNotes?: string;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CurriculumQuiz {
  id: string;
  week: number;
  title: string;
  passingScore: number; // e.g. 60
  timeLimitMinutes: number;
  questions: QuizQuestion[];
}

export interface CurriculumLesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  notes: string;
  codeSnippet?: string;
}

export interface CurriculumModule {
  week: number;
  level: number;
  title: string;
  slug: string;
  durationHours: number;
  overview: string;
  outcomes: string[];
  lessons: CurriculumLesson[];
  quiz: CurriculumQuiz;
}

export interface CurriculumLevel {
  level: number;
  name: string;
  price: number;
  originalPrice: number;
  tagline: string;
  weeks: number[];
  color: string;
  badge: string;
}

export interface MasterCurriculum {
  bootcamp: {
    id: string;
    title: string;
    subtitle: string;
    totalWeeks: number;
    totalLevels: number;
    levels: CurriculumLevel[];
    modules: CurriculumModule[];
  };
}

export interface WeekAccessState {
  week: number;
  level: number;
  isUnlocked: boolean;
  isLevelPurchased: boolean;
  isQuizPassed: boolean;
  isTimeUnlocked: boolean;
  requiredQuizWeek: number | null;
  previousQuizScore?: number;
  targetUnlockTime: string | null;
  secondsRemaining: number;
  lockReason: 'LEVEL_NOT_PURCHASED' | 'QUIZ_INCOMPLETE' | 'TIME_LOCKED' | 'UNLOCKED';
  lockMessage: string;
}
import { UserProfile, PassedQuiz, CurriculumModule } from '@/types';

export interface IssuedCertificate {
  certificateId: string;
  level: number;
  levelTitle: string;
  candidateName: string;
  candidateEmail: string;
  issueDate: string;
  verificationHash: string;
  grade: 'Distinction' | 'Merit' | 'Pass';
  averageScorePercentage: number;
  completedWeeks: number[];
}

export const LEVEL_CERTIFICATE_METADATA: Record<number, { title: string; subtitle: string }> = {
  1: {
    title: 'Executive AI Fellowship — Level 1: Foundations of Computational AI',
    subtitle: 'Vectorized NumPy, Matrix Mathematics, Optimization Theory & Gradient Mechanics'
  },
  2: {
    title: 'Executive AI Fellowship — Level 2: Deep Learning & Neural Vision',
    subtitle: 'Autograd Graphs, Residual Architectures & Vision Transformers (ViT)'
  },
  3: {
    title: 'Executive AI Fellowship — Level 3: NLP & Modern Transformer Architectures',
    subtitle: 'Byte-Pair Encoding, Scaled Dot-Product Attention, RoPE & KV-Caching'
  },
  4: {
    title: 'Executive AI Fellowship — Level 4: Generative AI, RAG & Multi-Agent Systems',
    subtitle: 'Hierarchical RAG, HNSW Vector Indexing & LangGraph Graph Architectures'
  },
  5: {
    title: 'Executive AI Fellowship — Level 5: Enterprise LLM Deployment & Capstone',
    subtitle: 'QLoRA 4-bit Quantization, vLLM PagedAttention & Enterprise Model Serving'
  }
};

/**
 * Deterministic hash generator (pseudo-SHA256 simulator for client-side verifiable signatures)
 */
export function generateVerificationHash(certificateId: string, level: number, candidateEmail: string, issueDate: string): string {
  const seed = `EISGA-SECURE-${certificateId}-L${level}-${candidateEmail}-${issueDate}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const hexPart = Math.abs(hash).toString(16).padStart(8, '0');
  return `0x${hexPart}e89f41b7d84a3c20e4b789012a4f56c9`.slice(0, 42);
}

/**
 * Check if a trainee is eligible for a level certification
 * Level 1 requires passing all weeks in Level 1 (e.g. Weeks 1, 2)
 */
export function checkLevelCompletion(
  levelNumber: number,
  passedQuizzes: PassedQuiz[] = [],
  modules: CurriculumModule[] = []
): { isEligible: boolean; completedWeeks: number; totalWeeks: number; averageScore: number } {
  const levelModules = modules.filter(m => m.level === levelNumber);
  if (levelModules.length === 0) {
    return { isEligible: false, completedWeeks: 0, totalWeeks: 0, averageScore: 0 };
  }

  const passedForThisLevel = levelModules.filter(m =>
    passedQuizzes.some(pq => pq.weekId === m.week && pq.percentage >= 60)
  );

  const isEligible = passedForThisLevel.length === levelModules.length && levelModules.length > 0;

  // Calculate average score
  const quizScores = passedQuizzes
    .filter(pq => levelModules.some(m => m.week === pq.weekId))
    .map(pq => pq.percentage);
  
  const averageScore = quizScores.length > 0
    ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
    : 0;

  return {
    isEligible,
    completedWeeks: passedForThisLevel.length,
    totalWeeks: levelModules.length,
    averageScore
  };
}

/**
 * Generate Certificate Object
 */
export function createCertificate(
  user: UserProfile,
  levelNumber: number,
  averageScorePercentage: number
): IssuedCertificate {
  const certificateId = `EYA-2026-L${levelNumber}-${user.uid.slice(0, 6).toUpperCase()}`;
  const issueDate = new Date().toISOString();
  const meta = LEVEL_CERTIFICATE_METADATA[levelNumber] || {
    title: `Level ${levelNumber} AI Certification`,
    subtitle: 'Mastery of Advanced AI Engineering'
  };

  const grade: 'Distinction' | 'Merit' | 'Pass' =
    averageScorePercentage >= 90 ? 'Distinction' :
    averageScorePercentage >= 75 ? 'Merit' : 'Pass';

  const verificationHash = generateVerificationHash(certificateId, levelNumber, user.email, issueDate);

  return {
    certificateId,
    level: levelNumber,
    levelTitle: meta.title,
    candidateName: user.displayName || 'Fellow Candidate',
    candidateEmail: user.email,
    issueDate,
    verificationHash,
    grade,
    averageScorePercentage,
    completedWeeks: levelNumber === 1 ? [1, 2] : levelNumber === 2 ? [3, 4] : levelNumber === 3 ? [5, 6] : levelNumber === 4 ? [7, 8, 9] : [10, 11, 12]
  };
}
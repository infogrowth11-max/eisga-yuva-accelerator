import { UserProfile, PaymentTransaction, UserRole, PassedQuiz } from '@/types';

const STORAGE_USERS_KEY = 'eisga_yuva_users_v1';
const STORAGE_TXNS_KEY = 'eisga_yuva_transactions_v1';
const STORAGE_CURRENT_USER_KEY = 'eisga_yuva_current_user_v1';
const STORAGE_TIME_OFFSET_KEY = 'eisga_yuva_time_offset_v1';

// Seed initial users
export const INITIAL_USERS: UserProfile[] = [
  {
    uid: 'user-trainee-001',
    email: 'trainee@eisga.ai',
    displayName: 'Aarav Sharma',
    role: 'Trainee',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    activeLevels: [1],
    enrollment_timestamps: {
      1: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    },
    passed_quizzes: [
      {
        weekId: 1,
        score: 5,
        totalQuestions: 5,
        percentage: 100,
        passedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ],
    cohort: 'YUVA-AI-AUG-2026',
    phone: '+91 98765 43210',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    uid: 'user-trainer-002',
    email: 'trainer@eisga.ai',
    displayName: 'Dr. Priya Venkatesh',
    role: 'Trainer',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    activeLevels: [1, 2, 3, 4, 5],
    enrollment_timestamps: {
      1: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      2: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      3: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      4: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      5: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    passed_quizzes: [
      { weekId: 1, score: 5, totalQuestions: 5, percentage: 100, passedAt: new Date().toISOString() },
      { weekId: 2, score: 5, totalQuestions: 5, percentage: 100, passedAt: new Date().toISOString() }
    ],
    cohort: 'FACULTY-LEAD-2026',
    phone: '+91 98111 22334',
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    uid: 'user-admin-003',
    email: 'admin@eisga.ai',
    displayName: 'Rohan Mukherjee (Clearinghouse Admin)',
    role: 'OfficeAdmin',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    activeLevels: [1, 2, 3, 4, 5],
    enrollment_timestamps: {
      1: new Date().toISOString(),
      2: new Date().toISOString(),
      3: new Date().toISOString(),
      4: new Date().toISOString(),
      5: new Date().toISOString(),
    },
    passed_quizzes: [],
    cohort: 'ADMIN-OPERATIONS',
    phone: '+91 98222 33445',
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    uid: 'user-superadmin-004',
    email: 'superadmin@eisga.ai',
    displayName: 'Executive Director (SuperAdmin)',
    role: 'SuperAdmin',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    activeLevels: [1, 2, 3, 4, 5],
    enrollment_timestamps: {
      1: new Date().toISOString(),
      2: new Date().toISOString(),
      3: new Date().toISOString(),
      4: new Date().toISOString(),
      5: new Date().toISOString(),
    },
    passed_quizzes: [],
    cohort: 'EXECUTIVE-BOARD',
    phone: '+91 98333 44556',
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Seed initial transactions
export const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'txn-10928374',
    userId: 'user-trainee-001',
    userName: 'Aarav Sharma',
    userEmail: 'trainee@eisga.ai',
    level: 2,
    levelName: 'Level 2: Deep Learning & Neural Vision',
    amount: 1299,
    utrNumber: '482910482910',
    receiptFileName: 'upi_receipt_level2_aarav.png',
    receiptData: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600"><rect width="400" height="600" fill="%23f8fafc"/><rect x="20" y="20" width="360" height="560" rx="16" fill="white" stroke="%23e2e8f0" stroke-width="2"/><text x="200" y="70" font-family="sans-serif" font-size="20" font-weight="bold" fill="%231e1b4b" text-anchor="middle">UPI TRANSACTION RECEIPT</text><circle cx="200" cy="130" r="36" fill="%2310b981"/><path d="M185 130 l10 10 l20 -20" fill="none" stroke="white" stroke-width="4" stroke-linecap="round"/><text x="200" y="200" font-family="sans-serif" font-size="28" font-weight="bold" fill="%230f172a" text-anchor="middle">₹1,299.00</text><text x="200" y="230" font-family="sans-serif" font-size="14" fill="%2310b981" font-weight="bold" text-anchor="middle">PAID TO EISGA YUVA AI</text><line x1="40" y1="260" x2="360" y2="260" stroke="%23e2e8f0" stroke-width="1"/><text x="50" y="300" font-family="sans-serif" font-size="14" fill="%2364748b">UTR / Ref Number</text><text x="350" y="300" font-family="monospace" font-size="14" font-weight="bold" fill="%230f172a" text-anchor="end">482910482910</text><text x="50" y="340" font-family="sans-serif" font-size="14" fill="%2364748b">Payer</text><text x="350" y="340" font-family="sans-serif" font-size="14" font-weight="bold" fill="%230f172a" text-anchor="end">Aarav Sharma</text><text x="50" y="380" font-family="sans-serif" font-size="14" fill="%2364748b">UPI ID</text><text x="350" y="380" font-family="sans-serif" font-size="14" font-weight="bold" fill="%230f172a" text-anchor="end">eisga-yuva@icici</text><text x="50" y="420" font-family="sans-serif" font-size="14" fill="%2364748b">Bank Name</text><text x="350" y="420" font-family="sans-serif" font-size="14" font-weight="bold" fill="%230f172a" text-anchor="end">HDFC Bank UPI</text><rect x="40" y="470" width="320" height="50" rx="8" fill="%23f1f5f9"/><text x="200" y="500" font-family="sans-serif" font-size="13" fill="%23475569" font-weight="bold" text-anchor="middle">Verified by NPCI UPI Gateway</text></svg>',
    status: 'pending',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'txn-99281723',
    userId: 'user-trainee-005',
    userName: 'Ananya Rao',
    userEmail: 'ananya.rao@gmail.com',
    level: 3,
    levelName: 'Level 3: NLP & Modern Transformer Architectures',
    amount: 1499,
    utrNumber: '928374619283',
    receiptFileName: 'gpay_receipt_ananya.png',
    receiptData: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600"><rect width="400" height="600" fill="%23f8fafc"/><rect x="20" y="20" width="360" height="560" rx="16" fill="white" stroke="%23e2e8f0" stroke-width="2"/><text x="200" y="70" font-family="sans-serif" font-size="20" font-weight="bold" fill="%231e1b4b" text-anchor="middle">GOOGLE PAY RECEIPT</text><circle cx="200" cy="130" r="36" fill="%2310b981"/><path d="M185 130 l10 10 l20 -20" fill="none" stroke="white" stroke-width="4" stroke-linecap="round"/><text x="200" y="200" font-family="sans-serif" font-size="28" font-weight="bold" fill="%230f172a" text-anchor="middle">₹1,499.00</text><text x="200" y="230" font-family="sans-serif" font-size="14" fill="%2310b981" font-weight="bold" text-anchor="middle">SUCCESSFUL TRANSFER</text><line x1="40" y1="260" x2="360" y2="260" stroke="%23e2e8f0" stroke-width="1"/><text x="50" y="300" font-family="sans-serif" font-size="14" fill="%2364748b">12-Digit UPI Ref ID</text><text x="350" y="300" font-family="monospace" font-size="14" font-weight="bold" fill="%230f172a" text-anchor="end">928374619283</text><text x="50" y="340" font-family="sans-serif" font-size="14" fill="%2364748b">Recipient</text><text x="350" y="340" font-family="sans-serif" font-size="14" font-weight="bold" fill="%230f172a" text-anchor="end">EISGA YUVA AI</text></svg>',
    status: 'pending',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'txn-77382910',
    userId: 'user-trainee-006',
    userName: 'Vikramaditya Sen',
    userEmail: 'vikram.sen@outlook.com',
    level: 4,
    levelName: 'Level 4: Generative AI, RAG Systems & Autonomous Agents',
    amount: 1699,
    utrNumber: '382910482736',
    receiptFileName: 'phonepe_receipt_vikram.png',
    receiptData: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600"><rect width="400" height="600" fill="%23f8fafc"/><rect x="20" y="20" width="360" height="560" rx="16" fill="white" stroke="%23e2e8f0" stroke-width="2"/><text x="200" y="70" font-family="sans-serif" font-size="20" font-weight="bold" fill="%231e1b4b" text-anchor="middle">PHONEPE PAYMENT</text><circle cx="200" cy="130" r="36" fill="%2310b981"/><path d="M185 130 l10 10 l20 -20" fill="none" stroke="white" stroke-width="4" stroke-linecap="round"/><text x="200" y="200" font-family="sans-serif" font-size="28" font-weight="bold" fill="%230f172a" text-anchor="middle">₹1,699.00</text><text x="50" y="300" font-family="sans-serif" font-size="14" fill="%2364748b">Transaction ID</text><text x="350" y="300" font-family="monospace" font-size="14" font-weight="bold" fill="%230f172a" text-anchor="end">382910482736</text></svg>',
    status: 'pending',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
  }
];

// Helper functions for state persistence
export function getStoredUsers(): UserProfile[] {
  if (typeof window === 'undefined') return INITIAL_USERS;
  const stored = localStorage.getItem(STORAGE_USERS_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(INITIAL_USERS));
    return INITIAL_USERS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_USERS;
  }
}

export function saveStoredUsers(users: UserProfile[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
}

export function getStoredTransactions(): PaymentTransaction[] {
  if (typeof window === 'undefined') return INITIAL_TRANSACTIONS;
  const stored = localStorage.getItem(STORAGE_TXNS_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_TXNS_KEY, JSON.stringify(INITIAL_TRANSACTIONS));
    return INITIAL_TRANSACTIONS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_TRANSACTIONS;
  }
}

export function saveStoredTransactions(txns: PaymentTransaction[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_TXNS_KEY, JSON.stringify(txns));
}

export function getStoredCurrentUser(): UserProfile | null {
  if (typeof window === 'undefined') return INITIAL_USERS[0];
  const stored = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
  if (!stored) {
    const defaultUser = INITIAL_USERS[0];
    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(defaultUser));
    return defaultUser;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_USERS[0];
  }
}

export function saveStoredCurrentUser(user: UserProfile | null): void {
  if (typeof window === 'undefined') return;
  if (!user) {
    localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
  } else {
    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
  }
}

export function getSimulatedTimeOffset(): number {
  if (typeof window === 'undefined') return 0;
  const stored = localStorage.getItem(STORAGE_TIME_OFFSET_KEY);
  return stored ? parseInt(stored, 10) || 0 : 0;
}

export function setSimulatedTimeOffset(offsetMs: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_TIME_OFFSET_KEY, offsetMs.toString());
}
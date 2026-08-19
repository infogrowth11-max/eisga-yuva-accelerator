const { calculateWeekAccess, formatTimeRemaining } = require('../src/lib/dripFeed.ts');
const { checkLevelCompletion, generateVerificationHash, createCertificate } = require('../src/lib/certificateService.ts');

console.log('Running EISGA YUVA AI Accelerator Master Assertion Suite...');
let passedTests = 0;
let failedTests = 0;

function assert(condition, name) {
  if (condition) {
    console.log(`✓ PASS: ${name}`);
    passedTests++;
  } else {
    console.error(`✗ FAIL: ${name}`);
    failedTests++;
  }
}

// -------------------------------------------------------------
// SECTION 1: TWO-FACTOR DRIP FEED ENGINE TESTS
// -------------------------------------------------------------
const enrollmentTime = new Date('2026-08-01T00:00:00.000Z').getTime(); // Day 0

const mockTrainee = {
  uid: 'test-trainee-1',
  email: 'test@eisga.ai',
  displayName: 'Test Trainee',
  role: 'Trainee',
  activeLevels: [1], // Has Level 1 (Weeks 1-2)
  enrollment_timestamps: {
    1: new Date(enrollmentTime).toISOString()
  },
  passed_quizzes: [],
  cohort: 'TEST-COHORT',
  createdAt: new Date(enrollmentTime).toISOString()
};

// Test 1: Week 1 Access on Day 0
const accessW1_Day0 = calculateWeekAccess(1, 1, mockTrainee, enrollmentTime);
assert(accessW1_Day0.isUnlocked === true, 'Week 1 is unlocked immediately on enrollment');
assert(accessW1_Day0.isQuizPassed === true, 'Week 1 has no previous quiz requirement');
assert(accessW1_Day0.lockReason === 'UNLOCKED', 'Week 1 lockReason is UNLOCKED');

// Test 2: Week 2 Access on Day 3 WITHOUT passing Week 1 quiz
const day3Time = enrollmentTime + 3 * 24 * 60 * 60 * 1000;
const accessW2_NoQuiz = calculateWeekAccess(2, 1, mockTrainee, day3Time);
assert(accessW2_NoQuiz.isUnlocked === false, 'Week 2 is locked when Week 1 quiz is not passed');
assert(accessW2_NoQuiz.isQuizPassed === false, 'Week 2 quiz requirement is not met');
assert(accessW2_NoQuiz.lockReason === 'QUIZ_INCOMPLETE', 'Week 2 lockReason is QUIZ_INCOMPLETE');

// Test 3: Week 2 Access on Day 3 AFTER passing Week 1 quiz with 100%
const mockTraineePassedW1 = {
  ...mockTrainee,
  passed_quizzes: [
    { weekId: 1, score: 5, totalQuestions: 5, percentage: 100, passedAt: new Date(day3Time).toISOString() }
  ]
};

const accessW2_Day3_PassedQuiz = calculateWeekAccess(2, 1, mockTraineePassedW1, day3Time);
assert(accessW2_Day3_PassedQuiz.isUnlocked === false, 'Week 2 remains locked on Day 3 due to 7-day time lock');
assert(accessW2_Day3_PassedQuiz.isQuizPassed === true, 'Week 2 quiz prerequisite is satisfied (100% >= 60%)');
assert(accessW2_Day3_PassedQuiz.isTimeUnlocked === false, 'Week 2 time lock is active (3 days < 7 days)');
assert(accessW2_Day3_PassedQuiz.lockReason === 'TIME_LOCKED', 'Week 2 lockReason is TIME_LOCKED');
assert(accessW2_Day3_PassedQuiz.secondsRemaining === 4 * 24 * 3600, 'Week 2 has exactly 4 days remaining');

const countdownFormatted = formatTimeRemaining(accessW2_Day3_PassedQuiz.secondsRemaining);
assert(countdownFormatted.days === 4, 'Countdown days format calculates 4 days');

// Test 4: Week 2 Access on Day 7 AFTER passing Week 1 quiz
const day7Time = enrollmentTime + 7 * 24 * 60 * 60 * 1000;
const accessW2_Day7_PassedQuiz = calculateWeekAccess(2, 1, mockTraineePassedW1, day7Time);
assert(accessW2_Day7_PassedQuiz.isUnlocked === true, 'Week 2 unlocks on Day 7 when both factors are satisfied');
assert(accessW2_Day7_PassedQuiz.isTimeUnlocked === true, 'Week 2 time is unlocked on Day 7');
assert(accessW2_Day7_PassedQuiz.lockReason === 'UNLOCKED', 'Week 2 lockReason is UNLOCKED on Day 7');

// Test 5: Week 3 Access (Level 2 not purchased)
const accessW3_Unpurchased = calculateWeekAccess(3, 2, mockTraineePassedW1, day7Time);
assert(accessW3_Unpurchased.isUnlocked === false, 'Week 3 is locked because Level 2 is not enrolled');
assert(accessW3_Unpurchased.lockReason === 'LEVEL_NOT_PURCHASED', 'Week 3 lockReason is LEVEL_NOT_PURCHASED');

// Test 6: Week 3 Access after Level 2 Approved and Enrollment Timestamp Injected
const level2EnrollmentTime = day7Time;
const mockTraineeWithLevel2 = {
  ...mockTraineePassedW1,
  activeLevels: [1, 2],
  enrollment_timestamps: {
    1: new Date(enrollmentTime).toISOString(),
    2: new Date(level2EnrollmentTime).toISOString()
  },
  passed_quizzes: [
    { weekId: 1, score: 5, totalQuestions: 5, percentage: 100, passedAt: new Date(day3Time).toISOString() },
    { weekId: 2, score: 4, totalQuestions: 5, percentage: 80, passedAt: new Date(day7Time).toISOString() }
  ]
};

const accessW3_Approved = calculateWeekAccess(3, 2, mockTraineeWithLevel2, level2EnrollmentTime);
assert(accessW3_Approved.isQuizPassed === true, 'Week 3 quiz prerequisite is satisfied');

// -------------------------------------------------------------
// SECTION 2: VERIFIABLE CERTIFICATE ENGINE TESTS
// -------------------------------------------------------------
const mockModules = [
  { week: 1, level: 1 },
  { week: 2, level: 1 },
  { week: 3, level: 2 },
  { week: 4, level: 2 }
];

// Test 7: Level 1 Certificate Incomplete when only Week 1 is passed
const certL1_Incomplete = checkLevelCompletion(1, mockTraineePassedW1.passed_quizzes, mockModules);
assert(certL1_Incomplete.isEligible === false, 'Level 1 certificate is not eligible when only 1/2 weeks are passed');
assert(certL1_Incomplete.completedWeeks === 1, 'Level 1 completedWeeks count is 1');

// Test 8: Level 1 Certificate Complete when both Week 1 and Week 2 are passed
const certL1_Complete = checkLevelCompletion(1, mockTraineeWithLevel2.passed_quizzes, mockModules);
assert(certL1_Complete.isEligible === true, 'Level 1 certificate is eligible when 2/2 weeks are passed >= 60%');
assert(certL1_Complete.completedWeeks === 2, 'Level 1 completedWeeks count is 2');
assert(certL1_Complete.averageScore === 90, 'Level 1 averageScore is correctly calculated (100+80)/2 = 90%');

// Test 9: Certificate Object & Cryptographic Signature Verification
const issuedCert = createCertificate(mockTraineeWithLevel2, 1, certL1_Complete.averageScore);
assert(issuedCert.certificateId.startsWith('EYA-2026-L1-'), 'Certificate ID follows standard format EYA-2026-L1-*');
assert(issuedCert.grade === 'Distinction', '90% average score earns Distinction grade');
assert(issuedCert.verificationHash.startsWith('0x'), 'Verification Hash generates valid hex cryptographic signature');

console.log(`\nMaster Test Summary: ${passedTests} Passed, ${failedTests} Failed.`);
if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('All Two-Factor Drip Feed and Verifiable Certificate assertions passed successfully!');
}
# 🚀 EISGA YUVA AI Accelerator

**India's Premier Enterprise AI & Generative AI Mastery Fellowship Platform**

An end-to-end modern educational bootcamp and learning management platform engineered with Next.js, React 19, TypeScript, and Tailwind CSS. The platform features an intelligent two-factor drip-feed progression engine, in-browser WebAssembly Python execution sandbox, interactive quizzes, automated verifiable digital credentials with cryptographic SHA-256 signatures, and role-based access for trainees, trainers, and administrators.

---

## ✨ Key Features

### 1. ⏱️ 2-Factor Drip Feed Content Engine
- **Prerequisite Quiz Score (≥60%)**: Trainees must pass the preceding week's assessment before advancing.
- **7-Day Time Lock**: Calculates exact remaining days/hours from level enrollment date.
- **Time Offset Simulator**: Built-in fast-forward tool in the UI for instant testing and demonstration of unlock states.

### 2. 🐍 In-Browser Python Sandbox (Pyodide WebAssembly)
- Execute Python and NumPy code directly inside the browser client without needing backend compute instances.
- Preloaded with sample data science code snippets, instant console outputs, and error handling.

### 3. 📜 Verifiable Digital Certificates
- Automated certificate issuance upon completing all level requirements (100% week unlock & passing scores).
- Generates standard certificate IDs (e.g. `EYA-2026-L1-...`) with SHA-256 cryptographic verification hashes.
- Public `/verify/[certId]` verification portal with live QR codes and grade badges.

### 4. 💳 Dynamic UPI Payment Simulator & Clearinghouse
- Dynamic QR code generation with UPI intent strings (`upi://pay?pa=...`).
- Clearinghouse verification system for manual and automated transaction approvals with instant webhook triggers.

### 5. 👥 Role-Based Portals & Dashboards
- **Trainee Portal**: Interactive curriculum timeline, live timers, quiz master, billing history, and certificate wallet.
- **Trainer Dashboard**: Cohort progress analytics, performance distribution, and trainee engagement tracking.
- **Office Admin**: Transaction clearinghouse, UTR approvals, and cohort enrollment management.
- **Superadmin**: Global system controls, user role assignments, audit logs, and system settings.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (Turbopack, App Router)](https://nextjs.org/)
- **UI / Styling**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/)
- **Runtime & Execution**: [Pyodide (WebAssembly Python)](https://pyodide.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Testing**: Node / TSX Engine Verification Test Suite

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/projelearn.git
   cd projelearn
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional)**:
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Verification

Run the automated drip-feed and certificate assertion test suite:
```bash
npm test
```

Build for production:
```bash
npm run build
```

---

## 🔑 Demo Access Accounts

The platform includes preloaded mock accounts for all roles (selectable via one-click switch on the Login page):

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Trainee** | `trainee@eisga.ai` | Any (Mock) | Level 1 Enrolled, Week 1 Quiz Passed |
| **Trainer** | `trainer@eisga.ai` | Any (Mock) | Cohort Analytics & Trainee Tracking |
| **Office Admin** | `admin@eisga.ai` | Any (Mock) | Transaction Clearinghouse & Enrollment |
| **Super Admin** | `superadmin@eisga.ai` | Any (Mock) | Full System & User Configuration |

---

## 📁 Project Structure

```text
projelearn/
├── public/
│   └── data/
│       └── master_bootcamp_curriculum.json   # 12-Week, 5-Level Master Curriculum
├── scripts/
│   ├── build_curriculum.js                   # Curriculum generator & compiler
│   └── test_engine.js                        # Master assertion test suite
├── src/
│   ├── app/                                  # Next.js App Router (pages & API routes)
│   ├── components/                           # Reusable UI, Sandbox, Payments & Layout
│   ├── context/                              # Auth & Curriculum state providers
│   ├── lib/                                  # Drip feed engine, Certificate generator, DB
│   └── types/                                # TypeScript data models and definitions
├── .env.example                              # Environment variable template
└── package.json
```

---

## 📄 License

This project is licensed under the MIT License.

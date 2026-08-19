import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CurriculumProvider } from "@/context/CurriculumContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "EISGA YUVA AI Accelerator | Enterprise EdTech SaaS",
  description: "India's Premier Enterprise AI & Generative AI Mastery Fellowship featuring RBAC, Manual UPI Verification, and Two-Factor Drip Feed Curriculum Engine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-emerald-500 selection:text-slate-950">
        <AuthProvider>
          <CurriculumProvider>
            {children}
          </CurriculumProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
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
  title: "EISGA YUVA FOUNDATION | Enterprise AI & Technology Learning Platform",
  description: "EISGA YUVA FOUNDATION (a section 8 non-profit company registered with Ministry of Finance, Government of India) CIN: U88900DL2025NPL445748. AI & Tech Mastery Fellowship.",
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
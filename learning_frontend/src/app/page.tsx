"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
  BookOpen,
  Calculator,
  CheckCircle,
  GraduationCap,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.push("/dashboard");
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin h-10 w-10 border-2 border-primary-200 border-t-primary-600 rounded-full" />
          <p className="text-xs font-medium text-slate-400">
            Loading AccountLearn...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-emerald-50 text-slate-900">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between rounded-2xl border border-white/80 bg-white/80 backdrop-blur-md shadow-sm px-4 py-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 transition-all duration-200 group-hover:bg-primary-100">
              <GraduationCap className="w-5 h-5" />
            </div>

            <div>
              <p className="text-[15px] font-bold text-slate-900 tracking-tight">
                AccountLearn
              </p>
              <p className="text-[9px] uppercase tracking-[0.16em] text-slate-400 font-semibold">
                Accounting Platform
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold shadow-sm shadow-primary-600/20 hover:bg-primary-700 hover:-translate-y-0.5 transition-all duration-200"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="container mx-auto px-6 pt-14 pb-16">
        <section className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white/80 backdrop-blur-sm px-3.5 py-1.5 text-xs font-semibold text-primary-700 shadow-sm mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Learn Accounting with Practice
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-slate-900">
            Master{" "}
            <span className="text-primary-600">
              Accounting
            </span>{" "}
            from Basics
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg leading-8 text-slate-600 max-w-2xl mx-auto mt-6">
            Complete curriculum covering Journal, Ledger, Cash Book,
            Trial Balance, Depreciation, Final Accounts, Bills of
            Exchange and more — with interactive practice tools.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary-600 text-white font-semibold shadow-lg shadow-primary-600/20 hover:bg-primary-700 hover:-translate-y-0.5 transition-all duration-200"
            >
              Start Learning
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-slate-200 bg-white/80 text-slate-700 font-semibold hover:bg-white hover:border-slate-300 transition-all duration-200"
            >
              I Already Have an Account
            </Link>
          </div>

          {/* Trust line */}
          <div className="flex items-center justify-center gap-2 mt-5 text-xs text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Structured learning • Practice • Progress tracking
          </div>
        </section>

        {/* Feature Cards */}
        <section className="grid md:grid-cols-3 gap-5 mt-16 max-w-5xl mx-auto">
          {/* Chapters */}
          <div className="group rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-sm p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 mb-5 group-hover:bg-primary-100 transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900">
                14 Chapters
              </h3>

              <span className="text-[10px] uppercase tracking-wider font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-md">
                Learn
              </span>
            </div>

            <p className="text-sm leading-6 text-slate-500">
              From Introduction to Bills of Exchange with examples,
              explanations and quizzes.
            </p>
          </div>

          {/* Practice */}
          <div className="group rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-sm p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-5 group-hover:bg-emerald-100 transition-colors">
              <Calculator className="w-5 h-5" />
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900">
                Practice Tools
              </h3>

              <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                Practice
              </span>
            </div>

            <p className="text-sm leading-6 text-slate-500">
              Journal checker, Depreciation, BRS, Accounting Equation
              and Trial Balance tools.
            </p>
          </div>

          {/* Progress */}
          <div className="group rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-sm p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-5 group-hover:bg-amber-100 transition-colors">
              <CheckCircle className="w-5 h-5" />
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900">
                Track Progress
              </h3>

              <span className="text-[10px] uppercase tracking-wider font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                Progress
              </span>
            </div>

            <p className="text-sm leading-6 text-slate-500">
              Mark chapters complete, take quizzes and keep track of
              your learning progress.
            </p>
          </div>
        </section>

        {/* Bottom Technology Section */}
        <section className="max-w-5xl mx-auto mt-8">
          <div className="rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-sm px-5 py-4 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                </div>

                <span className="text-xs font-semibold text-slate-600">
                  Built for focused accounting learning
                </span>
              </div>

              <p className="text-[11px] text-slate-400">
                Next.js • Node.js + Express • MongoDB • Python FastAPI
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
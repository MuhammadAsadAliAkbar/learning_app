"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import { getChapters } from "@/lib/api";
import Link from "next/link";
import {
  BookOpen,
  Calculator,
  ChevronRight,
  GraduationCap,
  Sparkles,
  ArrowUpRight,
  BookMarked,
} from "lucide-react";

const practiceTools = [
  {
    href: "/practice/journal",
    title: "Journal Entry Checker",
    desc: "Validate debit = credit",
  },
  {
    href: "/practice/depreciation",
    title: "Depreciation Calculator",
    desc: "SLM & WDV methods",
  },
  {
    href: "/practice/equation",
    title: "Accounting Equation",
    desc: "Track Assets = L + C",
  },
  {
    href: "/practice/brs",
    title: "Bank Reconciliation",
    desc: "Prepare BRS step by step",
  },
  {
    href: "/practice/trial-balance",
    title: "Trial Balance",
    desc: "Check if books tally",
  },
];

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [chapters, setChapters] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    getChapters()
      .then((r) => setChapters(r.data.data))
      .catch(() => {
        // offline fallback list
        setChapters([
          {
            chapterId: "ch1",
            number: 1,
            title: "Introduction to Accounting",
          },
          {
            chapterId: "ch2",
            number: 2,
            title: "Basic Accounting Concepts",
          },
          {
            chapterId: "ch3",
            number: 3,
            title: "Accounting Equation",
          },
          {
            chapterId: "ch4",
            number: 4,
            title: "Journal",
          },
          {
            chapterId: "ch5",
            number: 5,
            title: "Ledger",
          },
          {
            chapterId: "ch6",
            number: 6,
            title: "Cash Book",
          },
          {
            chapterId: "ch7",
            number: 7,
            title: "Bank Reconciliation Statement",
          },
          {
            chapterId: "ch8",
            number: 8,
            title: "Trial Balance",
          },
          {
            chapterId: "ch9",
            number: 9,
            title: "Errors and Their Correction",
          },
          {
            chapterId: "ch10",
            number: 10,
            title: "Depreciation",
          },
          {
            chapterId: "ch11",
            number: 11,
            title: "Final Accounts",
          },
          {
            chapterId: "ch12",
            number: 12,
            title: "Adjustments in Final Accounts",
          },
          {
            chapterId: "ch13",
            number: 13,
            title: "Capital and Revenue",
          },
          {
            chapterId: "ch14",
            number: 14,
            title: "Bills of Exchange",
          },
        ]);
      });
  }, []);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl p-5 md:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative p-6 md:p-7">
              {/* Subtle background decoration */}
              <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-primary-100/60 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 right-1/4 h-40 w-40 rounded-full bg-emerald-100/50 blur-3xl" />

              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 ring-1 ring-primary-100">
                    <GraduationCap className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
                      Learning Dashboard
                    </p>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                      Hello, {user.name}!
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                      Continue learning accounting fundamentals
                    </p>
                  </div>
                </div>

                <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3.5 py-2 text-xs font-medium text-emerald-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  Keep Learning
                </div>
              </div>
            </div>
          </div>

          {/* Chapters Header */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <BookOpen className="h-4 w-4" />
                </div>

                <h2 className="text-lg font-semibold text-slate-900">
                  Chapters
                </h2>
              </div>

              <p className="ml-10 mt-0.5 text-xs text-slate-500">
                Build your accounting fundamentals
              </p>
            </div>

            <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
              {chapters.length} Chapters
            </span>
          </div>

          {/* Chapters */}
          <div className="mb-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {chapters.map((c) => (
              <Link
                key={c.chapterId}
                href={`/chapters/${c.chapterId}`}
                className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-sm font-bold text-primary-600 transition group-hover:bg-primary-600 group-hover:text-white">
                    {c.number}
                  </div>

                  <div className="min-w-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary-600">
                      Chapter {c.number}
                    </span>

                    <p className="mt-0.5 truncate text-sm font-semibold text-slate-800">
                      {c.title}
                    </p>
                  </div>
                </div>

                <div className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-300 transition group-hover:bg-primary-50 group-hover:text-primary-600">
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>

          {/* Practice Header */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Calculator className="h-4 w-4" />
                </div>

                <h2 className="text-lg font-semibold text-slate-900">
                  Practice Tools
                </h2>
              </div>

              <p className="ml-10 mt-0.5 text-xs text-slate-500">
                Practice concepts with interactive tools
              </p>
            </div>

            <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
              {practiceTools.length} Tools
            </span>
          </div>

          {/* Practice Tools */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {practiceTools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <BookMarked className="h-4 w-4" />
                  </div>

                  <ArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:text-emerald-600" />
                </div>

                <p className="mt-4 font-semibold text-slate-800">
                  {t.title}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {t.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
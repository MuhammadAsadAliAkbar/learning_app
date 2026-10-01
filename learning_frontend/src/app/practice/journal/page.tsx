"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import { calc } from "@/lib/api";
import toast from "react-hot-toast";
import {
  Plus,
  Trash2,
  BookOpen,
  Calculator,
  CheckCircle2,
  XCircle,
  ArrowRight,
  FileText,
  Scale,
} from "lucide-react";

export default function JournalPractice() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [lines, setLines] = useState([
    { account: "", debit: "", credit: "" },
    { account: "", debit: "", credit: "" },
  ]);

  const [narration, setNarration] = useState("");
  const [result, setResult] = useState<any>(null);

  if (!loading && !user) {
    router.push("/login");
    return null;
  }

  const addLine = () =>
    setLines([
      ...lines,
      { account: "", debit: "", credit: "" },
    ]);

  const removeLine = (i: number) =>
    setLines(lines.filter((_, idx) => idx !== i));

  const update = (
    i: number,
    field: string,
    val: string
  ) => {
    const n = [...lines];
    (n[i] as any)[field] = val;
    setLines(n);
  };

  const check = async () => {
    try {
      const payload = {
        lines: lines.map((l) => ({
          account: l.account,
          debit: parseFloat(l.debit) || 0,
          credit: parseFloat(l.credit) || 0,
        })),
        narration,
      };

      const r = await calc("journal-check", payload);

      setResult(r.data);

      if (r.data.balanced) {
        toast.success("Balanced!");
      } else {
        toast.error("Not balanced");
      }
    } catch {
      // offline fallback
      const dr = lines.reduce(
        (s, l) => s + (parseFloat(l.debit) || 0),
        0
      );

      const cr = lines.reduce(
        (s, l) => s + (parseFloat(l.credit) || 0),
        0
      );

      const balanced = Math.abs(dr - cr) < 0.01;

      setResult({
        balanced,
        total_debit: dr,
        total_credit: cr,
        message: balanced ? "Balanced" : "Not balanced",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl p-5 md:p-6 lg:p-8">

          {/* Header */}
          <div className="mb-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative p-6 md:p-7">
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary-100/60 blur-3xl" />

              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 ring-1 ring-primary-100">
                  <BookOpen className="h-6 w-6" />
                </div>

                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
                    Practice Tool
                  </p>

                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                    Journal Entry Checker
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Enter debit and credit lines and verify that
                    your journal entry is balanced.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">

            {/* Main Workspace */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

              {/* Card Header */}
              <div className="border-b border-slate-100 px-5 py-4 md:px-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                      <Calculator className="h-4 w-4" />
                    </div>

                    <div>
                      <h2 className="font-semibold text-slate-900">
                        Journal Entry
                      </h2>

                      <p className="text-xs text-slate-500">
                        Record accounts and their debit / credit amounts
                      </p>
                    </div>
                  </div>

                  <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 sm:block">
                    {lines.length}{" "}
                    {lines.length === 1 ? "Line" : "Lines"}
                  </span>
                </div>
              </div>

              <div className="p-5 md:p-6">

                {/* Accounting Rule */}
                <div className="mb-5 rounded-xl border border-primary-100 bg-primary-50/60 p-4">
                  <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-semibold sm:gap-3">
                    <span className="rounded-lg bg-white px-3 py-2 text-primary-700 shadow-sm ring-1 ring-primary-100">
                      Total Debit
                    </span>

                    <span className="text-primary-400">=</span>

                    <span className="rounded-lg bg-white px-3 py-2 text-emerald-700 shadow-sm ring-1 ring-emerald-100">
                      Total Credit
                    </span>
                  </div>
                </div>

                {/* Column Labels */}
                <div className="mb-2 hidden grid-cols-12 gap-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 md:grid">
                  <span className="col-span-5">
                    Account
                  </span>

                  <span className="col-span-3">
                    Debit
                  </span>

                  <span className="col-span-3">
                    Credit
                  </span>

                  <span className="col-span-1" />
                </div>

                {/* Journal Lines */}
                <div className="space-y-3">
                  {lines.map((l, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 transition hover:border-primary-200 hover:bg-white"
                    >
                      <div className="mb-3 flex items-center gap-2 md:hidden">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-50 text-xs font-bold text-primary-600">
                          {i + 1}
                        </span>

                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Entry Line {i + 1}
                        </span>
                      </div>

                      <div className="grid gap-3 md:grid-cols-12 md:items-center">

                        {/* Account */}
                        <div className="md:col-span-5">
                          <label className="mb-1 block text-xs font-medium text-slate-500 md:hidden">
                            Account
                          </label>

                          <div className="relative">
                            <FileText className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <input
                              className="input w-full pl-10 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
                              placeholder="Account name"
                              value={l.account}
                              onChange={(e) =>
                                update(
                                  i,
                                  "account",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        {/* Debit */}
                        <div className="md:col-span-3">
                          <label className="mb-1 block text-xs font-medium text-slate-500 md:hidden">
                            Debit
                          </label>

                          <input
                            className="input w-full focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
                            type="number"
                            placeholder="0"
                            value={l.debit}
                            onChange={(e) =>
                              update(
                                i,
                                "debit",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        {/* Credit */}
                        <div className="md:col-span-3">
                          <label className="mb-1 block text-xs font-medium text-slate-500 md:hidden">
                            Credit
                          </label>

                          <input
                            className="input w-full focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
                            type="number"
                            placeholder="0"
                            value={l.credit}
                            onChange={(e) =>
                              update(
                                i,
                                "credit",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        {/* Remove */}
                        <div className="flex justify-end md:col-span-1">
                          <button
                            type="button"
                            onClick={() => removeLine(i)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                            title="Remove line"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Line */}
                <button
                  onClick={addLine}
                  className="btn-secondary mt-4 flex items-center gap-2 text-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add Journal Line
                </button>

                {/* Narration */}
                <div className="mt-5">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Narration
                    <span className="ml-1 text-xs font-normal text-slate-400">
                      Optional
                    </span>
                  </label>

                  <div className="relative">
                    <FileText className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" />

                    <textarea
                      className="input min-h-[90px] w-full resize-none pl-10 pt-3 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
                      placeholder="Enter a short description for this journal entry..."
                      value={narration}
                      onChange={(e) =>
                        setNarration(e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Check Button */}
                <button
                  onClick={check}
                  className="btn-primary mt-5 flex w-full items-center justify-center gap-2 py-3"
                >
                  <Calculator className="h-4 w-4" />
                  Check Journal Entry
                  <ArrowRight className="h-4 w-4" />
                </button>

                {/* Result */}
                {result && (
                  <div
                    className={`mt-6 overflow-hidden rounded-xl border ${
                      result.balanced
                        ? "border-emerald-200 bg-emerald-50/50"
                        : "border-red-200 bg-red-50/50"
                    }`}
                  >
                    {/* Result Header */}
                    <div
                      className={`flex items-center gap-3 border-b px-4 py-3 ${
                        result.balanced
                          ? "border-emerald-100"
                          : "border-red-100"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                          result.balanced
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {result.balanced ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <XCircle className="h-5 w-5" />
                        )}
                      </div>

                      <div>
                        <p
                          className={`text-sm font-semibold ${
                            result.balanced
                              ? "text-emerald-800"
                              : "text-red-800"
                          }`}
                        >
                          {result.message}
                        </p>

                        <p className="text-xs text-slate-500">
                          Journal entry verification result
                        </p>
                      </div>
                    </div>

                    <div className="p-4">

                      {/* Totals */}
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-primary-100 bg-white p-4">
                          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                            Total Debit
                          </p>

                          <p className="mt-1 text-2xl font-bold text-slate-800">
                            {result.total_debit}
                          </p>
                        </div>

                        <div className="rounded-xl border border-emerald-100 bg-white p-4">
                          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                            Total Credit
                          </p>

                          <p className="mt-1 text-2xl font-bold text-slate-800">
                            {result.total_credit}
                          </p>
                        </div>
                      </div>

                      {/* Balanced Status */}
                      <div
                        className={`mt-3 flex items-center gap-2 rounded-xl border bg-white px-4 py-3 text-sm font-medium ${
                          result.balanced
                            ? "border-emerald-100 text-emerald-700"
                            : "border-red-100 text-red-700"
                        }`}
                      >
                        {result.balanced ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            Debit and Credit are equal.
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4" />
                            Debit and Credit must be equal.
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Information Card */}
            <div className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <Scale className="h-5 w-5" />
              </div>

              <h3 className="font-semibold text-slate-900">
                Journal Entry
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                A journal entry records the financial effect of a
                business transaction.
              </p>

              <div className="mt-5 rounded-xl border border-primary-100 bg-primary-50/50 p-4">
                <p className="text-center font-mono text-sm font-semibold text-primary-700">
                  Debit = Credit
                </p>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                  <p className="text-sm font-semibold text-slate-700">
                    1. Select Accounts
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Enter the accounts affected by the transaction.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                  <p className="text-sm font-semibold text-slate-700">
                    2. Enter Amounts
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Record each amount on the correct debit or credit
                    side.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                  <p className="text-sm font-semibold text-slate-700">
                    3. Verify
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Total debit must equal total credit.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
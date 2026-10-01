"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import { calc } from "@/lib/api";
import {
  Plus,
  Calculator,
  CheckCircle2,
  XCircle,
  ArrowRight,
  BookOpen,
  Wallet,
  Landmark,
  Scale,
} from "lucide-react";

export default function EquationPractice() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [txns, setTxns] = useState([
    {
      description: "Started business with cash",
      assets: "100000",
      liabilities: "0",
      capital: "100000",
    },
  ]);

  const [result, setResult] = useState<any>(null);

  if (!loading && !user) {
    router.push("/login");
    return null;
  }

  const add = () => {
    setTxns([
      ...txns,
      {
        description: "",
        assets: "0",
        liabilities: "0",
        capital: "0",
      },
    ]);
  };

  const update = (i: number, f: string, v: string) => {
    const n = [...txns];
    (n[i] as any)[f] = v;
    setTxns(n);
  };

  const run = async () => {
    const payload = txns.map((t) => ({
      description: t.description,
      assets: parseFloat(t.assets) || 0,
      liabilities: parseFloat(t.liabilities) || 0,
      capital: parseFloat(t.capital) || 0,
    }));

    try {
      const r = await calc("equation", payload);
      setResult(r.data);
    } catch {
      let a = 0;
      let l = 0;
      let c = 0;

      const steps = payload.map((t) => {
        a += t.assets;
        l += t.liabilities;
        c += t.capital;

        return {
          description: t.description,
          assets: a,
          liabilities: l,
          capital: c,
          balanced: Math.abs(a - (l + c)) < 0.01,
        };
      });

      setResult({
        final: {
          assets: a,
          liabilities: l,
          capital: c,
        },
        equation_holds: Math.abs(a - (l + c)) < 0.01,
        steps,
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
                  <Scale className="h-6 w-6" />
                </div>

                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
                    Practice Tool
                  </p>

                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                    Accounting Equation
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Track how each transaction affects Assets,
                    Liabilities and Capital.
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
                        Transaction Analysis
                      </h2>

                      <p className="text-xs text-slate-500">
                        Enter the effect of every transaction
                      </p>
                    </div>
                  </div>

                  <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 sm:block">
                    {txns.length}{" "}
                    {txns.length === 1 ? "Transaction" : "Transactions"}
                  </span>
                </div>
              </div>

              <div className="p-5 md:p-6">

                {/* Equation Banner */}
                <div className="mb-5 rounded-xl border border-primary-100 bg-primary-50/60 p-4">
                  <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-semibold sm:gap-3">
                    <span className="rounded-lg bg-white px-3 py-2 text-primary-700 shadow-sm ring-1 ring-primary-100">
                      Assets
                    </span>

                    <span className="text-primary-400">=</span>

                    <span className="rounded-lg bg-white px-3 py-2 text-amber-700 shadow-sm ring-1 ring-amber-100">
                      Liabilities
                    </span>

                    <span className="text-primary-400">+</span>

                    <span className="rounded-lg bg-white px-3 py-2 text-emerald-700 shadow-sm ring-1 ring-emerald-100">
                      Capital
                    </span>
                  </div>
                </div>

                {/* Column Labels */}
                <div className="mb-2 hidden grid-cols-12 gap-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 md:grid">
                  <div className="col-span-5">
                    Transaction
                  </div>

                  <div className="col-span-2">
                    Δ Assets
                  </div>

                  <div className="col-span-2">
                    Δ Liabilities
                  </div>

                  <div className="col-span-3">
                    Δ Capital
                  </div>
                </div>

                {/* Transactions */}
                <div className="space-y-3">
                  {txns.map((t, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 transition hover:border-primary-200 hover:bg-white"
                    >
                      <div className="mb-3 flex items-center gap-2 md:hidden">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-50 text-xs font-bold text-primary-600">
                          {i + 1}
                        </span>

                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Transaction {i + 1}
                        </span>
                      </div>

                      <div className="grid gap-3 md:grid-cols-12">
                        {/* Description */}
                        <div className="md:col-span-5">
                          <label className="mb-1 block text-xs font-medium text-slate-500 md:hidden">
                            Description
                          </label>

                          <div className="relative">
                            <BookOpen className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <input
                              className="input w-full pl-10 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
                              placeholder="Transaction description"
                              value={t.description}
                              onChange={(e) =>
                                update(
                                  i,
                                  "description",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        {/* Assets */}
                        <div className="md:col-span-2">
                          <label className="mb-1 block text-xs font-medium text-slate-500 md:hidden">
                            Δ Assets
                          </label>

                          <input
                            className="input w-full focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
                            type="number"
                            placeholder="0"
                            value={t.assets}
                            onChange={(e) =>
                              update(
                                i,
                                "assets",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        {/* Liabilities */}
                        <div className="md:col-span-2">
                          <label className="mb-1 block text-xs font-medium text-slate-500 md:hidden">
                            Δ Liabilities
                          </label>

                          <input
                            className="input w-full focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
                            type="number"
                            placeholder="0"
                            value={t.liabilities}
                            onChange={(e) =>
                              update(
                                i,
                                "liabilities",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        {/* Capital */}
                        <div className="md:col-span-3">
                          <label className="mb-1 block text-xs font-medium text-slate-500 md:hidden">
                            Δ Capital
                          </label>

                          <input
                            className="input w-full focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
                            type="number"
                            placeholder="0"
                            value={t.capital}
                            onChange={(e) =>
                              update(
                                i,
                                "capital",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={add}
                    className="btn-secondary flex items-center justify-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Transaction
                  </button>

                  <button
                    onClick={run}
                    className="btn-primary flex flex-1 items-center justify-center gap-2"
                  >
                    <Calculator className="h-4 w-4" />
                    Run Equation
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Result */}
                {result && (
                  <div
                    className={`mt-6 overflow-hidden rounded-xl border ${
                      result.equation_holds
                        ? "border-emerald-200 bg-emerald-50/50"
                        : "border-red-200 bg-red-50/50"
                    }`}
                  >
                    {/* Result Header */}
                    <div
                      className={`flex items-center gap-3 border-b px-4 py-3 ${
                        result.equation_holds
                          ? "border-emerald-100"
                          : "border-red-100"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                          result.equation_holds
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {result.equation_holds ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <XCircle className="h-5 w-5" />
                        )}
                      </div>

                      <div>
                        <p
                          className={`text-sm font-semibold ${
                            result.equation_holds
                              ? "text-emerald-800"
                              : "text-red-800"
                          }`}
                        >
                          {result.equation_holds
                            ? "Equation Holds"
                            : "Equation Does Not Balance"}
                        </p>

                        <p className="text-xs text-slate-500">
                          Final accounting equation
                        </p>
                      </div>
                    </div>

                    <div className="p-4">

                      {/* Final Values */}
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-xl border border-primary-100 bg-white p-4">
                          <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                              <Wallet className="h-3.5 w-3.5" />
                            </div>

                            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                              Assets
                            </span>
                          </div>

                          <p className="text-lg font-bold text-slate-800">
                            {result.final?.assets}
                          </p>
                        </div>

                        <div className="rounded-xl border border-amber-100 bg-white p-4">
                          <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                              <Landmark className="h-3.5 w-3.5" />
                            </div>

                            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                              Liabilities
                            </span>
                          </div>

                          <p className="text-lg font-bold text-slate-800">
                            {result.final?.liabilities}
                          </p>
                        </div>

                        <div className="rounded-xl border border-emerald-100 bg-white p-4">
                          <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                              <Scale className="h-3.5 w-3.5" />
                            </div>

                            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                              Capital
                            </span>
                          </div>

                          <p className="text-lg font-bold text-slate-800">
                            {result.final?.capital}
                          </p>
                        </div>
                      </div>

                      {/* Steps */}
                      {result.steps?.length > 0 && (
                        <div className="mt-5">
                          <div className="mb-3 flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-slate-500" />

                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                              Transaction Breakdown
                            </p>
                          </div>

                          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                            {result.steps.map(
                              (s: any, i: number) => (
                                <div
                                  key={i}
                                  className="flex flex-col gap-3 border-b border-slate-100 p-4 last:border-0 sm:flex-row sm:items-center sm:justify-between"
                                >
                                  <div className="flex min-w-0 items-start gap-3">
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-slate-500">
                                      {i + 1}
                                    </span>

                                    <div className="min-w-0">
                                      <p className="truncate text-sm font-medium text-slate-700">
                                        {s.description ||
                                          `Transaction ${i + 1}`}
                                      </p>

                                      <p className="mt-1 text-xs text-slate-400">
                                        A = {s.assets}{" "}
                                        &nbsp;•&nbsp; L ={" "}
                                        {s.liabilities}{" "}
                                        &nbsp;•&nbsp; C ={" "}
                                        {s.capital}
                                      </p>
                                    </div>
                                  </div>

                                  <div
                                    className={`flex shrink-0 items-center gap-1.5 text-xs font-semibold ${
                                      s.balanced
                                        ? "text-emerald-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {s.balanced ? (
                                      <>
                                        <CheckCircle2 className="h-4 w-4" />
                                        Balanced
                                      </>
                                    ) : (
                                      <>
                                        <XCircle className="h-4 w-4" />
                                        Not Balanced
                                      </>
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Info Card */}
            <div className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <Scale className="h-5 w-5" />
              </div>

              <h3 className="font-semibold text-slate-900">
                Accounting Equation
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Every business transaction keeps the accounting
                equation balanced.
              </p>

              <div className="mt-5 rounded-xl border border-primary-100 bg-primary-50/50 p-4 text-center">
                <p className="font-mono text-sm font-semibold text-primary-700">
                  Assets = Liabilities + Capital
                </p>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Wallet className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Assets
                    </p>

                    <p className="mt-0.5 text-xs leading-5 text-slate-500">
                      Resources owned by the business.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <Landmark className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Liabilities
                    </p>

                    <p className="mt-0.5 text-xs leading-5 text-slate-500">
                      Amounts owed to external parties.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <Scale className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Capital
                    </p>

                    <p className="mt-0.5 text-xs leading-5 text-slate-500">
                      Owner&apos;s equity in the business.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import { calc } from "@/lib/api";
import toast from "react-hot-toast";
import {
  Calculator,
  Coins,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  TrendingDown,
  Clock3,
} from "lucide-react";

export default function DepreciationPractice() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [method, setMethod] = useState<"slm" | "wdv">("slm");
  const [cost, setCost] = useState("100000");
  const [residual, setResidual] = useState("10000");
  const [life, setLife] = useState("9");
  const [rate, setRate] = useState("20");
  const [years, setYears] = useState("5");
  const [result, setResult] = useState<any>(null);

  if (!loading && !user) {
    router.push("/login");
    return null;
  }

  const run = async () => {
    try {
      if (method === "slm") {
        const r = await calc("depreciation-slm", {
          cost: +cost,
          residual: +residual,
          life_years: +life,
        });

        setResult(r.data);
      } else {
        const r = await calc("depreciation-wdv", {
          cost: +cost,
          rate_percent: +rate,
          years: +years,
        });

        setResult(r.data);
      }
    } catch {
      // offline SLM
      if (method === "slm") {
        const annual = (+cost - +residual) / +life;

        setResult({
          success: true,
          method: "Straight Line",
          annual_depreciation:
            Math.round(annual * 100) / 100,
          schedule: [],
          journal: `Depreciation A/c Dr. ${annual.toFixed(
            2
          )}\n    To Asset A/c`,
        });
      } else {
        toast.error("Start Python service for WDV schedule");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-5xl p-5 md:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative p-6 md:p-7">
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary-100/60 blur-3xl" />

              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 ring-1 ring-primary-100">
                  <Calculator className="h-6 w-6" />
                </div>

                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
                    Practice Tool
                  </p>

                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                    Depreciation Calculator
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Calculate depreciation using Straight Line Method
                    or Written Down Value.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            {/* Calculator */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-5 py-4 md:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Coins className="h-4 w-4" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Calculate Depreciation
                    </h2>
                    <p className="text-xs text-slate-500">
                      Enter the asset details below
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5 p-5 md:p-6">
                {/* Method Selector */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Depreciation Method
                  </label>

                  <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
                    <button
                      type="button"
                      className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                        method === "slm"
                          ? "bg-white text-primary-700 shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                      onClick={() => {
                        setMethod("slm");
                        setResult(null);
                      }}
                    >
                      Straight Line
                    </button>

                    <button
                      type="button"
                      className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                        method === "wdv"
                          ? "bg-white text-primary-700 shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                      onClick={() => {
                        setMethod("wdv");
                        setResult(null);
                      }}
                    >
                      WDV / Reducing
                    </button>
                  </div>
                </div>

                {/* Cost */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Cost of Asset
                  </label>

                  <div className="relative">
                    <Coins className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      className="input w-full pl-10 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
                      type="number"
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                    />
                  </div>
                </div>

                {/* SLM Fields */}
                {method === "slm" ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Residual / Scrap Value
                      </label>

                      <input
                        className="input w-full focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
                        type="number"
                        value={residual}
                        onChange={(e) =>
                          setResidual(e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Useful Life (years)
                      </label>

                      <input
                        className="input w-full focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
                        type="number"
                        value={life}
                        onChange={(e) => setLife(e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  /* WDV Fields */
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Rate %
                      </label>

                      <div className="relative">
                        <input
                          className="input w-full pr-9 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
                          type="number"
                          value={rate}
                          onChange={(e) =>
                            setRate(e.target.value)
                          }
                        />

                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                          %
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Years to Show
                      </label>

                      <input
                        className="input w-full focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
                        type="number"
                        value={years}
                        onChange={(e) =>
                          setYears(e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}

                {/* Calculate */}
                <button
                  onClick={run}
                  className="btn-primary flex w-full items-center justify-center gap-2 py-3 shadow-sm"
                >
                  Calculate Depreciation
                  <ArrowRight className="h-4 w-4" />
                </button>

                {/* Result */}
                {result?.success && (
                  <div className="overflow-hidden rounded-xl border border-emerald-200 bg-emerald-50/50">
                    {/* Result Header */}
                    <div className="flex items-center gap-3 border-b border-emerald-100 px-4 py-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-emerald-800">
                          Calculation Complete
                        </p>

                        <p className="text-xs text-emerald-700/70">
                          {result.method}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 p-4">
                      {/* Annual Depreciation */}
                      {result.annual_depreciation != null && (
                        <div className="rounded-xl border border-emerald-100 bg-white p-4">
                          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                            Annual Depreciation
                          </p>

                          <p className="mt-1 text-2xl font-bold text-emerald-700">
                            {result.annual_depreciation}
                          </p>
                        </div>
                      )}

                      {/* Journal */}
                      {result.journal && (
                        <div>
                          <div className="mb-2 flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-slate-500" />

                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                              Journal Entry
                            </p>
                          </div>

                          <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs leading-6 text-slate-700">
                            {result.journal}
                          </pre>
                        </div>
                      )}

                      {/* WDV Schedule */}
                      {result.schedule?.length > 0 && (
                        <div>
                          <div className="mb-2 flex items-center gap-2">
                            <TrendingDown className="h-4 w-4 text-slate-500" />

                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                              Depreciation Schedule
                            </p>
                          </div>

                          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                            <table className="w-full min-w-[420px] text-xs">
                              <thead>
                                <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-500">
                                  <th className="px-4 py-3 font-semibold">
                                    Year
                                  </th>

                                  <th className="px-4 py-3 font-semibold">
                                    Depreciation
                                  </th>

                                  <th className="px-4 py-3 font-semibold">
                                    Book Value
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                {result.schedule.map(
                                  (row: any) => (
                                    <tr
                                      key={row.year}
                                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                    >
                                      <td className="px-4 py-3 font-medium text-slate-700">
                                        Year {row.year}
                                      </td>

                                      <td className="px-4 py-3 text-slate-600">
                                        {row.depreciation}
                                      </td>

                                      <td className="px-4 py-3 font-medium text-slate-800">
                                        {row.book_value}
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Information Card */}
            <div className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Clock3 className="h-5 w-5" />
              </div>

              <h3 className="font-semibold text-slate-900">
                Depreciation Methods
              </h3>

              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-primary-100 bg-primary-50/50 p-3.5">
                  <p className="text-sm font-semibold text-primary-800">
                    Straight Line Method
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Depreciation is distributed evenly over the
                    useful life of the asset.
                  </p>

                  <div className="mt-3 rounded-lg bg-white px-3 py-2 font-mono text-xs text-slate-600">
                    (Cost − Residual Value) ÷ Useful Life
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3.5">
                  <p className="text-sm font-semibold text-emerald-800">
                    WDV / Reducing Balance
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Depreciation is calculated using a fixed rate on
                    the reducing book value.
                  </p>

                  <div className="mt-3 rounded-lg bg-white px-3 py-2 font-mono text-xs text-slate-600">
                    Opening Book Value × Rate %
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
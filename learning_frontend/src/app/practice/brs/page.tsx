"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import { calc } from "@/lib/api";
import {
  Plus,
  Landmark,
  ArrowRight,
  Calculator,
  CheckCircle2,
  CircleDollarSign,
  Minus,
  PlusCircle,
} from "lucide-react";

export default function BRSPractice() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [balance, setBalance] = useState("50000");

  const [items, setItems] = useState([
    {
      description: "Cheques issued but not presented",
      amount: "5000",
      effect: "add_to_cashbook",
    },
    {
      description: "Cheques deposited but not credited",
      amount: "3000",
      effect: "less_from_cashbook",
    },
  ]);

  const [result, setResult] = useState<any>(null);

  if (!loading && !user) {
    router.push("/login");
    return null;
  }

  const add = () =>
    setItems([
      ...items,
      {
        description: "",
        amount: "0",
        effect: "add_to_cashbook",
      },
    ]);

  const update = (i: number, f: string, v: string) => {
    const n = [...items];
    (n[i] as any)[f] = v;
    setItems(n);
  };

  const run = async () => {
    const payload = {
      cashbook_balance: parseFloat(balance) || 0,
      is_favourable: true,
      items: items.map((it) => ({
        description: it.description,
        amount: parseFloat(it.amount) || 0,
        effect: it.effect,
      })),
    };

    try {
      const r = await calc("brs", payload);
      setResult(r.data);
    } catch {
      let bal = parseFloat(balance) || 0;
      const adj: string[] = [];

      items.forEach((it) => {
        const amt = parseFloat(it.amount) || 0;

        if (it.effect === "add_to_cashbook") {
          bal += amt;
          adj.push(`Add: ${it.description} = ${amt}`);
        } else {
          bal -= amt;
          adj.push(`Less: ${it.description} = ${amt}`);
        }
      });

      setResult({
        starting_balance: balance,
        adjusted_balance: bal,
        adjustments: adj,
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-5xl p-5 md:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative p-6 md:p-7">
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary-100/60 blur-3xl" />

              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 ring-1 ring-primary-100">
                  <Landmark className="h-6 w-6" />
                </div>

                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
                    Practice Tool
                  </p>

                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                    Bank Reconciliation Statement
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Start from Cash Book balance and adjust to arrive at
                    Pass Book balance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Main Calculator */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-5 py-4 md:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Calculator className="h-4 w-4" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Prepare BRS
                    </h2>
                    <p className="text-xs text-slate-500">
                      Enter the balance and reconciliation adjustments
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5 p-5 md:p-6">
                {/* Starting Balance */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Cash Book (Bank) Balance
                  </label>

                  <div className="relative">
                    <CircleDollarSign className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      className="input w-full pl-10 text-base font-medium focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
                      type="number"
                      value={balance}
                      onChange={(e) => setBalance(e.target.value)}
                    />
                  </div>
                </div>

                {/* Adjustments */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Reconciliation Adjustments
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Add or subtract each outstanding item
                      </p>
                    </div>

                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                      {items.length} Items
                    </span>
                  </div>

                  <div className="space-y-3">
                    {items.map((it, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-slate-200 bg-slate-50/60 p-3"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-[10px] font-bold text-slate-500 ring-1 ring-slate-200">
                            {i + 1}
                          </span>

                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Adjustment {i + 1}
                          </span>
                        </div>

                        <div className="grid gap-2 md:grid-cols-[1fr_150px_160px]">
                          <input
                            className="input bg-white"
                            placeholder="Description"
                            value={it.description}
                            onChange={(e) =>
                              update(
                                i,
                                "description",
                                e.target.value
                              )
                            }
                          />

                          <input
                            className="input bg-white"
                            type="number"
                            placeholder="Amount"
                            value={it.amount}
                            onChange={(e) =>
                              update(i, "amount", e.target.value)
                            }
                          />

                          <select
                            className="input bg-white"
                            value={it.effect}
                            onChange={(e) =>
                              update(i, "effect", e.target.value)
                            }
                          >
                            <option value="add_to_cashbook">
                              Add to CB
                            </option>
                            <option value="less_from_cashbook">
                              Less from CB
                            </option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 border-t border-slate-100 pt-5 sm:flex-row">
                  <button
                    onClick={add}
                    className="btn-secondary flex items-center justify-center gap-2 text-sm"
                  >
                    <Plus className="h-4 w-4" />
                    Add Item
                  </button>

                  <button
                    onClick={run}
                    className="btn-primary flex items-center justify-center gap-2 text-sm shadow-sm"
                  >
                    Prepare BRS
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Result */}
                {result && (
                  <div className="overflow-hidden rounded-xl border border-emerald-200 bg-emerald-50/50">
                    <div className="flex items-center gap-3 border-b border-emerald-100 px-4 py-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-emerald-800">
                          BRS Prepared
                        </p>
                        <p className="text-xs text-emerald-700/70">
                          Reconciliation summary
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 p-4 font-mono text-xs text-slate-600">
                      <div className="flex justify-between gap-4">
                        <span>Balance as per Cash Book</span>
                        <span className="font-semibold text-slate-800">
                          {result.starting_balance}
                        </span>
                      </div>

                      {result.adjustments?.map(
                        (a: string, i: number) => (
                          <div
                            key={i}
                            className="flex gap-2 rounded-lg bg-white/70 px-3 py-2"
                          >
                            {a.startsWith("Add") ? (
                              <PlusCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                            ) : (
                              <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                            )}

                            <span>{a}</span>
                          </div>
                        )
                      )}

                      <div className="mt-3 flex items-center justify-between border-t border-emerald-200 pt-3 text-sm font-bold text-slate-900">
                        <span>Balance as per Pass Book</span>
                        <span className="text-emerald-700">
                          {result.adjusted_balance}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Info Card */}
            <div className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Landmark className="h-5 w-5" />
              </div>

              <h3 className="font-semibold text-slate-900">
                How it works
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Start with the Cash Book bank balance and record each
                difference between the Cash Book and Pass Book.
              </p>

              <div className="mt-5 space-y-3">
                <div className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-xs font-bold text-primary-600">
                    1
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Enter balance
                    </p>
                    <p className="text-xs text-slate-500">
                      Add your Cash Book balance.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-xs font-bold text-primary-600">
                    2
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Add adjustments
                    </p>
                    <p className="text-xs text-slate-500">
                      Choose whether each item is added or deducted.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-xs font-bold text-primary-600">
                    3
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Prepare BRS
                    </p>
                    <p className="text-xs text-slate-500">
                      Calculate the adjusted Pass Book balance.
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
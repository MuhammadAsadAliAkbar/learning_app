"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import { calc } from "@/lib/api";
import {
  Plus,
  Trash2,
  Calculator,
  CheckCircle2,
  XCircle,
  BookOpen,
  Wallet,
  ArrowRight,
  Scale,
} from "lucide-react";

export default function TrialBalancePractice() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [accounts, setAccounts] = useState([
    { name: "Cash", debit: "25000", credit: "" },
    { name: "Capital", debit: "", credit: "50000" },
    { name: "Purchases", debit: "30000", credit: "" },
    { name: "Sales", debit: "", credit: "40000" },
    { name: "Creditors", debit: "", credit: "15000" },
    { name: "Debtors", debit: "20000", credit: "" },
    { name: "Furniture", debit: "30000", credit: "" },
  ]);

  const [result, setResult] = useState<any>(null);

  if (!loading && !user) {
    router.push("/login");
    return null;
  }

  const add = () => {
    setAccounts([
      ...accounts,
      {
        name: "",
        debit: "",
        credit: "",
      },
    ]);
  };

  const remove = (i: number) => {
    setAccounts(accounts.filter((_, idx) => idx !== i));
  };

  const update = (i: number, f: string, v: string) => {
    const n = [...accounts];
    (n[i] as any)[f] = v;
    setAccounts(n);
  };

  const run = async () => {
    const payload = accounts.map((a) => ({
      name: a.name,
      debit: parseFloat(a.debit) || 0,
      credit: parseFloat(a.credit) || 0,
    }));

    try {
      const r = await calc("trial-balance", payload);
      setResult(r.data);
    } catch {
      const dr = payload.reduce((s, a) => s + a.debit, 0);
      const cr = payload.reduce((s, a) => s + a.credit, 0);

      setResult({
        total_debit: dr,
        total_credit: cr,
        tallies: Math.abs(dr - cr) < 0.01,
        difference: Math.abs(dr - cr),
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
                    Trial Balance
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Enter all ledger balances and verify that total
                    Debit equals total Credit.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">

            {/* Main Card */}
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
                        Ledger Balances
                      </h2>

                      <p className="text-xs text-slate-500">
                        Add each account&apos;s debit or credit balance
                      </p>
                    </div>
                  </div>

                  <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 sm:block">
                    {accounts.length}{" "}
                    {accounts.length === 1 ? "Account" : "Accounts"}
                  </span>
                </div>
              </div>

              <div className="p-5 md:p-6">

                {/* Explanation Banner */}
                <div className="mb-5 flex gap-3 rounded-xl border border-primary-100 bg-primary-50/60 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-primary-600 shadow-sm ring-1 ring-primary-100">
                    <BookOpen className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-primary-800">
                      Trial Balance Rule
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      The total of all Debit balances should equal
                      the total of all Credit balances.
                    </p>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-slate-200">

                  {/* Table Header */}
                  <div className="hidden grid-cols-12 gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 md:grid">
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

                  {/* Rows */}
                  <div className="divide-y divide-slate-100">
                    {accounts.map((a, i) => (
                      <div
                        key={i}
                        className="group grid gap-3 p-3 transition hover:bg-slate-50/70 md:grid-cols-12 md:items-center md:px-4"
                      >
                        {/* Account */}
                        <div className="md:col-span-5">
                          <label className="mb-1 block text-xs font-medium text-slate-500 md:hidden">
                            Account
                          </label>

                          <div className="relative">
                            <BookOpen className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <input
                              className="input w-full pl-10 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
                              placeholder="Account name"
                              value={a.name}
                              onChange={(e) =>
                                update(
                                  i,
                                  "name",
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
                            value={a.debit}
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
                            value={a.credit}
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
                            onClick={() => remove(i)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                            title="Remove account"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={add}
                    className="btn-secondary flex items-center justify-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Account
                  </button>

                  <button
                    onClick={run}
                    className="btn-primary flex flex-1 items-center justify-center gap-2"
                  >
                    <Calculator className="h-4 w-4" />
                    Check Trial Balance
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Result */}
                {result && (
                  <div
                    className={`mt-6 overflow-hidden rounded-xl border ${
                      result.tallies
                        ? "border-emerald-200 bg-emerald-50/50"
                        : "border-red-200 bg-red-50/50"
                    }`}
                  >
                    {/* Result Header */}
                    <div
                      className={`flex items-center gap-3 border-b px-4 py-3 ${
                        result.tallies
                          ? "border-emerald-100"
                          : "border-red-100"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                          result.tallies
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {result.tallies ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <XCircle className="h-5 w-5" />
                        )}
                      </div>

                      <div>
                        <p
                          className={`text-sm font-semibold ${
                            result.tallies
                              ? "text-emerald-800"
                              : "text-red-800"
                          }`}
                        >
                          {result.tallies
                            ? "Trial Balance Tallies"
                            : "Trial Balance Does Not Tally"}
                        </p>

                        <p className="text-xs text-slate-500">
                          Final debit and credit comparison
                        </p>
                      </div>
                    </div>

                    <div className="p-4">

                      {/* Totals */}
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-primary-100 bg-white p-4">
                          <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                              <Wallet className="h-3.5 w-3.5" />
                            </div>

                            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                              Total Debit
                            </span>
                          </div>

                          <p className="text-2xl font-bold text-slate-800">
                            {result.total_debit}
                          </p>
                        </div>

                        <div className="rounded-xl border border-emerald-100 bg-white p-4">
                          <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                              <Scale className="h-3.5 w-3.5" />
                            </div>

                            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                              Total Credit
                            </span>
                          </div>

                          <p className="text-2xl font-bold text-slate-800">
                            {result.total_credit}
                          </p>
                        </div>
                      </div>

                      {/* Difference */}
                      {!result.tallies && (
                        <div className="mt-3 flex items-center justify-between rounded-xl border border-red-100 bg-white px-4 py-3">
                          <span className="text-sm font-medium text-slate-600">
                            Difference
                          </span>

                          <span className="font-semibold text-red-600">
                            {result.difference}
                          </span>
                        </div>
                      )}

                      {/* Success Message */}
                      {result.tallies && (
                        <div className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm text-emerald-700">
                          <CheckCircle2 className="h-4 w-4 shrink-0" />

                          <span>
                            Total Debit and Total Credit are equal.
                          </span>
                        </div>
                      )}
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
                Trial Balance
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                A trial balance helps verify that the ledger entries
                are mathematically balanced.
              </p>

              <div className="mt-5 rounded-xl border border-primary-100 bg-primary-50/50 p-4">
                <p className="text-center font-mono text-sm font-semibold text-primary-700">
                  Total Debit = Total Credit
                </p>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                  <p className="text-sm font-semibold text-slate-700">
                    1. Enter Accounts
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Add each ledger account and its balance.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                  <p className="text-sm font-semibold text-slate-700">
                    2. Enter Debit / Credit
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Put the balance in the appropriate column.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                  <p className="text-sm font-semibold text-slate-700">
                    3. Check the Totals
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Both totals should be equal for the trial balance
                    to tally.
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
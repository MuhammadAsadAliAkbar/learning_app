"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  BookOpen,
  Calculator,
  LayoutDashboard,
  LogOut,
  GraduationCap,
  ChevronRight,
  User,
} from "lucide-react";
import clsx from "clsx";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/chapters/ch1",
    label: "Chapters",
    icon: BookOpen,
  },
  {
    href: "/practice/journal",
    label: "Practice Tools",
    icon: Calculator,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col shadow-[4px_0_20px_rgba(15,23,42,0.03)]">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-slate-100">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 transition-all duration-200 group-hover:bg-primary-100 group-hover:scale-[1.03]">
            <GraduationCap className="w-5 h-5" />
          </div>

          <div className="min-w-0">
            <p className="text-[15px] font-bold text-slate-900 tracking-tight">
              AccountLearn
            </p>
            <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold mt-0.5">
              Learning Platform
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5">
        <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
          Main Menu
        </p>

        <div className="space-y-1.5">
          {links.map((l) => {
            const Icon = l.icon;

            const active =
              pathname.startsWith(l.href) ||
              (l.href.includes("chapters") &&
                pathname.startsWith("/chapters")) ||
              (l.href.includes("practice") &&
                pathname.startsWith("/practice"));

            return (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-primary-50 text-primary-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {/* Active indicator */}
                {active && (
                  <span className="absolute left-0 top-2.5 bottom-2.5 w-0.5 rounded-full bg-primary-600" />
                )}

                <span
                  className={clsx(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200",
                    active
                      ? "bg-white text-primary-600 border border-primary-100 shadow-sm"
                      : "bg-slate-50 text-slate-500 border border-slate-100 group-hover:bg-white group-hover:text-primary-600"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </span>

                <span className="flex-1">{l.label}</span>

                <ChevronRight
                  className={clsx(
                    "w-4 h-4 transition-all duration-200",
                    active
                      ? "text-primary-500 opacity-100 translate-x-0"
                      : "text-slate-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                  )}
                />
              </Link>
            );
          })}
        </div>

        {/* Learning Tip */}
        <div className="mt-7 mx-1 rounded-xl border border-emerald-100 bg-emerald-50/70 p-3.5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-white border border-emerald-100 flex items-center justify-center text-emerald-600">
              <BookOpen className="w-3.5 h-3.5" />
            </div>

            <span className="text-xs font-semibold text-emerald-800">
              Keep Learning
            </span>
          </div>

          <p className="text-[11px] leading-relaxed text-emerald-700">
            Practice regularly to strengthen your accounting concepts.
          </p>
        </div>
      </nav>

      {/* User Section */}
      <div className="p-3 border-t border-slate-100">
        <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm shrink-0">
              <User className="w-4 h-4" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-800 truncate">
                {user?.name || "Student"}
              </p>

              <p className="text-[10px] text-slate-400 mt-0.5">
                Student Account
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="mt-3 flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-semibold text-red-600 border border-red-100 bg-white hover:bg-red-50 hover:border-red-200 transition-all duration-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
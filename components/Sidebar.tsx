"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart2,
  FileText,
  Settings,
  Zap,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Analytics", href: "/analytics", icon: BarChart2 },
  { label: "Reports", href: "/reports", icon: FileText },
];

const bottomItems = [
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col bg-[#0d1117] border-r border-white/[0.06]">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.06]">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
          <Zap size={16} strokeWidth={2.5} />
        </div>
        <span className="text-sm font-semibold tracking-tight text-white">
          AI Dashboard
        </span>
      </div>

      {/* Main nav */}
      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Main
        </p>
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                active
                  ? "bg-indigo-500/15 text-indigo-300"
                  : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-100"
              }`}
            >
              <Icon
                size={17}
                strokeWidth={active ? 2.5 : 2}
                className={`shrink-0 transition-colors ${
                  active ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"
                }`}
              />
              {label}
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom nav */}
      <div className="border-t border-white/[0.06] px-3 py-4">
        {bottomItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                active
                  ? "bg-indigo-500/15 text-indigo-300"
                  : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-100"
              }`}
            >
              <Icon
                size={17}
                strokeWidth={active ? 2.5 : 2}
                className={`shrink-0 transition-colors ${
                  active ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"
                }`}
              />
              {label}
            </Link>
          );
        })}

        {/* User avatar */}
        <div className="mt-3 flex items-center gap-3 rounded-lg px-3 py-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-[11px] font-bold text-white">
            N
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-slate-300">Nicola</p>
            <p className="truncate text-[11px] text-slate-500">Pro plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { monthlyRevenue } from "@/lib/data";

const data = monthlyRevenue.map((d) => ({
  month: d.month.split(" ")[0],
  Revenue: d.revenue,
  Expenses: d.expenses,
}));

interface TooltipEntry { name?: string; value?: number; color?: string }
interface CustomTooltipProps { active?: boolean; payload?: TooltipEntry[]; label?: string }

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#161b22] px-4 py-3 shadow-2xl">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
      {payload.map((entry) => (
        <div key={String(entry.name)} className="flex items-center gap-2 text-sm">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-400">{String(entry.name)}</span>
          <span className="ml-auto pl-6 font-semibold text-white">
            SAR {Number(entry.value).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function RevenueChart() {
  return (
    <div
      className="rounded-2xl border border-white/[0.06] bg-[#0d1117] p-6"
      style={{ boxShadow: "0 8px 40px -4px rgba(0,0,0,0.85), 0 2px 12px -2px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.04)" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-200">Revenue vs Expenses</h2>
          <p className="mt-0.5 text-xs text-slate-500">Mar 2025 – Feb 2026</p>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-medium text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Revenue
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-slate-500" />
            Expenses
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGlow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#34d399" stopOpacity={1} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              dy={8}
            />

            <YAxis
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              width={36}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 }} />

            <Line
              type="monotone"
              dataKey="Expenses"
              stroke="#475569"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#94a3b8", strokeWidth: 0 }}
            />

            <Line
              type="monotone"
              dataKey="Revenue"
              stroke="url(#revenueGlow)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "#10b981", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

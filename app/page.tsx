import {
  DollarSign,
  Users,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import MetricCard from "@/components/MetricCard";
import RevenueChart from "@/components/RevenueChart";
import { monthlyRevenue, weeklyUsers } from "@/lib/data";

const revenueSparkline = monthlyRevenue.map((d) => d.revenue);
const usersSparkline = weeklyUsers.map((d) => d.users);

// Month-over-month growth rate derived from revenue data
const growthSparkline = monthlyRevenue
  .slice(1)
  .map((d, i) =>
    parseFloat(
      (((d.revenue - monthlyRevenue[i].revenue) / monthlyRevenue[i].revenue) * 100).toFixed(2)
    )
  );

// AI insights activity index (session quality score per week, derived from users trend)
const aiInsightsSparkline = weeklyUsers.map((d, i, arr) =>
  i === 0 ? 60 : Math.round(60 + ((d.users - arr[0].users) / arr[0].users) * 100)
);

const cards = [
  {
    title: "Total Revenue",
    value: "SAR 284,500",
    change: "+12.5%",
    trend: "up" as const,
    period: "vs last month",
    icon: DollarSign,
    sparklineData: revenueSparkline,
    accent: {
      bg: "bg-emerald-500/10",
      icon: "text-emerald-400",
      glow: "0 8px 32px -8px rgba(16,185,129,0.15)",
      spark: "#10b981",
      badge: "bg-emerald-500/15",
      badgeText: "text-emerald-400",
    },
  },
  {
    title: "Active Users",
    value: "1,847",
    change: "+8.2%",
    trend: "up" as const,
    period: "vs last month",
    icon: Users,
    sparklineData: usersSparkline,
    accent: {
      bg: "bg-blue-500/10",
      icon: "text-blue-400",
      glow: "0 8px 32px -8px rgba(59,130,246,0.15)",
      spark: "#3b82f6",
      badge: "bg-blue-500/15",
      badgeText: "text-blue-400",
    },
  },
  {
    title: "Growth Rate",
    value: "15.3%",
    change: "+2.1%",
    trend: "up" as const,
    period: "vs last quarter",
    icon: TrendingUp,
    sparklineData: growthSparkline,
    accent: {
      bg: "bg-indigo-500/10",
      icon: "text-indigo-400",
      glow: "0 8px 32px -8px rgba(99,102,241,0.15)",
      spark: "#6366f1",
      badge: "bg-indigo-500/15",
      badgeText: "text-indigo-400",
    },
  },
  {
    title: "AI Insights",
    value: "18 Generated",
    change: "+6 new",
    trend: "up" as const,
    period: "this week",
    icon: Sparkles,
    sparklineData: aiInsightsSparkline,
    accent: {
      bg: "bg-violet-500/10",
      icon: "text-violet-400",
      glow: "0 8px 32px -8px rgba(139,92,246,0.15)",
      spark: "#a78bfa",
      badge: "bg-violet-500/15",
      badgeText: "text-violet-400",
    },
  },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Last updated Feb 2026 · All figures in SAR
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <MetricCard key={card.title} {...card} />
        ))}
      </div>

      <div className="mt-6">
        <RevenueChart />
      </div>
    </div>
  );
}

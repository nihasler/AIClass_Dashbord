import { DollarSign, ShoppingBag, TrendingUp, ReceiptText } from "lucide-react";
import MetricCard from "@/components/MetricCard";
import RevenueChart from "@/components/RevenueChart";
import { supabase } from "@/lib/supabase";

async function getDashboardData() {
  const { data: sales, error } = await supabase
    .from("sales")
    .select("date, amount_sar, status")
    .order("date", { ascending: true });

  if (error || !sales) return null;

  const completed = sales.filter((s) => s.status === "Completed");
  const active = sales.filter((s) => s.status !== "Returned");

  // Group completed revenue by month
  const revenueByMonth: Record<string, number> = {};
  for (const s of completed) {
    const month = s.date.slice(0, 7);
    revenueByMonth[month] = (revenueByMonth[month] || 0) + s.amount_sar;
  }

  // Group active orders by month
  const ordersByMonth: Record<string, number> = {};
  for (const s of active) {
    const month = s.date.slice(0, 7);
    ordersByMonth[month] = (ordersByMonth[month] || 0) + 1;
  }

  const months = Object.keys(revenueByMonth).sort();
  const monthlyRevenue = months.map((m) => revenueByMonth[m]);
  const monthlyOrders = months.map((m) => ordersByMonth[m] ?? 0);

  const totalRevenue = completed.reduce((sum, s) => sum + s.amount_sar, 0);
  const totalOrders = active.length;
  const avgOrderValue = totalRevenue / completed.length;

  // Month-over-month changes
  const lastRev = monthlyRevenue.at(-1) ?? 0;
  const prevRev = monthlyRevenue.at(-2) ?? 0;
  const revChange = prevRev ? ((lastRev - prevRev) / prevRev) * 100 : 0;

  const lastOrders = monthlyOrders.at(-1) ?? 0;
  const prevOrders = monthlyOrders.at(-2) ?? 0;
  const ordersChange = prevOrders ? ((lastOrders - prevOrders) / prevOrders) * 100 : 0;

  // Monthly growth rate sparkline
  const growthSparkline = monthlyRevenue.slice(1).map((v, i) => {
    const prev = monthlyRevenue[i];
    return prev ? parseFloat(((v - prev) / prev * 100).toFixed(1)) : 0;
  });
  const currentGrowth = growthSparkline.at(-1) ?? 0;
  const prevGrowth = growthSparkline.at(-2) ?? 0;
  const growthChange = currentGrowth - prevGrowth;

  // Monthly avg order value sparkline
  const monthlyAvg = months.map((m) => {
    const monthCompleted = completed.filter((s) => s.date.startsWith(m));
    const monthRev = monthCompleted.reduce((sum, s) => sum + s.amount_sar, 0);
    return monthCompleted.length ? Math.round(monthRev / monthCompleted.length) : 0;
  });
  const lastAvg = monthlyAvg.at(-1) ?? 0;
  const prevAvg = monthlyAvg.at(-2) ?? 0;
  const avgChange = prevAvg ? ((lastAvg - prevAvg) / prevAvg) * 100 : 0;

  // Last 30 days for chart (relative to latest record)
  const maxDate = new Date(sales.at(-1)!.date);
  const cutoff = new Date(maxDate);
  cutoff.setDate(cutoff.getDate() - 30);

  const last30ByDay: Record<string, number> = {};
  for (const s of completed) {
    const d = new Date(s.date);
    if (d >= cutoff && d <= maxDate) {
      const key = s.date;
      last30ByDay[key] = (last30ByDay[key] || 0) + s.amount_sar;
    }
  }

  const chartData = Object.keys(last30ByDay)
    .sort()
    .map((date) => ({
      day: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      Revenue: last30ByDay[date],
    }));

  const latestMonth = new Date(maxDate).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  const earliestMonth = new Date(sales[0].date).toLocaleDateString("en-US", { month: "short", year: "numeric" });

  return {
    totalRevenue,
    totalOrders,
    currentGrowth,
    avgOrderValue,
    monthlyRevenue,
    monthlyOrders,
    growthSparkline,
    monthlyAvg,
    revChange,
    ordersChange,
    growthChange,
    avgChange,
    chartData,
    latestMonth,
    earliestMonth,
  };
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  const cards = [
    {
      title: "Total Revenue",
      value: data ? `SAR ${data.totalRevenue.toLocaleString()}` : "—",
      change: data ? `${data.revChange >= 0 ? "+" : ""}${data.revChange.toFixed(1)}%` : "—",
      trend: (data?.revChange ?? 0) >= 0 ? ("up" as const) : ("down" as const),
      period: "vs last month",
      icon: DollarSign,
      sparklineData: data?.monthlyRevenue ?? [0],
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
      title: "Total Orders",
      value: data ? data.totalOrders.toLocaleString() : "—",
      change: data ? `${data.ordersChange >= 0 ? "+" : ""}${data.ordersChange.toFixed(1)}%` : "—",
      trend: (data?.ordersChange ?? 0) >= 0 ? ("up" as const) : ("down" as const),
      period: "vs last month",
      icon: ShoppingBag,
      sparklineData: data?.monthlyOrders ?? [0],
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
      value: data ? `${data.currentGrowth.toFixed(1)}%` : "—",
      change: data ? `${data.growthChange >= 0 ? "+" : ""}${data.growthChange.toFixed(1)}%` : "—",
      trend: (data?.growthChange ?? 0) >= 0 ? ("up" as const) : ("down" as const),
      period: "vs prior month",
      icon: TrendingUp,
      sparklineData: data?.growthSparkline ?? [0],
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
      title: "Avg Order Value",
      value: data ? `SAR ${Math.round(data.avgOrderValue).toLocaleString()}` : "—",
      change: data ? `${data.avgChange >= 0 ? "+" : ""}${data.avgChange.toFixed(1)}%` : "—",
      trend: (data?.avgChange ?? 0) >= 0 ? ("up" as const) : ("down" as const),
      period: "vs last month",
      icon: ReceiptText,
      sparklineData: data?.monthlyAvg ?? [0],
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

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          {data
            ? `${data.earliestMonth} – ${data.latestMonth} · All figures in SAR`
            : "Loading data…"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <MetricCard key={card.title} {...card} />
        ))}
      </div>

      <div className="mt-6">
        <RevenueChart data={data?.chartData ?? []} />
      </div>
    </div>
  );
}

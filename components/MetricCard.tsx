import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

interface SparklineProps {
  data: number[];
  color: string;
}

function Sparkline({ data, color }: SparklineProps) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 32;
  const pad = 2;

  const points = data
    .map((v, i) => {
      const x = pad + (i / (data.length - 1)) * (w - pad * 2);
      const y = h - pad - ((v - min) / range) * (h - pad * 2);
      return `${x},${y}`;
    })
    .join(" ");

  const lastX = pad + ((data.length - 1) / (data.length - 1)) * (w - pad * 2);
  const lastY = h - pad - ((data[data.length - 1] - min) / range) * (h - pad * 2);

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polyline points={points} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <circle cx={lastX} cy={lastY} r="2.5" fill={color} />
    </svg>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  period: string;
  icon: LucideIcon;
  sparklineData: number[];
  accent: {
    bg: string;
    icon: string;
    glow: string;
    spark: string;
    badge: string;
    badgeText: string;
  };
}

export default function MetricCard({
  title,
  value,
  change,
  trend,
  period,
  icon: Icon,
  sparklineData,
  accent,
}: MetricCardProps) {
  const isUp = trend === "up";

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d1117] p-6 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        boxShadow: `0 4px 24px -4px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.04), ${accent.glow}`,
      }}
    >
      {/* Subtle top gradient */}
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-px ${accent.bg}`} />

      {/* Header row */}
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent.bg} ring-1 ring-white/10`}>
          <Icon size={18} className={accent.icon} strokeWidth={2} />
        </div>
        <Sparkline data={sparklineData} color={accent.spark} />
      </div>

      {/* Value */}
      <div className="mt-4">
        <p className="text-[13px] font-medium text-slate-400">{title}</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight text-white">{value}</p>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${accent.badge} ${accent.badgeText}`}
        >
          {isUp ? (
            <TrendingUp size={10} strokeWidth={2.5} />
          ) : (
            <TrendingDown size={10} strokeWidth={2.5} />
          )}
          {change}
        </span>
        <span className="text-[11px] text-slate-500">{period}</span>
      </div>
    </div>
  );
}

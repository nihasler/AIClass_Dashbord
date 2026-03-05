import { supabase } from "@/lib/supabase";

const statusStyles: Record<string, { badge: string; dot: string }> = {
  Completed: { badge: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20", dot: "bg-emerald-400" },
  Processing: { badge: "bg-amber-500/10 text-amber-400 ring-amber-500/20", dot: "bg-amber-400" },
  Shipped:    { badge: "bg-blue-500/10 text-blue-400 ring-blue-500/20",   dot: "bg-blue-400"   },
  Returned:   { badge: "bg-rose-500/10 text-rose-400 ring-rose-500/20",   dot: "bg-rose-400"   },
};

async function getSales() {
  const { data, error } = await supabase
    .from("sales")
    .select("*")
    .order("date", { ascending: false });
  if (error) return [];
  return data;
}

export default async function ReportsPage() {
  const sales = await getSales();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">Reports</h1>
        <p className="mt-1 text-sm text-slate-500">
          {sales.length} transactions · sorted by date
        </p>
      </div>

      <div
        className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d1117]"
        style={{ boxShadow: "0 8px 40px -4px rgba(0,0,0,0.85), 0 2px 12px -2px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.04)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Date", "Customer", "Product", "Category", "Amount (SAR)", "Status", "Payment", "Notes"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sales.map((row, i) => {
                const style = statusStyles[row.status] ?? statusStyles.Processing;
                const isLast = i === sales.length - 1;
                return (
                  <tr
                    key={row.id}
                    className={`transition-colors hover:bg-white/[0.025] ${!isLast ? "border-b border-white/[0.04]" : ""}`}
                  >
                    <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-slate-400">
                      {new Date(row.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3.5 text-slate-200">
                      {row.customer_name ?? (
                        <span className="italic text-slate-600">Unknown</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-slate-300">{row.product}</td>
                    <td className="px-5 py-3.5">
                      <span className="rounded-md bg-white/[0.05] px-2 py-0.5 text-xs text-slate-400">
                        {row.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right font-semibold tabular-nums text-white">
                      {Number(row.amount_sar).toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ring-inset ${style.badge}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400">
                      {row.payment_method ?? <span className="text-slate-600">—</span>}
                    </td>
                    <td className="max-w-[200px] px-5 py-3.5 text-xs text-slate-500">
                      {row.notes ?? ""}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

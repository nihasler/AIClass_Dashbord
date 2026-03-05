export default function Loading() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="h-7 w-24 rounded-lg bg-white/[0.06] animate-pulse" />
        <div className="mt-2 h-4 w-40 rounded-lg bg-white/[0.04] animate-pulse" />
      </div>

      <div
        className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d1117]"
        style={{ boxShadow: "0 8px 40px -4px rgba(0,0,0,0.85)" }}
      >
        <div className="border-b border-white/[0.06] px-5 py-3.5 flex gap-8">
          {["w-12", "w-24", "w-28", "w-20", "w-16", "w-16", "w-20", "w-24"].map((w, i) => (
            <div key={i} className={`h-3 ${w} rounded bg-white/[0.05] animate-pulse`} />
          ))}
        </div>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex gap-8 border-b border-white/[0.04] px-5 py-3.5">
            {["w-20", "w-32", "w-36", "w-24", "w-14", "w-20", "w-24", "w-28"].map((w, j) => (
              <div
                key={j}
                className={`h-3.5 ${w} rounded bg-white/[0.04] animate-pulse`}
                style={{ animationDelay: `${i * 40}ms` }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="h-7 w-32 rounded-lg bg-white/[0.06] animate-pulse" />
        <div className="mt-2 h-4 w-56 rounded-lg bg-white/[0.04] animate-pulse" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d1117] p-6"
            style={{ boxShadow: "0 8px 40px -4px rgba(0,0,0,0.85), 0 2px 12px -2px rgba(0,0,0,0.7)" }}
          >
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-xl bg-white/[0.06] animate-pulse" />
              <div className="h-8 w-20 rounded bg-white/[0.04] animate-pulse" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-3.5 w-24 rounded bg-white/[0.05] animate-pulse" />
              <div className="h-7 w-36 rounded bg-white/[0.07] animate-pulse" />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-5 w-16 rounded-full bg-white/[0.05] animate-pulse" />
              <div className="h-3.5 w-20 rounded bg-white/[0.04] animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-white/[0.06] bg-[#0d1117] p-6" style={{ height: 340 }}>
        <div className="h-5 w-32 rounded bg-white/[0.06] animate-pulse" />
        <div className="mt-6 h-64 rounded bg-white/[0.03] animate-pulse" />
      </div>
    </div>
  );
}

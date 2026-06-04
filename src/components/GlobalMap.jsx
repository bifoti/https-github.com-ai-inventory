export default function GlobalMap() {
    const bars = [42, 56, 48, 70, 64, 86, 78, 96, 88, 104];
    const stockGroups = [
        ["Fast moving", "42 items", "text-emerald-200"],
        ["Low stock", "18 items", "text-amber-200"],
        ["Slow moving", "11 items", "text-violet-200"],
    ];

    return (
        <div className="relative h-full w-full">
            <div className="panel absolute inset-x-0 top-0 mx-auto w-full max-w-[760px] rounded-lg p-5 shadow-[0_24px_90px_rgba(0,0,0,0.38)] md:top-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-400/10 pb-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-cyan-100/40">
                            Live Inventory Command Center
                        </p>
                        <h2 className="mt-2 text-2xl font-bold text-white">
                            Weekly Retail Forecast
                        </h2>
                    </div>
                    <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-200">
                        System healthy
                    </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-lg border border-white/10 bg-slate-950/35 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-cyan-50/45">Demand trend</p>
                                <p className="mt-1 text-3xl font-black text-cyan-200">+18.4%</p>
                            </div>
                            <span className="rounded-lg bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
                                Next 7 days
                            </span>
                        </div>

                        <div className="mt-6 flex h-32 items-end gap-2">
                            {bars.map((height, index) => (
                                <div
                                    key={index}
                                    className="chart-bar flex-1 rounded-t-lg bg-gradient-to-t from-cyan-500/40 to-cyan-200"
                                    style={{
                                        height: `${height}%`,
                                        animationDelay: `${index * 80}ms`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <div className="rounded-lg border border-white/10 bg-slate-950/35 p-4">
                            <p className="text-sm text-cyan-50/45">Recommended bundle</p>
                            <div className="mt-3 flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-lg font-bold text-white">Bread + Jam</p>
                                    <p className="text-sm text-cyan-50/45">Lift 2.5x, confidence 31%</p>
                                </div>
                                <span className="rounded-lg bg-violet-400/10 px-3 py-2 text-sm font-bold text-violet-200">
                                    MBA
                                </span>
                            </div>
                        </div>

                        <div className="rounded-lg border border-amber-400/15 bg-amber-400/10 p-4">
                            <p className="text-sm text-amber-100/65">Restock alert</p>
                            <p className="mt-2 text-xl font-black text-amber-200">Milo 1kg</p>
                            <p className="mt-1 text-sm leading-6 text-cyan-50/50">
                                Current stock can cover 3.2 days. Suggested reorder: 180 units.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {stockGroups.map(([label, value, color]) => (
                        <div key={label} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                            <p className="text-xs uppercase tracking-[0.14em] text-cyan-50/35">{label}</p>
                            <p className={`mt-2 text-2xl font-black ${color}`}>{value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

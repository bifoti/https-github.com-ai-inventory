const overviewItems = [
    "Predict product demand from historical transaction patterns.",
    "Suggest bundle items using support, confidence, and lift.",
    "Generate restock and promotion recommendations for slow or fast-moving items.",
    "Connect analytics output with dashboard views and Telegram alerts.",
];

const stats = [
    { label: "MODEL ACCURACY", value: "94.1%", color: "text-cyan-300" },
    { label: "TRANSACTIONS", value: "12K+", color: "text-emerald-300" },
    { label: "ALERTS GENERATED", value: "320+", color: "text-amber-300" },
];

export default function OverviewStats() {
    return (
        <section id="overview" className="grid gap-5 py-5 xl:grid-cols-[1.25fr_0.42fr]">
            <div className="panel rounded-lg p-7 md:p-8">
                <div className="flex items-start justify-between gap-6">
                    <div className="max-w-2xl">
                        <h3 className="text-4xl font-bold tracking-normal text-white">
                            Project Overview
                        </h3>

                        <div className="mt-6 space-y-4">
                            {overviewItems.map((item) => (
                                <div key={item} className="flex items-start gap-4">
                                    <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-cyan-400 text-[10px] font-black text-slate-950">
                                        OK
                                    </div>
                                    <p className="text-lg leading-8 text-cyan-50/65">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="hidden h-24 w-24 items-center justify-center rounded-lg border border-cyan-400/15 bg-cyan-400/5 text-lg font-black text-cyan-200 shadow-[0_0_22px_rgba(34,211,238,0.08)] md:flex">
                        AI
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                {stats.map((item) => (
                    <div key={item.label} className="panel rounded-lg p-6">
                        <div className="text-sm tracking-[0.18em] text-cyan-50/35">
                            {item.label}
                        </div>
                        <div className={`mt-3 text-5xl font-black tracking-normal ${item.color}`}>
                            {item.value}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

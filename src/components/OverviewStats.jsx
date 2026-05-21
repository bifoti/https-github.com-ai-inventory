const overviewItems = [
    "Predict product demand.",
    "Suggest bundle items using MBA.",
    "Generate restock / promotion suggestions.",
    "Connect with Telegram bot / analytics dashboard.",
];

const stats = [
    { label: "ACCURACY", value: "94.1%", color: "text-cyan-300" },
    { label: "PRODUCTS", value: "12K+", color: "text-emerald-300" },
    { label: "ALERTS", value: "320+", color: "text-violet-300" },
];

export default function OverviewStats() {
    return (
        <section className="grid gap-5 py-5 xl:grid-cols-[1.25fr_0.42fr]">
            <div className="panel rounded-[1.8rem] p-7 md:p-8">
                <div className="flex items-start justify-between gap-6">
                    <div className="max-w-2xl">
                        <h3 className="text-4xl font-bold tracking-tight text-white">
                            Project Overview
                        </h3>

                        <div className="mt-6 space-y-4">
                            {overviewItems.map((item) => (
                                <div key={item} className="flex items-start gap-4">
                                    <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cyan-400 text-sm font-bold text-slate-950">
                                        ✓
                                    </div>
                                    <p className="text-lg leading-8 text-cyan-50/65">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="hidden h-24 w-24 items-center justify-center rounded-3xl border border-cyan-400/15 bg-cyan-400/5 text-5xl shadow-[0_0_22px_rgba(34,211,238,0.08)] md:flex">
                        🤖
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                {stats.map((item) => (
                    <div key={item.label} className="panel rounded-[1.5rem] p-6">
                        <div className="text-sm tracking-[0.18em] text-cyan-50/35">
                            {item.label}
                        </div>
                        <div className={`mt-3 text-5xl font-black tracking-tight ${item.color}`}>
                            {item.value}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
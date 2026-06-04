const features = [
    {
        title: "Demand Prediction",
        desc: "Forecast which products are likely to rise or drop in demand before stock decisions are made.",
        icon: "01",
        text: "text-cyan-300",
        ring: "border-cyan-400/10",
        bg: "from-cyan-400/20 to-cyan-500/5",
    },
    {
        title: "Bundle Recommendation",
        desc: "Use Market Basket Analysis to suggest product pairs that customers often buy together.",
        icon: "02",
        text: "text-violet-300",
        ring: "border-violet-400/10",
        bg: "from-violet-400/20 to-violet-500/5",
    },
    {
        title: "AI Automation",
        desc: "Generate restock alerts, promotion suggestions, and Telegram-ready inventory updates.",
        icon: "03",
        text: "text-emerald-300",
        ring: "border-emerald-400/10",
        bg: "from-emerald-400/20 to-emerald-500/5",
    },
];

export default function Features() {
    return (
        <section id="features" className="grid gap-5 py-5 lg:grid-cols-3">
            {features.map((item) => (
                <article key={item.title} className={`panel rounded-lg p-7 ${item.ring}`}>
                    <div
                        className={`grid h-14 w-14 place-items-center rounded-lg border border-white/10 bg-gradient-to-br ${item.bg} text-sm font-black ${item.text}`}
                    >
                        {item.icon}
                    </div>

                    <h3 className={`mt-6 text-3xl font-bold tracking-normal ${item.text}`}>
                        {item.title}
                    </h3>

                    <p className="mt-3 max-w-md text-base leading-8 text-cyan-50/50">
                        {item.desc}
                    </p>

                    <a href="#overview" className={`mt-6 inline-flex font-semibold ${item.text}`}>
                        Explore
                    </a>
                </article>
            ))}
        </section>
    );
}

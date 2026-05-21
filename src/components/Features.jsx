const features = [
    {
        title: "Demand Prediction",
        desc: "Predict future product demand with high accuracy.",
        icon: "↗",
        text: "text-cyan-300",
        ring: "border-cyan-400/10",
        bg: "from-cyan-400/20 to-cyan-500/5",
    },
    {
        title: "MBA Recommendation",
        desc: "Recommend products bought together to increase cart value.",
        icon: "◫",
        text: "text-violet-300",
        ring: "border-violet-400/10",
        bg: "from-violet-400/20 to-violet-500/5",
    },
    {
        title: "AI Automation",
        desc: "Get automated alerts, a chatbot interface, and smart inventory actions.",
        icon: "⌘",
        text: "text-emerald-300",
        ring: "border-emerald-400/10",
        bg: "from-emerald-400/20 to-emerald-500/5",
    },
];

export default function Features() {
    return (
        <section className="grid gap-5 py-4 lg:grid-cols-3">
            {features.map((item) => (
                <div key={item.title} className={`panel rounded-[1.7rem] p-7 ${item.ring}`}>
                    <div
                        className={`grid h-16 w-16 place-items-center rounded-2xl border border-white/5 bg-gradient-to-br ${item.bg} text-3xl ${item.text}`}
                    >
                        {item.icon}
                    </div>

                    <h3 className={`mt-6 text-4xl font-bold tracking-tight ${item.text}`}>
                        {item.title}
                    </h3>

                    <p className="mt-3 max-w-md text-base leading-8 text-cyan-50/50">
                        {item.desc}
                    </p>

                    <button className={`mt-6 font-semibold ${item.text}`}>
                        Explore →
                    </button>
                </div>
            ))}
        </section>
    );
}
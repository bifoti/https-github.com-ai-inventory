import { Link } from "react-router-dom";
import GlobalMap from "./GlobalMap";

const analyticsUrl = "http://150.109.93.27:8501/";

export default function Hero() {
    return (
        <section className="grid items-center gap-5 py-6 md:gap-8 md:py-8 xl:grid-cols-[0.95fr_1.05fr] xl:py-10">
            <div className="z-10 max-w-3xl">
                <div className="mb-5 inline-flex rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-cyan-200/75">
                    AI Retail Decision System
                </div>

                <h1 className="hero-title glow-text">
                    Forecast Demand.
                    <br />
                    Recommend Items.
                    <br />
                    Automate Restock.
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-cyan-50/55 md:text-lg">
                    AI Inventory Assistant helps retailers forecast product demand, discover
                    market basket patterns, and trigger stock actions from one focused dashboard.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                    <a
                        href={analyticsUrl}
                        className="rounded-lg bg-gradient-to-r from-cyan-300 to-emerald-300 px-6 py-4 font-semibold text-slate-950 shadow-[0_0_30px_rgba(45,212,191,0.24)] transition hover:translate-y-[-1px]"
                    >
                        Open Analytics
                    </a>

                    <a
                        href="#features"
                        className="rounded-lg border border-cyan-400/20 bg-[#071523]/70 px-6 py-4 text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-400/5"
                    >
                        View Features
                    </a>

                    <Link
                        to="/about"
                        className="rounded-lg border border-cyan-400/20 bg-[#071523]/70 px-6 py-4 text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-400/5"
                    >
                        About
                    </Link>
                </div>
            </div>

            <div className="relative min-h-[140px] overflow-hidden rounded-lg md:min-h-[420px] md:overflow-visible xl:min-h-[500px]">
                <div className="absolute inset-0 flex items-center justify-center">
                    <GlobalMap />
                </div>
            </div>
        </section>
    );
}

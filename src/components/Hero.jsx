import { Link } from "react-router-dom";
import GlobalMap from "./GlobalMap";

export default function Hero() {
    return (
        <section className="grid items-center gap-8 py-10 xl:grid-cols-[1.02fr_0.98fr] xl:py-14">
            <div className="z-10 max-w-3xl">
                <div className="mb-5 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-cyan-200/75">
                    Intelligent Retail Operations
                </div>

                <h1 className="hero-title glow-text">
                    Smart Demand
                    <br />
                    Prediction,
                    <br />
                    Product Recommendation,
                    <br />
                    and Inventory
                    <br />
                    Automation System
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-cyan-50/55 md:text-lg">
                    Build smarter retail workflows with forecasting, market basket analysis,
                    and automated inventory actions in one futuristic dashboard.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">

                    {/* Dashboard button */}
                    <button className="rounded-2xl bg-gradient-to-r from-cyan-300 to-emerald-300 px-6 py-4 font-semibold text-slate-950 shadow-[0_0_30px_rgba(45,212,191,0.28)] transition hover:scale-[1.02]">
                        Go to Dashboard
                    </button>

                    {/* Analytics button */}
                    <button
                        onClick={() => window.location.href = "http://150.109.93.27:8501"}
                        className="rounded-2xl border border-cyan-400/20 bg-[#071523]/70 px-6 py-4 text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-400/5"
                    >
                        View Analytics
                    </button>

                    {/* About button */}
                    <button
                        onClick={() => window.location.href = "/about"}
                        className="rounded-2xl border border-cyan-400/20 bg-[#071523]/70 px-6 py-4 text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-400/5"
                    >
                        About
                    </button>
                </div>
            </div>

            <div className="relative min-h-[430px] xl:min-h-[600px]">
                <div className="absolute inset-0 rounded-[2rem] border border-cyan-400/10 bg-[radial-gradient(circle_at_center,rgba(10,30,50,0.42),rgba(2,11,22,0.12))]" />

                <div className="absolute right-0 top-6 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="absolute bottom-6 right-16 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

                <div className="absolute inset-0 flex items-center justify-center">
                    <GlobalMap />
                </div>
            </div>
        </section>
    );
}
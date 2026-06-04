import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const analyticsUrl = "http://150.109.93.27:8501/";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${
                scrolled
                    ? "bg-[#03111dcc] backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
                    : "bg-transparent"
            }`}
        >
            <div className="flex w-full items-center justify-between border-b border-cyan-400/10 px-4 py-5 md:px-6 xl:px-8 2xl:px-10">
                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-br from-cyan-300 to-emerald-300 font-bold text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.24)]"
                    >
                        AI
                    </Link>

                    <div>
                        <div className="text-[1.35rem] font-semibold text-slate-100">
                            AI Inventory Assistant
                        </div>
                        <div className="text-sm text-cyan-100/45">
                            Predict. Recommend. Automate.
                        </div>
                    </div>
                </div>

                <nav className="hidden items-center gap-5 md:flex">
                    <a href="#features" className="text-cyan-50/65 hover:text-cyan-200">
                        Features
                    </a>
                    <a href="#overview" className="text-cyan-50/65 hover:text-cyan-200">
                        Overview
                    </a>
                    <a href={analyticsUrl} className="text-cyan-300 hover:text-cyan-200">
                        View Analytics
                    </a>
                    <Link
                        to="/about"
                        className="rounded-lg border border-cyan-400/25 px-3 py-1.5 text-cyan-200 hover:bg-cyan-400/5"
                    >
                        About
                    </Link>
                </nav>
            </div>
        </header>
    );
}

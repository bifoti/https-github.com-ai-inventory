import { useEffect, useState } from "react";

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
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
                    ? "bg-[#03111dcc] backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
                    : "bg-transparent"
                }`}
        >
            <div className="flex w-full items-center justify-between px-4 py-6 md:px-6 xl:px-8 2xl:px-10 border-b border-cyan-400/10">

                {/* LEFT */}
                <div className="flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-emerald-300 font-bold text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.28)]">
                        AI
                    </div>

                    <div>
                        <div className="text-[1.35rem] font-semibold text-slate-100">
                            Analysis Page
                        </div>
                        <div className="text-sm text-cyan-100/45">
                            Predict. Recommend. Automate.
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="hidden items-center gap-5 md:flex">
                    <div className="flex -space-x-2">
                        <div className="grid h-10 w-10 place-items-center rounded-full border border-cyan-400/70 bg-[#041321] text-xs text-cyan-300">
                            AT
                        </div>
                    </div>

                    <div className="h-7 w-px bg-cyan-400/20" />

                    <button className="text-cyan-300 hover:text-cyan-200">
                        View Analytics
                    </button>

                    <button className="rounded-md border border-cyan-400/25 px-3 py-1.5 text-cyan-200 hover:bg-cyan-400/5">
                        About
                    </button>
                </div>
            </div>
        </header>
    );
}
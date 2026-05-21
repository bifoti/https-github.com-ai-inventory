export default function GlobalMap() {
    return (
        <div className="relative w-full h-full px-0">
            <svg
                className="h-full w-full"
                viewBox="0 0 900 520"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <filter id="glowCyan" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <pattern
                        id="dotPattern"
                        x="0"
                        y="0"
                        width="12"
                        height="12"
                        patternUnits="userSpaceOnUse"
                    >
                        <circle cx="2" cy="2" r="1.45" fill="rgba(110,255,245,0.18)" />
                    </pattern>

                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ffd84d" />
                        <stop offset="100%" stopColor="#ffe97f" />
                    </linearGradient>
                </defs>

                <circle cx="650" cy="150" r="170" fill="rgba(0,255,231,0.08)" />
                <circle cx="720" cy="340" r="190" fill="rgba(0,255,231,0.06)" />

                <g opacity="0.95">
                    <path d="M95 190 C150 120, 240 100, 315 120 C360 132, 385 160, 405 185 C430 220, 425 248, 395 260 C350 277, 275 270, 210 262 C155 255, 110 238, 90 215 C82 205, 84 198, 95 190Z" fill="url(#dotPattern)" />
                    <path d="M345 175 C380 130, 470 108, 560 122 C650 136, 715 160, 777 205 C820 236, 828 275, 792 300 C745 332, 650 340, 560 332 C490 326, 420 312, 380 280 C342 250, 326 205, 345 175Z" fill="url(#dotPattern)" />
                    <path d="M530 310 C560 300, 605 304, 635 320 C660 334, 672 358, 662 378 C647 405, 597 413, 560 402 C527 392, 510 360, 517 335 C520 323, 523 315, 530 310Z" fill="url(#dotPattern)" />
                    <path d="M720 355 C744 344, 785 348, 810 365 C830 378, 835 398, 824 410 C808 428, 774 430, 746 420 C720 411, 706 392, 709 374 C710 366, 714 359, 720 355Z" fill="url(#dotPattern)" />
                </g>

                <path d="M180 210 Q260 110 355 210" className="map-arc" />
                <path d="M470 180 Q560 145 655 260" className="map-arc delay-1" />
                <path d="M610 260 Q690 120 790 165" className="map-arc delay-2" />
                <path d="M350 210 Q495 85 680 220" className="map-arc delay-3" />

                <path id="path1" d="M180 210 Q260 110 355 210" fill="none" />
                <path id="path2" d="M470 180 Q560 145 655 260" fill="none" />
                <path id="path3" d="M610 260 Q690 120 790 165" fill="none" />
                <path id="path4" d="M350 210 Q495 85 680 220" fill="none" />

                <circle r="5" className="travel-dot">
                    <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#path1" />
                    </animateMotion>
                </circle>

                <circle r="5" className="travel-dot">
                    <animateMotion dur="4.8s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#path2" />
                    </animateMotion>
                </circle>

                <circle r="5" className="travel-dot">
                    <animateMotion dur="5.5s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#path3" />
                    </animateMotion>
                </circle>

                <circle r="5" className="travel-dot">
                    <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#path4" />
                    </animateMotion>
                </circle>

                <g filter="url(#glowCyan)">
                    <circle cx="180" cy="210" r="4.5" className="map-node" />
                    <circle cx="355" cy="210" r="4.5" className="map-node" />
                    <circle cx="470" cy="180" r="4.5" className="map-node" />
                    <circle cx="655" cy="260" r="4.5" className="map-node" />
                    <circle cx="610" cy="260" r="4.5" className="map-node" />
                    <circle cx="790" cy="165" r="4.5" className="map-node" />
                    <circle cx="680" cy="220" r="4.5" className="map-node" />
                </g>
            </svg>

            <div className="panel absolute left-[6%] top-[56%] max-w-[280px] rounded-3xl p-5">
                <h3 className="text-3xl font-bold tracking-tight text-white">
                    
                </h3>
                <p className="mt-3 text-sm leading-7 text-cyan-50/55">
                    Point-to-point animated connections from multiple regions into your
                    intelligent network.
                </p>
                <span className="mt-4 inline-block font-semibold text-cyan-300">
                    Explore Global Coverage
                </span>
            </div>
        </div>
    );
}
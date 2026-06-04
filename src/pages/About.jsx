import { useEffect, useRef, useState } from "react";
import profile from "../assets/profile.jpeg";

// ── Typewriter Hook ──────────────────────────────────────────────────────────
function useTypewriter(words, speed = 100, pause = 1800) {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % words.length);
      }, speed / 2);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return words[wordIdx].slice(0, charIdx);
}

// ── Counter Hook ─────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

// ── Intersection Observer Hook ───────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon, title, accent, levels, example, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="stat-card"
      style={{
        animationDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <div className="card-icon" style={{ color: accent }}>{icon}</div>
      <h3 className="card-title" style={{ color: accent }}>{title}</h3>
      <ul className="card-levels">
        {levels.map((l, i) => (
          <li key={i} className="level-item">
            <span className="level-dot" style={{ background: accent }} />
            <span dangerouslySetInnerHTML={{ __html: l }} />
          </li>
        ))}
      </ul>
      <div className="card-example">
        <span className="example-label">Example</span>
        <p dangerouslySetInnerHTML={{ __html: example }} />
      </div>
    </div>
  );
}

// ── Animated Number ──────────────────────────────────────────────────────────
function AnimatedNum({ target, suffix = "", prefix = "" }) {
  const [ref, inView] = useInView(0.3);
  const val = useCountUp(target, 1800, inView);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

// ── Logo Infinite Scroll ─────────────────────────────────────────────────────
const LOGOS = [
  { name: "Python", color: "#3776AB", symbol: "🐍" },
  { name: "React", color: "#61DAFB", symbol: "⚛️" },
  { name: "Scikit", color: "#F7931E", symbol: "🔬" },
  { name: "Pandas", color: "#150458", symbol: "🐼" },
  { name: "TensorFlow", color: "#FF6F00", symbol: "🧠" },
  { name: "SQL", color: "#336791", symbol: "🗄️" },
  { name: "Vite", color: "#646CFF", symbol: "⚡" },
  { name: "XGBoost", color: "#E76F51", symbol: "🚀" },
  { name: "Jupyter", color: "#F37626", symbol: "📓" },
  { name: "GitHub", color: "#f0f0f0", symbol: "🐙" },
];

const LOGO_SOURCES = {
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original-wordmark.svg",
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg",
  Scikit: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
  Pandas: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original-wordmark.svg",
  TensorFlow: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original-wordmark.svg",
  SQL: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original-wordmark.svg",
  Vite: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
  XGBoost: "https://static.cdnlogo.com/logos/x/25/xgboost.svg",
  Jupyter: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original-wordmark.svg",
  GitHub: "https://cdn.simpleicons.org/github/FFFFFF",
};

function LogoCarousel() {
  // Duplicate for seamless loop
  const items = [...LOGOS, ...LOGOS];
  return (
    <div className="carousel-outer">
      <div className="carousel-fade-left" />
      <div className="carousel-fade-right" />
      <div className="carousel-track">
        <div className="carousel-inner">
          {items.map((logo, i) => (
            <div className="logo-pill" key={i}>
              <img src={LOGO_SOURCES[logo.name]} alt={`${logo.name} logo`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Home Button ──────────────────────────────────────────────────────────────
function HomeButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="/"
      className={`home-btn${hovered ? " home-btn--hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="Back to Home"
    >
      <span className="home-btn-icon">⌂</span>
      <span className="home-btn-label">Home</span>
      <span className="home-btn-ring" />
    </a>
  );
}

// ── Main About Page ──────────────────────────────────────────────────────────
export default function About() {
  const roles = ["Data Science Student", "ML Enthusiast", "Future AI Engineer", "Problem Solver"];
  const typed = useTypewriter(roles, 90, 2000);

  const mbaCards = [
    {
      icon: "📊",
      title: "Support",
      accent: "#38bdf8",
      levels: [
        "<b>&lt; 1%–5%</b> → very low, the rule rarely occurs",
        "<b>5%–15%</b> → moderate, the combination occurs fairly often",
        "<b>&gt; 15%</b> → high, the combination is very popular",
      ],
      example:
        "Support(Bread ∧ Jam) = 8% → 8% of all transactions contain both items. This value measures the <b>popularity</b> of the combination in the overall dataset.",
    },
    {
      icon: "🎯",
      title: "Confidence",
      accent: "#a78bfa",
      levels: [
        "<b>&lt; 15%</b> → weak / not reliable",
        "<b>15% – 30%</b> → moderate",
        "<b>&gt; 30%</b> → fairly strong",
        "<b>&gt; 50%</b> → very strong",
      ],
      example:
        "Rule: <code>Bread → Jam</code> Confidence = 10% → Out of all customers who bought bread, only 10% also bought jam. This means the <b>relationship is weak</b>.",
    },
    {
      icon: "⚡",
      title: "Lift",
      accent: "#34d399",
      levels: [
        "<b>&lt; 1</b> → negative / not related",
        "<b>≈ 1</b> → random relationship",
        "<b>1 – 1.5</b> → weak relationship",
        "<b>&gt; 1.5</b> → good relationship",
        "<b>&gt; 2</b> → very strong relationship",
      ],
      example:
        "Lift = 2.5 → Customers who buy A are <b>2.5× more likely</b> to buy B compared to other customers. This is the actual measurement of rule strength.",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --bg: #080c14;
          --surface: #0e1520;
          --surface2: #131c2b;
          --border: rgba(255,255,255,0.07);
          --text: #e2e8f0;
          --muted: #64748b;
          --sky: #38bdf8;
          --violet: #a78bfa;
          --emerald: #34d399;
          --amber: #fbbf24;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Space Grotesk', sans-serif;
          min-height: 100vh;
        }

        /* ── Home Button ── */
        .home-btn {
          position: fixed;
          top: 1.5rem;
          left: 1.5rem;
          z-index: 999;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1.25rem 0.55rem 0.9rem;
          border-radius: 99px;
          background: rgba(14, 21, 32, 0.85);
          border: 1px solid rgba(56,189,248,0.35);
          color: var(--sky);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          text-decoration: none;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 0 0 0 rgba(56,189,248,0.3), 0 4px 20px rgba(0,0,0,0.4);
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          overflow: hidden;
        }
        .home-btn:hover {
          background: rgba(56,189,248,0.12);
          border-color: rgba(56,189,248,0.7);
          box-shadow: 0 0 0 4px rgba(56,189,248,0.15), 0 6px 24px rgba(0,0,0,0.5);
          transform: translateY(-2px) scale(1.04);
          color: #fff;
        }
        .home-btn-icon {
          font-size: 1rem;
          line-height: 1;
        }
        .home-btn-label {
          font-weight: 500;
        }
        .home-btn-ring {
          position: absolute;
          inset: 0;
          border-radius: 99px;
          background: radial-gradient(circle at 30% 50%, rgba(56,189,248,0.08) 0%, transparent 60%);
          pointer-events: none;
        }

        /* ── Hero ── */
        .about-hero {
          position: relative;
          padding: 5rem 2rem 4rem;
          text-align: center;
          overflow: hidden;
        }
        .hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
        }
        .hero-glow {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(56,189,248,0.12) 0%, transparent 70%);
        }
        .hero-tag {
          display: inline-block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--sky);
          border: 1px solid rgba(56,189,248,0.3);
          padding: 0.35rem 1rem;
          border-radius: 99px;
          margin-bottom: 1.5rem;
        }
        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.05;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #fff 40%, var(--sky) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-sub {
          color: var(--muted);
          font-size: 1.05rem;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ── Section wrapper ── */
        .section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }
        .section-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.6rem;
        }
        .section-label span {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 800;
          margin-bottom: 0.75rem;
        }
        .section-desc {
          color: var(--muted);
          font-size: 1rem;
          line-height: 1.75;
          max-width: 680px;
          margin-bottom: 3rem;
        }

        /* ── MBA What is ── */
        .mba-explainer {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem 2.5rem;
          margin-bottom: 2.5rem;
          position: relative;
          overflow: hidden;
        }
        .mba-explainer::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--sky), var(--violet), var(--emerald));
        }
        .mba-explainer p {
          color: var(--text);
          line-height: 1.8;
          font-size: 1rem;
        }
        .mba-explainer p + p { margin-top: 0.75rem; }
        .mba-explainer code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85em;
          background: rgba(56,189,248,0.1);
          color: var(--sky);
          padding: 0.1em 0.4em;
          border-radius: 4px;
        }
        .formula-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .formula-chip {
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 0.6rem 1.2rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: var(--text);
        }
        .formula-chip b { color: var(--amber); }

        /* ── Stat Cards ── */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .stat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
          will-change: transform, opacity;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255,255,255,0.15);
        }
        .stat-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 60px;
          background: linear-gradient(to top, var(--surface), transparent);
        }
        .card-icon { font-size: 2rem; margin-bottom: 0.75rem; }
        .card-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 1.2rem;
        }
        .card-levels {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          margin-bottom: 1.5rem;
        }
        .level-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.9rem;
          color: var(--text);
          line-height: 1.5;
        }
        .level-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 0.45rem;
        }
        .card-example {
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 1rem;
          font-size: 0.85rem;
          color: var(--muted);
          line-height: 1.6;
        }
        .example-label {
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--amber);
          margin-bottom: 0.4rem;
        }
        .card-example code {
          font-family: 'JetBrains Mono', monospace;
          background: rgba(251,191,36,0.1);
          color: var(--amber);
          padding: 0.1em 0.35em;
          border-radius: 4px;
          font-size: 0.85em;
        }
        .card-example b { color: var(--text); }

        /* ── Divider ── */
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
          margin: 0 2rem;
        }

        /* ── Prediction section ── */
        .prediction-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 0.5rem;
        }
        @media (max-width: 640px) {
          .prediction-grid { grid-template-columns: 1fr; }
        }
        .pred-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.75rem;
          transition: transform 0.3s;
        }
        .pred-card:hover { transform: translateY(-3px); }
        .pred-card-icon { font-size: 1.8rem; margin-bottom: 0.75rem; }
        .pred-card h4 {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--amber);
        }
        .pred-card p {
          font-size: 0.88rem;
          color: var(--muted);
          line-height: 1.65;
        }
        .pred-stat-row {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
        .pred-stat { display: flex; flex-direction: column; gap: 0.2rem; }
        .pred-stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--amber);
        }
        .pred-stat-label {
          font-size: 0.82rem;
          color: var(--muted);
          font-family: 'JetBrains Mono', monospace;
        }

        /* ── About Me ── */
        .aboutme-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 3rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .aboutme-layout { grid-template-columns: 1fr; }
        }
        .avatar-wrapper {
          position: relative;
          width: 220px;
          margin: 0 auto;
        }
        .avatar-ring {
          position: absolute;
          inset: -12px;
          border-radius: 50%;
          background: conic-gradient(var(--sky), var(--violet), var(--emerald), var(--sky));
          animation: spin 6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .avatar-ring-inner {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          background: var(--bg);
        }
        .avatar-placeholder {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--surface), var(--surface2));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 5rem;
          position: relative;
          z-index: 1;
        }
  .profile-img{
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 50%;
}
        .avatar-status {
          position: absolute;
          bottom: 10px; right: 10px;
          width: 20px; height: 20px;
          background: var(--emerald);
          border-radius: 50%;
          border: 3px solid var(--bg);
          z-index: 2;
          animation: pulse-green 2s infinite;
        }
        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 0 0 rgba(52,211,153,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(52,211,153,0); }
        }
        .me-name {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 0.5rem;
        }
        .me-typed {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1rem;
          color: var(--sky);
          margin-bottom: 1.5rem;
          min-height: 1.5em;
        }
        .me-typed::after {
          content: '|';
          animation: blink 1s step-end infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }
        .me-bio {
          color: var(--muted);
          line-height: 1.8;
          font-size: 0.95rem;
          margin-bottom: 2rem;
        }
        .me-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 2rem;
        }
        .skill-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          padding: 0.35rem 0.9rem;
          border-radius: 99px;
          border: 1px solid var(--border);
          color: var(--text);
          background: var(--surface);
        }
        .me-stats {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .me-stat { display: flex; flex-direction: column; gap: 0.15rem; }
        .me-stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--sky);
        }
        .me-stat-label {
          font-size: 0.78rem;
          color: var(--muted);
          font-family: 'JetBrains Mono', monospace;
        }
        .me-info-row {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .me-info-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--muted);
        }
        .me-info-item span:first-child { font-size: 1rem; }

        /* ── Logo Carousel ── */
        .carousel-section {
          padding: 0 0 3rem;
          overflow: hidden;
          position: relative;
        }
        .carousel-label {
          text-align: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 1.5rem;
        }
        .carousel-outer {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .carousel-fade-left, .carousel-fade-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }
        .carousel-fade-left {
          left: 0;
          background: linear-gradient(to right, var(--bg), transparent);
        }
        .carousel-fade-right {
          right: 0;
          background: linear-gradient(to left, var(--bg), transparent);
        }
        .carousel-track {
          width: 100%;
          overflow: hidden;
        }
        .carousel-inner {
          display: flex;
          gap: 3.5rem;
          width: max-content;
          animation: marquee 24s linear infinite;
        }
        .carousel-inner:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .logo-pill {
          display: grid;
          place-items: center;
          width: 8.5rem;
          height: 4rem;
          flex: 0 0 auto;
          padding: 0;
          opacity: 0.9;
          transition: opacity 0.3s, transform 0.3s, filter 0.3s;
          cursor: default;
        }
        .logo-pill:hover {
          opacity: 1;
          transform: translateY(-2px);
          filter: drop-shadow(0 0 16px rgba(56,189,248,0.14));
        }
        .logo-pill img {
          width: 100%;
          max-width: 8.5rem;
          height: 3rem;
          object-fit: contain;
          display: block;
          filter: saturate(0.85) contrast(1.08);
        }

        /* ── Floating bottom bar with logo carousel ── */
        .floating-bar {
          position: fixed;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 998;
          width: min(90vw, 680px);
          background: rgba(10, 16, 26, 0.8);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06);
          overflow: hidden;
          padding: 0.75rem 0;
        }
        .floating-bar-label {
          text-align: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(100,116,139,0.6);
          margin-bottom: 0.5rem;
        }
        .floating-bar-outer {
          position: relative;
          overflow: hidden;
        }
        .floating-bar-fade-l, .floating-bar-fade-r {
          position: absolute;
          top: 0; bottom: 0;
          width: 50px;
          z-index: 2;
          pointer-events: none;
        }
        .floating-bar-fade-l {
          left: 0;
          background: linear-gradient(to right, rgba(10,16,26,0.8), transparent);
        }
        .floating-bar-fade-r {
          right: 0;
          background: linear-gradient(to left, rgba(10,16,26,0.8), transparent);
        }
        .floating-bar-track {
          display: flex;
          gap: 0.75rem;
          width: max-content;
          animation: marquee 22s linear infinite;
          padding: 0 0.5rem;
        }
        .floating-bar-track:hover {
          animation-play-state: paused;
        }
        .fbar-pill {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 99px;
          padding: 0.4rem 1rem;
          white-space: nowrap;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: var(--text);
          transition: background 0.2s, border-color 0.2s;
        }
        .fbar-pill:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.15);
        }
        .fbar-symbol { font-size: 0.9rem; }

        /* ── Footer space (so content isn't hidden behind floating bar) ── */
        .page-footer { height: 8rem; }
      `}</style>

      {/* ── HOME BUTTON (fixed top left) ── */}
      <HomeButton />

      {/* ── HERO ── */}
      <section className="about-hero">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-tag">📖 About This Project</div>
          <h1 className="hero-title">Understanding Data<br />More Deeply</h1>
          <p className="hero-sub">
            This project uses Market Basket Analysis and Machine Learning
            techniques to identify purchasing patterns and make smart predictions.
          </p>
        </div>
      </section>

      {/* ── MBA SECTION ── */}
      <section className="section">
        <div className="section-label">
          <span>01 — Market Basket Analysis</span>
        </div>
        <h2 className="section-title">What is MBA?</h2>

        <div className="mba-explainer">
          <p>
            <strong>Market Basket Analysis (MBA)</strong> is a data mining technique used to
            discover <em>association rules</em> — patterns of relationships between items in
            a transaction dataset. It answers questions like: <code>"If a customer buys A, how likely are they to buy B as well?"</code>
          </p>
          <p>
            This technique is very useful in retail, e-commerce, and service industries for
            increasing sales through product recommendations, store layouts, and more effective promotions.
            The most popular algorithms are <code>Apriori</code> and <code>FP-Growth</code>.
          </p>
          <div className="formula-row">
            <div className="formula-chip">Support = <b>freq(A∧B)</b> / N</div>
            <div className="formula-chip">Confidence = <b>freq(A∧B)</b> / freq(A)</div>
            <div className="formula-chip">Lift = <b>Confidence</b> / Support(B)</div>
          </div>
        </div>

        <div className="cards-grid">
          {mbaCards.map((card, i) => (
            <StatCard key={card.title} {...card} delay={i * 150} />
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── PREDICTION SECTION ── */}
      <section className="section">
        <div className="section-label">
          <span>02 — Prediction</span>
        </div>
        <h2 className="section-title" style={{ color: "var(--amber)" }}>
          Machine Learning Prediction
        </h2>
        <p className="section-desc">
          Besides MBA, this project also uses Machine Learning models to make predictions
          based on historical data. The models are trained using transaction data to identify
          trends and make more accurate decisions.
        </p>

        <div className="pred-stat-row">
          <div className="pred-stat">
            <span className="pred-stat-num"><AnimatedNum target={94} suffix="%" /></span>
            <span className="pred-stat-label">Accuracy</span>
          </div>
          <div className="pred-stat">
            <span className="pred-stat-num"><AnimatedNum target={12000} suffix="+" /></span>
            <span className="pred-stat-label">Processed Data</span>
          </div>
          <div className="pred-stat">
            <span className="pred-stat-num"><AnimatedNum target={87} suffix="%" /></span>
            <span className="pred-stat-label">F1-Score</span>
          </div>
          <div className="pred-stat">
            <span className="pred-stat-num"><AnimatedNum target={5} /></span>
            <span className="pred-stat-label">Models Tested</span>
          </div>
        </div>

        <div className="prediction-grid">
          {[
            {
              icon: "🌲",
              title: "Random Forest",
              desc: "An ensemble method that combines many decision trees. It is resistant to overfitting and works well with tabular data containing many features.",
            },
            {
              icon: "📈",
              title: "Logistic Regression",
              desc: "A basic classification model that is easy to interpret. Suitable for binary classification problems with explainable results.",
            },
            {
              icon: "🧠",
              title: "Neural Network",
              desc: "A deep learning model that can learn complex patterns in data. It requires more data and computing power.",
            },
            {
              icon: "🚀",
              title: "XGBoost",
              desc: "A highly efficient and accurate gradient boosting framework. It often wins data science competitions.",
            },
          ].map((card) => (
            <div key={card.title} className="pred-card">
              <div className="pred-card-icon">{card.icon}</div>
              <h4>{card.title}</h4>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── ABOUT ME ── */}
      <section className="section">
        <div className="section-label">
          <span>03 — About Me</span>
        </div>
        <h2 className="section-title">Developer</h2>

        <div className="aboutme-layout">
          {/* Avatar */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="avatar-wrapper" style={{ marginBottom: "1.5rem" }}>
              <div className="avatar-ring" />
              <div className="avatar-ring-inner" />
              <div className="avatar-placeholder">
                <img
                  src={profile}
                  alt="Profile"
                  className="profile-img"
                />
              </div>

              <div className="avatar-status" title="Available" />
            </div>
            <p style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace", textAlign: "center" }}>
              <br />
            </p>
          </div>

          {/* Info */}
          <div>
            <h3 className="me-name"><br />MUHAMMAD MIRZA</h3>
            <p className="me-typed">{typed}</p>

            <div className="me-info-row">
              <div className="me-info-item">
                <span>🎓</span>
                <span>Bachelor's Degree in Information Technology — University Teknologi Mara</span>
              </div>
              <div className="me-info-item">
                <span>📍</span>
                <span>Malaysia</span>
              </div>
              <div className="me-info-item">
                <span>📧</span>
                <span>2024271478@uitm.edu.my</span>
              </div>
              <div className="me-info-item">
                <span>💼</span>
                <span>Final Year Project</span>
              </div>
            </div>

            <p className="me-bio">
              I am a student who is passionate about Data Science and Artificial Intelligence.
              This project was built as part of my study of modern data analysis techniques,
              especially Market Basket Analysis and Machine Learning prediction. I believe data
              has a story waiting to be told  and my task is to discover that story.
            </p>

            <div className="me-skills">
              {["Python", "React", "Pandas", "Scikit-learn", "SQL", "Tailwind CSS", "Vite", "Machine Learning", "Data Viz"].map((s) => (
                <span key={s} className="skill-badge">{s}</span>
              ))}
            </div>

            <div className="me-stats">
              <div className="me-stat">
                <span className="me-stat-num"><AnimatedNum target={15} suffix="+" /></span>
                <span className="me-stat-label">Completed Projects</span>
              </div>
              <div className="me-stat">
                <span className="me-stat-num"><AnimatedNum target={3} /></span>
                <span className="me-stat-label">Years of Learning</span>
              </div>
              <div className="me-stat">
                <span className="me-stat-num"><AnimatedNum target={500} suffix="+" /></span>
                <span className="me-stat-label">Coding Hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INLINE LOGO CAROUSEL (above footer) ── */}
      <div className="carousel-section">
        <p className="carousel-label">Tech Stack Used in This Project</p>
        <LogoCarousel />
      </div>

      <div className="page-footer" />
    </>
  );
}

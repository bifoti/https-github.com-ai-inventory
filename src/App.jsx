import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import OverviewStats from "./components/OverviewStats";
import Footer from "./components/Footer";

import About from "./pages/About.jsx";

// ================= HOME PAGE =================
function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background blur effects */}
      <div className="pointer-events-none absolute left-[-10rem] top-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-6rem] top-28 h-[28rem] w-[28rem] rounded-full bg-emerald-400/10 blur-3xl" />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="w-full px-4 md:px-6 xl:px-8 2xl:px-10">
        <Hero />
        <Features />
        <OverviewStats />
        <Footer />
      </main>
    </div>
  );
}

// ================= APP ROUTER =================
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import OverviewStats from "./components/OverviewStats";
import Footer from "./components/Footer";

import About from "./pages/About.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar />

      <main className="w-full px-4 md:px-6 xl:px-8 2xl:px-10">
        <Hero />
        <Features />
        <OverviewStats />
        <Footer />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

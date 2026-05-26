"use client";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

const FEATURES = [
  { icon: "🎯", title: "ATS Score 96-100%", desc: "Our resume format is parsed perfectly by every major ATS system." },
  { icon: "🤖", title: "AI-Ready JSON", desc: "Your CV is stored as JSON — feed it to any AI for instant optimization." },
  { icon: "📄", title: "PDF Export", desc: "One-click professional PDF download, print-ready and pixel-perfect." },
  { icon: "🔄", title: "Drag & Drop", desc: "Reorder every section of your resume with smooth drag-and-drop." },
  { icon: "⚡", title: "Instant Import", desc: "Paste any JSON and your CV is populated instantly." },
  { icon: "🔐", title: "Your Data", desc: "Secure accounts, private CVs, and full admin control." },
];

const RESUME_LINES = [
  { w: "60%", h: 3, color: "bg-violet-400", mt: 0 },
  { w: "40%", h: 2, color: "bg-indigo-300", mt: 6 },
  { w: "90%", h: 2, color: "bg-white/20", mt: 10 },
  { w: "80%", h: 2, color: "bg-white/20", mt: 3 },
  { w: "85%", h: 2, color: "bg-white/20", mt: 3 },
  { w: "50%", h: 2, color: "bg-violet-400/60", mt: 10 },
  { w: "90%", h: 2, color: "bg-white/15", mt: 3 },
  { w: "75%", h: 2, color: "bg-white/15", mt: 3 },
  { w: "60%", h: 2, color: "bg-white/15", mt: 3 },
  { w: "55%", h: 2, color: "bg-violet-400/60", mt: 10 },
  { w: "90%", h: 2, color: "bg-white/15", mt: 3 },
  { w: "70%", h: 2, color: "bg-white/15", mt: 3 },
];

function ResumeCard3D() {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [18, -18]);
  const rotateY = useTransform(x, [-100, 100], [-18, 18]);
  const springRotateX = useSpring(rotateX, { stiffness: 120, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 120, damping: 20 });

  function handleMouse(e) {
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      animate={{ y: [0, -16, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-72 h-96 rounded-2xl cursor-pointer select-none"
    >
      {/* Glow behind card */}
      <div className="absolute inset-0 rounded-2xl bg-violet-600/30 blur-2xl scale-110 animate-glow-pulse" />

      {/* Card face */}
      <div className="relative w-full h-full rounded-2xl border border-violet-500/30 bg-gradient-to-br from-[#1a1040]/90 to-[#0d1b4b]/90 backdrop-blur-xl p-6 shadow-glow-violet">
        {/* Top badge */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">E</div>
          <div>
            <div className="text-white text-xs font-semibold">Eyad Stein</div>
            <div className="text-violet-300 text-[10px]">Software Developer</div>
          </div>
          <div className="ml-auto bg-green-400/20 border border-green-400/40 rounded-full px-2 py-0.5 text-green-400 text-[9px] font-bold">ATS 98%</div>
        </div>

        {/* Resume lines */}
        {RESUME_LINES.map((line, i) => (
          <div key={i} style={{ width: line.w, height: line.h, marginTop: line.mt }} className={`rounded-full ${line.color}`} />
        ))}

        {/* Bottom shine */}
        <div className="absolute bottom-0 left-0 right-0 h-16 rounded-b-2xl bg-gradient-to-t from-violet-500/10 to-transparent" />

        {/* 3D shine overlay */}
        <div style={{ transform: "translateZ(20px)" }} className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}

function Particle({ style }) {
  return (
    <motion.div
      className="absolute rounded-full bg-violet-500/20"
      style={style}
      animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
      transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 3 }}
    />
  );
}

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  width: 4 + Math.random() * 12,
  height: 4 + Math.random() * 12,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
}));

export default function HomePage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden" style={{ background: "linear-gradient(135deg, #0f0c29 0%, #1a1040 40%, #0d1b4b 100%)" }}>

      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <Particle key={i} style={{ width: p.width, height: p.height, left: p.left, top: p.top }} />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* Left: Text */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-1.5 text-violet-300 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              ATS Score 96–100% Guaranteed
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              Crack Every{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-300 bg-clip-text text-transparent">
                  ATS System
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
              <br />& Get Hired
            </h1>

            <p className="text-gray-300 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed">
              Build an ATS-optimized resume in minutes. Export as PDF or JSON, let AI refine it, and land interviews at top companies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139,92,246,0.6)" }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-lg rounded-xl shadow-glow-violet transition-all"
                >
                  Build My Resume →
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 border border-violet-500/40 text-violet-300 font-semibold text-lg rounded-xl hover:bg-violet-500/10 transition-all"
                >
                  See How It Works
                </motion.button>
              </Link>
            </div>

            {/* Stats */}
            <motion.div
              className="flex gap-8 mt-12 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {[["96–100%", "ATS Score"], ["JSON", "AI-Ready"], ["Free", "Forever"]].map(([val, label]) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-extrabold text-white">{val}</div>
                  <div className="text-xs text-gray-400 mt-1">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D Card */}
          <motion.div
            className="flex-1 flex justify-center items-center"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
          >
            <ResumeCard3D />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 text-xs flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>scroll down</span>
          <div className="w-0.5 h-6 bg-gradient-to-b from-violet-500/60 to-transparent rounded-full" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">get hired</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              ATS Cracker gives you every tool to build, optimize, and export a resume that beats automated screening.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, boxShadow: "0 0 30px rgba(139,92,246,0.2)" }}
                className="rounded-2xl border border-violet-500/20 bg-white/5 backdrop-blur-sm p-6 cursor-default transition-all"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-900/30 to-indigo-900/20 backdrop-blur-sm p-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Ready to get hired?</h2>
          <p className="text-gray-400 text-lg mb-8">Build your ATS-optimized resume in minutes. Free forever.</p>
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(139,92,246,0.7)" }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xl rounded-xl shadow-glow-violet"
            >
              Start Building — It is Free →
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5">
        Built by{" "}
        <a href="https://github.com/eyadstein" className="text-violet-400 hover:text-violet-300 transition-colors">
          @eyadstein
        </a>{" "}
        · ATS Cracker © 2026
      </footer>
    </main>
  );
}

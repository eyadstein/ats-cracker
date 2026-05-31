"use client";
import { motion, useMotionValue, useTransform, useSpring, useScroll, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import BaseModal from "@/components/auth/base-modal";
import useAppContext from "@/hooks/useAppContext";

const FEATURES = [
  { icon: "🎯", title: "ATS Score 96-100%", desc: "Our resume format is parsed perfectly by every major ATS system.", color: "from-violet-500/20 to-violet-600/5" },
  { icon: "🤖", title: "AI-Ready JSON", desc: "Your CV is stored as JSON — feed it to any AI for instant optimization.", color: "from-indigo-500/20 to-indigo-600/5" },
  { icon: "📄", title: "PDF Export", desc: "One-click professional PDF download, print-ready and pixel-perfect.", color: "from-blue-500/20 to-blue-600/5" },
  { icon: "🔄", title: "Drag & Drop", desc: "Reorder every section of your resume with smooth drag-and-drop.", color: "from-cyan-500/20 to-cyan-600/5" },
  { icon: "⚡", title: "Instant Import", desc: "Paste any JSON and your CV is populated instantly.", color: "from-yellow-500/20 to-yellow-600/5" },
  { icon: "🔐", title: "Your Data", desc: "Secure accounts, private CVs, and full admin control.", color: "from-green-500/20 to-green-600/5" },
];

const STEPS = [
  { num: "01", title: "Upload or Start Fresh", desc: "Paste your existing CV as text, upload a PDF/Word, or start from a blank template.", icon: "📋" },
  { num: "02", title: "Edit in the Builder", desc: "Drag sections, edit fields, and watch the live preview update in real time.", icon: "✏️" },
  { num: "03", title: "Export & Get Hired", desc: "Download as a perfectly formatted PDF or Word file. 96-100% ATS score guaranteed.", icon: "🚀" },
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

const FIXED_PARTICLES = [
  { width: 8, height: 10, left: "12%", top: "20%" },
  { width: 14, height: 13, left: "23%", top: "57%" },
  { width: 13, height: 12, left: "38%", top: "9%" },
  { width: 7, height: 15, left: "35%", top: "36%" },
  { width: 10, height: 8, left: "65%", top: "55%" },
  { width: 7, height: 14, left: "42%", top: "12%" },
  { width: 8, height: 9, left: "91%", top: "20%" },
  { width: 9, height: 12, left: "15%", top: "58%" },
  { width: 6, height: 7, left: "26%", top: "14%" },
  { width: 12, height: 6, left: "30%", top: "10%" },
];

const TYPING_WORDS = ["ATS Systems", "Applicant Filters", "Resume Bots", "Screening AI"];

function TypingText() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = TYPING_WORDS[index];
    let timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % TYPING_WORDS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <span style={{ color: "#a78bfa", textShadow: "0 0 30px rgba(167,139,250,0.5)" }}>
      {displayed}
      <span className="animate-pulse text-violet-400">|</span>
    </span>
  );
}

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
  function handleLeave() { x.set(0); y.set(0); }

  return (
    <div className="relative">
      {/* Floating mini cards behind */}
      <motion.div
        className="absolute -right-8 -top-8 w-28 h-36 rounded-xl border border-violet-500/20 bg-gradient-to-br from-[#1a1040]/80 to-[#0d1b4b]/80 backdrop-blur-xl p-3"
        animate={{ y: [0, -10, 0], rotate: [8, 10, 8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-[8px] font-bold mb-2">98%</div>
        {[70, 90, 60, 80, 50].map((w, i) => (
          <div key={i} style={{ width: `${w}%`, height: 2, marginTop: i === 0 ? 0 : 3 }} className="rounded-full bg-white/20" />
        ))}
      </motion.div>

      <motion.div
        className="absolute -left-8 -bottom-8 w-24 h-28 rounded-xl border border-indigo-500/20 bg-gradient-to-br from-[#1a1040]/80 to-[#0d1b4b]/80 backdrop-blur-xl p-3"
        animate={{ y: [0, 10, 0], rotate: [-6, -8, -6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="text-[8px] text-violet-300 font-bold mb-1.5">ATS SCORE</div>
        <div className="text-lg font-extrabold text-green-400">96%</div>
        <div className="mt-1.5 w-full h-1.5 rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-400" style={{ width: "96%" }} />
        </div>
      </motion.div>

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d", perspective: 1000 }}
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-72 h-96 rounded-2xl cursor-pointer select-none"
      >
        <div className="absolute inset-0 rounded-2xl bg-violet-600/30 blur-2xl scale-110" />
        <div className="relative w-full h-full rounded-2xl border border-violet-500/30 bg-gradient-to-br from-[#1a1040]/90 to-[#0d1b4b]/90 backdrop-blur-xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">E</div>
            <div>
              <div className="text-white text-xs font-semibold">Eyadstein</div>
              <div className="text-violet-300 text-[10px]">Software Developer</div>
            </div>
            <div className="ml-auto bg-green-400/20 border border-green-400/40 rounded-full px-2 py-0.5 text-green-400 text-[9px] font-bold">ATS 98%</div>
          </div>
          {RESUME_LINES.map((line, i) => (
            <div key={i} style={{ width: line.w, height: line.h, marginTop: line.mt }} className={`rounded-full ${line.color}`} />
          ))}
          <div className="absolute bottom-0 left-0 right-0 h-16 rounded-b-2xl bg-gradient-to-t from-violet-500/10 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}

function Particles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {FIXED_PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-violet-500/20"
          style={{ width: p.width, height: p.height, left: p.left, top: p.top }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

function ScrollReveal({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const variants = {
    hidden: { opacity: 0, y: direction === "up" ? 50 : direction === "down" ? -50 : 0, x: direction === "left" ? 60 : direction === "right" ? -60 : 0 },
    visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] } },
  };
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={variants}>
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const { isAuthenticated } = useAppContext();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  function handleBuildClick() {
    if (!isAuthenticated) setIsLoginOpen(true);
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden" style={{ background: "linear-gradient(135deg, #0f0c29 0%, #1a1040 40%, #0d1b4b 100%)" }}>
      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 z-50 origin-left" style={{ scaleX }} />

      <Particles />

      <BaseModal isOpen={isLoginOpen} isLogin={true} handleAuthAction={() => {}} closeModal={() => setIsLoginOpen(false)} />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Background glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />

        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
          <motion.div className="flex-1 text-center lg:text-left" initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-1.5 text-violet-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              ATS Score 96-100% Guaranteed
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              Crack Every<br />
              <TypingText />
              <br /><span className="text-4xl sm:text-5xl lg:text-6xl text-gray-300">& Get Hired</span>
            </h1>

            <motion.p className="text-gray-300 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              Build an ATS-optimized resume in minutes. Export as PDF or JSON, let AI refine it, and land interviews at top companies.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139,92,246,0.6)" }} whileTap={{ scale: 0.97 }}
                    className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-lg rounded-xl transition-all">
                    Build My Resume →
                  </motion.button>
                </Link>
              ) : (
                <motion.button onClick={handleBuildClick} whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139,92,246,0.6)" }} whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-lg rounded-xl transition-all">
                  Build My Resume →
                </motion.button>
              )}
              <Link href="/about">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 border border-violet-500/40 text-violet-300 font-semibold text-lg rounded-xl hover:bg-violet-500/10 transition-all">
                  See How It Works
                </motion.button>
              </Link>
            </motion.div>

            <motion.div className="flex gap-8 mt-12 justify-center lg:justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              {[["96-100%", "ATS Score"], ["JSON", "AI-Ready"], ["Free", "Forever"]].map(([val, label], i) => (
                <motion.div key={label} className="text-center" whileHover={{ scale: 1.1 }}>
                  <div className="text-2xl font-extrabold text-white">{val}</div>
                  <div className="text-xs text-gray-400 mt-1">{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="flex-1 flex justify-center items-center" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}>
            <ResumeCard3D />
          </motion.div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 text-xs flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <span>scroll down</span>
          <div className="w-0.5 h-6 bg-gradient-to-b from-violet-500/60 to-transparent rounded-full" />
        </motion.div>
      </section>

      {/* How it works */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-violet-500/20 to-transparent" />
        </div>
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="inline-block bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-1.5 text-violet-300 text-sm font-medium mb-4">How It Works</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                Three steps to your{" "}
                <span style={{ color: "#a78bfa" }}>dream job</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative">
            {STEPS.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.15} direction={i % 2 === 0 ? "left" : "right"}>
                <div className={`flex items-center gap-8 mb-16 ${i % 2 === 1 ? "flex-row-reverse" : ""}`}>
                  <motion.div
                    className="flex-1 rounded-2xl border border-violet-500/20 bg-white/5 backdrop-blur-sm p-8"
                    whileHover={{ scale: 1.02, borderColor: "rgba(139,92,246,0.5)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-5xl mb-4">{step.icon}</div>
                    <div className="text-violet-400 font-bold text-sm mb-2 tracking-widest">{step.num}</div>
                    <h3 className="text-white text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                  </motion.div>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xl font-black flex-shrink-0 shadow-glow-violet">
                    {parseInt(step.num)}
                  </div>
                  <div className="flex-1" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                Everything you need to{" "}
                <span style={{ color: "#a78bfa" }}>get hired</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                ATS Cracker gives you every tool to build, optimize, and export a resume that beats automated screening.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`rounded-2xl border border-violet-500/20 bg-gradient-to-br ${f.color} backdrop-blur-sm p-6 cursor-default h-full`}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div className="text-4xl mb-4" whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: "spring", stiffness: 400 }}>
                    {f.icon}
                  </motion.div>
                  <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof ticker */}
      <section className="py-12 overflow-hidden border-y border-white/5">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: [0, -1200] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(3)].flatMap(() => [
            "✅ ATS Score 98% — Google",
            "✅ ATS Score 96% — Microsoft",
            "✅ ATS Score 100% — Amazon",
            "✅ ATS Score 97% — Meta",
            "✅ ATS Score 99% — Netflix",
            "✅ ATS Score 96% — Apple",
          ]).map((text, i) => (
            <span key={i} className="text-gray-500 text-sm font-medium">{text}</span>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6">
        <ScrollReveal>
          <motion.div
            className="max-w-3xl mx-auto text-center rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-900/30 to-indigo-900/20 backdrop-blur-sm p-16 relative overflow-hidden"
            whileHover={{ borderColor: "rgba(139,92,246,0.6)" }}
          >
            <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.05), transparent 70%)" }} />
            <motion.div className="text-6xl mb-6" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>🚀</motion.div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Ready to get hired?</h2>
            <p className="text-gray-400 text-lg mb-8">Build your ATS-optimized resume in minutes. Free forever.</p>
            {isAuthenticated ? (
              <Link href="/dashboard">
                <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(139,92,246,0.7)" }} whileTap={{ scale: 0.97 }}
                  className="px-10 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xl rounded-xl">
                  Start Building — It is Free
                </motion.button>
              </Link>
            ) : (
              <motion.button onClick={() => setIsLoginOpen(true)} whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(139,92,246,0.7)" }} whileTap={{ scale: 0.97 }}
                className="px-10 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xl rounded-xl">
                Start Building — It is Free
              </motion.button>
            )}
          </motion.div>
        </ScrollReveal>
      </section>

      <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5">
        Built by{" "}
        <a href="https://github.com/eyadstein" className="text-violet-400 hover:text-violet-300 transition-colors">@eyadstein</a>{" "}
        · ATS Cracker 2026
      </footer>
    </main>
  );
}

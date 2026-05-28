"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const FEATURES = [
  { icon: "🎯", title: "ATS Score 96-100%", desc: "Our resume format passes every major ATS system with near-perfect scores, verified on JobScan and ResumeGo.", color: "from-violet-500/20 to-transparent" },
  { icon: "🤖", title: "AI-Ready JSON", desc: "Your CV is stored as a clean JSON object. Feed it to any AI model for instant grammar fixes, rewrites, or optimization.", color: "from-indigo-500/20 to-transparent" },
  { icon: "📄", title: "PDF Export", desc: "One-click professional PDF download, print-ready and pixel-perfect for any recruiter.", color: "from-blue-500/20 to-transparent" },
  { icon: "🔄", title: "Drag and Drop", desc: "Reorder every section of your resume with smooth drag-and-drop. Full control over your layout.", color: "from-cyan-500/20 to-transparent" },
  { icon: "⚡", title: "Instant Import", desc: "Paste JSON or upload a PDF/Word file and your resume populates instantly.", color: "from-yellow-500/20 to-transparent" },
  { icon: "🔐", title: "Secure & Private", desc: "Your data is yours. Secure JWT auth, private CVs, no ads, no tracking.", color: "from-green-500/20 to-transparent" },
];

const FEATURE_LIST = [
  "Convert your CV to JSON object.",
  "Convert your JSON object to CV.",
  "Save your CV as PDF.",
  "Download your CV as JSON object.",
  "Download your CV as Word (.docx).",
  "Upload PDF or Word CV to auto-fill.",
  "Duplicate your CV via paste JSON object.",
  "Drag and drop section reordering.",
  "Add custom sections (Publications, Awards, etc.)",
];

function ScrollReveal({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: direction === "up" ? 40 : 0, x: direction === "left" ? 50 : direction === "right" ? -50 : 0 }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden text-white" style={{ background: "linear-gradient(135deg, #0f0c29 0%, #1a1040 40%, #0d1b4b 100%)" }}>

      {/* Hero */}
      <section className="relative pt-24 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse, #8b5cf6, transparent)" }} />

        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-1.5 text-violet-300 text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Verified 96-100% ATS Score
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl font-extrabold mb-6">
          ATS Cracker
          <span className="block text-2xl sm:text-3xl font-normal text-gray-400 mt-2">Bypass Every Screening System</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
          Built to help job seekers beat automated screening systems with a 96-100% match score on every major ATS platform.
        </motion.p>
      </section>

      {/* Creator card */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <motion.div
              className="rounded-3xl border border-violet-500/20 bg-white/5 backdrop-blur-sm p-8 flex flex-col md:flex-row items-center gap-8 mb-20"
              whileHover={{ borderColor: "rgba(139,92,246,0.4)" }}
            >
              <div className="flex-shrink-0">
                <motion.div
                  className="w-28 h-28 rounded-full bg-gradient-to-br from-violet-600 to-indigo-800 flex items-center justify-center text-6xl font-bold text-white shadow-glow-violet"
                  animate={{ boxShadow: ["0 0 20px rgba(139,92,246,0.3)", "0 0 50px rgba(139,92,246,0.6)", "0 0 20px rgba(139,92,246,0.3)"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  E
                </motion.div>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-extrabold text-white mb-1">Eyadstein</h2>
                <p className="text-violet-400 font-semibold mb-3">Software Developer</p>
                <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
                  Built ATS Cracker to solve a real problem — most CVs never reach a human reviewer because they fail automated screening. This tool fixes that.
                </p>
                <div className="flex gap-4 mt-4 justify-center md:justify-start">
                  <a href="https://github.com/eyadstein" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 border border-violet-500/30 rounded-full px-4 py-1.5 transition-all hover:bg-violet-500/10">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                    GitHub
                  </a>
                </div>
              </div>
              <div className="md:ml-auto flex flex-col items-center gap-2">
                <div className="text-5xl font-extrabold text-green-400">98%</div>
                <div className="text-xs text-gray-400 text-center">Average ATS<br/>Score</div>
                <div className="w-24 h-2 rounded-full bg-white/10 mt-1">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-400"
                    initial={{ width: 0 }} animate={{ width: "98%" }} transition={{ duration: 1.5, delay: 0.5 }} />
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Features grid */}
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold text-white text-center mb-12">
              Why ATS Cracker{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">works</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {FEATURES.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.08}>
                <motion.div
                  className={`rounded-2xl border border-violet-500/20 bg-gradient-to-br ${f.color} p-6 h-full`}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div className="text-4xl mb-4" whileHover={{ scale: 1.2, rotate: 10 }}>
                    {f.icon}
                  </motion.div>
                  <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Feature list */}
          <ScrollReveal>
            <div className="rounded-3xl border border-violet-500/20 bg-white/5 backdrop-blur-sm p-8">
              <h3 className="text-2xl font-extrabold text-violet-400 mb-6">Complete Feature List</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FEATURE_LIST.map((item, i) => (
                  <motion.div key={i} className="flex items-center gap-3 text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}>
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">{i + 1}</span>
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={0.2}>
            <div className="text-center mt-16">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(139,92,246,0.6)" }}
                  whileTap={{ scale: 0.97 }}
                  className="px-10 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xl rounded-xl"
                >
                  Start Building — It is Free →
                </motion.button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5">
        Built by{" "}
        <a href="https://github.com/eyadstein" className="text-violet-400 hover:text-violet-300 transition-colors">@eyadstein</a>
        {" "}· ATS Cracker 2026
      </footer>
    </main>
  );
}

"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const AI_FEATURES = [
  { icon: "✍️", title: "AI CV Rewriter", desc: "Paste a job description and let AI rewrite your entire CV to match it perfectly.", tag: "Coming Soon" },
  { icon: "📊", title: "ATS Score Checker", desc: "Get a detailed breakdown of your ATS score with specific improvement suggestions.", tag: "Coming Soon" },
  { icon: "📝", title: "Cover Letter Generator", desc: "Generate a tailored cover letter for any job in seconds using your CV data.", tag: "Coming Soon" },
  { icon: "🔍", title: "Job Match Analyzer", desc: "Upload a job posting and see exactly how well your CV matches the requirements.", tag: "Coming Soon" },
  { icon: "🌍", title: "Multi-Language CV", desc: "Translate and adapt your CV to any language while keeping ATS optimization.", tag: "Coming Soon" },
  { icon: "💡", title: "Smart Suggestions", desc: "Get real-time AI suggestions as you type each section of your resume.", tag: "Coming Soon" },
];

export default function AIFeaturesPage() {
  return (
    <main className="min-h-screen w-full px-6 py-20" style={{ background: "linear-gradient(135deg, #0f0c29 0%, #1a1040 40%, #0d1b4b 100%)" }}>
      <div className="max-w-5xl mx-auto">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-1.5 text-violet-300 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"/>
            Under Development
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-4">
            AI Features
            <span className="block text-2xl sm:text-3xl font-normal text-violet-400 mt-2">Powered by Advanced AI</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We are building powerful AI tools to supercharge your job search. These features are coming soon — sign up to be notified when they launch.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {AI_FEATURES.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-violet-500/20 bg-white/5 backdrop-blur-sm p-6 relative">
              <div className="absolute top-4 right-4 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-[10px] font-bold rounded-full px-2 py-0.5">
                {f.tag}
              </div>
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}
          className="text-center rounded-3xl border
New-Item -ItemType Directory -Force -Path "frontend/app/(home)/ai"
$aiPage = @'
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const AI_FEATURES = [
  { icon: "✍️", title: "AI CV Rewriter", desc: "Paste a job description and let AI rewrite your entire CV to match it perfectly.", tag: "Coming Soon" },
  { icon: "📊", title: "ATS Score Checker", desc: "Get a detailed breakdown of your ATS score with specific improvement suggestions.", tag: "Coming Soon" },
  { icon: "📝", title: "Cover Letter Generator", desc: "Generate a tailored cover letter for any job in seconds using your CV data.", tag: "Coming Soon" },
  { icon: "🔍", title: "Job Match Analyzer", desc: "Upload a job posting and see exactly how well your CV matches the requirements.", tag: "Coming Soon" },
  { icon: "🌍", title: "Multi-Language CV", desc: "Translate and adapt your CV to any language while keeping ATS optimization.", tag: "Coming Soon" },
  { icon: "💡", title: "Smart Suggestions", desc: "Get real-time AI suggestions as you type each section of your resume.", tag: "Coming Soon" },
];

export default function AIFeaturesPage() {
  return (
    <main className="min-h-screen w-full px-6 py-20" style={{ background: "linear-gradient(135deg, #0f0c29 0%, #1a1040 40%, #0d1b4b 100%)" }}>
      <div className="max-w-5xl mx-auto">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-1.5 text-violet-300 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"/>
            Under Development
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-4">
            AI Features
            <span className="block text-2xl sm:text-3xl font-normal text-violet-400 mt-2">Powered by Advanced AI</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We are building powerful AI tools to supercharge your job search. These features are coming soon — sign up to be notified when they launch.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {AI_FEATURES.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-violet-500/20 bg-white/5 backdrop-blur-sm p-6 relative">
              <div className="absolute top-4 right-4 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-[10px] font-bold rounded-full px-2 py-0.5">
                {f.tag}
              </div>
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}
          className="text-center rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-900/30 to-indigo-900/20 backdrop-blur-sm p-12">
          <div className="text-5xl mb-4">🚧</div>
          <h2 className="text-3xl font-extrabold text-white mb-3">Meanwhile, build your CV now</h2>
          <p className="text-gray-400 mb-6">The resume builder is fully working and free. AI features are coming soon.</p>
          <Link href="/dashboard">
            <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139,92,246,0.6)" }} whileTap={{ scale: 0.97 }}
              className="px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-xl">
              Go to Resume Builder →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

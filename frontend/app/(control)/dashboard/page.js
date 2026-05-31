"use client";
import { motion } from "framer-motion";
import { ResumeList } from "@/components/dashboard/resume-list";
import useAppContext from "@/hooks/useAppContext";

export default function DashboardPage() {
    const { user, resumeList } = useAppContext();

    const stats = [
        { label: "Resumes", value: resumeList?.length ?? "—", icon: "📄", color: "from-violet-500 to-indigo-500" },
        { label: "ATS Score", value: "96-100%", icon: "🎯", color: "from-emerald-500 to-teal-500" },
        { label: "Downloads", value: "∞", icon: "💾", color: "from-pink-500 to-rose-500" },
    ];

    return (
        <main className="w-full max-w-[1400px] mx-auto px-6 py-10">

            {/* Welcome */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900">
                    Welcome back{user?.username ? `, ${user.username}` : ""}! 👋
                </h1>
                <p className="text-gray-500 mt-1">Here are your resumes. Build one that gets past every ATS.</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {stats.map((s, i) => (
                    <motion.div key={s.label}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.10)" }}
                        className="rounded-2xl bg-white border border-gray-100 p-5 flex items-center gap-4 shadow-sm">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-xl shadow`}>
                            {s.icon}
                        </div>
                        <div>
                            <div className="text-2xl font-extrabold text-gray-900">{s.value}</div>
                            <div className="text-xs text-gray-400 font-medium">{s.label}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Resumes Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-8 pt-6 pb-2 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-extrabold text-gray-900">My Resumes</h2>
                        <p className="text-sm text-gray-400 mt-0.5">Click any resume to edit, or add a new one</p>
                    </div>
                    <div className="flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-full px-3 py-1">
                        <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"/>
                        <span className="text-xs font-semibold text-violet-600">ATS Optimized</span>
                    </div>
                </div>
                <ResumeList className="w-full" />
            </motion.div>

            {/* Tips */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { icon: "✅", title: "Keep it 1 page", tip: "Recruiters spend 6 seconds on a resume. One page wins." },
                    { icon: "🔑", title: "Use job keywords", tip: "Mirror the exact words from the job description." },
                    { icon: "📊", title: "Quantify results", tip: "Use numbers: 'Grew revenue by 30%' beats 'improved sales'." },
                ].map((tip, i) => (
                    <motion.div key={tip.title}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.07 }}
                        className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                        <div className="text-2xl mb-2">{tip.icon}</div>
                        <div className="font-bold text-gray-800 text-sm mb-1">{tip.title}</div>
                        <div className="text-xs text-gray-400 leading-relaxed">{tip.tip}</div>
                    </motion.div>
                ))}
            </motion.div>
        </main>
    );
}
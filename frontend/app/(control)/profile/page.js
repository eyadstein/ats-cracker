"use client";
import { motion } from "framer-motion";
import useAppContext from "@/hooks/useAppContext";
import { useState, useEffect } from "react";
import { cvListAction } from "@/actions/cvs";
import Link from "next/link";

export default function ProfilePage() {
    const { user, logout, setResumeList, resumeList } = useAppContext();
    const [cvCount, setCvCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cvListAction({ page: 1 }).then(res => {
            if (res.success) {
                setResumeList(res.cvList.results);
                setCvCount(res.cvList.count || res.cvList.results.length);
            }
            setLoading(false);
        });
    }, []);

    if (!user) return null;

    const initials = (user.username || user.email || "U").slice(0, 2).toUpperCase();

    const handleLogout = async () => {
        try { await fetch("/api/logout", { method: "POST" }); } catch {}
        logout();
        window.location.href = "/";
    };

    return (
        <div className="mx-auto w-full max-w-[900px] px-6 pb-20 pt-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="text-primaryBlack text-3xl font-extrabold">My Profile</h1>
                <p className="text-gray-500 mt-1">Manage your account and view your resumes</p>
            </motion.div>

            {/* Profile Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 mb-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-white text-3xl font-extrabold flex-shrink-0 shadow-lg">
                        {initials}
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-2xl font-extrabold text-gray-900">{user.username || "User"}</h2>
                        <p className="text-gray-500 mt-1">{user.email}</p>
                        <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                            <span className="inline-flex items-center gap-1.5 bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold rounded-full px-3 py-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"/>Active Account
                            </span>
                        </div>
                    </div>
                    <motion.button onClick={handleLogout} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        className="px-5 py-2.5 rounded-xl border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors flex-shrink-0">
                        Sign Out
                    </motion.button>
                </div>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {[
                    { label: "Resumes Created", value: loading ? "..." : cvCount, icon: "📄", color: "text-indigo-600" },
                    { label: "ATS Score", value: "96-100%", icon: "🎯", color: "text-green-600" },
                    { label: "Downloads", value: "Unlimited", icon: "💾", color: "text-violet-600" },
                ].map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.07 }} whileHover={{ y: -3 }}
                        className="bg-white rounded-2xl shadow-card border border-gray-100 p-5 text-center">
                        <div className="text-2xl mb-1">{stat.icon}</div>
                        <div className={`text-lg font-extrabold ${stat.color}`}>{stat.value}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
                    </motion.div>
                ))}
            </motion.div>

            {/* My Resumes */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-extrabold text-gray-900">My Resumes</h3>
                    <Link href="/dashboard">
                        <span className="text-sm text-violet-600 font-semibold hover:text-violet-700">View all →</span>
                    </Link>
                </div>
                {loading ? (
                    <div className="flex gap-3">{[1,2,3].map(i => <div key={i} className="h-16 flex-1 rounded-xl bg-gray-100 animate-pulse"/>)}</div>
                ) : resumeList.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                        <div className="text-4xl mb-2">📝</div>
                        <p className="text-sm">No resumes yet.</p>
                        <Link href="/dashboard/cvnew"><span className="text-violet-600 text-sm font-semibold hover:underline">Create your first one →</span></Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {resumeList.slice(0, 5).map((cv, i) => (
                            <motion.div key={cv.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + i * 0.05 }} whileHover={{ x: 4 }}
                                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-violet-200 hover:bg-violet-50/50 transition-all cursor-pointer"
                                onClick={() => window.location.href = `/dashboard/${cv.id}`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                                        {(cv.title || "R").charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-800">{cv.title || "Untitled"}</div>
                                        <div className="text-xs text-gray-400">Resume</div>
                                    </div>
                                </div>
                                <span className="text-gray-400 text-sm">→</span>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>

            {/* Account Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
                <h3 className="text-lg font-extrabold text-gray-900 mb-4">Account Info</h3>
                <div className="space-y-3">
                    {[
                        { label: "Username", value: user.username || "—", icon: "👤" },
                        { label: "Email", value: user.email || "—", icon: "📧" },
                    ].map(item => (
                        <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                            <span className="text-lg">{item.icon}</span>
                            <div className="flex-1">
                                <div className="text-xs text-gray-400 font-medium">{item.label}</div>
                                <div className="text-sm font-semibold text-gray-800">{item.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

'use client'
import { ResumeList } from "@/components/dashboard/resume-list";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useAppContext from "@/hooks/useAppContext";

function TimeGreeting({ username }) {
  const [greeting, setGreeting] = useState("Hello");
  const [emoji, setEmoji] = useState("👋");

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening");
    setEmoji(hour < 12 ? "☀️" : hour < 17 ? "⚡" : "🌙");
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className="text-gray-500 text-sm font-medium mb-1">
      {emoji} {greeting}{username ? `, ${username}` : ""}
    </motion.div>
  );
}

export default function DashBoardPage() {
  const { user } = useAppContext();

  return (
    <div className="mx-auto w-full max-w-[1280px] pb-40 overflow-hidden">
      <div className="dbpx pt-6 md:pt-10">
        <div className="flex w-full flex-col items-center">
          <TimeGreeting username={user?.username} />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-primaryBlack mt-1 text-center text-base font-bold sm:text-lg lg:text-xl"
          >
            Welcome to your Resume Builder
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-primaryBlack mt-2 max-w-[15ch] text-center text-4xl font-extrabold sm:mt-[10px] sm:text-6xl md:mt-3 lg:mt-[18px] lg:text-7xl"
          >
            What do you want to create?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-6 mt-8 flex-wrap justify-center"
          >
            {[
              { label: "ATS Guaranteed", value: "96-100%", icon: "🎯", color: "text-green-600" },
              { label: "Export Formats", value: "PDF + DOCX", icon: "📄", color: "text-indigo-600" },
              { label: "Always Free", value: "Forever", icon: "💜", color: "text-violet-600" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 shadow-card border border-gray-100"
              >
                <span className="text-xl">{stat.icon}</span>
                <div>
                  <div className={`text-sm font-extrabold ${stat.color}`}>{stat.value}</div>
                  <div className="text-[10px] text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="pt-12 md:pt-20 lg:pt-24"
        id="myResumes"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="dbpx"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-primaryBlack flex items-center justify-between text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
            My resumes
            <motion.span
              className="text-sm font-normal text-gray-400 bg-gray-100 rounded-full px-3 py-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Unlimited ✨
            </motion.span>
          </h2>
          <p className="mt-2 text-sm text-gray-500 md:mt-3 md:text-base">
            Your resume — 100% free, forever, all features, unlimited downloads, yes really.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <ResumeList className="mt-4 w-full lg:mt-6" />
        </motion.div>
      </motion.div>
    </div>
  );
}

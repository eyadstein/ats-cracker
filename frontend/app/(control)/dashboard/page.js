'use client'
import {ResumeList} from "@/components/dashboard/resume-list";
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function DashBoardPage() {
    return (
        <div className={"mx-auto w-full max-w-[1280px] pb-40 overflow-hidden"}>
            {/* Animated Heading */}
            <motion.div
                className="dbpx pt-4 md:pt-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
            >
                <div className="flex w-full flex-col items-center">
                    <motion.h1 variants={fadeInUp} className="text-primaryBlack mt-4 text-center text-base font-bold sm:text-lg lg:text-xl">
                        Welcome to your Resume Builder
                    </motion.h1>
                    <motion.h2 variants={fadeInUp} className="text-primaryBlack mt-2 max-w-[15ch] text-center text-4xl font-extrabold sm:mt-[10px] sm:text-6xl md:mt-3 lg:mt-[18px] lg:text-7xl">
                        What do you want to create?
                    </motion.h2>
                </div>
            </motion.div>

            {/* Animated Resume List */}
            <motion.div
                className={"pt-12 md:pt-20 lg:pt-24"}
                id={"myResumes"}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
            >
                <motion.div className="dbpx" variants={fadeInUp}>
                    <h2 className="text-primaryBlack flex items-center justify-between text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
                        My resumes
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 md:mt-3 md:text-base">
                        Your resume – 100% free, forever, all features, unlimited downloads, yes really.
                    </p>
                </motion.div>

                <motion.div variants={fadeInUp}>
                    <ResumeList className={"mt-4 w-full lg:mt-6"}/>
                </motion.div>
            </motion.div>
        </div>
    );
}

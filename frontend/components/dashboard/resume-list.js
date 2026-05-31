'use client';

import { AddIcon, LoadMoreIcon } from "@/components/svgs/svgs";
import useAppContext from "@/hooks/useAppContext";
import { useEffect, useRef, useState } from "react";
import { cvListAction } from "@/actions/cvs";
import { redirect } from "next/navigation";
import { ListContainer, ResumePreview } from "@/components/cv-builder/reviewer/resume-preview";
import { ControlPanelView } from "@/components/cv-builder/control-components/utils/enums";
import { motion } from "framer-motion";

export const ResumeList = ({ ...props }) => {
    const { user, resumeList, setResumeList, setResumeData, defaultCv, setControlPanelIndex } = useAppContext();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(null);
    const [fetchError, setFetchError] = useState(false);
    const containerRef = useRef(null);

    const fetchCvList = async (currentPage) => {
        try {
            setLoading(true);
            setFetchError(false);
            const res = await cvListAction({ page: currentPage });
            if (!res.success) { setFetchError(true); setLoading(false); return; }
            if (currentPage === 1) setResumeList(res.cvList.results);
            else setResumeList((prev) => [...prev, ...res.cvList.results]);
            setNextPage(res.cvList.next);
            setControlPanelIndex(ControlPanelView.MainView);
        } catch (error) {
            console.error("Error fetching CV list:", error);
            setFetchError(true);
        }
        setLoading(false);
    };

    useEffect(() => { fetch("/api/keepalive").catch(() => {}); fetchCvList(page); }, [page]);

    const handleWheel = (e) => {
        if (e.deltaY !== 0) { e.preventDefault(); e.currentTarget.scrollLeft += e.deltaY * 4; }
    };
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, []);

    if (fetchError) return (
        <div className="p-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-16 rounded-2xl border-2 border-dashed border-gray-200 text-center gap-4">
                <div className="text-5xl">⚠️</div>
                <p className="text-gray-600 font-bold text-lg">Could not load resumes</p>
                <p className="text-gray-400 text-sm max-w-xs">The server may be waking up. Please wait a moment and retry.</p>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => fetchCvList(1)}
                    className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-bold rounded-xl shadow">
                    Retry
                </motion.button>
            </motion.div>
        </div>
    );

    return (
        <div {...props}>
            <div
                ref={containerRef}
                className="w-full overflow-x-auto scroll-smooth grid auto-cols-min grid-flow-col gap-5 p-8 scrollbar-thin scrollbar-thumb-violet-300 scrollbar-track-gray-100"
            >
                {/* Add New */}
                <motion.button
                    onClick={() => { setResumeData({ ...defaultCv }); redirect("/dashboard/cvnew"); }}
                    className="flex flex-col items-center gap-3 group"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <div className="h-[254px] w-[180px] flex items-center justify-center rounded-2xl border-2 border-dashed border-violet-300 bg-violet-50 group-hover:border-violet-500 group-hover:bg-violet-100 transition-all">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-lg">
                                <AddIcon />
                            </div>
                            <span className="text-violet-600 font-bold text-sm">New Resume</span>
                        </div>
                    </div>
                </motion.button>

                {/* Resume Cards */}
                {resumeList.map((cv, index) => (
                    <motion.div key={index}
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                        whileHover={{ scale: 1.03, y: -4 }}
                        className="cursor-pointer"
                        onClick={() => { setResumeData(cv); redirect(`/dashboard/${cv.id}`); }}>
                        <div className="h-[254px] w-[180px] rounded-2xl border-2 border-gray-200 bg-white shadow-sm overflow-hidden hover:border-violet-400 hover:shadow-md transition-all relative">
                            <div className="absolute inset-0 scale-[0.6] origin-top-left pointer-events-none">
                                <ResumePreview data={cv} isListItemPreview={true} />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/90 to-transparent pt-8 pb-3 px-3">
                                <p className="text-xs font-bold text-gray-800 truncate">{cv.title || "Untitled"}</p>
                                <p className="text-[10px] text-gray-400">Resume</p>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {loading && (
                    <div className="flex justify-center items-center h-[254px] w-[180px]">
                        <div className="w-10 h-10 rounded-full border-4 border-violet-200 border-t-violet-600 animate-spin" />
                    </div>
                )}

                {nextPage && !loading && (
                    <motion.button onClick={() => setPage(p => p + 1)}
                        className="flex flex-col items-center gap-3 group"
                        whileHover={{ scale: 1.05 }}>
                        <div className="h-[254px] w-[180px] flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 group-hover:border-violet-400 group-hover:bg-violet-50 transition-all">
                            <div className="flex flex-col items-center gap-2">
                                <LoadMoreIcon />
                                <span className="text-gray-500 font-bold text-xs">Load More</span>
                            </div>
                        </div>
                    </motion.button>
                )}
            </div>
        </div>
    );
};
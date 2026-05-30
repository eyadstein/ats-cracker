'use client';

import { AddIcon, LoadMoreIcon } from "@/components/svgs/svgs";
import EmptyCvBox from "@/components/dashboard/empty-cv-box";
import useAppContext from "@/hooks/useAppContext";
import { useEffect, useRef, useState } from "react";
import { cvListAction } from "@/actions/cvs";
import Link from "next/link";
import { redirect } from "next/navigation";
import ResumeContainer, { ListContainer, ResumePreview } from "@/components/cv-builder/reviewer/resume-preview";
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
            if (!res.success) {
                setFetchError(true);
                setLoading(false);
                return;
            }
            if (currentPage === 1) {
                setResumeList(res.cvList.results);
            } else {
                setResumeList((prev) => [...prev, ...res.cvList.results]);
            }
            setNextPage(res.cvList.next);
            setControlPanelIndex(ControlPanelView.MainView);
        } catch (error) {
            console.error("Error fetching CV list:", error);
            setFetchError(true);
        }
        setLoading(false);
    };

    useEffect(() => { fetchCvList(page); }, [page]);

    const loadMoreCv = () => { if (nextPage) setPage((p) => p + 1); };

    const onClickNewCv = () => {
        setResumeData({ ...defaultCv });
        redirect("/dashboard/cvnew");
    };

    const onClickEditCv = (cv) => {
        setResumeData(cv);
        redirect(`/dashboard/${cv.id}`);
    };

    const handleWheel = (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            e.currentTarget.scrollLeft += e.deltaY * 4;
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: (i) => ({
            opacity: 1, y: 0, scale: 1,
            transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
        }),
    };

    if (fetchError) {
        return (
            <div className="dbpx mt-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-gray-200 text-center gap-4">
                    <div className="text-5xl">⚠️</div>
                    <p className="text-gray-500 font-semibold">Could not load resumes</p>
                    <p className="text-gray-400 text-sm max-w-xs">The server may be starting up. Please wait a moment and try again.</p>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        onClick={() => fetchCvList(1)}
                        className="mt-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-bold rounded-xl">
                        Retry
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <div {...props}>
            <div className="xl:dbpx relative h-auto w-full max-w-full z-10">
                <div
                    ref={containerRef}
                    className="dbpx h-auto w-full overflow-x-auto scroll-smooth xl:px-0 grid max-w-full auto-cols-min grid-flow-col gap-4 lg:min-w-0 p-8 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
                >
                    <motion.button onClick={onClickNewCv}
                        className="flex appearance-none flex-col items-center hover:opacity-70 lg:flex z-10"
                        initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }} transition={{ duration: 0.3 }} whileHover={{ scale: 1.05 }}>
                        <div className="h-[254px] lg:w-38 flex w-38 items-center justify-center rounded-md border-2 border-dashed border-white">
                            <AddIcon />
                        </div>
                        <span className="mt-[10px] text-xs font-bold uppercase">Add resume</span>
                    </motion.button>

                    {resumeList.map((cv, index) => (
                        <motion.div key={index} custom={index} initial="hidden"
                            whileInView="visible" viewport={{ once: true }} variants={cardVariants}
                            whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                            <ListContainer cv={{ title: cv.title }}
                                className="hover:scale-105 transition-transform z-10"
                                onClick={() => onClickEditCv(cv)}>
                                <ResumePreview data={cv} isListItemPreview={true} />
                            </ListContainer>
                        </motion.div>
                    ))}

                    {loading && (
                        <div className="flex justify-center items-center w-full h-[254px] ml-10 z-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primaryBlack" />
                        </div>
                    )}

                    {nextPage && !loading && (
                        <motion.div onClick={loadMoreCv}
                            className="flex appearance-none flex-col items-center hover:opacity-70 lg:flex z-10 cursor-pointer"
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}>
                            <div className="h-[254px] lg:w-38 flex w-38 items-center justify-center rounded-md border-2 border-dashed border-white">
                                <LoadMoreIcon />
                            </div>
                            <span className="mt-[10px] text-xs font-bold uppercase">Load More</span>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

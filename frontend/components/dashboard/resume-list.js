'use client';

import {AddIcon, LoadMoreIcon} from "@/components/svgs/svgs";
import EmptyCvBox from "@/components/dashboard/empty-cv-box";
import useAppContext from "@/hooks/useAppContext";
import {useEffect, useRef, useState, useCallback} from "react";
import {cvListAction} from "@/actions/cvs";
import {showErrorAlert} from "@/lib/alerts";
import Link from "next/link";
import {redirect} from "next/navigation";
import ResumeContainer, {ListContainer, ResumePreview} from "@/components/cv-builder/reviewer/resume-preview";
import {ControlPanelView} from "@/components/cv-builder/control-components/utils/enums";

function FluidBackground() {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });
    const particles = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let w, h;

        const resize = () => {
            w = canvas.width = canvas.offsetWidth;
            h = canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Create particles
        for (let i = 0; i < 50; i++) {
            particles.current.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                alpha: Math.random() * 0.3 + 0.1,
            });
        }

        const onMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };
        window.addEventListener("mousemove", onMove);

        let animId;
        const animate = () => {
            ctx.clearRect(0, 0, w, h);

            // Draw connections
            particles.current.forEach((p, i) => {
                const dx = mouse.current.x - p.x;
                const dy = mouse.current.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    p.vx += dx * 0.0001;
                    p.vy += dy * 0.0001;
                }

                p.x += p.vx;
                p.y += p.vy;

                // Bounce
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(139, 92, 246, ${p.alpha})`;
                ctx.fill();

                // Connect nearby
                for (let j = i + 1; j < particles.current.length; j++) {
                    const p2 = particles.current[j];
                    const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
                    if (d < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - d / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            animId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0, left: 0,
                width: "100%", height: "100%",
                pointerEvents: "none",
                zIndex: 0,
            }}
        />
    );
}

export const ResumeList = ({...props}) => {
    const { user,resumeList, setResumeList,setResumeData,defaultCv,setControlPanelIndex } = useAppContext();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(null);
    const containerRef = useRef(null);

    const fetchCvList = async (currentPage) => {
        try {
            setLoading(true);
            const res = await cvListAction({ page: currentPage });

            if (!res.success) {
                showErrorAlert(res.message);
                return;
            }
            if (currentPage === 1) {
                setResumeList(res.cvList.results);
            } else {
                setResumeList((prevCvList) => [...prevCvList, ...res.cvList.results]);
            }

            setNextPage(res.cvList.next);
            setControlPanelIndex(ControlPanelView.MainView)
        } catch (error) {
            console.error('Error fetching CV list:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCvList(page);
    }, [page]);

    const loadMoreCv = () => {
        if (nextPage) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const onClickNewCv = () => {
        setResumeData({...defaultCv});
        redirect('/dashboard/cvnew')
    }

    const onClickEditCv = (cv) => {
        setResumeData(cv);
        redirect(`/dashboard/${cv.id}`)
    }

    const handleWheel = (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            e.currentTarget.scrollLeft += e.deltaY * 4;
        }
    };
    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, []);
    return <div {...props}>
        <FluidBackground />

        <div className={"xl:dbpx relative h-auto w-full max-w-full z-10"}>
            {/* Container */}
            <div
                ref={containerRef}

                className="dbpx h-auto w-full overflow-x-auto scroll-smooth xl:px-0 grid max-w-full
                 auto-cols-min grid-flow-col gap-4 lg:min-w-0 p-8 scrollbar-thin
                 scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                <button onClick={onClickNewCv}
                        className="flex appearance-none flex-col items-center hover:opacity-70 lg:flex z-10">
                    <div
                        className="h-[254px] lg:w-38 flex w-38 items-center justify-center rounded-md border-2 border-dashed border-white ">
                        <AddIcon/>
                    </div>
                    <span className="mt-[10px] text-xs font-bold uppercase">Add resume</span>
                </button>

                {resumeList.map((cv, index) => (
                    <ListContainer
                        key={index}
                        cv={{title: cv.title}}
                        className="hover:scale-105 transition-transform z-10"
                        onClick={() => onClickEditCv(cv)}
                    >
                        <ResumePreview data={cv} isListItemPreview={true}/>
                    </ListContainer>
                ))}

                {/* Loading Spinner */}
                {loading && (
                    <div className="flex justify-center items-center w-full h-[254px] ml-10 z-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primaryBlack"></div>
                    </div>
                )}

                {/* Load More Button */}
                {nextPage && !loading && (
                    <div
                        onClick={loadMoreCv}
                        className="flex appearance-none flex-col items-center hover:opacity-70 lg:flex z-10">
                        <div
                            className="h-[254px] lg:w-38 flex w-38 items-center justify-center rounded-md border-2 border-dashed border-white ">
                            <LoadMoreIcon/>
                        </div>

                        <span className="mt-[10px] text-xs font-bold uppercase" onClick={loadMoreCv}>Load More</span>
                    </div>
                )}
            </div>
        </div>
    </div>

}

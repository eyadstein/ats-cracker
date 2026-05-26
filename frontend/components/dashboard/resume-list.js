'use client';

import {AddIcon, LoadMoreIcon} from "@/components/svgs/svgs";
import EmptyCvBox from "@/components/dashboard/empty-cv-box";
import useAppContext from "@/hooks/useAppContext";
import {useEffect, useRef, useState} from "react";
import {cvListAction} from "@/actions/cvs";
import {showErrorAlert} from "@/lib/alerts";
import Link from "next/link";
import {redirect} from "next/navigation";
import ResumeContainer, {ListContainer, ResumePreview} from "@/components/cv-builder/reviewer/resume-preview";
import {ControlPanelView} from "@/components/cv-builder/control-components/utils/enums";

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

        <div className={"xl:dbpx relative h-auto w-full max-w-full"}>
            {/* Container */}
            <div
                ref={containerRef}

                className="dbpx h-auto w-full overflow-x-auto scroll-smooth xl:px-0 grid max-w-full
                 auto-cols-min grid-flow-col gap-4 lg:min-w-0 p-8 scrollbar-thin
                 scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                <button onClick={onClickNewCv}
                        className="flex appearance-none flex-col items-center hover:opacity-70 lg:flex">
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
                        className="hover:scale-105 transition-transform"
                        onClick={() => onClickEditCv(cv)}
                    >
                        <ResumePreview data={cv} isListItemPreview={true}/>
                    </ListContainer>
                ))}

                {/* Loading Spinner */}
                {loading && (
                    <div className="flex justify-center items-center w-full h-[254px] ml-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primaryBlack"></div>
                    </div>
                )}

                {/* Load More Button */}
                {nextPage && !loading && (
                    <div
                        onClick={loadMoreCv}
                        className="flex appearance-none flex-col items-center hover:opacity-70 lg:flex">
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
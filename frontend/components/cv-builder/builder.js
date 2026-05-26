'use client';
import useAppContext from "@/hooks/useAppContext";
import BuilderSideBar from "@/components/cv-builder/builder-sidebar";
import ControlPanel from "@/components/cv-builder/control-panel";
import {useEffect, useState} from "react";
import {ResumePreviewer} from "@/components/cv-builder/reviewer/resume-preview";
import {onDragEnd} from "@/lib/drag-drop-handler"
import useDndContext from "@/context/dnd-context";
import CircularButton from "@/components/general/circle-btn";
import {DownloadIcon} from "@/components/svgs/svgs";
import RightSidebar from "@/components/cv-builder/right-sidebar";


export default function BuilderPage({id, data}) {
    const {resumeList, setResumeData, getResumeWithId, resumeData,syncResumeData} = useAppContext();
    const [loading, setLoading] = useState(resumeData === null);
    const {DragDropContext,Droppable, Draggable} = useDndContext();
    const cvData = resumeData || data;



    useEffect(() => {
        const fetchData = async () => {
            if (cvData)
                return;


            setLoading(true);
            await getResumeWithId(id);
            setLoading(false);
        };

        fetchData();
    }, [id]);


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="text-lg font-semibold">Loading...</span>
            </div>
        );
    }

    if (!cvData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="text-lg font-semibold">Resume not found...</span>
            </div>
        );
    }

    return (
        <DragDropContext
            onDragEnd={(result) => onDragEnd(result, resumeData, setResumeData,syncResumeData)}>
            <div
                className={"bg-homeBackgroundColor px-6 scrollbar-hide relative min-h-screen w-full max-w-full xl:px-8 2xl:px-10"}>
                <div className="
                  sidebar:grid-cols-[min-content_max(550px)_auto] sidebar:justify-center
                  lgxl:grid-cols-[min-content_max(570px)_auto] 3xl:grid-cols-[min-content_max(700px)_auto]
                  grid w-full max-w-full grid-cols-1
                  xl:grid-cols-[min-content_max(600px)_auto] 2xl:grid-cols-[min-content_max(650px)_auto]
                  ">
                    <BuilderSideBar/>
                    <ControlPanel id={id}/>
                    <ResumePreviewer />

                </div>



                <RightSidebar/>
            </div>
        </DragDropContext>
    );
}

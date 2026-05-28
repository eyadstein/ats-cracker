'use client';
import useAppContext from "@/hooks/useAppContext";
import BuilderSideBar from "@/components/cv-builder/builder-sidebar";
import ControlPanel from "@/components/cv-builder/control-panel";
import {useEffect, useState} from "react";
import {ResumePreviewer} from "@/components/cv-builder/reviewer/resume-preview";
import {onDragEnd} from "@/lib/drag-drop-handler"
import useDndContext from "@/context/dnd-context";
import RightSidebar from "@/components/cv-builder/right-sidebar";

function SkeletonLoader() {
    return (
        <div className="bg-homeBackgroundColor px-6 min-h-screen w-full animate-pulse">
            <div className="grid w-full grid-cols-1 xl:grid-cols-[min-content_max(600px)_auto] gap-6 pt-6">
                {/* Sidebar skeleton */}
                <div className="hidden xl:flex flex-col gap-4 w-[130px]">
                    <div className="h-24 w-full bg-gray-200 rounded-2xl"/>
                    <div className="h-16 w-full bg-gray-200 rounded-2xl"/>
                </div>
                {/* Control panel skeleton */}
                <div className="flex flex-col gap-4">
                    <div className="h-16 w-full bg-white rounded-2xl shadow-sm"/>
                    {[1,2,3,4].map(i => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-3">
                            <div className="h-4 w-1/3 bg-gray-200 rounded-full"/>
                            <div className="h-3 w-2/3 bg-gray-100 rounded-full"/>
                            <div className="h-3 w-1/2 bg-gray-100 rounded-full"/>
                        </div>
                    ))}
                </div>
                {/* Preview skeleton */}
                <div className="hidden xl:block">
                    <div className="h-[800px] w-full bg-white rounded-2xl shadow-sm"/>
                </div>
            </div>
        </div>
    );
}

export default function BuilderPage({id, data}) {
    const {resumeList, setResumeData, getResumeWithId, resumeData, syncResumeData} = useAppContext();
    const [loading, setLoading] = useState(resumeData === null);
    const {DragDropContext} = useDndContext();
    const cvData = resumeData || data;

    useEffect(() => {
        const fetchData = async () => {
            if (cvData) return;
            setLoading(true);
            await getResumeWithId(id);
            setLoading(false);
        };
        fetchData();
    }, [id]);

    if (loading) return <SkeletonLoader />;

    if (!cvData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="text-6xl">😕</div>
                <p className="text-xl font-bold text-gray-700">Resume not found</p>
                <a href="/dashboard" className="px-6 py-2 rounded-full text-white font-bold" style={{background: "linear-gradient(135deg, #e84393, #f97316)"}}>
                    Back to Dashboard
                </a>
            </div>
        );
    }

    return (
        <DragDropContext onDragEnd={(result) => onDragEnd(result, resumeData, setResumeData, syncResumeData)}>
            <div className="bg-homeBackgroundColor px-6 relative min-h-screen w-full max-w-full xl:px-8 2xl:px-10">
                <div className="
                    sidebar:grid-cols-[min-content_max(550px)_auto] sidebar:justify-center
                    lgxl:grid-cols-[min-content_max(570px)_auto] 3xl:grid-cols-[min-content_max(700px)_auto]
                    grid w-full max-w-full grid-cols-1
                    xl:grid-cols-[min-content_max(600px)_auto] 2xl:grid-cols-[min-content_max(650px)_auto]">
                    <BuilderSideBar/>
                    <ControlPanel id={id}/>
                    <ResumePreviewer/>
                </div>
                <RightSidebar/>
            </div>
        </DragDropContext>
    );
}

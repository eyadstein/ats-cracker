"use client";
import useAppContext from "@/hooks/useAppContext";
import {ControlPanelView} from "@/components/cv-builder/control-components/utils/enums"
import ResumeTitleDownload from "@/components/cv-builder/control-components/resume-title";
import ContactInformationPreview from "@/components/cv-builder/control-components/contact-information-preview";
import ContactInformationEdit from "@/components/cv-builder/control-components/contact-information-edit";
import ProfileEditor from "@/components/cv-builder/control-components/profile-editor";
import WorkExperienceItemEditor from "@/components/cv-builder/control-components/work-experience-item-editor";
import WorkExperienceEditor from "@/components/cv-builder/control-components/work-experience-editor";
import EducationEditor from "@/components/cv-builder/control-components/education-editor";
import EducationItemEditor from "@/components/cv-builder/control-components/education-item-editor";
import {useEffect, useState} from "react";
import CertificationEditor from "@/components/cv-builder/control-components/certification-editor";
import CertificationItemEditor from "@/components/cv-builder/control-components/certification-item-editor";
import SkillsEditor from "@/components/cv-builder/control-components/skills-editor";
import SkillItemEditor from "@/components/cv-builder/control-components/skill-item-editor";
import LanguagesEditor from "@/components/cv-builder/control-components/languages-editor";
import LanguageItemEditor from "@/components/cv-builder/control-components/languages-item-editor";
import useDndContext from "@/context/dnd-context";
import DroppableUtil from "@/components/cv-builder/utils/droppable-utils";

export default function ControlPanel({id}) {
    const {resumeData, controlPanel, currentEditIndex, user, setControlPanelIndex, getSectionCompletion} = useAppContext();
    const [isLoaded, setIsLoaded] = useState(true);
    const [animKey, setAnimKey] = useState(0);
    const {Draggable} = useDndContext();
    const completion = getSectionCompletion();

    useEffect(() => {
        if (id === 'cvnew' && !resumeData.data.name) {
            setControlPanelIndex(ControlPanelView.PersonalDetailsEditor);
        }
        setIsLoaded(false);
    }, [id, resumeData.data.name, setControlPanelIndex]);

    useEffect(() => {
        setAnimKey(k => k + 1);
    }, [controlPanel]);

    const sectionLabels = {
        contactInformation: "Personal Info",
        profile: "Profile",
        workExperience: "Experience",
        education: "Education",
        courses: "Certifications",
        skills: "Skills",
        languages: "Languages",
    };

    const editors = {
        profile: <ProfileEditor />,
        workExperience: <WorkExperienceEditor />,
        education: <EducationEditor />,
        courses: <CertificationEditor />,
        skills: <SkillsEditor />,
        languages: <LanguagesEditor />,
        contactInformation: <ContactInformationPreview />,
    };

    const renderEditors = () => {
        return resumeData.data.order.map((section, index) => {
            const isDone = completion[section];
            return (
                <Draggable key={section} draggableId={section} index={index}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? 0.85 : 1,
                                transform: snapshot.isDragging
                                    ? `${provided.draggableProps.style?.transform} scale(1.02)`
                                    : provided.draggableProps.style?.transform,
                                boxShadow: snapshot.isDragging ? "0 20px 40px rgba(0,0,0,0.15)" : "none",
                                borderRadius: snapshot.isDragging ? "16px" : "0",
                                transition: snapshot.isDragging ? "none" : "box-shadow 0.2s ease",
                            }}
                        >
                            {/* Section completion badge overlay */}
                            <div className="relative">
                                {isDone && (
                                    <div className="absolute top-3 right-14 z-10 flex items-center gap-1 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"/>
                                        <span className="text-[10px] font-semibold text-green-600">Complete</span>
                                    </div>
                                )}
                                {editors[section]}
                            </div>
                        </div>
                    )}
                </Draggable>
            );
        });
    };

    if (isLoaded) return (
        <div className="sidebar:px-6 w-full xl:px-8 2xl:px-10 animate-pulse">
            <div className="h-16 bg-gray-100 rounded-2xl mb-4"/>
            <div className="h-32 bg-gray-100 rounded-2xl mb-3"/>
            <div className="h-32 bg-gray-100 rounded-2xl mb-3"/>
        </div>
    );

    return (
        <div id="ControlPanel" className="sidebar:px-6 w-full xl:px-8 2xl:px-10">
            <ResumeTitleDownload/>

            <div
                key={animKey}
                style={{
                    animation: "slideInUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) both",
                }}
            >
                <style>{`
                    @keyframes slideInUp {
                        from { opacity: 0; transform: translateY(16px); }
                        to   { opacity: 1; transform: translateY(0); }
                    }
                `}</style>

                {controlPanel === ControlPanelView.MainView && (
                    <DroppableUtil droppableId="layout" type="LAYOUT">
                        {renderEditors()}
                    </DroppableUtil>
                )}
                {controlPanel === ControlPanelView.WorkExperienceEditor && <WorkExperienceItemEditor/>}
                {controlPanel === ControlPanelView.PersonalDetailsEditor && <ContactInformationEdit/>}
                {controlPanel === ControlPanelView.EducationEditor && <EducationItemEditor/>}
                {controlPanel === ControlPanelView.CertificationEditor && <CertificationItemEditor/>}
                {controlPanel === ControlPanelView.SkillsEditor && <SkillItemEditor/>}
                {controlPanel === ControlPanelView.LanguagesEditor && <LanguageItemEditor/>}
            </div>
        </div>
    );
}

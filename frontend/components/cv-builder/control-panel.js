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
import { FaPlus } from "react-icons/fa";

// Simple Projects editor wrapper
function ProjectsEditor() {
    const { resumeData, setResumeData, syncResumeData } = useAppContext();
    const projects = resumeData?.data?.projects || [];
    
    const addProject = () => {
        const newProject = { name: "New Project", description: "", url: "" };
        const newData = {
            ...resumeData,
            data: {
                ...resumeData.data,
                projects: [...projects, newProject],
            }
        };
        setResumeData(newData);
        syncResumeData(newData).catch(e => console.error("Save error:", e));
    };
    
    const removeProject = (idx) => {
        const newProjects = [...projects];
        newProjects.splice(idx, 1);
        const newData = { ...resumeData, data: { ...resumeData.data, projects: newProjects } };
        setResumeData(newData);
        syncResumeData(newData).catch(e => console.error("Save error:", e));
    };
    
    const updateProject = (idx, field, value) => {
        const newProjects = [...projects];
        newProjects[idx] = { ...newProjects[idx], [field]: value };
        const newData = { ...resumeData, data: { ...resumeData.data, projects: newProjects } };
        setResumeData(newData);
        syncResumeData(newData).catch(e => console.error("Save error:", e));
    };

    return (
        <div className="rounded-large shadow-card w-full bg-white px-5 md:px-7 lg:px-9 relative max-w-full pb-9 pt-6 mb-4">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 font-bold text-sm">P</span>
                </div>
                <h3 className="font-bold text-gray-800">Projects</h3>
            </div>
            {projects.map((p, i) => (
                <div key={i} className="mb-3 p-3 bg-gray-50 rounded-lg">
                    <input
                        className="w-full mb-2 px-3 py-2 rounded border border-gray-200 text-sm"
                        placeholder="Project name"
                        value={p.name || ""}
                        onChange={(e) => updateProject(i, "name", e.target.value)}
                    />
                    <input
                        className="w-full mb-2 px-3 py-2 rounded border border-gray-200 text-sm"
                        placeholder="URL (optional)"
                        value={p.url || ""}
                        onChange={(e) => updateProject(i, "url", e.target.value)}
                    />
                    <textarea
                        className="w-full px-3 py-2 rounded border border-gray-200 text-sm"
                        placeholder="Description"
                        rows={2}
                        value={p.description || ""}
                        onChange={(e) => updateProject(i, "description", e.target.value)}
                    />
                    <button onClick={() => removeProject(i)} className="mt-2 text-red-500 text-xs font-semibold hover:text-red-700">Remove</button>
                </div>
            ))}
            <button
                onClick={addProject}
                className="w-full py-2.5 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 font-semibold text-sm hover:border-indigo-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
            >
                <FaPlus size={12} /> Add Project
            </button>
        </div>
    );
}

// Generic custom section editor
function CustomSectionEditor({ sectionKey, title }) {
    const { resumeData, setResumeData, syncResumeData } = useAppContext();
    const section = resumeData?.data?.customSections?.find(s => s.key === sectionKey);
    const items = section?.items || [];

    const addItem = () => {
        const newSections = (resumeData?.data?.customSections || []).map(s =>
            s.key === sectionKey ? { ...s, items: [...s.items, { description: "" }] } : s
        );
        const newData = { ...resumeData, data: { ...resumeData.data, customSections: newSections } };
        setResumeData(newData);
        syncResumeData(newData).catch(e => console.error("Save error:", e));
    };

    const updateItem = (idx, value) => {
        const newSections = (resumeData?.data?.customSections || []).map(s =>
            s.key === sectionKey ? { ...s, items: s.items.map((it, i) => i === idx ? { ...it, description: value } : it) } : s
        );
        const newData = { ...resumeData, data: { ...resumeData.data, customSections: newSections } };
        setResumeData(newData);
        syncResumeData(newData).catch(e => console.error("Save error:", e));
    };

    const removeItem = (idx) => {
        const newSections = (resumeData?.data?.customSections || []).map(s =>
            s.key === sectionKey ? { ...s, items: s.items.filter((_, i) => i !== idx) } : s
        );
        const newData = { ...resumeData, data: { ...resumeData.data, customSections: newSections } };
        setResumeData(newData);
        syncResumeData(newData).catch(e => console.error("Save error:", e));
    };

    return (
        <div className="rounded-large shadow-card w-full bg-white px-5 md:px-7 lg:px-9 relative max-w-full pb-9 pt-6 mb-4">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
                    <span className="text-pink-600 font-bold text-sm">+</span>
                </div>
                <h3 className="font-bold text-gray-800">{title}</h3>
            </div>
            {items.map((item, i) => (
                <div key={i} className="mb-2 flex gap-2">
                    <input
                        className="flex-1 px-3 py-2 rounded border border-gray-200 text-sm"
                        placeholder="Item description"
                        value={item.description || ""}
                        onChange={(e) => updateItem(i, e.target.value)}
                    />
                    <button onClick={() => removeItem(i)} className="text-red-500 text-xs font-semibold px-2 hover:text-red-700">✕</button>
                </div>
            ))}
            <button
                onClick={addItem}
                className="w-full py-2.5 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 font-semibold text-sm hover:border-pink-400 hover:text-pink-600 transition-all flex items-center justify-center gap-2"
            >
                <FaPlus size={12} /> Add Item
            </button>
        </div>
    );
}

export default function ControlPanel({id}) {
    const {resumeData, controlPanel, currentEditIndex, user, setControlPanelIndex, getSectionCompletion, setResumeData, syncResumeData} = useAppContext();
    const [isLoaded, setIsLoaded] = useState(true);
    const [animKey, setAnimKey] = useState(0);
    const {Draggable} = useDndContext();
    const completion = resumeData?.data ? getSectionCompletion() : {};

    useEffect(() => {
        if (id === 'cvnew' && !resumeData?.data?.name) {
            setControlPanelIndex(ControlPanelView.PersonalDetailsEditor);
        }
        setIsLoaded(false);
    }, [id, resumeData?.data?.name, setControlPanelIndex]);

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
        projects: "Projects",
    };

    // Build editors map dynamically including custom sections
    const getEditors = () => {
        const base = {
            contactInformation: <ContactInformationPreview />,
            profile: <ProfileEditor />,
            workExperience: <WorkExperienceEditor />,
            education: <EducationEditor />,
            courses: <CertificationEditor />,
            skills: <SkillsEditor />,
            languages: <LanguagesEditor />,
            projects: <ProjectsEditor />,
        };
        // Add custom section editors
        (resumeData?.data?.customSections || []).forEach(s => {
            base[s.key] = <CustomSectionEditor sectionKey={s.key} title={s.title} />;
        });
        return base;
    };

    const addCustomSection = () => {
        const name = prompt("Enter section name (e.g. Publications, Awards):");
        if (!name) return;
        const key = name.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
        const currentData = resumeData?.data || {};
        const newCustomSections = [...(currentData.customSections || []), { key, title: name, items: [{ description: "" }] }];
        const newOrder = [...(currentData.order || []), key];
        const newData = { ...resumeData, data: { ...currentData, customSections: newCustomSections, order: newOrder } };
        setResumeData(newData);
        syncResumeData(newData).catch(e => console.error("Save error:", e));
    };

    const renderEditors = () => {
        const editors = getEditors();
        const order = resumeData?.data?.order || ["contactInformation","profile","workExperience","education","courses","skills","languages"];
        return order.map((section, index) => {
            if (!editors[section]) return null;
            const isDone = completion?.[section] || false;
            return (
                <Draggable key={section} draggableId={String(section)} index={index}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? 0.85 : 1,
                                transform: snapshot.isDragging
                                    ? `${provided.draggableProps.style?.transform || ''} scale(1.02)`
                                    : provided.draggableProps.style?.transform,
                                boxShadow: snapshot.isDragging ? "0 20px 40px rgba(0,0,0,0.15)" : "none",
                                borderRadius: snapshot.isDragging ? "16px" : "0",
                                transition: snapshot.isDragging ? "none" : "box-shadow 0.2s ease",
                            }}
                        >
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
        }).filter(Boolean);
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
                    <>
                        <DroppableUtil droppableId="layout" type="LAYOUT">
                            {renderEditors()}
                        </DroppableUtil>
                        {/* Add Section button at bottom */}
                        <button
                            onClick={addCustomSection}
                            className="w-full mt-4 py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 font-semibold text-sm hover:border-pink-400 hover:text-pink-600 transition-all flex items-center justify-center gap-2 bg-white/50"
                        >
                            <FaPlus size={14} /> Add a new section
                        </button>
                    </>
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

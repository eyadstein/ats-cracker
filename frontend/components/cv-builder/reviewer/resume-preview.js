'use client'
import { useRef } from "react";
import ResumePage from "@/components/cv-builder/reviewer/resume-page";
import ContactInformationCv from "@/components/cv-builder/reviewer/contact-information-cv";
import ProfileCv from "@/components/cv-builder/reviewer/profile-cv";
import WorkExperienceCv from "@/components/cv-builder/reviewer/work-experience-cv";
import EducationSection from "@/components/cv-builder/reviewer/education-preview";
import CoursesCv from "@/components/cv-builder/reviewer/certification-preview";
import SkillsCv from "@/components/cv-builder/reviewer/skills-preview";
import LanguagesSection from "@/components/cv-builder/reviewer/language-preview";
import useAppContext from "@/hooks/useAppContext";

function stripHtml(html) {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, '');
}

function sanitizeUrl(url) {
    if (!url) return "";
    const lower = url.trim().toLowerCase();
    if (lower.startsWith('javascript:') || lower.startsWith('data:') || lower.startsWith('vbscript:')) {
        return "#";
    }
    return url;
}

function ResumeContainer({ children }) {
    return (
        <div className={"sidebar:flex sticky top-0 hidden h-screen max-h-screen grow overflow-auto scroll-smooth pb-4 pt-8"} id={"resumePreview"}>
            <div style={{ width: "620px", minHeight: "1136px", position: "relative" }}>
                <div style={{ transform: "scale(0.780856)", transformOrigin: "top left", position: "absolute", top: 0, left: 0 }}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export function ListContainer({ children, cv, className, onClick }) {
    const targetWidth = 180;
    const targetHeight = 250;
    const originalWidth = 620;
    const originalHeight = 1136;
    const scale = Math.min(targetWidth / originalWidth, targetHeight / originalHeight);
    return (
        <div onClick={onClick} className={`flex flex-col justify-center items-center cursor-pointer ${className}`}>
            <div className="select-none overflow-hidden rounded-md border border-solid border-white hover:opacity-70" style={{ width: `${targetWidth}px`, height: `${targetHeight}px`, position: "relative" }}>
                <div style={{ width: `${originalWidth}px`, height: `${originalHeight}px`, transform: `scale(${scale})`, transformOrigin: "top left", position: "absolute", pointerEvents: "none", top: 0, left: 0 }}>
                    {children}
                </div>
            </div>
            <span className="mt-[10px] text-xs font-bold uppercase">{stripHtml(cv?.title) || "Resume"}</span>
        </div>
    );
}

function ProjectsCv({ data, className }) {
    const d = data?.data || data || {};
    if (!d?.projects?.length) return null;
    return (
        <div className={className || ""}>
            <div style={{ fontSize: "13pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px", color: "#1a1040" }}>
                {d.titles?.projects || "PROJECTS"}
            </div>
            {d.projects.map((p, i) => (
                <div key={`project-${i}`} style={{ marginBottom: "10px" }}>
                    <div style={{ fontWeight: 600, fontSize: "11.5pt" }}>{stripHtml(p.name)}</div>
                    {p.url && <div style={{ fontSize: "10pt", color: "#2563eb" }}>{sanitizeUrl(p.url)}</div>}
                    {p.description && <div style={{ fontSize: "10.5pt", whiteSpace: "pre-wrap" }}>{stripHtml(p.description)}</div>}
                </div>
            ))}
        </div>
    );
}

function CustomSectionCv({ data, sectionKey, className }) {
    const d = data?.data || data || {};
    const section = d?.customSections?.find(s => s.key === sectionKey);
    if (!section) return null;
    return (
        <div className={className || ""}>
            <div style={{ fontSize: "13pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px", color: "#1a1040" }}>
                {stripHtml(section.title)}
            </div>
            {section.items?.map((item, i) => (
                <div key={`custom-${i}`} style={{ fontSize: "10.5pt", marginBottom: "4px" }}>{stripHtml(item.description)}</div>
            ))}
        </div>
    );
}

export function ResumePreview({ data, isListItemPreview = false }) {
    const contentRef = useRef(null);
    const { resumeData } = useAppContext();
    const cvData = isListItemPreview ? data : resumeData;

    const renderSections = () => {
        const rawData = cvData?.data || {};
        const safeData = {
            data: {
                name: rawData.name || "",
                position: rawData.position || "",
                email: rawData.email || "",
                contactInformation: rawData.contactInformation || "",
                address: rawData.address || "",
                socialMedia: rawData.socialMedia || [],
                summary: rawData.summary || [],
                educations: rawData.educations || [],
                courses: rawData.courses || [],
                workExperience: rawData.workExperience || [],
                projects: rawData.projects || [],
                skills: rawData.skills || [],
                languages: rawData.languages || [],
                customSections: rawData.customSections || [],
                order: rawData.order || ["contactInformation", "profile", "workExperience", "education", "courses", "skills", "languages"],
                titles: {
                    profile: "PROFILE", experience: "EXPERIENCE", education: "EDUCATION",
                    certification: "CERTIFICATION", skills: "SKILLS", languages: "LANGUAGES", projects: "PROJECTS",
                    ...(rawData.titles || {})
                },
            }
        };

        const sections = {
            contactInformation: <ContactInformationCv data={safeData} isListItemPreview={isListItemPreview} />,
            profile: <ProfileCv data={safeData} isListItemPreview={isListItemPreview} />,
            workExperience: (
                <WorkExperienceCv data={safeData} isListItemPreview={isListItemPreview} className={"mt-2"} droppableId={"work-experience"} type={"WORK_EXPERIENCE"} />
            ),
            education: (
                <EducationSection data={safeData} isListItemPreview={isListItemPreview} className={"mt-2"} droppableId={"education"} type={"EDUCATION"} />
            ),
            courses: (
                <CoursesCv className={"mt-2"} data={safeData} isListItemPreview={isListItemPreview} droppableId="courses" type="COURSES" />
            ),
            skills: (
                <SkillsCv className={"mt-2"} data={safeData} isListItemPreview={isListItemPreview} droppableId="skills" type="SKILLS" />
            ),
            languages: (
                <LanguagesSection className={"mt-2"} data={safeData} isListItemPreview={isListItemPreview} droppableId="languages" type="LANGUAGES" />
            ),
            projects: <ProjectsCv data={safeData} className="mt-2" />,
        };

        if (safeData.data.customSections?.length) {
            safeData.data.customSections.forEach(s => {
                sections[s.key] = <CustomSectionCv data={safeData} sectionKey={s.key} className="mt-2" />;
            });
        }

        const order = safeData.data.order || ["contactInformation", "profile", "workExperience", "education", "courses", "skills", "languages"];
        return order.map((section, idx) => sections[section] || null).filter(Boolean);
    };

    return <div id="resumePages">
        <ResumePage data={data} isListItemPreview={isListItemPreview} ref={contentRef}>
            {renderSections()}
        </ResumePage>
    </div>
}

export function ResumePreviewer({ data }) {
    return (
        <ResumeContainer>
            <ResumePreview data={data} />
        </ResumeContainer>
    );
}

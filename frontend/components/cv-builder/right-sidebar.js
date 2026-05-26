"use client";
import CircularButton from "@/components/general/circle-btn";
import {FaDownload, FaCopy, FaUpload, FaPaste, FaSyncAlt, FaFileWord, FaFilePdf} from "react-icons/fa";
import useAppContext from "@/hooks/useAppContext";
import {DownloadIcon} from "@/components/svgs/svgs";
import { useState } from "react";

function parsePlainTextToCV(text) {
    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
    const cv = {
        name: "", position: "", contactInformation: "", email: "",
        address: "", socialMedia: [], summary: [], educations: [],
        courses: [], workExperience: [], projects: [], skills: [], languages: [],
        titles: {
            profile: "PROFILE", experience: "EXPERIENCE", education: "EDUCATION",
            certification: "CERTIFICATION", skills: "SKILLS", languages: "LANGUAGES"
        },
        order: ["contactInformation","profile","workExperience","education","courses","skills","languages"]
    };

    if (lines[0]) cv.name = lines[0];
    if (lines[1]) cv.position = lines[1];

    const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch) cv.email = emailMatch[0];

    const phoneMatch = text.match(/(\+?\d[\d\s\-().]{7,}\d)/);
    if (phoneMatch) cv.contactInformation = phoneMatch[0];

    const skillKeywords = ["skills","technologies","tech stack","tools","frameworks"];
    const expKeywords = ["experience","work history","employment","worked at"];
    const eduKeywords = ["education","university","college","degree","bachelor","master"];
    const summaryKeywords = ["summary","objective","about","profile"];

    let currentSection = null;
    let buffer = [];

    const flushBuffer = () => {
        if (!buffer.length) return;
        if (currentSection === "summary") {
            cv.summary = buffer.map(b => ({ description: b }));
        } else if (currentSection === "skills") {
            cv.skills = buffer.flatMap(b =>
                b.split(/[,|•·]/).map(s => s.trim()).filter(Boolean).map(s => ({ name: s, level: 3 }))
            );
        } else if (currentSection === "experience") {
            cv.workExperience.push({ company: buffer[0] || "", position: buffer[1] || "", description: buffer.slice(2).join(" "), startDate: "", endDate: "" });
        } else if (currentSection === "education") {
            cv.educations.push({ school: buffer[0] || "", degree: buffer[1] || "", startDate: "", endDate: "" });
        }
        buffer = [];
    };

    for (let i = 2; i < lines.length; i++) {
        const lower = lines[i].toLowerCase();
        if (summaryKeywords.some(k => lower.includes(k))) { flushBuffer(); currentSection = "summary"; }
        else if (skillKeywords.some(k => lower.includes(k))) { flushBuffer(); currentSection = "skills"; }
        else if (expKeywords.some(k => lower.includes(k))) { flushBuffer(); currentSection = "experience"; }
        else if (eduKeywords.some(k => lower.includes(k))) { flushBuffer(); currentSection = "education"; }
        else { buffer.push(lines[i]); }
    }
    flushBuffer();
    return cv;
}

export default function RightSidebar() {
    const {resumeData, setResumeData, syncResumeData} = useAppContext();
    const [loading, setLoading] = useState(false);

    const downloadAsJson = () => {
        const el = document.createElement("a");
        el.href = URL.createObjectURL(new Blob([JSON.stringify(resumeData.data)], {type: "application/json"}));
        el.download = `resume-${resumeData.title}.json`;
        document.body.appendChild(el);
        el.click();
    };

    const downloadAsWord = async () => {
        setLoading(true);
        try {
            const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import("docx");
            const d = resumeData.data;
            const sections = [];

            sections.push(new Paragraph({ text: d.name || "Name", heading: HeadingLevel.TITLE }));
            sections.push(new Paragraph({ text: d.position || "", heading: HeadingLevel.HEADING_2 }));
            sections.push(new Paragraph({ text: d.email || "" }));
            sections.push(new Paragraph({ text: d.contactInformation || "" }));
            sections.push(new Paragraph({ text: "" }));

            if (d.summary?.length) {
                sections.push(new Paragraph({ text: "PROFILE", heading: HeadingLevel.HEADING_1 }));
                d.summary.forEach(s => sections.push(new Paragraph({ text: s.description || "" })));
                sections.push(new Paragraph({ text: "" }));
            }

            if (d.workExperience?.length) {
                sections.push(new Paragraph({ text: "EXPERIENCE", heading: HeadingLevel.HEADING_1 }));
                d.workExperience.forEach(w => {
                    sections.push(new Paragraph({ children: [new TextRun({ text: `${w.position || ""} at ${w.company || ""}`, bold: true })] }));
                    sections.push(new Paragraph({ text: `${w.startDate || ""} - ${w.endDate || ""}` }));
                    sections.push(new Paragraph({ text: w.description || "" }));
                    sections.push(new Paragraph({ text: "" }));
                });
            }

            if (d.educations?.length) {
                sections.push(new Paragraph({ text: "EDUCATION", heading: HeadingLevel.HEADING_1 }));
                d.educations.forEach(e => {
                    sections.push(new Paragraph({ children: [new TextRun({ text: `${e.degree || ""} - ${e.school || ""}`, bold: true })] }));
                    sections.push(new Paragraph({ text: `${e.startDate || ""} - ${e.endDate || ""}` }));
                    sections.push(new Paragraph({ text: "" }));
                });
            }

            if (d.skills?.length) {
                sections.push(new Paragraph({ text: "SKILLS", heading: HeadingLevel.HEADING_1 }));
                sections.push(new Paragraph({ text: d.skills.map(s => s.name).join(", ") }));
                sections.push(new Paragraph({ text: "" }));
            }

            if (d.languages?.length) {
                sections.push(new Paragraph({ text: "LANGUAGES", heading: HeadingLevel.HEADING_1 }));
                sections.push(new Paragraph({ text: d.languages.map(l => l.name).join(", ") }));
            }

            const doc = new Document({ sections: [{ children: sections }] });
            const blob = await Packer.toBlob(doc);
            const el = document.createElement("a");
            el.href = URL.createObjectURL(blob);
            el.download = `resume-${resumeData.title || "cv"}.docx`;
            document.body.appendChild(el);
            el.click();
        } catch (e) {
            alert("Error generating Word file: " + e.message);
        }
        setLoading(false);
    };

    const copyAsJson = () => navigator.clipboard.writeText(JSON.stringify(resumeData.data));

    const triggerFileInput = (accept) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = accept;
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            setLoading(true);
            try {
                if (file.name.endsWith(".json")) {
                    const text = await file.text();
                    setResumeData({ ...resumeData, data: JSON.parse(text) });
                } else if (file.name.endsWith(".docx")) {
                    const arrayBuffer = await file.arrayBuffer();
                    const mammoth = (await import("mammoth")).default;
                    const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
                    const parsed = parsePlainTextToCV(result.value);
                    setResumeData({ ...resumeData, data: parsed });
                } else if (file.name.endsWith(".pdf")) {
                    const arrayBuffer = await file.arrayBuffer();
                    const pdfjsLib = await import("pdfjs-dist/build/pdf.mjs");
                    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.mjs", import.meta.url).toString();
                    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                    let text = "";
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const content = await page.getTextContent();
                        text += content.items.map(item => item.str).join(" ") + "\n";
                    }
                    const parsed = parsePlainTextToCV(text);
                    setResumeData({ ...resumeData, data: parsed });
                }
            } catch (err) {
                alert("Error reading file: " + err.message);
            }
            setLoading(false);
        };
        input.click();
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (!text.trim()) { alert("Clipboard is empty."); return; }
            setLoading(true);
            try {
                const jsonData = JSON.parse(text);
                setResumeData({ ...resumeData, data: jsonData });
            } catch {
                const parsed = parsePlainTextToCV(text);
                setResumeData({ ...resumeData, data: parsed });
            }
            setLoading(false);
        } catch {
            alert("Failed to read clipboard.");
            setLoading(false);
        }
    };

    return (
        <div className="fixed right-4 top-1/4 flex flex-col gap-3 z-10">
            {loading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 text-black font-bold">Processing...</div>
                </div>
            )}

            <CircularButton tooltipText="Download JSON" onClick={downloadAsJson} icon={DownloadIcon} bgColor="bg-primaryBlack"/>
            <CircularButton tooltipText="Download Word (.docx)" onClick={downloadAsWord} icon={FaFileWord} bgColor="bg-blue-600 hover:bg-blue-700"/>
            <CircularButton tooltipText="Copy as JSON" onClick={copyAsJson} icon={FaCopy} bgColor="bg-teal-500 hover:bg-teal-600"/>
            <CircularButton tooltipText="Upload JSON" onClick={() => triggerFileInput(".json")} icon={FaUpload} bgColor="bg-purple-600 hover:bg-purple-700"/>
            <CircularButton tooltipText="Upload PDF" onClick={() => triggerFileInput(".pdf")} icon={FaFilePdf} bgColor="bg-red-600 hover:bg-red-700"/>
            <CircularButton tooltipText="Upload Word (.docx)" onClick={() => triggerFileInput(".docx")} icon={FaFileWord} bgColor="bg-blue-500 hover:bg-blue-600"/>
            <CircularButton tooltipText="Paste Text or JSON" onClick={handlePaste} icon={FaPaste} bgColor="bg-green-500 hover:bg-green-600"/>
            <CircularButton tooltipText="Sync" onClick={() => syncResumeData(resumeData)} icon={FaSyncAlt} bgColor="bg-yellow-500 hover:bg-yellow-600"/>
        </div>
    );
}



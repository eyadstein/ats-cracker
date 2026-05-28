"use client";
import CircularButton from "@/components/general/circle-btn";
import {FaDownload, FaCopy, FaUpload, FaPaste, FaSyncAlt, FaFileWord, FaFilePdf, FaPlus} from "react-icons/fa";
import useAppContext from "@/hooks/useAppContext";
import {DownloadIcon} from "@/components/svgs/svgs";
import { useState } from "react";

function parsePlainTextToCV(rawText) {
    const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const full = lines.join("\n");

    const cv = {
        name: "", position: "", contactInformation: "", email: "", address: "",
        socialMedia: [], summary: [], educations: [], courses: [],
        workExperience: [], projects: [], skills: [], languages: [],
        titles: { profile:"PROFILE", experience:"EXPERIENCE", education:"EDUCATION", certification:"CERTIFICATION", skills:"SKILLS", languages:"LANGUAGES", projects:"PROJECTS" },
        order: ["contactInformation","profile","workExperience","education","courses","skills","languages","projects"]
    };

    const emailMatch = full.match(/[\w.+-]+@[\w.-]+\.\w{2,}/);
    if (emailMatch) cv.email = emailMatch[0];

    const phoneMatch = full.match(/(\+?\d[\d\s\-(). ]{6,}\d)/);
    if (phoneMatch) cv.contactInformation = phoneMatch[0].trim();

    const linkedinMatch = full.match(/linkedin\.com\/in\/[\w-]+/i);
    if (linkedinMatch) cv.socialMedia.push({ name: "LinkedIn", url: "https://" + linkedinMatch[0] });

    const cityMatch = full.match(/\b([A-Z][a-z]+(?:,\s*[A-Z][a-z]+)*(?:,\s*[A-Z]{2,})?)\b/);
    if (cityMatch && cityMatch[0].length < 40) cv.address = cityMatch[0];

    const SECTIONS = [
        { key: "summary",        re: /^(profile|summary|about|objective|about me|professional summary)$/i },
        { key: "experience",     re: /^(experience|work experience|employment|professional experience|work history|career)$/i },
        { key: "education",      re: /^(education|academic background|qualifications|degrees|academic)$/i },
        { key: "skills",         re: /^(skills|technical skills|core skills|competencies|technologies|tech stack|tools|frameworks|programming)$/i },
        { key: "projects",       re: /^(projects|personal projects|key projects|portfolio|selected projects)$/i },
        { key: "languages",      re: /^(languages|language skills|spoken languages)$/i },
        { key: "courses",        re: /^(certifications|courses|training|certificates|professional development)$/i },
    ];

    const isSectionHeader = (line) => SECTIONS.find(s => s.re.test(line.trim()));
    const isDateRange = (line) => /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|\d{4}|present|current|now|to)\b/i.test(line);
    const isShortHeader = (line) => line.length < 80 && !line.endsWith(".") && !line.includes("@");

    for (let i = 0; i < Math.min(4, lines.length); i++) {
        if (!lines[i].match(/[@\d{6,}|http|www]/i) && lines[i].length < 60) {
            cv.name = lines[i]; break;
        }
    }

    for (let i = 1; i < Math.min(6, lines.length); i++) {
        const l = lines[i];
        if (l !== cv.name && !l.match(/[@\+\d{5,}]/) && l.length < 80 && !isSectionHeader(l)) {
            cv.position = l; break;
        }
    }

    let currentSection = null;
    let buffer = [];

    const flushBuffer = () => {
        if (!buffer.length) return;
        if (currentSection === "summary") {
            cv.summary = [{ description: buffer.join(" ") }];
        } else if (currentSection === "skills") {
            const allSkills = buffer.join(", ").split(/[,|•·\n\/]/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 50);
            cv.skills = allSkills.map(s => ({ name: s, level: 3 }));
        } else if (currentSection === "experience") {
            let i = 0;
            while (i < buffer.length) {
                const title = buffer[i] || "";
                let company = "", startDate = "", endDate = "", descLines = [];
                let j = i + 1;
                while (j < buffer.length && !isShortHeader(buffer[j])) {
                    if (isDateRange(buffer[j])) {
                        const parts = buffer[j].split(/[-–—to]/i).map(s => s.trim());
                        startDate = parts[0] || ""; endDate = parts[1] || "Present";
                    } else if (!company && buffer[j].length < 80 && !buffer[j].startsWith("•")) {
                        company = buffer[j];
                    } else {
                        descLines.push(buffer[j].replace(/^•\s*/, ""));
                    }
                    j++;
                }
                cv.workExperience.push({ position: title, company, startDate, endDate, description: descLines.join("\n") });
                i = j;
                if (i === j && i < buffer.length) i++;
            }
        } else if (currentSection === "education") {
            let i = 0;
            while (i < buffer.length) {
                const degree = buffer[i] || "";
                let school = "", startDate = "", endDate = "";
                let j = i + 1;
                while (j < buffer.length && !isShortHeader(buffer[j])) {
                    if (isDateRange(buffer[j])) {
                        const parts = buffer[j].split(/[-–—to]/i).map(s => s.trim());
                        startDate = parts[0] || ""; endDate = parts[1] || "Present";
                    } else if (!school) { school = buffer[j]; }
                    j++;
                }
                cv.educations.push({ degree, school, startDate, endDate });
                i = j;
                if (i === j && i < buffer.length) i++;
            }
        } else if (currentSection === "projects") {
            let i = 0;
            while (i < buffer.length) {
                const name = buffer[i] || "";
                let descLines = [], url = "";
                let j = i + 1;
                while (j < buffer.length && !isShortHeader(buffer[j])) {
                    if (buffer[j].match(/https?:\/\//)) url = buffer[j];
                    else descLines.push(buffer[j].replace(/^•\s*/, ""));
                    j++;
                }
                cv.projects.push({ name, description: descLines.join("\n"), url });
                i = j;
                if (i === j && i < buffer.length) i++;
            }
        } else if (currentSection === "languages") {
            cv.languages = buffer.flatMap(b => b.split(/[,|•·]/).map(s => s.trim()).filter(Boolean))
                .map(l => {
                    const parts = l.split(/[()[\]]/);
                    return { name: parts[0].trim(), level: parts[1]?.trim() || "Intermediate" };
                });
        } else if (currentSection === "courses") {
            cv.courses = buffer.flatMap(b => b.split(/[,|•·\n]/).map(s => s.trim()).filter(Boolean))
                .map(name => ({ name, date: "" }));
        }
        buffer = [];
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line === cv.name || line === cv.position) continue;
        if (line.match(/[@\+]/) && (cv.email || cv.contactInformation)) continue;

        const section = isSectionHeader(line);
        if (section) {
            flushBuffer();
            currentSection = section.key;
        } else if (currentSection) {
            buffer.push(line);
        }
    }
    flushBuffer();
    return cv;
}

export default function RightSidebar() {
    const {resumeData, setResumeData, syncResumeData} = useAppContext();
    const [loading, setLoading] = useState(false);

    const safeSetResume = (newData) => {
        const safe = {
            name: newData.name || "", position: newData.position || "",
            email: newData.email || "", contactInformation: newData.contactInformation || "",
            address: newData.address || "", socialMedia: newData.socialMedia || [],
            summary: newData.summary || [], educations: newData.educations || [],
            courses: newData.courses || [], workExperience: newData.workExperience || [],
            projects: newData.projects || [], skills: newData.skills || [],
            languages: newData.languages || [],
            titles: newData.titles || { profile:"PROFILE", experience:"EXPERIENCE", education:"EDUCATION", certification:"CERTIFICATION", skills:"SKILLS", languages:"LANGUAGES", projects:"PROJECTS" },
            order: newData.order || ["contactInformation","profile","workExperience","education","courses","skills","languages"],
        };
        const updated = { ...resumeData, data: safe };
        setResumeData(updated);
        return updated;
    };

    const downloadAsJson = () => {
        const el = document.createElement("a");
        el.href = URL.createObjectURL(new Blob([JSON.stringify(resumeData.data)], {type: "application/json"}));
        el.download = `resume-${resumeData.title}.json`;
        document.body.appendChild(el);
        el.click();
        document.body.removeChild(el);
    };

    const downloadAsWord = async () => {
        setLoading(true);
        try {
            const {
                Document, Packer, Paragraph, TextRun, HeadingLevel,
                AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType
            } = await import("docx");
            const d = resumeData.data;
            const children = [];

            const sectionHeader = (text) => new Paragraph({
                children: [new TextRun({ text, bold: true, size: 24, color: "1a1040", font: "Calibri" })],
                border: { bottom: { color: "8b5cf6", style: BorderStyle.SINGLE, size: 12 } },
                spacing: { before: 300, after: 120 },
            });

            const bulletPara = (text) => new Paragraph({
                children: [new TextRun({ text: `• ${text}`, size: 20, font: "Calibri" })],
                spacing: { after: 80, before: 40 },
                indent: { left: 360 },
            });

            const normalPara = (text, opts = {}) => new Paragraph({
                children: [new TextRun({ text, size: 20, font: "Calibri", ...opts })],
                spacing: { after: 60 },
            });

            // HEADER: Name + Position
            children.push(new Paragraph({
                children: [new TextRun({ text: d.name || "", bold: true, size: 48, color: "1a1040", font: "Calibri" })],
                alignment: AlignmentType.CENTER,
                spacing: { after: 80 },
            }));
            if (d.position) children.push(new Paragraph({
                children: [new TextRun({ text: d.position, size: 24, color: "6366f1", font: "Calibri" })],
                alignment: AlignmentType.CENTER,
                spacing: { after: 120 },
            }));

            // Contact row as table for perfect alignment
            const contactParts = [];
            if (d.email) contactParts.push(d.email);
            if (d.contactInformation) contactParts.push(d.contactInformation);
            if (d.address) contactParts.push(d.address);
            if (d.socialMedia?.length) contactParts.push(...d.socialMedia.map(s => s.url));

            if (contactParts.length) {
                children.push(new Paragraph({
                    children: [new TextRun({ text: contactParts.join("  |  "), size: 18, color: "555555", font: "Calibri" })],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 240 },
                }));
            }

            // PROFILE
            if (d.summary?.length) {
                children.push(sectionHeader(d.titles?.profile || "PROFILE"));
                d.summary.forEach(s => s.description && children.push(normalPara(s.description)));
            }

            // EXPERIENCE
            if (d.workExperience?.length) {
                children.push(sectionHeader(d.titles?.experience || "EXPERIENCE"));
                d.workExperience.forEach(w => {
                    const rows = [];
                    if (w.position || w.company) rows.push(new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 70, type: WidthType.PERCENT },
                                children: [new Paragraph({ children: [new TextRun({ text: w.position || "", bold: true, size: 22, font: "Calibri" })] })],
                                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                            }),
                            new TableCell({
                                width: { size: 30, type: WidthType.PERCENT },
                                children: [new Paragraph({
                                    children: [new TextRun({ text: [w.startDate, w.endDate].filter(Boolean).join(" - ") || "", size: 18, color: "888888", italics: true, font: "Calibri" })],
                                    alignment: AlignmentType.RIGHT,
                                })],
                                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                            }),
                        ],
                    }));
                    if (w.company) rows.push(new TableRow({
                        children: [
                            new TableCell({
                                columnSpan: 2,
                                children: [new Paragraph({ children: [new TextRun({ text: w.company, size: 20, color: "444444", font: "Calibri" })] })],
                                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                            }),
                        ],
                    }));
                    children.push(new Table({ rows, width: { size: 100, type: WidthType.PERCENT } }));
                    if (w.description) {
                        w.description.split(/\n|•/).map(s => s.trim()).filter(Boolean)
                            .forEach(line => children.push(bulletPara(line)));
                    }
                    children.push(new Paragraph({ text: "", spacing: { after: 120 } }));
                });
            }

            // EDUCATION
            if (d.educations?.length) {
                children.push(sectionHeader(d.titles?.education || "EDUCATION"));
                d.educations.forEach(e => {
                    const rows = [];
                    if (e.degree || e.school) rows.push(new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 70, type: WidthType.PERCENT },
                                children: [new Paragraph({ children: [new TextRun({ text: e.degree || "", bold: true, size: 22, font: "Calibri" })] })],
                                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                            }),
                            new TableCell({
                                width: { size: 30, type: WidthType.PERCENT },
                                children: [new Paragraph({
                                    children: [new TextRun({ text: [e.startDate, e.endDate].filter(Boolean).join(" - ") || "", size: 18, color: "888888", italics: true, font: "Calibri" })],
                                    alignment: AlignmentType.RIGHT,
                                })],
                                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                            }),
                        ],
                    }));
                    if (e.school) rows.push(new TableRow({
                        children: [
                            new TableCell({
                                columnSpan: 2,
                                children: [new Paragraph({ children: [new TextRun({ text: e.school, size: 20, color: "444444", font: "Calibri" })] })],
                                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                            }),
                        ],
                    }));
                    children.push(new Table({ rows, width: { size: 100, type: WidthType.PERCENT } }));
                    children.push(new Paragraph({ text: "", spacing: { after: 120 } }));
                });
            }

            // PROJECTS
            if (d.projects?.length) {
                children.push(sectionHeader(d.titles?.projects || "PROJECTS"));
                d.projects.forEach(p => {
                    if (p.name) children.push(new Paragraph({
                        children: [new TextRun({ text: p.name, bold: true, size: 22, font: "Calibri" })],
                        spacing: { before: 120, after: 40 },
                    }));
                    if (p.description) {
                        p.description.split(/\n|•/).map(s => s.trim()).filter(Boolean)
                            .forEach(line => children.push(bulletPara(line)));
                    }
                    if (p.url) children.push(new Paragraph({
                        children: [new TextRun({ text: p.url, size: 18, color: "2563eb", font: "Calibri" })],
                        spacing: { after: 100 },
                    }));
                    children.push(new Paragraph({ text: "", spacing: { after: 80 } }));
                });
            }

            // CERTIFICATIONS
            if (d.courses?.length) {
                children.push(sectionHeader(d.titles?.certification || "CERTIFICATIONS"));
                d.courses.forEach(c => c.name && children.push(bulletPara(c.name)));
            }

            // SKILLS as table
            if (d.skills?.length) {
                children.push(sectionHeader(d.titles?.skills || "SKILLS"));
                const skillChunks = [];
                const all = d.skills.map(s => s.name);
                for (let i = 0; i < all.length; i += 4) skillChunks.push(all.slice(i, i + 4));
                skillChunks.forEach(chunk => {
                    children.push(new Table({
                        rows: [new TableRow({
                            children: chunk.map(s => new TableCell({
                                children: [new Paragraph({
                                    children: [new TextRun({ text: `• ${s}`, size: 20, font: "Calibri" })],
                                })],
                                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                            })),
                        })],
                        width: { size: 100, type: WidthType.PERCENT },
                    }));
                });
            }

            // LANGUAGES
            if (d.languages?.length) {
                children.push(sectionHeader(d.titles?.languages || "LANGUAGES"));
                children.push(new Paragraph({
                    children: [new TextRun({
                        text: d.languages.map(l => `${l.name}${l.level ? ` (${l.level})` : ""}`).join("  •  "),
                        size: 20, font: "Calibri"
                    })],
                }));
            }

            const doc = new Document({
                styles: {
                    default: { document: { run: { font: "Calibri", size: 20 } } },
                },
                sections: [{ children }],
            });
            const blob = await Packer.toBlob(doc);
            const el = document.createElement("a");
            el.href = URL.createObjectURL(blob);
            el.download = `${resumeData.title || "resume"}.docx`;
            document.body.appendChild(el);
            el.click();
            document.body.removeChild(el);
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
                    const parsed = JSON.parse(text);
                    safeSetResume(parsed);
                } else if (file.name.endsWith(".docx")) {
                    const arrayBuffer = await file.arrayBuffer();
                    const mammoth = (await import("mammoth")).default;
                    const result = await mammoth.extractRawText({ arrayBuffer });
                    if (!result || !result.value) throw new Error("Could not read Word file content.");
                    const parsed = parsePlainTextToCV(result.value);
                    safeSetResume(parsed);
                } else if (file.name.endsWith(".pdf")) {
                    const arrayBuffer = await file.arrayBuffer();
                    const pdfjsLib = await new Promise((resolve, reject) => {
                        if (window.pdfjsLib) { resolve(window.pdfjsLib); return; }
                        const script = document.createElement("script");
                        script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
                        script.onload = () => {
                            window.pdfjsLib.GlobalWorkerOptions.workerSrc =
                                "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
                            resolve(window.pdfjsLib);
                        };
                        script.onerror = reject;
                        document.head.appendChild(script);
                    });
                    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                    let text = "";
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const content = await page.getTextContent();
                        // Reconstruct line breaks based on Y-position
                        let lastY = null;
                        const pageLines = [];
                        let currentLine = [];
                        content.items.forEach(item => {
                            if (lastY !== null && Math.abs(item.transform[5] - lastY) > 3) {
                                if (currentLine.length) pageLines.push(currentLine.join(" "));
                                currentLine = [];
                            }
                            currentLine.push(item.str);
                            lastY = item.transform[5];
                        });
                        if (currentLine.length) pageLines.push(currentLine.join(" "));
                        text += pageLines.join("\n") + "\n";
                    }
                    const parsed = parsePlainTextToCV(text);
                    safeSetResume(parsed);
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
                safeSetResume(jsonData);
            } catch {
                const parsed = parsePlainTextToCV(text);
                safeSetResume(parsed);
            }
            setLoading(false);
        } catch {
            alert("Failed to read clipboard.");
            setLoading(false);
        }
    };

    const addCustomSection = () => {
        const name = prompt("Enter section name (e.g. Publications, Awards):");
        if (!name) return;
        const key = name.toLowerCase().replace(/\s+/g, "_");
        const newData = { ...resumeData.data };
        if (!newData.customSections) newData.customSections = [];
        newData.customSections.push({ key, title: name, items: [{ description: "" }] });
        if (!newData.order.includes(key)) newData.order.push(key);
        setResumeData({ ...resumeData, data: newData });
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
            <CircularButton tooltipText="Add Custom Section" onClick={addCustomSection} icon={FaPlus} bgColor="bg-pink-600 hover:bg-pink-700"/>
            <CircularButton tooltipText="Sync" onClick={() => syncResumeData(resumeData)} icon={FaSyncAlt} bgColor="bg-yellow-500 hover:bg-yellow-600"/>
        </div>
    );
}

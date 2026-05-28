"use client";
import CircularButton from "@/components/general/circle-btn";
import {FaDownload, FaCopy, FaUpload, FaPaste, FaSyncAlt, FaFileWord, FaFilePdf} from "react-icons/fa";
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
        titles: { profile:"PROFILE", experience:"EXPERIENCE", education:"EDUCATION", certification:"CERTIFICATION", skills:"SKILLS", languages:"LANGUAGES" },
        order: ["contactInformation","profile","workExperience","education","courses","skills","languages","projects"]
    };

    // Extract contact info
    const emailMatch = full.match(/[\w.+-]+@[\w.-]+\.\w{2,}/);
    if (emailMatch) cv.email = emailMatch[0];

    const phoneMatch = full.match(/(\+?\d[\d\s\-(). ]{6,}\d)/);
    if (phoneMatch) cv.contactInformation = phoneMatch[0].trim();

    const linkedinMatch = full.match(/linkedin\.com\/in\/[\w-]+/i);
    if (linkedinMatch) cv.socialMedia.push({ name: "LinkedIn", url: "https://" + linkedinMatch[0] });

    const cityMatch = full.match(/\b([A-Z][a-z]+(?:,\s*[A-Z][a-z]+)*(?:,\s*[A-Z]{2,})?)\b/);
    if (cityMatch && cityMatch[0].length < 40) cv.address = cityMatch[0];

    // Section detection
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

    // Find name: first non-email non-phone line under 60 chars
    for (let i = 0; i < Math.min(4, lines.length); i++) {
        if (!lines[i].match(/[@\d{6,}|http|www]/i) && lines[i].length < 60) {
            cv.name = lines[i]; break;
        }
    }

    // Find position: next short line after name that is not contact info
    for (let i = 1; i < Math.min(6, lines.length); i++) {
        const l = lines[i];
        if (l !== cv.name && !l.match(/[@\+\d{5,}]/) && l.length < 80 && !isSectionHeader(l)) {
            cv.position = l; break;
        }
    }

    // Parse sections
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
            const {
                Document, Packer, Paragraph, TextRun, HeadingLevel,
                AlignmentType, BorderStyle, ShadingType, Table, TableRow, TableCell, WidthType
            } = await import("docx");
            const d = resumeData.data;
            const children = [];

            const sectionHeader = (text) => new Paragraph({
                children: [new TextRun({ text, bold: true, size: 24, color: "000000" })],
                border: { bottom: { color: "888888", style: BorderStyle.SINGLE, size: 6 } },
                spacing: { before: 280, after: 100 },
            });

            const bullet = (text) => new Paragraph({
                children: [new TextRun({ text: `• ${text}`, size: 20 })],
                spacing: { after: 60 },
            });

            // Name
            children.push(new Paragraph({
                children: [new TextRun({ text: d.name || "", bold: true, size: 36 })],
                alignment: AlignmentType.CENTER,
            }));
            // Position
            if (d.position) children.push(new Paragraph({
                children: [new TextRun({ text: d.position, size: 24, color: "555555" })],
                alignment: AlignmentType.CENTER,
                spacing: { after: 60 },
            }));
            // Contact line
            const contactParts = [d.email, d.contactInformation, d.address].filter(Boolean);
            if (contactParts.length) children.push(new Paragraph({
                children: [new TextRun({ text: contactParts.join("  |  "), size: 18, color: "777777" })],
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
            }));

            // Summary
            if (d.summary?.length) {
                children.push(sectionHeader("PROFILE"));
                d.summary.forEach(s => s.description && children.push(new Paragraph({
                    children: [new TextRun({ text: s.description, size: 20 })],
                    spacing: { after: 60 },
                })));
            }

            // Experience
            if (d.workExperience?.length) {
                children.push(sectionHeader("EXPERIENCE"));
                d.workExperience.forEach(w => {
                    if (w.position || w.company) children.push(new Paragraph({
                        children: [
                            new TextRun({ text: w.position || "", bold: true, size: 22 }),
                            new TextRun({ text: w.company ? `  —  ${w.company}` : "", size: 22, color: "444444" }),
                        ],
                        spacing: { before: 120, after: 40 },
                    }));
                    const dateStr = [w.startDate, w.endDate].filter(Boolean).join(" - ");
                    if (dateStr) children.push(new Paragraph({
                        children: [new TextRun({ text: dateStr, size: 18, color: "888888", italics: true })],
                        spacing: { after: 60 },
                    }));
                    if (w.description) {
                        w.description.split(/\n|•/).map(s => s.trim()).filter(Boolean)
                            .forEach(line => children.push(bullet(line)));
                    }
                    children.push(new Paragraph({ text: "" }));
                });
            }

            // Education
            if (d.educations?.length) {
                children.push(sectionHeader("EDUCATION"));
                d.educations.forEach(e => {
                    if (e.degree || e.school) children.push(new Paragraph({
                        children: [
                            new TextRun({ text: e.degree || "", bold: true, size: 22 }),
                            new TextRun({ text: e.school ? `  —  ${e.school}` : "", size: 22, color: "444444" }),
                        ],
                        spacing: { before: 120, after: 40 },
                    }));
                    const dateStr = [e.startDate, e.endDate].filter(Boolean).join(" - ");
                    if (dateStr) children.push(new Paragraph({
                        children: [new TextRun({ text: dateStr, size: 18, color: "888888", italics: true })],
                        spacing: { after: 100 },
                    }));
                });
            }

            // Projects
            if (d.projects?.length) {
                children.push(sectionHeader("PROJECTS"));
                d.projects.forEach(p => {
                    if (p.name) children.push(new Paragraph({
                        children: [new TextRun({ text: p.name, bold: true, size: 22 })],
                        spacing: { before: 120, after: 40 },
                    }));
                    if (p.description) children.push(bullet(p.description));
                    if (p.url) children.push(new Paragraph({
                        children: [new TextRun({ text: p.url, size: 18, color: "2563eb" })],
                        spacing: { after: 80 },
                    }));
                });
            }

            // Courses
            if (d.courses?.length) {
                children.push(sectionHeader("CERTIFICATIONS"));
                d.courses.forEach(c => c.name && children.push(bullet(c.name)));
            }

            // Skills
            if (d.skills?.length) {
                children.push(sectionHeader("SKILLS"));
                children.push(new Paragraph({
                    children: [new TextRun({ text: d.skills.map(s => s.name).join("  •  "), size: 20 })],
                    spacing: { after: 60 },
                }));
            }

            // Languages
            if (d.languages?.length) {
                children.push(sectionHeader("LANGUAGES"));
                children.push(new Paragraph({
                    children: [new TextRun({ text: d.languages.map(l => `${l.name}${l.level ? ` (${l.level})` : ""}`).join("  •  "), size: 20 })],
                }));
            }

            const doc = new Document({
                styles: {
                    default: {
                        document: { run: { font: "Calibri", size: 20 } },
                    },
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
                    setResumeData({ ...resumeData, data: JSON.parse(text) });
                } else if (file.name.endsWith(".docx")) {
                    const arrayBuffer = await file.arrayBuffer();
                    const mammoth = (await import("mammoth")).default;
                    const result = await mammoth.extractRawText({ arrayBuffer });
                    if (!result || !result.value) throw new Error("Could not read Word file content.");
                    const parsed = parsePlainTextToCV(result.value);
                    const newResume = { ...resumeData, data: parsed };
                    setResumeData(newResume);
                    await syncResumeData(newResume);
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
                        text += content.items.map(item => item.str).join(" ") + "\n";
                    }
                    const rawParsed = parsePlainTextToCV(text);
                    const parsed = {
                        name: rawParsed.name || "", position: rawParsed.position || "",
                        email: rawParsed.email || "", contactInformation: rawParsed.contactInformation || "",
                        address: rawParsed.address || "", socialMedia: rawParsed.socialMedia || [],
                        summary: rawParsed.summary || [], educations: rawParsed.educations || [],
                        courses: rawParsed.courses || [], workExperience: rawParsed.workExperience || [],
                        projects: rawParsed.projects || [], skills: rawParsed.skills || [],
                        languages: rawParsed.languages || [],
                        titles: rawParsed.titles || { profile:"PROFILE", experience:"EXPERIENCE", education:"EDUCATION", certification:"CERTIFICATION", skills:"SKILLS", languages:"LANGUAGES" },
                        order: rawParsed.order || ["contactInformation","profile","workExperience","education","courses","skills","languages"],
                    };
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












import RoundedBtnWithIcon from "@/components/general/rounded-btn-with-icon";
import { FaEdit } from "react-icons/fa";
import { MdSystemUpdateAlt } from "react-icons/md";
import useAppContext from "@/hooks/useAppContext";
import { useState } from "react";
import PdfSave from "@/lib/pdf-save";

const SaveIndicator = ({ status }) => {
    if (status === "idle") return null;
    const config = {
        saving: { text: "Saving...", color: "#f97316", dot: "animate-pulse" },
        saved:  { text: "Saved ✓",  color: "#22c55e", dot: "" },
        error:  { text: "Error saving", color: "#ef4444", dot: "" },
    };
    const c = config[status];
    if (!c) return null;
    return (
        <div className="flex items-center gap-1.5 transition-all duration-300">
            <div className={`w-2 h-2 rounded-full ${c.dot}`} style={{background: c.color}}/>
            <span className="text-xs font-semibold" style={{color: c.color}}>{c.text}</span>
        </div>
    );
};

const ResumeTitleDownload = () => {
    const { resumeData, setResumeData, syncResumeData, saveStatus, getCompletionScore } = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(resumeData.title || "Untitled");
    const score = getCompletionScore();

    const scoreColor = score < 40 ? "#ef4444" : score < 70 ? "#f97316" : "#22c55e";

    const handleEditToggle = () => setIsEditing(prev => !prev);
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleSaveTitle = () => {
        const newData = { ...resumeData, title };
        setResumeData(newData);
        setIsEditing(false);
        syncResumeData(newData);
    };

    return (
        <div className="bg-homeBackgroundColor sidebar:rounded-b-large sidebar:pt-8 sidebar:shadow-homeBackgroundColor sticky top-0 z-[6] mb-6 w-full shadow-sm">
            <div className="grid grid-cols-[1fr_auto] items-center gap-4 bg-white px-6 py-3 md:px-8 md:py-4 lg:px-9 lg:py-4">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        {isEditing ? (
                            <input type="text" value={title} onChange={handleTitleChange} onBlur={handleSaveTitle}
                                className="text-primaryBlack truncate text-2xl font-extrabold border-b-2 border-pink-400 focus:outline-none max-w-[300px] w-full"
                                autoFocus/>
                        ) : (
                            <p onClick={handleEditToggle}
                                className="text-primaryBlack truncate text-2xl font-extrabold cursor-pointer hover:opacity-70 transition-opacity max-w-[300px]">
                                {resumeData.title || "Untitled"}
                            </p>
                        )}
                        {!isEditing && (
                            <button onClick={handleEditToggle} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <FaEdit size={16}/>
                            </button>
                        )}
                        <SaveIndicator status={saveStatus}/>
                    </div>

                    {/* Progress bar */}
                    <div className="flex items-center gap-2 mt-1">
                        <div className="h-1.5 w-32 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-700"
                                style={{width: `${score}%`, background: scoreColor}}/>
                        </div>
                        <span className="text-xs font-semibold" style={{color: scoreColor}}>{score}% complete</span>
                    </div>
                </div>

                <RoundedBtnWithIcon
                    iconSize={12}
                    className="bg-primaryBlack text-white py-10 h-12 w-12 md:h-10 md:w-full md:min-w-[120px] md:px-7 md:py-2"
                    text="Download"
                    icon={MdSystemUpdateAlt}
                    onClick={() => PdfSave({printDivId: "resume"})}
                />
            </div>
        </div>
    );
};
export default ResumeTitleDownload;

import RoundedBtnWithIcon from "@/components/general/rounded-btn-with-icon";
import { FaEdit } from "react-icons/fa";
import { MdSystemUpdateAlt } from "react-icons/md";
import WinPrint from "@/lib/pdf-save";
import useAppContext from "@/hooks/useAppContext";
import { useState } from "react";
import WinPrintPDF from "@/lib/prepare-pdf";
import PdfSave from "@/lib/pdf-save";

const ResumeTitleDownload = () => {
    const { resumeData, setResumeData ,syncResumeData} = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(resumeData.title || "Untitled");

    const handleEditToggle = () => {
        setIsEditing((prev) => !prev);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSaveTitle = () => {
        const newData = { ...resumeData, title }
        setResumeData(newData);
        setIsEditing(false);
        syncResumeData(newData);
    };

    const syncAndSave = () => {
        PdfSave({printDivId: "resume"});
    }

    return (
        <div className="bg-homeBackgroundColor sidebar:rounded-b-large sidebar:pt-8
        sidebar:shadow-[0_-25px_15px_15px_#ffffff] sidebar:shadow-homeBackgroundColor
        sticky top-0 z-[6] mb-6 w-full shadow-sm">
            <div
                className="grid grid-cols-[1fr_auto] items-center gap-4
                bg-white px-6 py-3 md:px-8 md:py-4 lg:px-9 lg:py-5"
            >
                {/* Title Section */}
                <div className="flex items-center mr-8">
                    {isEditing ? (
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            onBlur={handleSaveTitle}
                            className="text-primaryBlack truncate text-2xl font-extrabold border-b focus:outline-none max-w-[300px] w-full"
                            autoFocus
                        />
                    ) : (
                        <p
                            className="text-primaryBlack truncate text-2xl font-extrabold cursor-pointer hover:opacity-80 max-w-[300px] w-full"
                            onClick={handleEditToggle}
                        >
                            {resumeData.title || "Untitled"}
                        </p>
                    )}
                    {!isEditing && (
                        <RoundedBtnWithIcon
                            iconSize={20}
                            icon={FaEdit}
                            iconColor={"#7d8189"}
                            onClick={handleEditToggle}
                            className="ml-2"
                        />
                    )}
                </div>

                {/* Download Button */}
                <RoundedBtnWithIcon
                    iconSize={12}
                    className={
                        "bg-primaryBlack text-white py-10 h-12 w-12 md:h-10 md:w-full md:min-w-[120px] md:px-7 md:py-2"
                    }
                    text={"Download"}
                    icon={MdSystemUpdateAlt}
                    onClick={syncAndSave}
                />


            </div>
        </div>
    );
};

export default ResumeTitleDownload;

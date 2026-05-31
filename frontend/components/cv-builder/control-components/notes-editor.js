import {FaStickyNote} from "react-icons/fa";
import useAppContext from "@/hooks/useAppContext";
import React from "react";
import DroppableUtil from "@/components/cv-builder/utils/droppable-utils";
import GeneralListItem from "@/components/cv-builder/control-components/items/general-list-item";
import MinimizedCard from "@/components/general/minimized-card";

function stripHtml(html) {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, '');
}

const NotesEditor = ({
                         index,
                         type,
                         draggableId,
                         section,
                         subSection = "notes",
                         titleSection = "Notes",
                         addTitle = "Add Note",
                         Icon = FaStickyNote,
                         IsCardExpanded = false
                     }) => {
    const {setResumeData, resumeData} = useAppContext();
    const notes = resumeData?.data?.[section]?.[index]?.[subSection] || [];

    const OnEditNoteItem = (e, noteIndex) => {
        const value = stripHtml(e.target.innerText.trim());
        if (value === "") {
            OnRemoveNoteItem(noteIndex);
            return;
        }
        const sectionData = resumeData?.data?.[section] || [];
        const newNotes = [...sectionData];
        if (newNotes[index] && newNotes[index][subSection]) {
            newNotes[index][subSection][noteIndex] = { ...(newNotes[index][subSection][noteIndex] || {}), text: value };
        }
        setResumeData({
            ...resumeData,
            data: {
                ...(resumeData?.data || {}),
                [section]: newNotes,
            },
        });
    };

    const OnRemoveNoteItem = (noteIndex) => {
        const sectionData = resumeData?.data?.[section] || [];
        const newNotes = [...sectionData];
        if (newNotes[index] && newNotes[index][subSection]) {
            newNotes[index][subSection].splice(noteIndex, 1);
        }
        setResumeData({
            ...resumeData,
            data: {
                ...(resumeData?.data || {}),
                [section]: newNotes,
            },
        });
    };

    const OnAddNoteItem = () => {
        const sectionData = resumeData?.data?.[section] || [];
        const newNotes = [...sectionData];
        const newNote = {
            text: "",
            isShownInPreview: true,
        };
        if (!newNotes[index]) newNotes[index] = {};
        if (!newNotes[index][subSection]) newNotes[index][subSection] = [];
        newNotes[index][subSection].push(newNote);
        setResumeData({
            ...resumeData,
            data: {
                ...(resumeData?.data || {}),
                [section]: newNotes,
            },
        });
    };

    const OnDisableNoteItem = (noteIndex) => {
        const sectionData = resumeData?.data?.[section] || [];
        const newNotes = [...sectionData];
        if (newNotes[index] && newNotes[index][subSection] && newNotes[index][subSection][noteIndex]) {
            newNotes[index][subSection][noteIndex].isShownInPreview = !newNotes[index][subSection][noteIndex].isShownInPreview;
        }
        setResumeData({
            ...resumeData,
            data: {
                ...(resumeData?.data || {}),
                [section]: newNotes,
            },
        });
    };

    return (
        <MinimizedCard
            haveAddButton={true}
            btnAddTitle={addTitle}
            titleSection={titleSection}
            className={"mt-4"}
            Icon={Icon}
            canHaveOnBackMinimize={false}
            canEditTitle={false}
            IsCardExpanded={IsCardExpanded}
            OnClickAddButton={OnAddNoteItem}>

            < DroppableUtil
                droppableId={`${draggableId}-${index}`}
                type={type}>
                {
                    notes.map((note, subIndex) => {
                        return <GeneralListItem
                            draggableId={`${type}-${subIndex}`} keyData={`${type}-${subIndex}`}
                            key={`${type}-${subIndex}`}
                            index={subIndex}
                            listItem={note}
                            type={type}
                            OnEditItem={OnEditNoteItem}
                            OnRemoveItem={OnRemoveNoteItem}
                            OnDisableItem={OnDisableNoteItem}
                            HaveEyeIcon={true}
                        />
                    })
                }
            </DroppableUtil>
        </MinimizedCard>
    )
};
export default NotesEditor;

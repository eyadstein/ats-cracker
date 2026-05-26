import {FaStickyNote} from "react-icons/fa";
import useAppContext from "@/hooks/useAppContext";
import React from "react";
import DroppableUtil from "@/components/cv-builder/utils/droppable-utils";
import GeneralListItem from "@/components/cv-builder/control-components/items/general-list-item";
import MinimizedCard from "@/components/general/minimized-card";

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
    const notes = resumeData.data[section][index][subSection];

    const OnEditNoteItem = (e, noteIndex) => {
        const value = e.target.innerText.trim();
        if (value === "") {
            OnRemoveNoteItem(noteIndex);
            return;
        }
        const newNotes = [...resumeData.data[section]];
        newNotes[index][subSection][noteIndex].text = value;
        setResumeData({
            ...resumeData,
            data: {
                ...resumeData.data,
                [section]: newNotes,
            },
        });
    };

    const OnRemoveNoteItem = (noteIndex) => {
        const newNotes = [...resumeData.data[section]];
        newNotes[index][subSection].splice(noteIndex, 1);
        setResumeData({
            ...resumeData,
            data: {
                ...resumeData.data,
                [section]: newNotes,
            },
        });
    };

    const OnAddNoteItem = () => {
        const newNotes = [...resumeData.data[section]];
        const newNote = {
            text: "",
            isShownInPreview: true,
        };
        newNotes[index][subSection].push(newNote);
        setResumeData({
            ...resumeData,
            data: {
                ...resumeData.data,
                [section]: newNotes,
            },
        });
    };

    const OnDisableNoteItem = (noteIndex) => {
        const newNotes = [...resumeData.data[section]];
        newNotes[index][subSection][noteIndex].isShownInPreview = !newNotes[index][subSection][noteIndex].isShownInPreview;
        setResumeData({
            ...resumeData,
            data: {
                ...resumeData.data,
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
                droppableId={`${draggableId}-${index}`
                }
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
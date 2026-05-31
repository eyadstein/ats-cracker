import React from "react";
import useAppContext from "@/hooks/useAppContext";
import {FaBusinessTime} from "react-icons/fa";
import MinimizedCard from "@/components/general/minimized-card";
import DroppableUtil from "@/components/cv-builder/utils/droppable-utils";
import {ControlPanelView, ControlPanelMode} from "@/components/cv-builder/control-components/utils/enums";
import WorkExperienceItem from "@/components/cv-builder/control-components/items/work-experience-item";

function stripHtml(html) {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, '');
}

const WorkExperienceEditor = ({}) => {
    const {setResumeData, resumeData, setControlPanelIndex, setCurrentEditIndex, syncResumeData} = useAppContext();
    const title = "Experience";
    const draggableId = "experience";
    const type = "EXPERIENCE";
    const item = resumeData;

    const OnClickAddButton = () => {
        const newWorkExperienceItem = {
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            workType: "On-site",
            location: "",
            companyField: "",
            technologies: [],
            achievements: [],
            isPartTime: false,
            isShownInPreview: true,
        };

        const newWorkExperience = [...item.data.workExperience, newWorkExperienceItem];

        finalState({
            ...item,
            data: {
                ...item.data,
                workExperience: newWorkExperience,
            },
        });

        setCurrentEditIndex({ index: item.data.workExperience.length, mode: ControlPanelMode.Add });
        setControlPanelIndex(ControlPanelView.WorkExperienceEditor);
    };

    const OnRemoveItem = (index) => {
        const newWorkExperience = [...item.data.workExperience];
        newWorkExperience.splice(index, 1);

        finalState({
            ...item,
            data: {
                ...item.data,
                workExperience: newWorkExperience,
            },
        });
    };

    const OnDisableItem = (index) => {
        const newWorkExperience = [...item.data.workExperience];
        newWorkExperience[index].isShownInPreview = !newWorkExperience[index].isShownInPreview;

        finalState({
            ...item,
            data: {
                ...item.data,
                workExperience: newWorkExperience,
            },
        });
    };

    const OnEditItem = (e, index) => {
        setCurrentEditIndex({ index: index, mode: ControlPanelMode.Edit });
        setControlPanelIndex(ControlPanelView.WorkExperienceEditor);
    };

    const finalState = (state) => {
        // Sanitize all text fields before saving
        const sanitized = {
            ...state,
            data: {
                ...state.data,
                workExperience: state.data.workExperience.map(we => ({
                    ...we,
                    company: stripHtml(we.company),
                    position: stripHtml(we.position),
                    location: stripHtml(we.location),
                    companyField: stripHtml(we.companyField),
                    workType: stripHtml(we.workType),
                }))
            }
        };
        setResumeData(sanitized);
        syncResumeData(sanitized);
    }

    return <MinimizedCard
        titleSection={"experience"}
        OnClickAddButton={OnClickAddButton}
        btnAddTitle={title}
        item={item}
        Icon={FaBusinessTime} haveAddButton={true}
        viewIndex={ControlPanelView.WorkExperienceEditor}
    >
        <DroppableUtil type={type} droppableId={draggableId}>
            {item.data.workExperience.map((workExperienceItem, index) => {
                return <WorkExperienceItem draggableId={`${type}-${index}`} keyData={`${type}-${index}`}
                                           key={`${type}-${index}`}
                                           OnDisableItem={OnDisableItem}
                                           OnRemoveItem={OnRemoveItem}
                                           OnEditItem={OnEditItem}
                                           index={index}
                                           itemWorkExperience={workExperienceItem}
                                           type={type}/>
            })}
        </DroppableUtil>
    </MinimizedCard>
}

export default WorkExperienceEditor;

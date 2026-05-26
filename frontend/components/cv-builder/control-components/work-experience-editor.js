import React from "react";
import useAppContext from "@/hooks/useAppContext";
import {FaBusinessTime} from "react-icons/fa";
import MinimizedCard from "@/components/general/minimized-card";
import DroppableUtil from "@/components/cv-builder/utils/droppable-utils";
import {ControlPanelView,ControlPanelMode} from "@/components/cv-builder/control-components/utils/enums";
import WorkExperienceItem from "@/components/cv-builder/control-components/items/work-experience-item";

const WorkExperienceEditor = ({}) => {
    const {setResumeData,resumeData,setControlPanelIndex,setCurrentEditIndex,syncResumeData} = useAppContext();
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




    const finalState= (state) => {
        setResumeData(state);
        syncResumeData(state);
    }

    return <MinimizedCard
        titleSection={"experience"}
        OnClickAddButton={OnClickAddButton}
        btnAddTitle={title}
        item={item}
        Icon={FaBusinessTime} haveAddButton={true}
        viewIndex={ControlPanelView.WorkExperienceEditor}

    >
        {/*Main Content*/}
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
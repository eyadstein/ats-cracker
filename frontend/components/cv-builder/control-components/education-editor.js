import React from "react";
import useAppContext from "@/hooks/useAppContext";
import {FaBusinessTime, FaGraduationCap} from "react-icons/fa";
import MinimizedCard from "@/components/general/minimized-card";
import {ControlPanelMode, ControlPanelView} from "@/components/cv-builder/control-components/utils/enums";
import EducationItem from "@/components/cv-builder/control-components/items/education-item";
import DroppableUtil from "@/components/cv-builder/utils/droppable-utils";

const EducationEditor = ({}) => {
    const {setResumeData,setControlPanelIndex,setCurrentEditIndex,resumeData,syncResumeData} = useAppContext();
    const title = "Education";
    const draggableId = "education-preview";
    const type = "EDUCATIONPREVIEW";

    const OnDisableItem = (index) => {
        const educations = [...resumeData.data.educations];
        educations[index].isShownInPreview = !educations[index].isShownInPreview;

        finalState({
            ...resumeData,
            data: {
                ...resumeData.data,
                educations: educations,
            },
        });
    };

    const OnRemoveItem = (index) => {
        const educations = [...resumeData.data.educations];
        educations.splice(index, 1);

        finalState({
            ...resumeData,
            data: {
                ...resumeData.data,
                educations: educations,
            },
        });
    };

    const OnEditItem = (e, index) => {
        setCurrentEditIndex({ index: index, mode: ControlPanelMode.Edit });
        setControlPanelIndex(ControlPanelView.EducationEditor);
    };

    const OnClickAddButton = () => {
        const newEducation = {
            school: "",
            degree: "",
            startYear: "",
            endYear: "",
            notes: "",
            isShownInPreview: true,
        };

        finalState({
            ...resumeData,
            data: {
                ...resumeData.data,
                educations: [...resumeData.data.educations, newEducation],
            },
        });

        setCurrentEditIndex({ index: resumeData.data.educations.length, mode: ControlPanelMode.Add });
        setControlPanelIndex(ControlPanelView.EducationEditor);
    };


    const finalState = (state) => {
        setResumeData(state);
        syncResumeData(state);
    }


    return <MinimizedCard
        titleSection={"education"}
        btnAddTitle={title}
        item={resumeData}
        Icon={FaGraduationCap}
        haveAddButton={true}
        viewIndex={ControlPanelView.EducationEditor}
        OnClickAddButton={OnClickAddButton}

    >
        {/*Main Content*/}
        <DroppableUtil type={type} droppableId={draggableId}>
            {resumeData.data.educations.map((educationItem, index) => {
                return <EducationItem draggableId={`${type}-${index}`} keyData={`${type}-${index}`}
                                      key={`${type}-${index}`}
                                      index={index}
                                      educationItem={educationItem}
                                      OnDisableItem={OnDisableItem}
                                      OnRemoveItem={OnRemoveItem}
                                      OnEditItem={OnEditItem}
                                      type={type}/>


            })}
        </DroppableUtil>
    </MinimizedCard>

}

export default EducationEditor;
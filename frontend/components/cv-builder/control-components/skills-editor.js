import React from "react";
import useAppContext from "@/hooks/useAppContext";
import {FaTools} from "react-icons/fa";
import {ControlPanelMode, ControlPanelView} from "@/components/cv-builder/control-components/utils/enums";
import MinimizedCard from "@/components/general/minimized-card";
import DroppableUtil from "@/components/cv-builder/utils/droppable-utils";
import SkillItem from "@/components/cv-builder/control-components/items/skill-item";

const SkillsEditor = ({}) => {
    const {setResumeData,setControlPanelIndex,setCurrentEditIndex,resumeData,syncResumeData} = useAppContext();
    const title = "Skills";
    const draggableId = "skills-preview";
    const type = "SKILLSPREVIEW";



    const OnDisableItem = (index) => {
        const skills = [...resumeData.data.skills];
        skills[index].isShownInPreview = !skills[index].isShownInPreview;

        finalState({
            ...resumeData,
            data: {
                ...resumeData.data,
                skills: skills,
            },
        });
    };

    const OnRemoveItem = (index) => {
        const skills = [...resumeData.data.skills];
        skills.splice(index, 1);

        finalState({
            ...resumeData,
            data: {
                ...resumeData.data,
                skills: skills,
            },
        });
    };

    const OnEditItem = (e, index) => {
        setCurrentEditIndex({ index: index, mode: ControlPanelMode.Edit });
        setControlPanelIndex(ControlPanelView.SkillsEditor);
    };

    const OnClickAddButton = () => {
        const skills = [...resumeData.data.skills];
        const newSkill = {
            title: "",
            skills: [],
            isShownInPreview: true,
        };

        finalState({
            ...resumeData,
            data: {
                ...resumeData.data,
                skills: [...skills, newSkill],
            },
        });

        setCurrentEditIndex({ index: resumeData.data.skills.length, mode: ControlPanelMode.Add });
        setControlPanelIndex(ControlPanelView.SkillsEditor);
    };



    const finalState = (state) => {
        setResumeData(state);
        syncResumeData(state);
    }


    return <MinimizedCard
        titleSection={"skills"}
        btnAddTitle={title}
        item={resumeData}
        Icon={FaTools}
        haveAddButton={true}
        viewIndex={ControlPanelView.SkillsEditor}
        OnClickAddButton={OnClickAddButton}

    >
        {/*Main Content*/}
        <DroppableUtil type={type} droppableId={draggableId}>
            {resumeData.data.skills.map((skillItem, certificationIndex) => {
                return <SkillItem
                    draggableId={`${type}-${certificationIndex}`}
                    keyData={`${type}-${certificationIndex}`}
                    key={`${type}-${certificationIndex}`}
                    index={certificationIndex}
                    skillItem={skillItem}
                    OnDisableItem={OnDisableItem}
                    OnRemoveItem={OnRemoveItem}
                    OnEditItem={OnEditItem}
                    type={type}/>


            })}
        </DroppableUtil>
    </MinimizedCard>

}

export default SkillsEditor;
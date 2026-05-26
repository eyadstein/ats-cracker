import React from "react";
import useAppContext from "@/hooks/useAppContext";
import {FaBusinessTime} from "react-icons/fa";
import MinimizedCard from "@/components/general/minimized-card";
import DroppableUtil from "@/components/cv-builder/utils/droppable-utils";
import GeneralListItem from "@/components/cv-builder/control-components/items/general-list-item";

const AchievementEditor = ({index}) => {
    const draggableId = "experience-achievement";
    const type = "ACHIEVEMENT";
    const {setResumeData, resumeData} = useAppContext();
    const achievements = resumeData.data.workExperience[index].achievements;


    const OnEditAchievementItem = (e, achievementIndex) => {
        const value = e.target.innerText;
        if (value === "") {
            OnRemoveAchievementItem(achievementIndex);
            return;
        }

        const newWorkExperience = [...resumeData.data.workExperience];
        newWorkExperience[index].achievements[achievementIndex].text = value;
        setResumeData({
            ...resumeData,
            data: {
                ...resumeData.data,
                workExperience: newWorkExperience,
            },
        });
    };

    const OnRemoveAchievementItem = (achievementIndex) => {
        const newWorkExperience = [...resumeData.data.workExperience];
        newWorkExperience[index].achievements.splice(achievementIndex, 1);
        setResumeData({
            ...resumeData,
            data: {
                ...resumeData.data,
                workExperience: newWorkExperience,
            },
        });
    };

    const OnAddAchievementItem = () => {
        const newWorkExperience = [...resumeData.data.workExperience];
        newWorkExperience[index].achievements.push({text: "", isShownInPreview: true});
        setResumeData({
            ...resumeData,
            data: {
                ...resumeData.data,
                workExperience: newWorkExperience,
            },
        });
    };

    const OnDisableItem = (indexAchievement) => {
        const newWorkExperience = [...resumeData.data.workExperience];
        newWorkExperience[index].achievements[indexAchievement].isShownInPreview = !newWorkExperience[index].achievements[indexAchievement].isShownInPreview;
        setResumeData({
            ...resumeData,
            data: {
                ...resumeData.data,
                workExperience: newWorkExperience,
            },
        });
    };



    return (
        <MinimizedCard
            haveAddButton={true}
            btnAddTitle={"Add Achievement"}
            titleSection={"Achievements"}
            className={"mt-4"}
            Icon={FaBusinessTime}
            canHaveOnBackMinimize={false}
            canEditTitle={false}
            OnClickAddButton={OnAddAchievementItem}>


            <DroppableUtil droppableId={`${draggableId}-${index}`} type={type}>
                {
                    achievements.map((achievement, subIndex) => {
                        return <GeneralListItem
                            draggableId={`${type}-${subIndex}`} keyData={`${type}-${subIndex}`}
                            key={`${type}-${subIndex}`}
                            index={subIndex}
                            listItem={achievement}
                            type={type}
                            OnEditItem={OnEditAchievementItem}
                            OnRemoveItem={OnRemoveAchievementItem}
                            OnDisableItem={OnDisableItem}
                            HaveEyeIcon={true}
                        />
                    })
                }
            </DroppableUtil>
        </MinimizedCard>
    )

};
export default AchievementEditor;
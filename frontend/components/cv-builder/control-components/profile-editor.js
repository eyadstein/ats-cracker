import React from "react";
import useAppContext from "@/hooks/useAppContext";
import { FaUserCircle } from "react-icons/fa";
import MinimizedCard from "@/components/general/minimized-card";
import DroppableUtil from "@/components/cv-builder/utils/droppable-utils";
import ProfileSummaryItem from "@/components/cv-builder/control-components/items/profile-item-summary";

const ProfileEditor = () => {
    const {setResumeData,resumeData,syncResumeData} = useAppContext();
    const title = "Profile";
    const draggableId = "profile";
    const type = "PROFILE";
    const item = resumeData;

    const OnClickAddButton = () => {
        const newSummary = [...item.data.summary];
        newSummary.push({ text: "", isShownInPreview: true });
        finalState({
            ...item,
            data: {
                ...item.data,
                summary: newSummary
            }
        });
    };

    const OnRemoveItem = (index) => {
        const newSummary = [...item.data.summary];
        newSummary.splice(index, 1);
        finalState({
            ...item,
            data: {
                ...item.data,
                summary: newSummary
            }
        });
    };

    const OnDisableItem = (index) => {
        const newSummary = [...item.data.summary];
        newSummary[index].isShownInPreview = !newSummary[index].isShownInPreview;
        finalState({
            ...item,
            data: {
                ...item.data,
                summary: newSummary
            }
        });
    };

    const OnEditItem = (e, index) => {
        const value = e.target.innerText.trim();
        if (value === "") {
            OnRemoveItem(index); // Remove item if text is empty
            return;
        }

        const updatedSummary = item.data.summary.map((summaryItem, i) =>
            i === index ? { ...summaryItem, text: value } : summaryItem
        );

        finalState({
            ...item,
            data: {
                ...item.data,
                summary: updatedSummary
            }
        });
    };

    const finalState= (state) => {
        setResumeData(state);
        syncResumeData(state);
    }

    return <MinimizedCard
        titleSection={"profile"}
        OnClickAddButton={OnClickAddButton}
        btnAddTitle={title}
        item={item}
        Icon={FaUserCircle} haveAddButton={true}
    >
        {/*Main Content*/}

        <DroppableUtil type={type} droppableId={draggableId}>
            {item.data.summary.map((summary, index) => {
                return <ProfileSummaryItem draggableId={`${type}-${index}`} keyData={`${type}-${index}`}
                                           key={`${type}-${index}`}
                                           OnDisableItem={OnDisableItem}
                                           OnRemoveItem={OnRemoveItem}
                                           OnEditItem={OnEditItem}
                                           index={index} itemSummary={summary} type={type}/>
            })}
        </DroppableUtil>
    </MinimizedCard>

}

export default ProfileEditor;
import React, {useContext} from 'react';
import dynamic from "next/dynamic";
import useAppContext from "@/hooks/useAppContext";
import DroppableUtil from "@/components/cv-builder/utils/droppable-utils";
import EducationItem from "@/components/cv-builder/reviewer/items/education-preview-item";


function EducationPreviewBody(cvData, filteredEducations, type,isDraggable) {
    return <>
        <h2
            className="section-title mb-1 border-b-2 border-gray-300 editable"
            contentEditable
            suppressContentEditableWarning
        >
            {cvData.data.titles.education}
        </h2>
        {filteredEducations.map((eduItem, index) => {
            return <EducationItem key={`${eduItem.school}-${eduItem.startYear}-${index}`} type={type}
                                  keyData={`${eduItem.school}-${eduItem.startYear}-${index}`}
                                  item={eduItem} index={index}
                                  isDraggable={isDraggable}
                                  draggableId={`${type}-${index}`}/>
        })}
    </>;
}

const EducationSection = ({data,isListItemPreview,droppableId,type,className}) => {
    const {resumeData} = useAppContext();
    const cvData = isListItemPreview ? data : resumeData;
    const isDraggable = !isListItemPreview;
    const filteredEducations = cvData.data.educations.filter((ed)=>ed.isShownInPreview);
    if (!cvData.data.educations || !filteredEducations.length) return null;

    if(!isDraggable){
        return <div className={`${className}`}>
            {EducationPreviewBody(cvData, filteredEducations, type,isDraggable)}
        </div>
    }


    return <DroppableUtil droppableId={droppableId} type={type} className={`${className}`}>
        {EducationPreviewBody(cvData, filteredEducations, type,isDraggable)}

    </DroppableUtil>
}

export default EducationSection;
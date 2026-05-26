import React, {useContext} from 'react';

import useAppContext from "@/hooks/useAppContext";
import SkillItem from "@/components/cv-builder/reviewer/items/skill-item";
import DroppableUtil from "@/components/cv-builder/utils/droppable-utils";


function SkillPreviewBody(item, filteredSkills, type,isDraggable) {

    return <>
        <h2
            className="section-title mb-1 border-b-2 border-gray-300 editable"
            contentEditable
            suppressContentEditableWarning
        >
            {item.data.titles.skills}
        </h2>
        {filteredSkills.map((skillItem, index) => {
            return <SkillItem type={type} keyData={`${skillItem.title}-${index}`}
                              key={`${skillItem.title}-${index}`}
                              item={skillItem} index={index}
                              isDraggable={isDraggable}
                              draggableId={`${type}-${index}`}/>
        })}
    </>;
}

const SkillsCv = ({isListItemPreview,data,droppableId, type, className}) => {
    const {resumeData} = useAppContext();
    const item = isListItemPreview ? data : resumeData;
    const isDraggable = !isListItemPreview;

    const filteredSkills = item.data.skills.filter(skill => skill.isShownInPreview);
    if (!item.data.skills || !filteredSkills.length) return null;

    if(!isDraggable)
        return SkillPreviewBody(item, filteredSkills, type,isDraggable);


    return <DroppableUtil droppableId={droppableId} type={type} className={`${className}`}>
        {SkillPreviewBody(item, filteredSkills, type,isDraggable)}
    </DroppableUtil>
}

export default SkillsCv;
import React from 'react';
import useAppContext from "@/hooks/useAppContext";
import DraggableUtil from "@/components/cv-builder/utils/draggable-util";


function SkillItemBody(item, filteredSkills) {
    return <p className="content pl-1">
        <span className="font-bold">{item.title}: </span>

        {filteredSkills.map((skillObject, index) => {
            const skill = skillObject.text;
            const isLast = index === filteredSkills.length - 1;
            return <span key={index} className={"editable"}
                         // contentEditable
                         // suppressContentEditableWarning
            >

                            {skill}{isLast ? '' : ', '}
                            </span>
        })}

    </p>;
}

const SkillItem = ({draggableId, index,  type, keyData,isDraggable,item}) => {
    const filteredSkills = item.skills.filter(skill => skill.isShownInPreview);
    if (!item.skills || !filteredSkills.length) return null;


    if(!isDraggable){
        return  SkillItemBody(item, filteredSkills)
    }


    return (
        <DraggableUtil keyData={keyData} type={type} draggableId={draggableId} index={index}>
            {SkillItemBody(item, filteredSkills)}
        </DraggableUtil>);
};

export default SkillItem;

import React, {useContext} from 'react';
import DraggableUtil from "@/components/cv-builder/utils/draggable-util";
import DateComponent from "@/components/general/date-component";


function EducationItemBody(item) {
    return <>
        <div className="flex flex-row justify-between space-y-1">
            <p className="content">
                <span className="i-bold"> {item.degree}</span>
                <span className="pl-1">({item.school})</span>

            </p>
            <DateComponent
                startYear={item.startYear}
                endYear={item.endYear}
                id={`work-experience-start-end-date`}
            />
        </div>

        {item.notes && item.notes.length > 0 &&

            <p className="content i-bold pl-2 mt-0 mb-2">
                <span className="content hyphens-auto">{item.notes}</span>
            </p>}
    </>;
}

const EducationItem = ({draggableId, index, item, type,keyData,isDraggable}) => {

    if(!isDraggable) {
        return EducationItemBody(item);
    }


    return <DraggableUtil draggableId={draggableId} index={index} keyData={keyData}>
        {EducationItemBody(item)}
    </DraggableUtil>
};

export default EducationItem;
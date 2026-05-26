import React, {useContext} from 'react';
import useDndContext from "@/context/dnd-context";
import useAppContext from "@/hooks/useAppContext";

function LanguagesHeader(props) {
    return <h2
        className="section-title mb-1 border-b-2 border-gray-300 editable"
        contentEditable
        suppressContentEditableWarning
    >
        {props.item.data.titles.languages}
    </h2>;
}


const LanguagesSection = ({droppableId, type, data, isListItemPreview,...props}) => {
    const {Droppable, Draggable} = useDndContext();
    const {resumeData} = useAppContext();
    const item = isListItemPreview ? data : resumeData;
    const filteredLanguages = item.data.languages.filter(item => item.isShownInPreview);
    const isDraggable = !isListItemPreview;
    if (!item.data.languages || !filteredLanguages.length) return null;
    if(!isDraggable) {
        return <div {...props}>
            <LanguagesHeader item={item}/>
            {filteredLanguages.map((item, index) => {
                return <span
                    key={`${item.title}-${index}`}
                    className={`inline-flex items-center`}
                >
                                <span>{item.title} ({item.level})</span>
                    {index < filteredLanguages.length - 1 && <span>,&nbsp;</span>}
               </span>

            })}
        </div>
    }


    return <Droppable
        isDropDisabled={false}
        isCombineEnabled={false}
        ignoreContainerClipping={false}
        type={type}

        droppableId={droppableId} direction="horizontal">
        {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} {...props}>
                <LanguagesHeader item={item}/>
                {filteredLanguages.map((item, index) => {
                    return <Draggable
                        key={`${item.title}-${index}`}
                        draggableId={`${droppableId}-${index}`}
                        index={index}
                    >
                    {(provided, snapshot) => (
                            <span
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`${
                                    snapshot.isDragging
                                        ? "outline-dashed outline-2 outline-gray-400 bg-white"
                                        : ""
                                } inline-flex items-center`}
                            >
                                <span>{item.title} ({item.level})</span>
                                {index < filteredLanguages.length - 1 && <span>,&nbsp;</span>}
                                </span>
                        )}
                    </Draggable>

                })}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
}

export default LanguagesSection;
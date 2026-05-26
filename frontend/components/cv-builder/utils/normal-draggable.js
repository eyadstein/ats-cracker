import dynamic from "next/dynamic";
import useDndContext from "@/context/dnd-context";

const NormalDraggable = ({draggableId, index, type, children, keyData}) => {
    const {DragDropContext,Droppable, Draggable} = useDndContext();

    return (
        <Draggable draggableId={draggableId} index={index} key={keyData}>
            {(provided, snapshot) => {
                return <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`mb-3 ${
                        snapshot.isDragging &&
                        "outline-dashed outline-2 outline-gray-400 bg-white"
                    }`}
                >
                    {children}
                </div>

            }}
        </Draggable>
    );
};

export default NormalDraggable;
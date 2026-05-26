import useDndContext from "@/context/dnd-context";

const DroppableUtil = ({droppableId, type, children, className}) => {
    const {Droppable} = useDndContext();

    return <Droppable droppableId={droppableId}
                      isDropDisabled={false}
                      isCombineEnabled={false}
                      ignoreContainerClipping={false}
                      type={type}
                      direction="vertical">
        {
            (provided) => (
                <div
                    {...provided.droppableProps} ref={provided.innerRef}
                    className={className}
                >
                    {children}

                    {provided.placeholder}
                </div>
            )
        }

    </Droppable>
}
export default DroppableUtil;

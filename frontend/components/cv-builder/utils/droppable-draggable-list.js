import useDndContext from "@/context/dnd-context";

const DroppableDraggableList = (Component) => ({items, type, droppableId, OnBlurEvent
                                                   ,globalRefs,itemIndex
                                               }) => {
    const {Droppable, Draggable} = useDndContext();
    const rowStyle = {
        hover: {
            outlineStyle: "dashed",
            outlineWidth: "2px",
            outlineColor: "gray",
        },
        dragging: {
            outlineStyle: "dashed",
            outlineWidth: "2px",
            outlineColor: "gray",
            backgroundColor: "white",
        }
    };
    const scaleValue = 0.780856;
    return <Droppable droppableId={droppableId}
                      isDropDisabled={false}
                      isCombineEnabled={false}
                      ignoreContainerClipping={false}
                      type={type}

                      direction="vertical">
        {(provided) => (
            <ul
                className="list-disc ul-padding content"
                {...provided.droppableProps}
                ref={provided.innerRef}
            >
                {items && items.length > 0 &&
                    items.map((item, index) => (
                        <Draggable
                            key={`${droppableId}-${index}`}
                            draggableId={`${droppableId}-${index}`}
                            index={index}
                        >
                            {(provided, snapshot) => {
                                const transform = provided.draggableProps.style.transform;
                                const adjustedTransform = transform
                                    ? transform.replace(/translate\(([^,]+)px,\s*([^)]+)px\)/, (match, x, y) => {
                                        const adjustedX = (parseFloat(x) / scaleValue) - (provided.draggableProps.style.width ? parseFloat(provided.draggableProps.style.width + 300) / scaleValue : 0);
                                        const adjustedY = (parseFloat(y) / scaleValue);
                                        return `translate(${adjustedX}px, ${adjustedY}px)`;
                                    })
                                    : "";
                                const adjustedWidth = provided.draggableProps.style.width
                                    ? `${parseFloat(provided.draggableProps.style.width) / scaleValue}px`
                                    : "auto";

                                const adjustedHeight = provided.draggableProps.style.height
                                    ? `${parseFloat(provided.draggableProps.style.height) / scaleValue}px`
                                    : "auto";


                                return  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}

                                    className={`
                                        hover-outline-list
                                        ${snapshot.isDragging ? "outline-dragging" : ""}
                                    `}
                                    style={{
                                        ...provided.draggableProps.style,
                                        transform: adjustedTransform,
                                        width: adjustedWidth,
                                        height: adjustedHeight,
                                    }}
                                >
                                    <Component
                                        globalRefs={globalRefs}
                                        itemIndex={itemIndex}
                                        subIndex={index}
                                        item={item} onBlur={(e) => OnBlurEvent(e, index)}


                                    />
                                </li>
                            }}
                        </Draggable>
                    ))}
                {provided.placeholder}
            </ul>
        )}
    </Droppable>
};
export default DroppableDraggableList;
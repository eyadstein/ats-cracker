import React from "react";
import useDndContext from "@/context/dnd-context";

const DraggableUtil = ({draggableId, index, type, children, className, keyData, isScaled = true}) => {
    const {Draggable} = useDndContext();
    const rowStyle = {
        outlineStyle: "dashed",
        outlineWidth: "2px",
        outlineColor: "gray",
        backgroundColor: "white",
    };

    const scaleValue = 0.780856;

    return (
        <Draggable draggableId={draggableId} index={index} key={keyData}
        >
            {(provided, snapshot) => {
                const transform = provided.draggableProps.style.transform;
                const adjustedTransform = transform
                    ? transform.replace(/translate\(([^,]+)px,\s*([^)]+)px\)/, (match, x, y) => {
                        let adjustedX = 0

                        adjustedX = (parseFloat(x) / scaleValue) - (provided.draggableProps.style.width ? parseFloat(provided.draggableProps.style.width + 300) / scaleValue : 0);


                        const adjustedY = (parseFloat(y) / scaleValue)
                        return `translate(${adjustedX}px, ${adjustedY}px)`;
                    })
                    : "";
                const adjustedWidth = provided.draggableProps.style.width
                    ? `${parseFloat(provided.draggableProps.style.width) / scaleValue}px`
                    : "auto";

                const adjustedHeight = provided.draggableProps.style.height
                    ? `${parseFloat(provided.draggableProps.style.height) / scaleValue}px`
                    : "auto";


                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}

                        style={isScaled ? {
                                ...provided.draggableProps.style,
                                transform: adjustedTransform,
                                width: adjustedWidth,
                                height: adjustedHeight,
                                ...(snapshot.isDragging ? rowStyle : {}),
                            } :
                            {
                                ...(snapshot.isDragging ? rowStyle : {}),
                            }
                        }
                    >
                        {children}
                    </div>
                );
            }}
        </Draggable>
    );
};

export default DraggableUtil;
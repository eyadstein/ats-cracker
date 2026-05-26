import React, {useRef} from "react";
import NormalDraggable from "@/components/cv-builder/utils/normal-draggable";
import ListComponent from "@/components/cv-builder/control-components/utils/list-component";
import DeleteComponent from "@/components/cv-builder/control-components/utils/delete-component";

const TechnologyItem = ({
                            draggableId,
                            index,
                            technologyItem,
                            type,
                            keyData,
                            OnRemoveItem=(index)=>{},
                            OnEditItem=(e,index)=>{}
                        }) => {



    return <NormalDraggable draggableId={draggableId} index={index} keyData={keyData} isScaled={false}>
        <div key={index}
             className={"border-inputBackground group grid w-full max-w-full cursor-pointer items-center border-b-[5px] border-solid px-4 py-3 md:px-6 md:py-4 grid-cols-[min-content_1fr_min-content]"}>
            <ListComponent/>

            <div
                className={"flex w-full min-w-0 items-center pr-2 hover:opacity-70"}>
                <div>
                    <div className="flex flex-col">
                        <div className="whitespace-pre-wrap">
                            <span
                                onBlur={(e)=>OnEditItem(e,index)}
                                data-placeholder="Write your summary here..."
                                contentEditable suppressContentEditableWarning
                                className="text-brandDarkBlue text-base font-bold editable">{technologyItem}</span>
                        </div>

                    </div>
                </div>
            </div>

            {/* Eye Icon */}
            <div className={"flex content-end items-center"}>
                <DeleteComponent onClick={()=>OnRemoveItem(index)}/>
            </div>
        </div>


    </NormalDraggable>
};

export default TechnologyItem;
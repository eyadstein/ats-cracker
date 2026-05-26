import React, {useRef} from "react";
import NormalDraggable from "@/components/cv-builder/utils/normal-draggable";
import ListComponent from "@/components/cv-builder/control-components/utils/list-component";
import EyeComponent from "@/components/cv-builder/control-components/utils/eye-component";
import DeleteComponent from "@/components/cv-builder/control-components/utils/delete-component";

const GeneralListItem = ({
                             draggableId,
                             index,
                             listItem,
                             type,
                             keyData,
                             OnRemoveItem=(index)=>{},
                             OnDisableItem=(index)=>{},
                             OnEditItem=(e,index)=>{},
                             HaveEyeIcon=false
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
                            <p

                                onFocus={(e) => {
                                    if (e.target.innerText.trim() === "") {
                                        e.target.innerText = "";
                                    }
                                }}
                                data-placeholder="Write your summary here..."
                                onBlur={(e) => OnEditItem(e, index)}
                                contentEditable suppressContentEditableWarning className="ql-align-justify editable">
                                {listItem.text}
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Eye Icon */}
            <div className={"flex content-end items-center"}>
                {
                    HaveEyeIcon &&
                    <EyeComponent  onClick={() => OnDisableItem(index)} isVisible={listItem.isShownInPreview}/>
                }
                <DeleteComponent onClick={() => OnRemoveItem(index)}/>

            </div>
        </div>


    </NormalDraggable>
};

export default GeneralListItem;
import React from "react";
import NormalDraggable from "@/components/cv-builder/utils/normal-draggable";
import ListComponent from "@/components/cv-builder/control-components/utils/list-component";
import EyeComponent from "@/components/cv-builder/control-components/utils/eye-component";
import DeleteComponent from "@/components/cv-builder/control-components/utils/delete-component";

const ProfileSummaryItem = ({draggableId, index, itemSummary, type, keyData,
                                OnDisableItem=(index)=>{},OnRemoveItem=(index)=>{},OnEditItem=(e,index)=>{}



                            }) => {



    return <NormalDraggable draggableId={draggableId} index={index} keyData={keyData} isScaled={false}>
        <div key={index}
             className={"border-inputBackground group grid w-full max-w-full cursor-pointer items-center border-b-[5px] border-solid px-4 py-3 md:px-6 md:py-4 grid-cols-[min-content_1fr_min-content]"}>
            <ListComponent/>

            <div className={"flex w-full min-w-0 items-center pr-2 hover:opacity-70"}>
                <div>
                    <div className="previewHtmlContent w-full whitespace-pre-wrap leading-[1.5] text-sm-xs">
                        <p

                            onFocus={(e) => {
                                if (e.target.innerText.trim() === "") {
                                    e.target.innerText = "";
                                }
                            }}
                            data-placeholder="Write your summary here..."
                            onBlur={(e)=>OnEditItem(e,index)}
                            contentEditable suppressContentEditableWarning className="ql-align-justify editable">
                            {itemSummary.text}
                        </p>
                    </div>
                </div>
            </div>

            {/* Eye Icon */}
            <div className={"flex content-end items-center"}>
                <EyeComponent onClick={()=>OnDisableItem(index)} isVisible={itemSummary.isShownInPreview}/>
                <DeleteComponent onClick={()=>OnRemoveItem(index)}/>
            </div>
        </div>


    </NormalDraggable>
};

export default ProfileSummaryItem;
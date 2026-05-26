import DroppableUtil from "@/components/cv-builder/utils/droppable-utils";
import useAppContext from "@/hooks/useAppContext";
import WorkExperienceItem from "@/components/cv-builder/reviewer/items/work-experience-item";

const WorkList=({item,className,type,isDraggable})=> {


    return <div className={`grid grid-cols-3 gap-6 ${className}`}>
        <div className={"col-span-3 space-y-2"}>
            <h2
                className="section-title mb-1 border-b-2 border-gray-300 editable">
                {item.data.titles["experience"]}
            </h2>

            {item.data.workExperience.map((workItem, index) => {
                return workItem.isShownInPreview ? (<WorkExperienceItem type={type}
                                                                        keyData={`${workItem.company}-${index}`}
                                                                        key={`${workItem.company}-${index}`}
                                                                        item={workItem} index={index}
                                                                        isDraggable={isDraggable}
                                                                        draggableId={`${type}-${index}`}/>) : null

            })}
        </div>
    </div>
}


const WorkExperienceCv = ({data,isListItemPreview ,type, ...props}) => {
    const {resumeData} = useAppContext();
    const item = isListItemPreview ? data : resumeData;

    const countIsShownInPreview = item.data.workExperience.filter((item) => item.isShownInPreview).length;
    if (countIsShownInPreview === 0) {
        return null;
    }
    const isDraggable = !isListItemPreview;

    if(!isDraggable){
        return <WorkList item={data} {...props} type={type}  isDraggable={isDraggable}/>
    }

    return <DroppableUtil droppableId={props.droppableId} type={props.type}>
        <WorkList item={item} {...props} type={type} isDraggable={isDraggable}/>
    </DroppableUtil>
}

export default WorkExperienceCv;
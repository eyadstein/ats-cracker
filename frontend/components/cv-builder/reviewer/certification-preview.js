
import useAppContext from "@/hooks/useAppContext";
import DroppableUtil from "@/components/cv-builder/utils/droppable-utils";
import CourseItem from "@/components/cv-builder/reviewer/items/course-preview-item";


function CertificationBody(item, filteredCertifications, type,isDroppable) {


    return <>
        <h2
            className="section-title mb-1 border-b-2 border-gray-300 editable"
            contentEditable
            suppressContentEditableWarning
        >
            {item.data.titles.certification}
        </h2>
        {filteredCertifications.map((courseItem, index) => {
            return <CourseItem type={type} keyData={`${courseItem.name}-${index}`}
                               key={`${courseItem.name}-${index}`}
                               item={courseItem} index={index}
                               isDroppable={isDroppable}
                               draggableId={`${type}-${index}`}/>
        })}
    </>;
}

const CoursesCv = ({data,isListItemPreview,droppableId,type,className}) => {
    const {resumeData} = useAppContext();
    const item = isListItemPreview ? data : resumeData;
    const filteredCertifications = item.data.courses.filter((course) => course.isShownInPreview);
    if (!item.data.courses || !filteredCertifications.length) return null;
    const isDroppable = !isListItemPreview;
    if (isListItemPreview) {
        return CertificationBody(item, filteredCertifications, type,isDroppable);
    }


    return <DroppableUtil droppableId={droppableId} type={type} className={`${className}`}>
        {CertificationBody(item, filteredCertifications, type,isDroppable)}
    </DroppableUtil>
}

export default CoursesCv;
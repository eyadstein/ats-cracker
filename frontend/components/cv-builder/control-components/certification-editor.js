import React from "react";
import useAppContext from "@/hooks/useAppContext";
import {FaAward} from "react-icons/fa";
import {ControlPanelMode, ControlPanelView} from "@/components/cv-builder/control-components/utils/enums";
import MinimizedCard from "@/components/general/minimized-card";
import DroppableUtil from "@/components/cv-builder/utils/droppable-utils";
import CertificationItem from "@/components/cv-builder/control-components/items/certification-item";

const CertificationEditor = ({}) => {
    const {setResumeData,setControlPanelIndex,setCurrentEditIndex,resumeData,syncResumeData} = useAppContext();
    const title = "Certification";
    const draggableId = "certification-preview";
    const type = "CERTIFICATIONPREVIEW";

    const OnDisableItem = (index) => {
        const courses = [...resumeData.data.courses];
        courses[index].isShownInPreview = !courses[index].isShownInPreview;

        finalState({
            ...resumeData,
            data: {
                ...resumeData.data,
                courses: courses,
            },
        });
    };

    const OnRemoveItem = (index) => {
        const courses = [...resumeData.data.courses];
        courses.splice(index, 1);

        finalState({
            ...resumeData,
            data: {
                ...resumeData.data,
                courses: courses,
            },
        });
    };

    const OnEditItem = (e, index) => {
        setCurrentEditIndex({ index: index, mode: ControlPanelMode.Edit });
        setControlPanelIndex(ControlPanelView.CertificationEditor);
    };

    const OnClickAddButton = () => {
        const newCourses = {
            name: "",
            school: "",
            startYear: "",
            endYear: "",
            link: "",
            notes: [],
            isShownInPreview: true,
        };

        finalState({
            ...resumeData,
            data: {
                ...resumeData.data,
                courses: [...resumeData.data.courses, newCourses],
            },
        });

        setCurrentEditIndex({ index: resumeData.data.courses.length, mode: ControlPanelMode.Add });
        setControlPanelIndex(ControlPanelView.CertificationEditor);
    };

    const finalState = (state) => {
        setResumeData(state);
        syncResumeData(state);
    }

    return <MinimizedCard
        titleSection={"certification"}
        btnAddTitle={title}
        item={resumeData}
        Icon={FaAward}
        haveAddButton={true}
        viewIndex={ControlPanelView.CertificationEditor}
        OnClickAddButton={OnClickAddButton}

    >
        {/*Main Content*/}
        <DroppableUtil type={type} droppableId={draggableId}>
            {resumeData.data.courses.map((certificationItem, certificationIndex) => {
                return <CertificationItem
                    draggableId={`${type}-${certificationIndex}`}
                    keyData={`${type}-${certificationIndex}`}
                    key={`${type}-${certificationIndex}`}
                    index={certificationIndex}
                    certificationItem={certificationItem}
                    OnDisableItem={OnDisableItem}
                    OnRemoveItem={OnRemoveItem}
                    OnEditItem={OnEditItem}
                    type={type}/>


            })}
        </DroppableUtil>
    </MinimizedCard>

}

export default CertificationEditor;
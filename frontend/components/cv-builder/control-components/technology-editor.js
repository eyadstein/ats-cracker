import {FaBusinessTime} from "react-icons/fa";
import useAppContext from "@/hooks/useAppContext";
import DroppableUtil from "@/components/cv-builder/utils/droppable-utils";
import TechnologyItem from "@/components/cv-builder/control-components/items/technology-item";
import MinimizedCard from "@/components/general/minimized-card";

const TechnologyEditor = ({index}) => {
    const draggableId = "experience-technology";
    const type = "TECHNOLOGY";
    const {setResumeData, resumeData} = useAppContext();
    const technologies = resumeData.data.workExperience[index].technologies;



    const OnEditTechnologyItem = (e, technologyIndex) => {
        const value = e.target.innerText.trim();
        if (value === "") {
            OnRemoveTechnologyItem(technologyIndex);
            return;
        }
        const newWorkExperience = [...resumeData.data.workExperience];
        newWorkExperience[index].technologies[technologyIndex] = value;
        setResumeData({
            ...resumeData,
            data: {
                ...resumeData.data,
                workExperience: newWorkExperience,
            },
        });
    };

    const OnRemoveTechnologyItem = (technologyIndex) => {
        const newWorkExperience = [...resumeData.data.workExperience];
        newWorkExperience[index].technologies.splice(technologyIndex, 1);
        setResumeData({
            ...resumeData,
            data: {
                ...resumeData.data,
                workExperience: newWorkExperience,
            },
        });
    };

    const OnAddTechnologyItem = () => {
        const newWorkExperience = [...resumeData.data.workExperience];
        newWorkExperience[index].technologies.push("");
        setResumeData({
            ...resumeData,
            data: {
                ...resumeData.data,
                workExperience: newWorkExperience,
            },
        });
    };







    return (
        <MinimizedCard
            haveAddButton={true}
            btnAddTitle={"Add Technology"}
            titleSection={"Technologies"}
            className={"mt-4"}
            Icon={FaBusinessTime}
            canHaveOnBackMinimize={false}
            canEditTitle={false}
            OnClickAddButton={OnAddTechnologyItem}>


            <DroppableUtil droppableId={`${draggableId}-${index}`} type={type}>
                {
                    technologies.map((technology, subIndex) => {
                        return <TechnologyItem
                            draggableId={`${type}-${subIndex}`} keyData={`${type}-${subIndex}`}
                            key={`${type}-${subIndex}`}
                            index={subIndex}
                            technologyItem={technology}
                            type={type}
                            OnEditItem={OnEditTechnologyItem}
                            OnRemoveItem={OnRemoveTechnologyItem}
                        />
                    })
                }
            </DroppableUtil>
        </MinimizedCard>
    )

};
export default TechnologyEditor;
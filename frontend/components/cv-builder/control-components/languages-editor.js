import React from "react";
import useAppContext from "@/hooks/useAppContext";
import {FaLanguage} from "react-icons/fa";
import {ControlPanelMode, ControlPanelView} from "@/components/cv-builder/control-components/utils/enums";
import MinimizedCard from "@/components/general/minimized-card";
import DroppableUtil from "@/components/cv-builder/utils/droppable-utils";
import LanguagesItem from "@/components/cv-builder/control-components/items/languages-item";

const EducationEditor = ({}) => {
    const {setResumeData,setControlPanelIndex,setCurrentEditIndex,resumeData,syncResumeData} = useAppContext();
    const title = "Language";
    const draggableId = "languages-preview";
    const type = "LANGUAGEPREVIEW";

    const OnDisableItem = (index) => {
        const languages = [...resumeData.data.languages];
        languages[index].isShownInPreview = !languages[index].isShownInPreview;

        finalState({
            ...resumeData,
            data: {
                ...resumeData.data,
                languages: languages,
            },
        });
    };

    const OnRemoveItem = (index) => {
        const languages = [...resumeData.data.languages];
        languages.splice(index, 1);

        finalState({
            ...resumeData,
            data: {
                ...resumeData.data,
                languages: languages,
            },
        });
    };

    const OnEditItem = (e, index) => {
        setCurrentEditIndex({ index: index, mode: ControlPanelMode.Edit });
        setControlPanelIndex(ControlPanelView.LanguagesEditor);
    };

    const OnClickAddButton = () => {
        const newLanguage = {
            title: "",
            level: "",
            isShownInPreview: true,
        };

        finalState({
            ...resumeData,
            data: {
                ...resumeData.data,
                languages: [...resumeData.data.languages, newLanguage],
            },
        });

        setCurrentEditIndex({
            index: resumeData.data.languages.length,
            mode: ControlPanelMode.Add,
        });
        setControlPanelIndex(ControlPanelView.LanguagesEditor);
    };

    const finalState = (state) => {
        setResumeData(state);
        syncResumeData(state);
    }
    return <MinimizedCard
        titleSection={"languages"}
        btnAddTitle={title}
        item={resumeData}
        Icon={FaLanguage}
        haveAddButton={true}
        viewIndex={ControlPanelView.LanguagesEditor}
        OnClickAddButton={OnClickAddButton}

    >
        {/*Main Content*/}
        <DroppableUtil type={type} droppableId={draggableId}>
            {resumeData.data.languages.map((languagesItem, index) => {
                return <LanguagesItem draggableId={`${type}-${index}`} keyData={`${type}-${index}`}
                                      key={`${type}-${index}`}
                                      index={index}
                                      languagesItem={languagesItem}
                                      OnDisableItem={OnDisableItem}
                                      OnRemoveItem={OnRemoveItem}
                                      OnEditItem={OnEditItem}
                                      type={type}/>


            })}
        </DroppableUtil>
    </MinimizedCard>

}

export default EducationEditor;
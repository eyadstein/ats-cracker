import useAppContext from "@/hooks/useAppContext";
import {useEffect, useState} from "react";
import { FaCheckCircle } from "react-icons/fa";
import {FaTools} from "react-icons/fa";
import Grid from "@/components/general/grid";
import Card from "@/components/general/card";
import TextInput from "@/components/general/text-input";
import {ControlPanelMode, ControlPanelView} from "@/components/cv-builder/control-components/utils/enums";
import NotesEditor from "@/components/cv-builder/control-components/notes-editor";

const SkillItemEditor = ({}) => {
    const {resumeData, setResumeData, setControlPanelIndex,currentEditIndex,syncResumeData} = useAppContext();
    const [originalSkill, setOriginalSkill] = useState({});
    const index = currentEditIndex.index;
    const skill = resumeData.data.skills[index];
    const mode = currentEditIndex.mode;



    useEffect(() => {
        setOriginalSkill(JSON.parse(JSON.stringify(skill)));
    }, [skill]);

    const handleCancel = () => {
        if (mode === ControlPanelMode.Add) {
            const skills = [...resumeData.data.skills];
            skills.pop();
            const oldState={
                ...resumeData,
                data: {
                    ...resumeData.data,
                    skills: skills,
                },
            }

            setResumeData(oldState);
            syncResumeData(oldState);
        } else {
            const skills = [...resumeData.data.skills];
            skills[index] = originalSkill;

            const oldState= {
                ...resumeData,
                data: {
                    ...resumeData.data,
                    skills: skills,
                },
            }
            setResumeData(oldState);
            syncResumeData(oldState);
        }
        setControlPanelIndex(ControlPanelView.MainView);

    };

    const handleSave = () => {
        setControlPanelIndex(ControlPanelView.MainView);
        syncResumeData(resumeData);
    };

    const onChangeInput = (e) => {
        const inputName = e.target.name.slice(2);
        const camelCaseInputName = inputName.charAt(0).toLowerCase() + inputName.slice(1);
        const newSkills = [...resumeData.data.skills];
        newSkills[index][camelCaseInputName] = e.target.value;
        setResumeData({
            ...resumeData,
            data: {
                ...resumeData.data,
                skills: newSkills,
            },
        });
    };

    return (
        <div className={"sidebar:max-w-none sidebar:px-0 w-full max-w-[800px] px-3 pb-16"}>
            <div className={"w-full pb-8"}>
                <div>
                    <Card className={"px-5 md:px-7 lg:px-9 py-5 pb-5 md:py-7 md:pb-9 lg:py-9 lg:pb-10 relative"}>
                        <div id={"Top-Part"}>
                            <Grid cols={"auto_min-content"} className={"mb-4 gap-2 "}>
                                <h3 className="text-xl font-extrabold md:text-2xl">{currentEditIndex.mode === ControlPanelMode.Add?'Add':'Edit'} Skills / Tools</h3>
                            </Grid>
                            <Grid cols={1} className="w-full md:grid-cols-[auto_min-content] md:gap-6 xl:gap-8">
                                <div className="order-2 md:order-1">
                                    <TextInput
                                        onChange={onChangeInput}
                                        value={skill.title}
                                        className={"mb-4"} name="cvTitle" type={"text"}
                                        title="Skills Title" hint="Enter Skills Title"
                                        isRequired={true}/>

                                </div>
                            </Grid>

                        </div>
                    </Card>
                </div>

                {/*Notes*/}
                <NotesEditor type={"skills-list"} index={index}
                             draggableId={"skills-list"} section={"skills"} Icon={FaTools}
                             addTitle={"Add Skill / Tool"} titleSection={"Skills / Tools"}
                             subSection={"skills"} IsCardExpanded={true}
                />

                {/*Save Cancel*/}

                <Card
                    className={"fixed bottom-0 left-0 right-0 z-[20] flex justify-between gap-2 bg-white p-4 px-5 sm:sticky sm:left-auto sm:right-auto sm:mb-6 sm:mt-6 sm:gap-4 md:px-7 lg:px-9"}>
                    <div className="flex items-center justify-start"></div>
                    <div className="flex space-x-1 sm:space-x-7">
                        <button type="button" onClick={handleCancel}
                                className="border-none cursor-pointer appearance-none touch-manipulation flex items-center justify-center focus-visible:outline-blue-600 hover:opacity-80 py-2 rounded-full text-primaryBlack font-extrabold h-12 min-w-min px-4 text-[16px]">Cancel
                        </button>
                        <button onClick={handleSave}
                                className="border-none cursor-pointer appearance-none touch-manipulation flex items-center focus-visible:outline-blue-600 hover:opacity-80 px-7 py-2 rounded-full font-extrabold min-w-[120px] text-white bg-gradientPinkRed h-12 justify-between pl-4 text-[16px]">
                            <span className="border-r border-solid border-gray-100 border-opacity-60 pr-3">
                                <FaCheckCircle sx={{fontSize: 20}} className="text-white"/>
                            </span><span
                            className="pr flex justify-center pl-5">Save</span></button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SkillItemEditor;
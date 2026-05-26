import useAppContext from "@/hooks/useAppContext";
import {useEffect, useState} from "react";
import { FaCheckCircle } from "react-icons/fa";
import {ControlPanelMode, ControlPanelView} from "@/components/cv-builder/control-components/utils/enums";
import Card from "@/components/general/card";
import Grid from "@/components/general/grid";
import TextInput from "@/components/general/text-input";


const EducationItemEditor = ({}) => {
    const {resumeData, setResumeData, setControlPanelIndex,currentEditIndex,syncResumeData} = useAppContext();
    const [originalEducation, setOriginalEducation] = useState({});
    const index = currentEditIndex.index;
    const education = resumeData.data.educations[index];
    const mode = currentEditIndex.mode;




    useEffect(() => {
        setOriginalEducation(JSON.parse(JSON.stringify(education)));
    }, [education]);

    const handleCancel = () => {
        let oldState = resumeData;
        if (mode === ControlPanelMode.Add) {
            const educations = [...resumeData.data.educations];
            educations.pop();
            oldState = {
                ...resumeData,
                data: {
                    ...resumeData.data,
                    educations: educations,
                },
            }
        } else {
            const educations = [...resumeData.data.educations];
            educations[index] = originalEducation;
            oldState = {
                ...resumeData,
                data: {
                    ...resumeData.data,
                    educations: educations,
                },
            }
        }
        syncResumeData(oldState);
        setResumeData(oldState);
        setControlPanelIndex(ControlPanelView.MainView);
    };

    const handleSave = () => {
        setControlPanelIndex(ControlPanelView.MainView);
        syncResumeData(resumeData);
    };

    const onChangeInput = (e) => {
        const inputName = e.target.name.slice(2);
        const camelCaseInputName = inputName.charAt(0).toLowerCase() + inputName.slice(1);
        const newEducations = [...resumeData.data.educations];
        newEducations[index][camelCaseInputName] = e.target.value;
        setResumeData({
            ...resumeData,
            data: {
                ...resumeData.data,
                educations: newEducations,
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
                                <h3 className="text-xl font-extrabold md:text-2xl">{currentEditIndex.mode === ControlPanelMode.Add?'Add':'Edit'} Education</h3>
                            </Grid>
                            <Grid cols={1} className="w-full md:grid-cols-[auto_min-content] md:gap-6 xl:gap-8">
                                <div className="order-2 md:order-1">
                                    <TextInput
                                        onChange={onChangeInput}
                                        value={education.degree}
                                        className={"mb-4"} name="cvDegree" type={"text"}
                                        title="Degree" hint="Enter Your Degree"
                                        isRequired={true}/>
                                    <TextInput
                                        onChange={onChangeInput}
                                        value={education.school} className={"mb-4"} name="cvSchool"
                                        type={"text"}
                                        title="School" hint="Ex (Cairo University)" isRequired={true}/>

                                    <TextInput
                                        onChange={onChangeInput}
                                        value={education.notes} className={"mb-4"} name="cvNotes"
                                        type={"text"}
                                        title="Notes" hint="Notes About Educations" isRequired={false}/>
                                </div>
                            </Grid>

                            <div className="mt-4">
                                <div>

                                    {/*Dates*/}
                                    <div className="flex w-full space-x-4 items-center">

                                        <TextInput
                                            onChange={onChangeInput}
                                            value={education.startYear}
                                            className={"mb-4 w-1/2"}
                                            name="cvStartYear"
                                            type={"date"}
                                            title="Start Date"
                                            isRequired={true}
                                            pattern="\d{4}-\d{2}-\d{2}"
                                        />

                                        <TextInput
                                            onChange={onChangeInput}
                                            value={education.endYear}
                                            className={"mb-4 w-1/2"}
                                            name="cvEndYear"
                                            type={"date"}
                                            title="End Date"
                                            pattern="\d{4}-\d{2}-\d{2}"
                                            isRequired={false}
                                        />

                                    </div>
                                </div>
                            </div>


                        </div>
                    </Card>
                </div>



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

export default EducationItemEditor;
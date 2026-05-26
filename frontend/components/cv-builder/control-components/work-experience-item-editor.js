import useAppContext from "@/hooks/useAppContext";
import {useEffect, useState} from "react";
import {Select, MenuItem, FormControl, InputLabel, FormControlLabel, Switch} from "@mui/material";
import TextInput from "@/components/general/text-input";
import Grid from "@/components/general/grid";
import Card from "@/components/general/card";
import {ControlPanelMode, ControlPanelView} from "@/components/cv-builder/control-components/utils/enums";
import TechnologyEditor from "@/components/cv-builder/control-components/technology-editor";
import AchievementEditor from "@/components/cv-builder/control-components/achievement-editor";
import { FaCheckCircle } from "react-icons/fa";


const WorkExperienceItemEditor = ({}) => {
    const {resumeData, setResumeData, setControlPanelIndex,currentEditIndex,syncResumeData} = useAppContext();
    const [originalWorkExperience, setOriginalWorkExperience] = useState({});
    const index = currentEditIndex.index;
    const workExperience = resumeData.data.workExperience[index];




    useEffect(() => {
        setOriginalWorkExperience(JSON.parse(JSON.stringify(workExperience)));
    }, [workExperience]);

    const handleCancel = () => {
        const newWorkExperience = [...resumeData.data.workExperience];
        if (workExperience.company === "" && workExperience.position === "") {
            newWorkExperience.splice(index, 1);
        } else if (originalWorkExperience.company === "" && originalWorkExperience.position === "") {
            newWorkExperience.splice(index, 1);
        } else {
            newWorkExperience[index] = originalWorkExperience;
        }
        const oldState = {
            ...resumeData,
            data: {
                ...resumeData.data,
                workExperience: newWorkExperience,
            },
        };
        setResumeData(oldState);
        syncResumeData(oldState);
        setControlPanelIndex(ControlPanelView.MainView);
    };

    const handleSave = () => {
        setControlPanelIndex(ControlPanelView.MainView);
        syncResumeData(resumeData);
    };

    const onChangeInput = (e) => {
        const inputName = e.target.name.slice(2);
        const camelCaseInputName = inputName.charAt(0).toLowerCase() + inputName.slice(1);
        const newWorkExperience = [...resumeData.data.workExperience];
        newWorkExperience[index][camelCaseInputName] = e.target.value;
        setResumeData({
            ...resumeData,
            data: {
                ...resumeData.data,
                workExperience: newWorkExperience,
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
                                <h3 className="text-xl font-extrabold md:text-2xl">{currentEditIndex.mode === ControlPanelMode.Add ? 'Create' : 'Edit'} Professional
                                    Experience</h3>
                            </Grid>
                            <Grid cols={1} className="w-full md:grid-cols-[auto_min-content] md:gap-6 xl:gap-8">
                                <div className="order-2 md:order-1">
                                    <TextInput
                                        onChange={onChangeInput}
                                        value={workExperience.company}
                                        className={"mb-4"} name="cvCompany" type={"text"}
                                        title="Company Name" hint="Enter Your Company Name"
                                        isRequired={true}/>
                                    <TextInput
                                        onChange={onChangeInput}
                                        value={workExperience.position} className={"mb-4"} name="cvPosition"
                                        type={"text"}
                                        title="Job Title" hint="Enter Your Position" isRequired={true}/>
                                </div>
                            </Grid>

                            <div className="mt-4">
                                <div>
                                    {/*Location, Work Type*/}
                                    <div className="flex w-full space-x-4 items-center">

                                        <TextInput
                                            onChange={onChangeInput}
                                            value={workExperience.location} className={"mb-4 w-1/2"} name="cvLocation"
                                            type={"text"}
                                            title="Location" hint="Location Ex: (Cairo,Egypt)" isRequired={true}/>

                                        <FormControl className={"mb-4 w-1/2"} required>
                                            <InputLabel id="work-type-label">Work Type</InputLabel>
                                            <Select
                                                labelId="work-type-label"
                                                value={workExperience.workType}
                                                onChange={onChangeInput}
                                                name="cvWorkType"
                                                label="Work Type"
                                            >
                                                <MenuItem value="On-site">On-site</MenuItem>
                                                <MenuItem value="Remote">Remote</MenuItem>
                                                <MenuItem value="Hybrid">Hybrid</MenuItem>
                                            </Select>
                                        </FormControl>

                                    </div>

                                    {/*Part Time Swith*/}
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={workExperience.isPartTime}
                                                onChange={(e) => {
                                                    const newWorkExperience = [...resumeData.data.workExperience];
                                                    newWorkExperience[index].isPartTime = e.target.checked;
                                                    setResumeData({...resumeData, workExperience: newWorkExperience});
                                                }}
                                                name="cvIsPartTime"
                                                color="primary"
                                            />
                                        }
                                        label={workExperience.isPartTime ? "Part-time" : "Full-time"}
                                        className={"mb-4 w-1/2"}
                                    />

                                    {/*Dates*/}
                                    <div className="flex w-full space-x-4 items-center">

                                        <TextInput
                                            onChange={onChangeInput}
                                            value={workExperience.startYear}
                                            className={"mb-4 w-1/2"}
                                            name="cvStartYear"
                                            type={"date"}
                                            title="Start Date"
                                            isRequired={true}
                                            pattern="\d{4}-\d{2}-\d{2}"
                                        />

                                        <TextInput
                                            onChange={onChangeInput}
                                            value={workExperience.endYear}
                                            className={"mb-4 w-1/2"}
                                            name="cvEndYear"
                                            type={"date"}
                                            title="End Date"
                                            pattern="\d{4}-\d{2}-\d{2}"
                                            isRequired={false}
                                        />

                                    </div>


                                    {/*Company Field*/}
                                    <div className="order-2 md:order-1">
                                        <TextInput
                                            onChange={onChangeInput}
                                            value={workExperience.companyField}
                                            className={"mb-4"} name="cvCompanyField" type={"text"}
                                            title="Company Summary" hint="Enter Company Summary"
                                            isRequired={false}/>
                                    </div>

                                    {/*Company Link*/}
                                    <div className="order-2 md:order-1">
                                        <TextInput
                                            onChange={onChangeInput}
                                            value={workExperience.href}
                                            className={"mb-4"} name="cvHref" type={"text"}
                                            title="Company Link" hint="Enter Company Website"
                                            isRequired={false}/>
                                    </div>


                                </div>
                            </div>


                        </div>
                    </Card>
                </div>


                {/*Technologies Card*/}
                <TechnologyEditor index={index}/>

                {/*Achievements Card*/}
                <AchievementEditor index={index}/>

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

export default WorkExperienceItemEditor;
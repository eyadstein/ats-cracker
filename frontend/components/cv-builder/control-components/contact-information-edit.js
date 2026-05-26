import useAppContext from "@/hooks/useAppContext";
import {useEffect, useState} from "react";
import { MdDone } from "react-icons/md";
import {ControlPanelView} from "@/components/cv-builder/control-components/utils/enums";
import Card from "@/components/general/card";
import Grid from "@/components/general/grid";
import TextInput from "@/components/general/text-input";
import CvLinkComponent from "@/components/general/cv-link-component";
import {redirect} from "next/navigation";


const ContactInformationEdit = () => {
    const {resumeData, setResumeData, setControlPanelIndex,currentEditIndex,syncResumeData} = useAppContext();
    const [originalResumeData, setOriginalResumeData] = useState({});
    useEffect(() => {
        setOriginalResumeData(resumeData);
    }, []);



    const onChangeInput = (e) => {
        const inputName = e.target.name.slice(2);
        const camelCaseInputName = inputName.charAt(0).toLowerCase() + inputName.slice(1);
        setResumeData({...resumeData,
        data:{
            ...resumeData.data,
            [camelCaseInputName]: e.target.value
        }

        });

    }

    const handleCancel = () => {

        if(originalResumeData.id === 'new' && !originalResumeData.data.name){
            redirect('/dashboard');
            return;
        }
        setResumeData(originalResumeData);
        setControlPanelIndex(ControlPanelView.MainView);
        syncResumeData(originalResumeData);
    };
    const handleSave = () => {
        // Save the data
        setControlPanelIndex(ControlPanelView.MainView);
        syncResumeData(resumeData);

    }

    return (
        <div className={"sidebar:max-w-none sidebar:px-0 w-full max-w-[800px] px-3 pb-16"}>
            <div className={"w-full pb-8"}>


                <div>
                    <Card className={"px-5 md:px-7 lg:px-9 py-5 pb-5 md:py-7 md:pb-9 lg:py-9 lg:pb-10 relative"}>
                        <div id={"Top-Part"}>
                            <Grid cols={"auto_min-content"} className={"mb-4 gap-2 "}>
                                <h3 className="text-xl font-extrabold md:text-2xl">Edit personal details</h3>
                            </Grid>


                            <Grid cols={1} className="w-full md:grid-cols-[auto_min-content] md:gap-6 xl:gap-8">
                                <div className="order-2 md:order-1">
                                    <TextInput
                                        onChange={onChangeInput}
                                        value={resumeData.data.name}
                                        className={"mb-4"} name="cvName" type={"text"}
                                        title="Full Name" hint="Enter Your Title,first-and last name"
                                        isRequired={true}/>

                                    <TextInput
                                        onChange={onChangeInput}
                                        value={resumeData.data.position} className={"mb-4"} name="cvPosition"
                                        type={"text"}
                                        title="Job Title" hint="Enter Job Title" isRequired={true}/>
                                </div>
                            </Grid>
                        </div>

                        <div className="mt-4">
                            <div>
                                <div className="flex w-full space-x-4">

                                    <TextInput
                                        onChange={onChangeInput}
                                        value={resumeData.data.email} className={"mb-4 w-1/2"} name="cvEmail"
                                        type={"email"}
                                        title="Email" hint="Your Email" isRequired={true}/>

                                    <TextInput
                                        onChange={onChangeInput}
                                        value={resumeData.data.contactInformation} className={"mb-4 w-1/2"}
                                        name="cvContactInformation" type={"tel"}
                                        title="Phone" hint="Your Phone" isRequired={true}/>

                                </div>
                                <TextInput
                                    onChange={onChangeInput}
                                    value={resumeData.data.address} className={"mb-4"} name="cvAddress" type={"tel"}
                                    title="Address" hint="Your Address" isRequired={true}/>
                            </div>
                        </div>


                        <div className={"mt-9"}>
                            <h3 className="mb-4 w-full text-2xl font-extrabold">Links</h3>
                            <CvLinkComponent className={"mt-4"}/>

                        </div>


                    </Card>
                </div>


                {/*Summation Form*/}
                <Card className="fixed bottom-0 left-0 right-0 z-[20] flex justify-between
                 gap-2 bg-white p-4 px-5 sm:sticky sm:left-auto
                  sm:right-auto sm:mb-6 sm:mt-6 sm:gap-4 md:px-7 lg:px-9">
                    <div className="flex items-center justify-start"></div>
                    <div className="flex space-x-1 sm:space-x-7">
                        <button type="button" onClick={handleCancel}
                                className="border-none cursor-pointer appearance-none
                                 touch-manipulation flex items-center justify-center
                                  focus-visible:outline-blue-600 hover:opacity-80
                                   py-2 rounded-full text-primaryBlack
                                    font-extrabold h-12 min-w-min px-4 text-[16px]">Cancel
                        </button>
                        <button onClick={handleSave}
                                className="border-none cursor-pointer appearance-none touch-manipulation flex
                                 items-center focus-visible:outline-blue-600 hover:opacity-80
                                  px-7 py-2 rounded-full font-extrabold min-w-[120px]
                                   text-white bg-gradientPinkRed h-12 justify-between pl-4 text-[16px]">
                            <span className="border-r border-solid border-gray-100 border-opacity-60 pr-3">
                                <MdDone sx={{fontSize: 20}} className="text-white"/>
                            </span><span
                            className="pr flex justify-center pl-5">Save</span></button>
                    </div>
                </Card>


            </div>
        </div>
    );
};

export default ContactInformationEdit;
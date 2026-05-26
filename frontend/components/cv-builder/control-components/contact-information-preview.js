import useAppContext from "@/hooks/useAppContext";
import {ControlPanelView} from "@/components/cv-builder/control-components/utils/enums"
import { MdEditNote, MdMail, MdLocalPhone, MdFmdGood } from "react-icons/md";
import RoundedBtnWithIcon from "@/components/general/rounded-btn-with-icon";
import IconWithTitle from "@/components/general/icon-with-title";




const ContactInformationPreview = () => {
    const { resumeData, setResumeData, globalRefs, setControlPanelIndex } = useAppContext();
    const onOpenEditorView = () => {
        setControlPanelIndex(ControlPanelView.PersonalDetailsEditor);

    };


    return <div className={"sidebar:max-w-none sidebar:px-0 w-full max-w-[800px] px-3"}>
        <div className={"w-full pb-8"}>
            <div>
                <div
                    className={"rounded-large shadow-card w-full bg-white px-5 md:px-7 " +
                        "lg:px-9 relative max-w-full cursor-pointer break-words pb-9 pt-6"}>
                    <RoundedBtnWithIcon
                        onClick={onOpenEditorView}
                        icon={MdEditNote} iconSize={20} className="border-none cursor-pointer
                        appearance-none touch-manipulation flex
                        focus-visible:outline-blue-600 font-bold hover:opacity-80
                        min-h-[30px] min-w-[30px] rounded-full
                        text-white bg-gradientPinkRed absolute right-4 top-4 h-8 w-8"
                                        iconColor={"blue"}/>

                    <div className={"mt-2"}>
                        <div className={"mb-4 w-16 sm:hidden"}></div>
                        {/*CV Name and Title*/}
                        <div>
                            <p className="text-xl font-bold"><span
                                className="text-primaryBlack">{resumeData.data.name}</span>
                            </p><p className="text-lg text-gray-500">{resumeData.data.position}</p>
                        </div>
                        <div
                            className={"mt-4 grid items-center gap-3 sm:grid-cols-[1fr_90px] md:grid-cols-[1fr_110px]"}>
                            <div className={"flex flex-col space-y-3"}>
                                <IconWithTitle title={resumeData.data.email} iconSize={18} Icon={MdMail}
                                               iconColor={"grey"}/>
                                <IconWithTitle title={resumeData.data.contactInformation} iconSize={18} Icon={MdLocalPhone}
                                               iconColor={"grey"}/>
                                <IconWithTitle title={resumeData.data.address} iconSize={18} Icon={MdFmdGood}
                                               iconColor={"grey"}/>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        </div>

    </div>


}
export default ContactInformationPreview;
import {useRef, useState} from "react";
import useAppContext from "@/hooks/useAppContext";
import {MdDelete} from "react-icons/md";
import TextInput from "@/components/general/text-input";
import Grid from "@/components/general/grid";
import LinkModal from "@/components/general/link-modal";
import {showErrorAlert} from "@/lib/alerts";

const CvLinkItem = ({title,onRemove,className, ...props}) => {
    const divRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {resumeData, setResumeData, globalRefs} = useAppContext();
    const data = resumeData.data.socialMedia.find((item) => item.socialMedia === title) || {};


    const [link, setLink] = useState(data.link || "");

    const onLinkUpdate = (e) => {
        const newSocialMedia = [...resumeData.data.socialMedia];
        const index = newSocialMedia.findIndex((x) => x.socialMedia === title);
        newSocialMedia[index].link = e;
        const displayUrl = prepareDisplayUrl(e);
        if (displayUrl){
            newSocialMedia[index].displayName = displayUrl;
        }
        setResumeData({
            ...resumeData,
            data:{
                ...resumeData.data,
                socialMedia: newSocialMedia
            }
        });
        setLink(e);


    }

    const prepareDisplayUrl = (url) => {
        try {
            const { hostname, pathname } = new URL(url);
            const simplifiedHostname = hostname.startsWith("www.") ? hostname.slice(4) : hostname;
            return `${simplifiedHostname}${pathname}`;
        } catch (error) {
            showErrorAlert("Invalid URL");
            return null;
        }
    };

    return <div ref={divRef} className={` ${className}`}>
        <LinkModal link={link} setLink={onLinkUpdate} divRef={divRef} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <Grid cols={1} className="w-full md:grid-cols-[auto_min-content_min-content] md:gap-2 xl:gap-2">
            <TextInput className={"mb-4"} name={`cv${title}`} type={"text"}
                       value={link}
                       onChange={()=>{}}
                       title={title} hint={`Enter ${title} URL`} isRequired={true}/>

            <button
                onClick={() => setIsModalOpen(true)}
                className={"mt-2 cursor-pointer appearance-none touch-manipulation flex items-center justify-center focus-visible:outline-blue-600 font-bold hover:opacity-80 bg-checkedColorLight text-checkedColorStrong border-checkedColorStrong border border-solid ml-1 h-12 rounded-lg pl-3 pr-4"}>
                <span className="ml-1 whitespace-nowrap">Link</span>
            </button>

            <button onClick={onRemove}
                className={"mt-2 border-none cursor-pointer appearance-none touch-manipulation flex items-center justify-center focus-visible:outline-blue-600 font-bold hover:opacity-80 bg-red-50 text-red-800 ml-1 h-12 w-12 min-w-min rounded-lg"}>
                <MdDelete className={"text-red-800"}/>
            </button>

        </Grid>


    </div>;
};
export default CvLinkItem;
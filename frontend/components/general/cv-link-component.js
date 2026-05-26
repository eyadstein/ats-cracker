import useAppContext from "@/hooks/useAppContext";
import {useState} from "react";
import CvLinkItem from "@/components/general/items/cv-link-item";
import OptionsItem from "@/components/general/items/options-item";
const CvLinkComponent = ({ className,...props }) => {
    const {resumeData, setResumeData, globalRefs} = useAppContext();
    const originalResumeSocialLinks =()=>{
        const data = [
            {"title": "LinkedIn", "url": "", "render": false},
            {"title": "Github", "url": "", "render": false},
            {"title": "GooglePlay", "url": "", "render": false},
            {"title": "AppStore", "url": "", "render": false},
        ]
        resumeData.data.socialMedia.forEach((item)=>{
            const index = data.findIndex((x)=>x.title === item.socialMedia);
            if(index !== -1){
                data[index].render = true;
            }

        });

        return data;

    }


    const [availableLinks, setAvailableLinks] = useState([
        ...originalResumeSocialLinks()

    ]);


    const renderLink = (index) => {
        const newAvailableLinks = [...availableLinks];
        const value = !newAvailableLinks[index].render

        newAvailableLinks[index].render = !newAvailableLinks[index].render;
        setAvailableLinks(newAvailableLinks);
        if(value) {
            // add new social media to resumeData
            setResumeData({
                ...resumeData,
                data:{
                    ...resumeData.data,
                    socialMedia: [
                        ...resumeData.data.socialMedia,
                        {
                            socialMedia: newAvailableLinks[index].title,
                            link: "",
                            displayName: newAvailableLinks[index].title
                        }
                    ]
                }
            });
        }
        else{
            // remove social media from resumeData
            const newSocialMedia = [...resumeData.data.socialMedia];
            const indexToRemove = newSocialMedia.findIndex((x)=>x.socialMedia === newAvailableLinks[index].title);
            newSocialMedia.splice(indexToRemove, 1);
            setResumeData({
                ...resumeData,
                data:{
                    ...resumeData.data,
                    socialMedia: newSocialMedia
                }
            });
        }

    };



    return <div className={` ${className}`}>
        {
            availableLinks.map((link, index) => {
               return  link.render ? <CvLinkItem key={index} title={link.title} onRemove={()=>renderLink(index)}  /> : null
            })
        }


        <div className={"mt-8 flex w-full flex-wrap items-center "}>
            {
                availableLinks.map((link, index) => {
                    return  !link.render ? <OptionsItem key={index}  title={link.title} onClick={()=>renderLink(index)} />: null
                })
            }
        </div>
    </div>
};

export default CvLinkComponent;
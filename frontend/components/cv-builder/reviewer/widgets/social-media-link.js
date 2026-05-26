import {
    FaGithub,
    FaLinkedin,
    FaGooglePlay,
    FaAppStore

} from "react-icons/fa";
import ContactSpace from "@/components/general/contact-space";

const SocialMediaLink = ({socialMedia, isLast}) => {

    return <>
        <a
            href={`${socialMedia.link}`}
            aria-label={socialMedia.socialMedia}
            title={socialMedia.socialMedia}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 social-media justify-center font-bold underline text-blue-500 hover:text-blue-700"
            style={{
                wordWrap: 'break-word',
                display: 'inline-flex',
            }}
        >
            <span>{socialMedia.socialMedia}</span>
        </a>
        {!isLast && <ContactSpace width={15} isEmpty={true}/>}
    </>
}
const SocialMediaIconLink = ({socialMedia,index,isLast}) => {
    const icons = [
        { name: "appstore", icon: <FaAppStore /> },
        { name: "googleplay", icon: <FaGooglePlay /> },
        { name: "github", icon: <FaGithub /> },
        { name: "linkedin", icon: <FaLinkedin /> },


    ];
    return <>
        <a
            href={`${socialMedia.link}`}
            aria-label={socialMedia.socialMedia}
            key={index}
            title={socialMedia.socialMedia}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 social-media align-center justify-center "

        >
            {icons.map((icon, index) => {
                if (icon.name === socialMedia.socialMedia.toLowerCase()) {
                    return <span key={index}>{icon.icon}</span>;
                }
            })}
            {socialMedia.displayName}
        </a>
        {!isLast && <ContactSpace width={15} isEmpty={true}/>}
    </>
}


export {SocialMediaLink, SocialMediaIconLink};
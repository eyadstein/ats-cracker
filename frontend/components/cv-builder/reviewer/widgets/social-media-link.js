import {
    FaGithub,
    FaLinkedin,
    FaGooglePlay,
    FaAppStore
} from "react-icons/fa";
import ContactSpace from "@/components/general/contact-space";

function sanitizeUrl(url) {
    if (!url) return "#";
    const lower = url.trim().toLowerCase();
    if (lower.startsWith('javascript:') || lower.startsWith('data:') || lower.startsWith('vbscript:')) {
        return "#";
    }
    if (!lower.startsWith('http://') && !lower.startsWith('https://')) {
        return 'https://' + url;
    }
    return url;
}

function stripHtml(html) {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, '');
}

const SocialMediaLink = ({ socialMedia, isLast }) => {
    const safeUrl = sanitizeUrl(socialMedia.link);

    return <>
        <a
            href={safeUrl}
            aria-label={stripHtml(socialMedia.socialMedia)}
            title={stripHtml(socialMedia.socialMedia)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 social-media justify-center font-bold underline text-blue-500 hover:text-blue-700"
            style={{
                wordWrap: 'break-word',
                display: 'inline-flex',
            }}
        >
            <span>{stripHtml(socialMedia.socialMedia)}</span>
        </a>
        {!isLast && <ContactSpace width={15} isEmpty={true} />}
    </>
}

const SocialMediaIconLink = ({ socialMedia, index, isLast }) => {
    const icons = [
        { name: "appstore", icon: <FaAppStore /> },
        { name: "googleplay", icon: <FaGooglePlay /> },
        { name: "github", icon: <FaGithub /> },
        { name: "linkedin", icon: <FaLinkedin /> },
    ];

    const safeUrl = sanitizeUrl(socialMedia.link);

    return <>
        <a
            href={safeUrl}
            aria-label={stripHtml(socialMedia.socialMedia)}
            key={index}
            title={stripHtml(socialMedia.socialMedia)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 social-media align-center justify-center "
        >
            {icons.map((icon, idx) => {
                if (icon.name === (socialMedia?.socialMedia || "").toLowerCase()) {
                    return <span key={idx}>{icon.icon}</span>;
                }
                return null;
            })}
            {stripHtml(socialMedia.displayName)}
        </a>
        {!isLast && <ContactSpace width={15} isEmpty={true} />}
    </>
}

export { SocialMediaLink, SocialMediaIconLink };

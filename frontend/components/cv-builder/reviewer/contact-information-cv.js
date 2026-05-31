import useAppContext from "@/hooks/useAppContext";
import HorizontalLine from "@/components/general/horizontal-line";
import { SocialMediaIconLink } from "@/components/cv-builder/reviewer/widgets/social-media-link";
import ContactSpace from "@/components/general/contact-space";

function sanitizeEmail(email) {
    if (!email) return "";
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? email : "";
}

function sanitizePhone(phone) {
    if (!phone) return "";
    // Allow digits, spaces, +, -, (, )
    const phoneRegex = /^[\d\s+\-().]+$/;
    return phoneRegex.test(phone) ? phone : "";
}

const ContactInformationCv = ({ data, isListItemPreview }) => {
    const { resumeData } = useAppContext();
    const cvData = isListItemPreview ? data : resumeData;
    const d = cvData?.data || {};
    const hasContactInfo = d.name || d.position || d.address || d.email || d.contactInformation || (d.socialMedia?.length > 0);

    const safeEmail = sanitizeEmail(d.email);
    const safePhone = sanitizePhone(d.contactInformation);

    return (
        <>
            <div className="w-full flex flex-col items-center">
                <div className="w-full text-black flex flex-col items-center text-center pb-2.5 mb-1.5">
                    <span className="name-cv">{d.name || ""}</span>
                    <span className="profession-cv mt-1">{d.position || ""}</span>
                </div>

                {d.name && d.position && <HorizontalLine id={"BetweenNameAndContact"} className={"mb-2 w-full"} />}

                <div className="w-full flex flex-wrap justify-center text-center gap-y-2">
                    {d.address && (
                        <>
                            <span>{d.address}</span>
                            {(safeEmail || safePhone) && <ContactSpace />}
                        </>
                    )}
                    {safeEmail && (
                        <>
                            <a aria-label="email address" href={`mailto:${safeEmail}`}>{safeEmail}</a>
                            {safePhone && <ContactSpace />}
                        </>
                    )}
                    {safePhone && (
                        <a aria-label="Phone Number" href={`tel:${safePhone}`}>{safePhone}</a>
                    )}
                </div>

                <div className="w-full flex flex-wrap justify-center text-center gap-y-2">
                    {d.socialMedia?.length > 0 && d.socialMedia.map((socialMedia, index) => {
                        if (!socialMedia.link) return null;
                        const isLast = index === d.socialMedia.length - 1;
                        return (
                            <SocialMediaIconLink
                                key={`${index}-${socialMedia.link}`}
                                socialMedia={socialMedia}
                                index={index}
                                isLast={isLast}
                            />
                        );
                    })}
                </div>
            </div>
            {hasContactInfo && <HorizontalLine className={"mt-2"} />}
        </>
    );
}
export default ContactInformationCv;

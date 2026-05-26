import useAppContext from "@/hooks/useAppContext";
import HorizontalLine from "@/components/general/horizontal-line";
import {SocialMediaIconLink} from "@/components/cv-builder/reviewer/widgets/social-media-link";
import ContactSpace from "@/components/general/contact-space";

const ContactInformationCv = ({data,isListItemPreview}) => {
    const {resumeData} = useAppContext();
    const cvData = isListItemPreview ? data : resumeData;
    const hasContactInfo = cvData.data.name || cvData.data.position || cvData.data.address || cvData.data.email || cvData.data.contactInformation || (cvData.data.socialMedia && cvData.data.socialMedia.length > 0);

    return (
        <>
            <div className="w-full flex flex-col items-center">
                <div className="w-full text-black flex flex-col items-center text-center pb-2.5 mb-1.5">
                        <span
                            className="name-cv">{cvData.data.name}</span>
                    <span
                        className="profession-cv mt-1">{cvData.data.position}</span>

                </div>

                {
                    cvData.data.name && cvData.data.position &&
                    <HorizontalLine id={"BetweenNameAndContact"} className={"mb-2 w-full"}/>
                }


                <div className="w-full flex flex-wrap justify-center text-center gap-y-2">
                    {cvData.data.address && (
                        <>
                            <a>{cvData.data.address}</a>
                            {(cvData.data.email || cvData.data.contactInformation) && <ContactSpace/>}
                        </>
                    )}

                    {cvData.data.email && (
                        <>
                            <a aria-label="email address" href={`mailto:${cvData.data.email}`}>
                                {cvData.data.email}
                            </a>
                            {cvData.data.contactInformation && <ContactSpace/>}
                        </>
                    )}

                    {cvData.data.contactInformation && (
                        <a aria-label="Phone Number" href={`tel:${cvData.data.contactInformation}`}>
                            {cvData.data.contactInformation}
                        </a>
                    )}
                </div>


                <div className="w-full flex flex-wrap justify-center text-center gap-y-2">
                    {cvData.data.socialMedia && cvData.data.socialMedia.length > 0 && cvData.data.socialMedia.map((socialMedia, index) => {
                        if (!socialMedia.link) return null;
                        const isLast = index === cvData.data.socialMedia.length - 1;

                        return (<SocialMediaIconLink
                            key={`${index}-${socialMedia.link}`}
                            socialMedia={socialMedia}
                            index={index}
                            isLast={isLast}
                        />);
                    })}
                </div>
            </div>

            {hasContactInfo && (
                <HorizontalLine className={"mt-2"}/>
            )}
        </>
    );
}
export default ContactInformationCv;

<HorizontalLine className={"mt-2"}/>
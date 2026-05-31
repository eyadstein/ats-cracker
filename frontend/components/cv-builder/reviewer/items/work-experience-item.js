import useAppContext from "@/hooks/useAppContext";
import DroppableDraggableList from "@/components/cv-builder/utils/droppable-draggable-list";
import DateComponent from "@/components/general/date-component";
import DraggableUtil from "@/components/cv-builder/utils/draggable-util";

function stripHtml(html) {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, '');
}

const AchievementItem = ({ item, onBlur, globalRefs, itemIndex, subIndex }) => (
    <div
        onFocus={(e) => {
            if (!globalRefs.current[`${itemIndex}-achievement-${subIndex}`])
                return;
            globalRefs.current[`${itemIndex}-achievement-${subIndex}`].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }}
        onBlur={onBlur}
    >
        {stripHtml(item.text)}
    </div>
);
const DraggableAchievementList = DroppableDraggableList(AchievementItem);

const WorkExperienceItemBody = ({ item }) => {
    return <>
        <div className="flex flex-row justify-between space-y-1">
            <p className="content i-bold ">{item.position} {item.isPartTime ? "(Part-Time)" : ""}</p>
            <DateComponent
                startYear={item.startYear}
                endYear={item.endYear}
                id={`work-experience-start-end-date`}
            />
        </div>
        <p className="content i-bold pl-1">
            {item.href ? (
                <a
                    href={item.href}
                    aria-label={item.company}
                    title={item.company}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center content justify-center i-bold underline text-blue-500 hover:text-blue-700"
                    style={{
                        wordWrap: 'break-word',
                        display: 'inline-flex',
                        fontSize: '.9rem',
                        padding: '2px 0',
                        lineHeight: '1.2',
                    }}
                >
                    {item.company && <span>{item.company}</span>}
                </a>
            ) : (
                item.company && <span>{item.company}</span>
            )}

            {item.company && item.workType && <span> - </span>}
            {item.workType && <span>{item.workType}</span>}
            {(item.company || item.workType) && item.location && <span>, </span>}
            {item.location && <span>{item.location}</span>}
        </p>

        {item.companyField &&
            <p className="content i-bold pl-1">{stripHtml(item.companyField)}</p>
        }

        {item.technologies && item.technologies.length > 0 &&
            <p className="content i-bold pl-1 mt-1">
                <span>Technologies: </span>
                <span className="content hyphens-auto">{item.technologies.join(', ')}</span>
            </p>
        }

    </>
}

const WorkExperienceItem = ({
    draggableId, index, item, type, keyData, isDraggable
}) => {
    const { updateResumeData, globalRefs } = useAppContext()
    const handleAchievementChange = (index, achievementIndex, value) => {
        const sanitized = stripHtml(value);
        updateResumeData((prevData) => {
            const newWorkExperience = [...prevData.data.workExperience];
            newWorkExperience[index].achievements[achievementIndex].text = sanitized;
            return {
                ...prevData,
                data: {
                    ...prevData.data,
                    workExperience: newWorkExperience
                }
            }
        });
    }
    if (!isDraggable) {
        return <>
            <WorkExperienceItemBody item={item} />

            <ul className="list-disc ul-padding content">
                {
                    item.achievements.map((achievement, idx) => {
                        return <li key={`ach-${idx}`} >
                            <AchievementItem item={achievement} onBlur={(e, achievementIndex) =>
                                handleAchievementChange(index, achievementIndex, e.target.innerText)
                            } globalRefs={globalRefs} itemIndex={index} subIndex={idx} />
                        </li>
                    })
                }
            </ul>
        </>
    }

    return <DraggableUtil draggableId={draggableId} index={index} keyData={keyData}>
        <WorkExperienceItemBody item={item} />

        <DraggableAchievementList
            itemIndex={index}
            globalRefs={globalRefs}
            items={item.achievements.filter((ach) => ach.isShownInPreview)}
            type={`${type}_KEY_ACHIEVEMENT`}
            droppableId={`${type}_KEY_ACHIEVEMENT-${index}`}
            OnBlurEvent={(e, achievementIndex) =>
                handleAchievementChange(index, achievementIndex, e.target.innerText)
            }
        />

    </DraggableUtil>
}
export default WorkExperienceItem;

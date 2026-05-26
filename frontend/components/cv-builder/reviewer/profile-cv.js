"use client";
import useAppContext from "@/hooks/useAppContext";

const ProfileCv = ({data,isListItemPreview,...props}) => {
    const {setResumeData,OnEditSectionTitle,resumeData} = useAppContext();
    const cvData = isListItemPreview ? data : resumeData;


    const OnEditItem = (e,index) => {
        const value = e.target.innerText;
        const newCvData = {...cvData};
        newCvData.data.summary[index].text = value;
        setResumeData(
            {
                ...newCvData,
                data: {
                    ...newCvData.data,
                    summary: newCvData.data.summary
                }
            }
        );
    };


    const countIsShownInPreview = cvData.data.summary.filter((item) => item.isShownInPreview).length;
    if (countIsShownInPreview === 0) {
        return null;
    }



    return (
        <div className={`grid grid-cols-3 gap-6 ${props.className} mt-2`}>
            <div className="col-span-3 space-y-2">
                <div className="flex flex-col m-0 p-0">
                    <h2
                        onBlur={(e) => OnEditSectionTitle(e,"profile")}
                        className="section-title mb-1 border-b-2 border-gray-300 editable m-0 p-0" contentEditable suppressContentEditableWarning>
                        {cvData.data.titles["profile"]}
                    </h2>
                    <div className="grid gap-0 m-0 pl-1">
                        {
                            cvData.data.summary.map((item, index) => {
                                return item.isShownInPreview ?
                                    <p key={item.text}
                                       className={"editable"} contentEditable suppressContentEditableWarning
                                       onBlur={(e) => OnEditItem(e, index)}
                                    >{item.text}</p>:
                                    null

                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCv;

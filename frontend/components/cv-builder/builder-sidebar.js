import {BugIcon, ContentIcon} from "@/components/svgs/svgs";
import useAppContext from "@/hooks/useAppContext";

export default function BuilderSideBar() {
    const { getSectionCompletion, getCompletionScore } = useAppContext();
    const completion = getSectionCompletion();
    const score = getCompletionScore();
    const scoreColor = score < 40 ? "#ef4444" : score < 70 ? "#f97316" : "#22c55e";

    return (
        <div id="SideBar" className="z-7 sidebar:flex sidebar:h-screen sidebar:w-30 sidebar:pt-8 sidebar:flex-col sticky top-0 hidden w-full xl:w-[130px]">
            <div className="sidebar:top-8 sticky top-0 w-full">
                <nav className="sidebar:rounded-large sidebar:shadow-themeShadow sidebar:pb-4 flex w-full flex-col items-center bg-white shadow-[rgb(100_100_100)_0px_0px_5px_0px]">
                    <div className="sidebar:grid-cols-1 sidebar:grid-rows-[min-content_min-content_min-content] grid w-full max-w-full grid-cols-[min-content_1fr_0px] md:grid-cols-[60px_1fr_60px]">
                        <a className="sidebar:justify-center sidebar:pb-4 sidebar:pl-0 sidebar:pt-6 group relative flex w-full items-center pl-4 hover:cursor-pointer md:pl-6"
                            href="/dashboard" aria-label="Go to Dashboard">
                            <div className="relative flex h-[90px] w-[90px] items-center justify-center rounded-full group-hover:bg-gray-50 transition-colors">
                                <BugIcon/>
                            </div>
                            <div className="bg-primaryBlack sidebar:group-hover:flex absolute top-[118px] hidden min-w-fit flex-col items-center rounded-full border-solid p-1 px-2 text-xs font-bold text-white">
                                Go to Dashboard
                                <div className="after:border-b-primaryBlack h-0 w-0 after:absolute after:-top-[15px] after:left-1/2 after:h-0 after:w-0 after:-translate-x-1/2 after:border-b-[8px] after:border-l-[8px] after:border-r-[8px] after:border-t-[8px] after:border-l-transparent after:border-r-transparent after:border-t-transparent"/>
                            </div>
                        </a>

                        <a className="sidebar:grid-cols-1 sidebar:grid-rows-[min-content_min-content] grid grid-cols-[min-content_min-content_min-content] items-stretch justify-center">
                            <div className="sidebar:pt-2 sidebar:pb-2 flex w-full flex-col items-center justify-center pl-2 pr-2 bg-coolGray50 sidebar:bg-transparent active">
                                <span className="text-primaryBlack sidebar:rounded-large sidebar:w-[100px] sidebar:h-[90px] flex cursor-pointer flex-col items-center justify-center px-6 py-1.5 no-underline hover:opacity-80 xl:w-[110px] bg-coolGray50">
                                    <span className="xs:[&>svg]:w-[30px] sidebar:[&>svg]:w-[36px] flex items-center justify-center [&>svg]:h-auto [&>svg]:w-[28px] md:[&>svg]:w-[32px]">
                                        <ContentIcon/>
                                    </span>
                                    <span className="xs:text-[14px] xs:mt-[3px] sidebar:text-[16px] mt-[2px] text-[13px] md:mt-[4px] md:text-[15px] bg-clip-text text-transparent"
                                        style={{backgroundImage: "linear-gradient(90deg, rgb(236, 0, 140), rgb(252, 103, 103))"}}>
                                        Content
                                    </span>
                                </span>
                            </div>
                        </a>
                    </div>

                    {/* Completion score ring */}
                    <div className="sidebar:flex hidden flex-col items-center pb-4 pt-2">
                        <div className="relative w-14 h-14">
                            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                                <circle cx="28" cy="28" r="22" fill="none" stroke="#f3f4f6" strokeWidth="5"/>
                                <circle cx="28" cy="28" r="22" fill="none" stroke={scoreColor} strokeWidth="5"
                                    strokeDasharray={`${2 * Math.PI * 22}`}
                                    strokeDashoffset={`${2 * Math.PI * 22 * (1 - score / 100)}`}
                                    strokeLinecap="round"
                                    style={{transition: "stroke-dashoffset 0.7s ease"}}/>
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-black" style={{color: scoreColor}}>
                                {score}%
                            </span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-semibold mt-1">Complete</span>
                    </div>

                    {/* Section completion dots */}
                    <div className="sidebar:flex hidden flex-col items-center gap-1.5 pb-4 w-full px-4">
                        {Object.entries(completion).map(([key, done]) => (
                            <div key={key} className="flex items-center gap-2 w-full">
                                <div className="w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-500"
                                    style={{background: done ? "#22c55e" : "#e5e7eb"}}/>
                                <span className="text-[10px] text-gray-400 capitalize truncate">
                                    {key === "contactInformation" ? "Personal" : key === "workExperience" ? "Experience" : key}
                                </span>
                            </div>
                        ))}
                    </div>
                </nav>
            </div>
        </div>
    );
}

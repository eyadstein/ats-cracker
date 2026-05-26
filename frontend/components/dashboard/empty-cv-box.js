export default function EmptyCvBox({children, cv, className, onClick}) {
    return (
        <div
            onClick={onClick}
            className={`flex flex-col justify-center items-center cursor-pointer ${className}`}>
            <div
                className="select-none overflow-hidden rounded-md border border-solid border-white hover:opacity-70"
                style={{width: "180px", height: "250px"}}>
                {children}
            </div>
            <span className="mt-[10px] text-xs font-bold uppercase">{cv.title}</span>
        </div>
    );
}
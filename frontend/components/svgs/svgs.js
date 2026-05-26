import Image from "next/image";

export function EmailIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-[1.2em] pb-[2px]">
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17.268 9.061l-4.266 3.434a2.223 2.223 0 01-2.746 0L5.954 9.061"
            ></path>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6.888 3.5h9.428c1.36.015 2.653.59 3.58 1.59a5.017 5.017 0 011.326 3.704v6.528a5.017 5.017 0 01-1.326 3.704 4.957 4.957 0 01-3.58 1.59H6.888C3.968 20.616 2 18.241 2 15.322V8.794C2 5.875 3.968 3.5 6.888 3.5z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
}

export function PasswordIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-[1.2em] pb-[2px]">
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M16.423 9.448V7.3a4.552 4.552 0 00-4.551-4.551 4.55 4.55 0 00-4.57 4.53v2.168"
            ></path>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15.683 21.25H8.042a3.792 3.792 0 01-3.792-3.792v-4.29a3.792 3.792 0 013.792-3.791h7.641a3.792 3.792 0 013.792 3.792v4.289a3.792 3.792 0 01-3.792 3.792z"
                clipRule="evenodd"
            ></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M11.862 14.203v2.22"></path>
        </svg>
    );
}

export function UserIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-[1.2em] pb-[2px]">
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
            ></path>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 14c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"
            ></path>
        </svg>
    );
}


export function AddIcon() {
    const stopColor1 = "#EC008C";
    const stopColor2 = "#FC6767"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 67 67" className="w-18">
            <path
                stroke="#200E32"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M53.904 35.152v-14.38l-13.8-13.694H21.986c-5.608 0-10.443 4.332-10.443 9.678v27.867c0 5.647 4.516 10.088 10.443 10.088 1.384 0 7.452-.1 10.486 0"
            ></path>
            <path
                stroke="#200E32"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M39.389 7.048v7.55c0 3.685 3.13 6.675 6.997 6.683 3.585.008 7.254.01 7.502-.005"
            ></path>
            <path
                stroke="#200E32"
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M44.732 54.304L62.784 54.304"
            ></path>
            <path
                stroke="#200E32"
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M54.575 62.583L54.575 45.633"
            ></path>
            <ellipse
                cx="12.045"
                cy="12.045"
                fill={`url(#grad-0.5302032417605169)`}
                rx="12.045"
                ry="12.045"
                transform="matrix(1 0 0 -1 41.943 66.107)"
            ></ellipse>
            <path
                fill="#fff"
                fillRule="evenodd"
                d="M54.93 49.636a.7.7 0 10-1.4 0v3.726h-3.727a.7.7 0 100 1.4h3.727v3.727a.7.7 0 101.4 0v-3.727h3.726a.7.7 0 100-1.4H54.93v-3.727z"
                clipRule="evenodd"
            ></path>
            <defs>
                <linearGradient id="grad-0.5302032417605169" x1="0" x2="24.09" y1="12.045" y2="12.045"
                                gradientUnits="userSpaceOnUse">
                    <stop stopColor={stopColor1}></stop>
                    <stop offset="1" stopColor={stopColor2}></stop>
                </linearGradient>
            </defs>
        </svg>
    );
}


export function LoadMoreIcon() {
    const stopColor1 = "#0057D8";
    const stopColor2 = "#00B2FF";
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 67 67" className="w-18">
            <path
                stroke="#200E32"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M33.5 6.5v38.59l-8.3-8.3a1.5 1.5 0 00-2.12 2.12l11.42 11.42a1.5 1.5 0 002.12 0l11.42-11.42a1.5 1.5 0 00-2.12-2.12l-8.3 8.3V6.5a1.5 1.5 0 00-3 0z"
            ></path>


            <defs>
                <linearGradient id="grad-1" x1="0" x2="24.09" y1="12.045" y2="12.045" gradientUnits="userSpaceOnUse">
                    <stop stopColor={stopColor1}></stop>
                    <stop offset="1" stopColor={stopColor2}></stop>
                </linearGradient>
            </defs>
        </svg>
    );
}


export  function BugIcon() {
    return (

        <Image src="/bug.svg" alt="Bug Icon" width={50} height={50} />

    );
}



export function DownloadIcon() {
    return <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v12m0 0l-3.5-3.5M12 15l3.5-3.5M21 18.5a2.5 2.5 0 01-2.5 2.5h-13a2.5 2.5 0 01-2.5-2.5V6.5a2.5 2.5 0 012.5-2.5h13a2.5 2.5 0 012.5 2.5V18.5z"
        />
    </svg>
}

export function ContentIcon() {

    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32">
        <g
            clipPath="url(#clip0_487_148060.4458784052632443)">
            <path
                fill="url(#paint0_linear_487_148060.4458784052632443)"
                fillRule="evenodd"
                d="M26.92 10.246l-6.752-7.034A.688.688 0 0019.67 3H10.8A5.782 5.782 0 005 8.66v14.285a5.79 5.79 0 005.8 5.903h10.652a5.87 5.87 0 005.66-5.903V10.723a.69.69 0 00-.191-.477zm-2.14-.135c-.673.104-1.353.166-2.035.185a2.747 2.747 0 01-2.736-2.744V5.06l4.772 5.052zm-3.328 17.36H10.8a4.413 4.413 0 01-4.423-4.526V8.66A4.405 4.405 0 0110.8 4.378h7.849c-.001.01-.005.02-.008.029-.004.01-.008.022-.008.033v3.112a4.127 4.127 0 004.11 4.122h.02c.76-.017 1.519-.086 2.27-.207.235-.033.485-.065.702-.088v11.566a4.495 4.495 0 01-4.283 4.526zm-2.384-7.41h-7.196a.689.689 0 000 1.378h7.197a.689.689 0 100-1.378zm-2.722-5.225H11.87a.69.69 0 110-1.378h4.475a.69.69 0 110 1.378z"
                clipRule="evenodd"></path>
        </g>
        <defs>
            <linearGradient
                id="paint0_linear_487_148060.4458784052632443" x1="4.998"
                x2="27.113"
                y1="15.924" y2="15.924" gradientUnits="userSpaceOnUse">
                <stop
                    stopColor="#EC008C"></stop>
                <stop offset="1"
                      stopColor="#FC6767"></stop>
            </linearGradient>
            <clipPath
                id="clip0_487_148060.4458784052632443">
                <path fill="#fff"
                      d="M0 0H22.114V25.848H0z"
                      transform="translate(5 3)"></path>
            </clipPath>
        </defs>
    </svg>
}
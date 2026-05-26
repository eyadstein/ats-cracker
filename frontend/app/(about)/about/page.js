import ImageViewer from "@/components/about/image-viewer";

function Profile() {
    return (
        <div className="sticky top-0 w-full md:w-1/3 mb-8 text-center md:text-left">
            <div className="mb-8 text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-violet-600 to-indigo-800 flex items-center justify-center text-5xl font-bold text-white">
                    E
                </div>
                <h2 className="text-3xl font-semibold mt-4">
                    Eyad Stein <span className="text-xs">(Builder)</span>
                </h2>
                <p className="text-xl text-gray-400">Software Developer</p>
                <div className="flex justify-center space-x-8 mt-2">
                    
                        href="https://github.com/eyadstein"
                        className="text-blue-500 hover:text-blue-300"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    );
}

export default async function AboutPage() {
    return (
        <div className="text-white min-h-screen px-8 py-12">
            <h1 className="text-4xl font-bold mb-8 text-center">
                ATS Cracker - Bypass ATS System with Avg 96-100% Score
            </h1>

            <section className="bg-dark py-20">
                <div className="container flex md:flex-row gap-8">
                    <Profile/>
                    <div className="w-full md:w-2/3">
                        <section className="mb-8">
                            <div className="grid gap-8 md:grid-cols-2">
                                <div className="overflow-hidden rounded-xl">
                                    <img src="/ats2.png" alt="gallery image" className="w-full object-cover object-center"/>
                                </div>
                                <div className="overflow-hidden rounded-xl">
                                    <img src="/ats1.png" alt="gallery image" className="w-full object-cover object-center"/>
                                </div>
                            </div>
                        </section>

                        <p className="text-2xl font-bold mb-2 text-center">
                            Results From <span> </span>
                            <span>
                                <a href="https://www.jobscan.co/" className="text-blue-500 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">JobScan</a>
                            </span>
                            <span> and </span>
                            <span>
                                <a href="https://www.resumego.net/" className="text-blue-500 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">ResumeGo</a>
                            </span>
                        </p>

                        <p className="text-2xl mb-4 text-center">
                            Your CV is now a JSON Object <span className={"text-xs"}>[AI can optimize it for you] 👀</span>
                        </p>

                        <p className="text-xl font-semibold mb-12 text-center text-gray-200">
                            <span className="block text-3xl font-extrabold mb-4 text-violet-500">Features of ATS Cracker:</span>
                            <div className="rounded-2xl p-6 shadow-lg">
                                <ul className="list-none space-y-4 text-left pl-4">
                                    <li className="text-lg text-gray-300"><span className="font-bold text-violet-500">1-</span> Convert your CV to JSON object.</li>
                                    <li className="text-lg text-gray-300"><span className="font-bold text-violet-500">2-</span> Convert your JSON object to CV.</li>
                                    <li className="text-lg text-gray-300"><span className="font-bold text-violet-500">3-</span> Save your CV as PDF.</li>
                                    <li className="text-lg text-gray-300"><span className="font-bold text-violet-500">4-</span> Download your CV as JSON object.</li>
                                    <li className="text-lg text-gray-300"><span className="font-bold text-violet-500">5-</span> Download your CV as PDF.</li>
                                    <li className="text-lg text-gray-300"><span className="font-bold text-violet-500">6-</span> Duplicate your CV via paste JSON object.</li>
                                </ul>
                            </div>
                        </p>

                        <section className="mb-8">
                            <ImageViewer/>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
}

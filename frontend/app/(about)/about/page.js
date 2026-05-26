export default async function AboutPage() {
    return (
        <div className="text-white min-h-screen px-8 py-12">
            <h1 className="text-4xl font-bold mb-8 text-center">
                ATS Cracker - Bypass ATS System with Avg 96-100% Score
            </h1>
            <section className="py-20">
                <div className="container flex md:flex-row gap-8">
                    <div className="sticky top-0 w-full md:w-1/3 mb-8 text-center md:text-left">
                        <div className="mb-8 text-center">
                            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-violet-600 to-indigo-800 flex items-center justify-center text-5xl font-bold text-white">
                                E
                            </div>
                            <h2 className="text-3xl font-semibold mt-4">Eyadstein</h2>
                            <p className="text-xl text-gray-400">Software Developer</p>
                            <div className="flex justify-center space-x-8 mt-2">
                                <a href="https://github.com/eyadstein" className="text-blue-500 hover:text-blue-300" target="_blank" rel="noopener noreferrer">
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-2/3">
                        <div className="grid gap-6 md:grid-cols-2 mb-10">
                            <div className="rounded-xl border border-violet-500/20 bg-white/5 p-6 flex flex-col items-center text-center gap-3">
                                <div className="text-5xl">🎯</div>
                                <h3 className="text-violet-400 font-bold text-xl">ATS Score 96-100%</h3>
                                <p className="text-gray-400 text-sm">Our resume format passes every major ATS system with near-perfect scores, verified on JobScan and ResumeGo.</p>
                            </div>
                            <div className="rounded-xl border border-violet-500/20 bg-white/5 p-6 flex flex-col items-center text-center gap-3">
                                <div className="text-5xl">🤖</div>
                                <h3 className="text-violet-400 font-bold text-xl">AI-Ready JSON</h3>
                                <p className="text-gray-400 text-sm">Your CV is stored as a clean JSON object. Feed it to any AI model for instant grammar fixes, rewrites, or optimization.</p>
                            </div>
                            <div className="rounded-xl border border-violet-500/20 bg-white/5 p-6 flex flex-col items-center text-center gap-3">
                                <div className="text-5xl">📄</div>
                                <h3 className="text-violet-400 font-bold text-xl">PDF Export</h3>
                                <p className="text-gray-400 text-sm">One-click professional PDF download, print-ready and pixel-perfect for any recruiter.</p>
                            </div>
                            <div className="rounded-xl border border-violet-500/20 bg-white/5 p-6 flex flex-col items-center text-center gap-3">
                                <div className="text-5xl">🔄</div>
                                <h3 className="text-violet-400 font-bold text-xl">Drag and Drop</h3>
                                <p className="text-gray-400 text-sm">Reorder every section of your resume with smooth drag-and-drop. Full control over your layout.</p>
                            </div>
                        </div>

                        <div className="rounded-2xl p-6 border border-violet-500/10 bg-white/5 mb-8">
                            <span className="block text-2xl font-extrabold mb-4 text-violet-400">All Features:</span>
                            <ul className="list-none space-y-3 text-left">
                                <li className="text-gray-300"><span className="font-bold text-violet-500">1-</span> Convert your CV to JSON object.</li>
                                <li className="text-gray-300"><span className="font-bold text-violet-500">2-</span> Convert your JSON object to CV.</li>
                                <li className="text-gray-300"><span className="font-bold text-violet-500">3-</span> Save your CV as PDF.</li>
                                <li className="text-gray-300"><span className="font-bold text-violet-500">4-</span> Download your CV as JSON object.</li>
                                <li className="text-gray-300"><span className="font-bold text-violet-500">5-</span> Download your CV as PDF.</li>
                                <li className="text-gray-300"><span className="font-bold text-violet-500">6-</span> Duplicate your CV via paste JSON object.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

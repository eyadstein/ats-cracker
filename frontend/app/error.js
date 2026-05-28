"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({ error, reset }) {
    useEffect(() => {
        if (error) console.error("App error:", error);
    }, [error]);

    const statusCode = error?.digest || error?.statusCode || "";
    const message = error?.message || "Something went wrong";

    return (
        <div className="fixed inset-0 flex items-center justify-center px-6"
            style={{ background: "linear-gradient(135deg, #0f0c29 0%, #1a1040 40%, #0d1b4b 100%)" }}>

            <div className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #8b5cf6, transparent)", top: "20%", left: "30%" }}/>

            <div className="relative text-center max-w-lg w-full">
                <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-4xl"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>
                    💥
                </div>

                <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-1.5 mb-4">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"/>
                    <span className="text-violet-300 text-sm font-medium">
                        {statusCode ? `Error ${statusCode}` : "Application Error"}
                    </span>
                </div>

                <h1 className="text-white text-5xl font-extrabold mb-3">Oops!</h1>
                <p className="text-gray-400 text-lg mb-2">
                    {message}
                </p>
                <p className="text-gray-500 text-sm mb-8">
                    Your resume data is safe. Try refreshing or go back to the dashboard.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {reset && (
                        <button onClick={reset}
                            className="px-8 py-3 rounded-xl text-white font-bold transition-all hover:scale-105"
                            style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>
                            Try Again
                        </button>
                    )}
                    <Link href="/dashboard">
                        <button className="px-8 py-3 rounded-xl border border-violet-500/40 text-violet-300 font-semibold hover:bg-violet-500/10 transition-all">
                            Back to Dashboard
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

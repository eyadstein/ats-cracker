'use client';
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setOAuthCookies } from "@/actions/oauth";

function CallbackHandler() {
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {
        const access = params.get("access");
        const refresh = params.get("refresh");
        const username = params.get("username");
        const email = params.get("email");
        const error = params.get("error");

        if (error) { router.push("/?error=" + error); return; }

        if (access && refresh) {
            setOAuthCookies({ access, refresh, username, email }).then(() => {
                // Full reload forces AppProvider to re-read cookies
                window.location.href = "/dashboard";
            });
        }
    }, []);

    return null;
}

export default function OAuthCallbackPage() {
    return (
        <div className="fixed inset-0 flex items-center justify-center" style={{background: "linear-gradient(135deg, #0f0f0f, #1a1a2e)"}}>
            <div className="text-center">
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{background: "linear-gradient(135deg, #e84393, #f97316)"}}>
                    <span className="text-white font-black text-xl">A</span>
                </div>
                <p className="text-white font-bold text-lg">Signing you in...</p>
                <p className="text-gray-500 text-sm mt-1">Please wait</p>
            </div>
            <Suspense fallback={null}>
                <CallbackHandler />
            </Suspense>
        </div>
    );
}

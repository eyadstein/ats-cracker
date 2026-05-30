"use client";
import Link from "next/link";
import { FaBug } from "react-icons/fa";
import NavComponent from "@/components/landing/nav-component";
import LoginBtn from "@/components/auth/login";
import AppProvider from "@/context/app-provider";
import useAppContext from "@/hooks/useAppContext";

function HeaderInner({ atsClass }) {
    const { user, isAuthenticated } = useAppContext();
    return (
        <div className="grid w-full grid-cols-[max-content_1fr_max-content] items-center gap-4 rounded-xl py-3 px-4 border border-white/10 bg-white/5 backdrop-blur-md transition-all">
            <Link href="/" className={`ml-2 flex items-center gap-2 text-xl font-semibold ${atsClass}`}>
                <FaBug className={atsClass}/> Ats~Cracker
            </Link>
            <NavComponent/>
            <div className="flex items-center gap-3">
                {isAuthenticated && user && (
                    <Link href="/profile">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 hover:border-violet-400/60 hover:bg-violet-500/10 transition-all cursor-pointer">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
                                {(user.username || user.email || "U").slice(0, 1).toUpperCase()}
                            </div>
                            <span className="text-xs font-semibold text-white/80 hidden sm:block">{user.username || "Profile"}</span>
                        </div>
                    </Link>
                )}
                <LoginBtn/>
            </div>
        </div>
    );
}

export default function Header({ atsClass = "text-white" }) {
    return (
        <header className="sticky top-0 z-50 w-full px-3 pt-4 md:px-6 lg:px-2 xl:px-6">
            <AppProvider>
                <HeaderInner atsClass={atsClass} />
            </AppProvider>
        </header>
    );
}

'use client'
import Link from "next/link";
import { FaBug } from "react-icons/fa";
import NavComponent from "@/components/landing/nav-component";
import useAppContext from "@/hooks/useAppContext";
import LoginBtn from "@/components/auth/login";

export default function DashBoardHeader() {
    const { user } = useAppContext();
    return (
        <div className="sticky top-0 z-50 w-full bg-transparent px-3 pt-4 md:px-6 lg:px-2 xl:px-6">
            <div className="grid w-full grid-cols-[max-content_1fr_max-content] items-center gap-4 rounded-xl py-3 lg:px-4 hover:bg-white hover:bg-opacity-90 transition-all">
                <Link href="/" className="ml-4 flex items-center gap-2 text-xl font-semibold text-primaryBlack">
                    <FaBug className="text-primaryBlack" /> Ats~Cracker
                </Link>
                <NavComponent />
                <div className="flex items-center gap-3">
                    {user && (
                        <Link href="/profile">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-all cursor-pointer">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-white text-[10px] font-bold">
                                    {(user.username || user.email || "U").slice(0, 1).toUpperCase()}
                                </div>
                                <span className="text-xs font-semibold text-gray-700 hidden sm:block">{user.username || "Profile"}</span>
                            </div>
                        </Link>
                    )}
                    <LoginBtn/>
                </div>
            </div>
        </div>
    );
}

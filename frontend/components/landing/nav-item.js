'use client';
import { AiFillHome } from "react-icons/ai";
import { FaInfoCircle, FaUser } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";
const IconMap = { AiFillHome, FaInfoCircle, FaUser };
export default function NavItem({ href, icon, children, dark = false, atsClass = "" }) {
    const currentPath = usePathname();
    const isActive = currentPath === href;
    const Icon = IconMap[icon];
    const isDashboard = currentPath?.startsWith("/dashboard") || currentPath?.startsWith("/profile");
    const activeColor = isDashboard ? "text-violet-700" : "text-white";
    const inactiveColor = isDashboard ? "text-gray-600" : "text-white/70";
    const hoverColor = isDashboard ? "hover:text-violet-600" : "hover:text-white";
    return (
        <Link href={href}
            className={`flex items-center gap-2 transition-colors ${isActive ? activeColor : inactiveColor} ${hoverColor}`}>
            {Icon && <Icon className={`text-lg ${isActive ? "opacity-100" : "opacity-70"}`} />}
            <span className={isActive ? "font-semibold" : ""}>{children}</span>
        </Link>
    );
}
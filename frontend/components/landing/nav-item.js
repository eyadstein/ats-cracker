'use client';
import { AiFillHome } from "react-icons/ai";
import { FaInfoCircle, FaUser } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";

const IconMap = { AiFillHome, FaInfoCircle, FaUser };

export default function NavItem({ href, icon, children, dark = false }) {
    const currentPath = usePathname();
    const isActive = currentPath === href;
    const Icon = IconMap[icon];

    const activeColor = dark ? "text-white" : "text-white";
    const inactiveColor = dark ? "text-white/70" : "text-white/70";
    const hoverColor = "hover:text-white";

    return (
        <Link href={href}
            className={`flex items-center gap-2 transition-colors ${isActive ? activeColor : inactiveColor} ${hoverColor}`}>
            <Icon className={`text-lg ${isActive ? "opacity-100" : "opacity-70"}`} />
            <span className={isActive ? "font-semibold" : ""}>{children}</span>
        </Link>
    );
}

'use client';
import NavItem from "@/components/landing/nav-item";
import useAppContext from "@/hooks/useAppContext";

const routes = [
    { icon: 'AiFillHome', title: 'Home', path: '/' },
    { icon: 'FaInfoCircle', title: 'About', path: '/about' },
];

export default function NavComponent() {
    const { isAuthenticated } = useAppContext();
    const userRoutes = isAuthenticated ? [
        ...routes,
        { icon: 'FaUser', title: 'Dashboard', path: '/dashboard' },
    ] : routes;

    return (
        <nav className="hidden lg:flex items-center justify-center gap-6 pr-2 text-base">
            {userRoutes.map((route, index) => (
                <NavItem key={index} href={route.path} icon={route.icon}>{route.title}</NavItem>
            ))}
            <NavItem href="/ai" icon="AiFillHome">
                <span className="flex items-center gap-1.5">
                    AI Features
                    <span className="text-[9px] bg-yellow-400/20 border border-yellow-400/40 text-yellow-400 rounded-full px-1.5 py-0.5 font-bold">SOON</span>
                </span>
            </NavItem>
        </nav>
    );
}

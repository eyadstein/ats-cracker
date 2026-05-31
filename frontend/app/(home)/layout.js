import "../globals.css";
import { geistMono, geistSans } from "@/app/fonts";
import Header from "@/components/landing/header";
import AppProvider from "@/context/app-provider";

export const metadata = {
    title: "ATS Cracker",
    description: "Make Your Resume Stand Out",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" style={{ background: "linear-gradient(135deg, #0f0c29 0%, #1a1040 40%, #0d1b4b 100%)" }}>
        <body style={{ background: "transparent", color: "white", margin: 0, minHeight: "100vh" }}>
        <div className={`${geistSans.variable} ${geistMono.variable} relative flex min-h-screen w-full flex-col items-center`}>
            <AppProvider>
                <Header atsClass="text-white" />
                {children}
            </AppProvider>
        </div>
        </body>
        </html>
    );
}
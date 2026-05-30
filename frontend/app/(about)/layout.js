import "../../globals.css";
import {geistMono, geistSans} from "@/app/fonts";
import Header from "@/components/landing/header";
import AppProvider from "@/context/app-provider";

export const metadata = {
    title: "About — ATS Cracker",
    description: "How ATS Cracker works",
};

export default function AboutLayout({children}) {
    return (
        <html lang="en">
        <body>
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased relative flex min-h-screen w-full flex-col items-center`}
             style={{ background: "linear-gradient(135deg, #0f0c29 0%, #1a1040 40%, #0d1b4b 100%)" }}>
            <AppProvider>
                <Header atsClass="text-white"/>
                {children}
            </AppProvider>
        </div>
        </body>
        </html>
    );
}

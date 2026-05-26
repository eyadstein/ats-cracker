import localFont from "next/font/local";
import "../globals.css";
import "./dashboard.css";
import AppProvider from "@/context/app-provider";
import DashBoardHeader from "@/components/dashboard/header";
import {geistMono, geistSans} from "@/app/fonts";

export const metadata = {
    title: "ATS Crack",
    description: "Make Your Resume Stand Out",
};



export default function RootLayout({children}) {
    return (

        <html>
        <body>
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased bg-specialSandLight relative flex min-h-screen w-full flex-col items-center`}>
            <AppProvider>
                <DashBoardHeader/>
                {children}
            </AppProvider>
        </div>
        </body>
        </html>

    );
}

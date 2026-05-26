import localFont from "next/font/local";
import "../globals.css";
import {geistMono, geistSans} from "@/app/fonts";
import Header from "@/components/landing/header";

export const metadata = {
    title: "ATS Cracker",
    description: "Make Your Resume Stand Out",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">

        <body>
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased
        bg-specialSandLight relative flex min-h-screen w-full flex-col items-center
        `}>
            <Header/>
            {children}
        </div>


        </body>
        </html>
    );
}

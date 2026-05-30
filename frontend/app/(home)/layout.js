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
        <html lang="en">
        <body className="dark-page">
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased relative flex min-h-screen w-full flex-col items-center`}>
            <AppProvider>
                <Header atsClass="text-white" />
                {children}
            </AppProvider>
        </div>
        </body>
        </html>
    );
}

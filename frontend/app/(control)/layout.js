import "../globals.css";
import AppProvider from "@/context/app-provider";
import DashBoardHeader from "@/components/dashboard/header";
import { geistMono, geistSans } from "@/app/fonts";

export const metadata = {
    title: "ATS Cracker — Dashboard",
    description: "Make Your Resume Stand Out",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body style={{ margin: 0, minHeight: "100vh", background: "#f5f3ff" }}>
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased relative flex min-h-screen w-full flex-col`}>
            <AppProvider>
                <DashBoardHeader />
                {children}
            </AppProvider>
        </div>
        </body>
        </html>
    );
}
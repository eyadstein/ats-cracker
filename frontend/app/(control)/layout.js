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
        <html lang="en" style={{ background: "linear-gradient(160deg, #f8f7ff 0%, #ede9fe 40%, #e0e7ff 100%)" }}>
        <body style={{ margin: 0, minHeight: "100vh", background: "linear-gradient(160deg, #f8f7ff 0%, #ede9fe 40%, #e0e7ff 100%)" }}>
        <div className={`${geistSans.variable} ${geistMono.variable} relative flex min-h-screen w-full flex-col`}>
            <AppProvider>
                <DashBoardHeader />
                {children}
            </AppProvider>
        </div>
        </body>
        </html>
    );
}
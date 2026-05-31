import "../globals.css";
import "./dashboard.css";
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
        <body>
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased relative flex min-h-screen w-full flex-col items-center`}
             style={{ background: "linear-gradient(160deg, #f8f7ff 0%, #f0eeff 40%, #e8f4ff 100%)" }}>
            <AppProvider>
                <DashBoardHeader />
                {children}
            </AppProvider>
        </div>
        </body>
        </html>
    );
}

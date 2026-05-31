import { NextResponse } from "next/server";

export async function GET() {
    try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (backendUrl) {
            await fetch(`${backendUrl}/api/health/`, { 
                method: "GET",
                signal: AbortSignal.timeout(5000)
            });
        }
        return NextResponse.json({ status: "ok" });
    } catch {
        return NextResponse.json({ status: "backend-offline" });
    }
}
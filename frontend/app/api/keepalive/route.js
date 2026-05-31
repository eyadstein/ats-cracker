import { NextResponse } from "next/server";

export async function GET() {
    try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (backendUrl) {
            // Use AbortController instead of AbortSignal.timeout for broader compatibility
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            
            try {
                await fetch(`${backendUrl}/api/health/`, { 
                    method: "GET",
                    signal: controller.signal
                });
            } finally {
                clearTimeout(timeoutId);
            }
        }
        return NextResponse.json({ status: "ok" });
    } catch {
        return NextResponse.json({ status: "backend-offline" });
    }
}

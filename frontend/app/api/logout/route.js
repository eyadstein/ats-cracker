import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
    // Verify request has proper origin/header to prevent CSRF
    const origin = req.headers.get('origin');
    const host = req.headers.get('host');
    
    // In production, verify origin matches host
    if (process.env.NODE_ENV === 'production' && origin) {
        const originHost = new URL(origin).host;
        if (originHost !== host) {
            return NextResponse.json({ success: false, message: "Invalid origin" }, { status: 403 });
        }
    }
    
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("username");
    cookieStore.delete("email");
    return NextResponse.json({ success: true });
}

'use server';
import { decodeAndSetCookies } from "@/lib/server-utils";
import { jwtDecode } from "jwt-decode";

export async function setOAuthCookies({ access, refresh, username, email }) {
    // Validate tokens are proper JWT format before setting
    const jwtPattern = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;
    if (!jwtPattern.test(access) || !jwtPattern.test(refresh)) {
        throw new Error("Invalid token format");
    }
    
    // Verify tokens are decodable
    try {
        jwtDecode(access);
        jwtDecode(refresh);
    } catch {
        throw new Error("Invalid token content");
    }
    
    await decodeAndSetCookies(access, refresh);
}

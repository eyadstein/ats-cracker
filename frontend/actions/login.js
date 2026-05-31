'use server';
import * as ThirdParty from "@/lib/auth";
import { decodeAndSetCookies, removeAllUserCookies } from "@/lib/server-utils";

// Rate limiting map (in production, use Redis)
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(identifier) {
    const now = Date.now();
    const attempts = loginAttempts.get(identifier);
    if (!attempts) {
        loginAttempts.set(identifier, { count: 1, firstAttempt: now });
        return { allowed: true };
    }
    if (now - attempts.firstAttempt > WINDOW_MS) {
        loginAttempts.set(identifier, { count: 1, firstAttempt: now });
        return { allowed: true };
    }
    if (attempts.count >= MAX_ATTEMPTS) {
        return { allowed: false, remaining: 0 };
    }
    attempts.count++;
    return { allowed: true, remaining: MAX_ATTEMPTS - attempts.count };
}

export async function login(formData) {
    try {
        // Basic input validation
        if (!formData?.email || !formData?.password) {
            return {
                success: false,
                message: "Email and password are required",
                statusCode: 400
            };
        }
        // Rate limiting check
        const rateLimit = checkRateLimit(formData.email.toLowerCase());
        if (!rateLimit.allowed) {
            return {
                success: false,
                message: "Too many login attempts. Please try again later.",
                statusCode: 429
            };
        }

        const response = await ThirdParty.Login(formData);
        if (response.access && response.refresh) {
            const { username, email } = await decodeAndSetCookies(response.access, response.refresh);
            return {
                success: true,
                message: "Login successful",
                tokens: { accessToken: response.access, refreshToken: response.refresh },
                statusCode: 200,
                username: username,
            };
        }
    } catch (error) {
        const errorCode = error?.response?.status || 500;
        let message = "Something went wrong. Please try again later";
        if (errorCode === 401) {
            message = "Invalid email or password";
        }
        return {
            success: false,
            message: message,
            statusCode: errorCode
        };
    }
}

export async function logout() {
    try {
        await removeAllUserCookies();
        return {
            success: true,
            message: "Logout successful",
            statusCode: 200
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong. Please try again later",
            statusCode: 500
        };
    }
}

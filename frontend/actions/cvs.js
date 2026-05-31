'use server'
import * as ThirdParty from "@/lib/auth";
import { getAccessToken } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

// Verify the access token is valid and return decoded user info
async function verifySession() {
    const cookies = await getAccessToken();
    if (!cookies?.value) {
        return null;
    }
    try {
        const decoded = jwtDecode(cookies.value);
        // Check expiration with 5-second buffer
        if (!decoded?.exp || decoded.exp * 1000 < Date.now() - 5000) {
            return null;
        }
        return decoded;
    } catch {
        return null;
    }
}

// Helper to prevent prototype pollution
function sanitizeKeys(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(sanitizeKeys);
    const sanitized = {};
    for (const key of Object.keys(obj)) {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            continue;
        }
        sanitized[key] = sanitizeKeys(obj[key]);
    }
    return sanitized;
}

export async function cvListAction(formData) {
    const session = await verifySession();
    if (!session) {
        redirect('/');
    }
    try {
        const cookies = await getAccessToken();
        const cvList = await ThirdParty.GetCvList(cookies.value, formData.page);
        return {
            success: true,
            cvList
        }
    } catch (error) {
        console.error('cvListAction error:', error);
        return { message: "An Error Occurred, Please try again", success: false };
    }
}

export async function cvCreateUpdate(cvData) {
    const session = await verifySession();
    if (!session) {
        redirect('/');
    }
    try {
        // Validate cvData structure
        if (!cvData || typeof cvData !== 'object') {
            return { message: "Invalid data format", success: false };
        }
        const cookies = await getAccessToken();
        const sanitizedData = sanitizeKeys(cvData);
        const response = await ThirdParty.CreateUpdateCv(cookies.value, sanitizedData);
        return {
            success: true,
            response
        }
    } catch (error) {
        console.error('cvCreateUpdate error:', error);
        return { message: "An Error Occurred, Please try again", success: false };
    }
}

export async function cvGetAction(cvId) {
    const session = await verifySession();
    if (!session) {
        redirect('/');
    }
    try {
        // Validate cvId
        if (!cvId || !/^[a-zA-Z0-9_-]+$/.test(String(cvId))) {
            return { message: "Invalid CV ID", success: false };
        }
        const cookies = await getAccessToken();
        const cv = await ThirdParty.GetCv(cookies.value, cvId);
        return {
            success: true,
            cv
        }
    } catch (error) {
        console.error('cvGetAction error:', error);
        return { message: "An Error Occurred, Please try again", success: false };
    }
}

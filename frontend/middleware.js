import { NextResponse } from 'next/server';
import * as ThirdParty from "@/lib/auth";
import { decodeAndSetCookies, removeAllUserCookies } from "@/lib/server-utils";

// Strip dangerous internal headers at the edge
const STRIP_HEADERS = [
    'x-invoke-path',
    'x-invoke-query', 
    'x-middleware-rewrite',
    'x-middleware-skip',
    'x-invoke-output'
];

async function tryToRefreshToken(refreshToken) {
    try {
        console.log('Refreshing token');
        const response = await ThirdParty.RefreshToken(refreshToken);
        const accessToken = response.access;
        if (!accessToken) throw new Error("No access token in refresh response");
        await decodeAndSetCookies(accessToken, refreshToken);
        return true;
    } catch (error) {
        console.error(error);
        await removeAllUserCookies();
        return false;
    }
}

export async function authMiddleware(req) {
    // STRIP dangerous headers immediately
    const headers = new Headers(req.headers);
    let stripped = false;
    for (const h of STRIP_HEADERS) {
        if (headers.has(h)) {
            headers.delete(h);
            stripped = true;
        }
    }
    if (stripped) {
        console.warn(`[SECURITY] Stripped internal headers from request: ${req.url}`);
    }

    const token = req.cookies.get('accessToken');
    const refreshToken = req.cookies.get('refreshToken');

    if (!token && !refreshToken) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (!token && refreshToken) {
        if (!await tryToRefreshToken(refreshToken.value)) {
            return NextResponse.redirect(new URL('/', req.url));
        }
        return NextResponse.next();
    }

    // Verify token is not expired
    try {
        const { jwtDecode } = await import('jwt-decode');
        const decoded = jwtDecode(token.value);
        if (!decoded?.exp || decoded.exp * 1000 < Date.now() - 5000) {
            if (refreshToken && await tryToRefreshToken(refreshToken.value)) {
                return NextResponse.next();
            }
            return NextResponse.redirect(new URL('/', req.url));
        }
    } catch {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export async function GeneralMiddleware(req) {
    // Strip dangerous headers
    const headers = new Headers(req.headers);
    for (const h of STRIP_HEADERS) {
        if (headers.has(h)) headers.delete(h);
    }

    const token = req.cookies.get('accessToken');
    const refreshToken = req.cookies.get('refreshToken');
    if (!token && refreshToken) {
        await tryToRefreshToken(refreshToken.value);
    }

    return NextResponse.next();
}

export function middleware(request) {
    // Strip internal headers from ALL requests
    const requestHeaders = new Headers(request.headers);
    for (const h of STRIP_HEADERS) {
        requestHeaders.delete(h);
    }

    if (request.nextUrl.pathname.startsWith('/dashboard') || 
        request.nextUrl.pathname.startsWith('/profile')) {
        return authMiddleware(request);
    }
    return GeneralMiddleware(request);
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/api/cv/:path*'],
};

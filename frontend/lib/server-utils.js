'use server';
import {cookies} from "next/headers";
import {decodeJWT, getTimeDifference} from "@/lib/utils";
import Cookies from "js-cookie";

export const  decodeAndSetCookies =async (accessToken, refreshToken) => {
    const decodedAccess = decodeJWT(accessToken);
    const decodedRefresh = decodeJWT(refreshToken);
    const accessExp = getTimeDifference(decodedAccess.exp);
    const refreshExp = getTimeDifference(decodedRefresh.exp);


    const op = {
        httpOnly: true,
        path: '/',
        maxAge: accessExp
    }
    const cookieStore = await cookies();
    const username = decodedAccess.username;
    const email = decodedAccess.email;


    cookieStore.set('accessToken', accessToken, op);
    cookieStore.set('refreshToken', refreshToken, {...op, maxAge: refreshExp});
    cookieStore.set('username', username, {...op, httpOnly: false});
    cookieStore.set('email', email, {...op, httpOnly: false});

    return {username, email};
}

export const removeAllUserCookies = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    cookieStore.delete('username');
    cookieStore.delete('email');
}


export const getAccessToken = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken');
    return accessToken;
}

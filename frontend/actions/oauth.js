'use server';
import { decodeAndSetCookies } from "@/lib/server-utils";

export async function setOAuthCookies({ access, refresh, username, email }) {
    await decodeAndSetCookies(access, refresh);
}

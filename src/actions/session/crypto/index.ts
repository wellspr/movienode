import "server-only";
import { SessionCookie } from "@/actions/session/cookies";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(data: SessionCookie) {
    return new SignJWT(data)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
}

export async function decrypt(encryptedData: string | undefined) {

    if (!encryptedData) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(encryptedData, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload as SessionCookie;
    } catch (error) {
        console.log('Failed to verify session', error);
        return null;
    }
}
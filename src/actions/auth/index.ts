"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const authURL = "https://api.themoviedb.org/4/auth";

type CreateTokenResponse = {
    status_message: string
    request_token: string
    success: boolean //Defaults to true
    status_code: number //Defaults to 0
}

type CreateAccessTokenResponse = {
    account_id: number
    access_token: string
    success: boolean //Defaults to true
    status_message: string  //
    status_code: number  //Defaults to 0
}

const options = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
};

const env = process.env.NODE_ENV;
console.log(env);

let baseURL = "http://localhost:3000";

if (env === "production") {
    baseURL = "https://movienode-hub.vercel.app";
}

export async function createRequestToken() {
    const url = authURL + "/request_token";
    const requestBody = { "redirect_to": `${baseURL}/api/auth/access/approved` };

    const response = await fetch(url, {
        body: JSON.stringify(requestBody),
        ...options
    });

    const data = await response.json() as CreateTokenResponse;
    const requestToken = data.request_token;

    const cookieStore = await cookies();
    cookieStore.set("token", requestToken);

    redirect(`https://www.themoviedb.org/auth/access?request_token=${requestToken}`);
};

export async function createAccessToken() {
    const url = authURL + "/access_token";

    const cookieStore = await cookies();
    const requestToken = cookieStore.get("token");
    
    const requestBody = { "request_token": requestToken?.value };

    const response = await fetch(url, {
        body: JSON.stringify(requestBody),
        ...options,
    });

    const data = await response.json() as CreateAccessTokenResponse;

    return {
        account_id: data.account_id,
        access_token: data.access_token
    };
};
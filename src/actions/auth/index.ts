"use server";

import { redirect } from "next/navigation";

const authURL = "https://api.themoviedb.org/4/auth";

type CreateTokenResponse = {
    status_message: string
    request_token: string
    success: boolean //Defaults to true
    status_code: number //Defaults to 0
}

type CreateAccessTokenResponse = {
    account_id: string
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

export const createRequestToken = async () => {
    const url = authURL + "/request_token";

    const response = await fetch(url, {
        body: JSON.stringify({ "redirect_to": "http://localhost:3000/auth/access/approved" }),
        ...options
    });

    const data = await response.json() as CreateTokenResponse;

    const requestToken = data.request_token;

    return requestToken;
};

export const requestUserApproval = async (requestToken: string) => {

    redirect(`https://www.themoviedb.org/auth/access?request_token=${requestToken}`);
}

export const createAccessToken = async (requestToken: string) => {

    const url = authURL + "/access_token";
    const requestBody = { "request_token": requestToken };
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
"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { baseURL } from "@/config";

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

export async function createRequestToken() {
    /* Here is the start of the authorization process */
    const url = authURL + "/request_token";

    /* Redirect to this url after the user approve the access */
    const requestBody = { "redirect_to": `${baseURL()}/api/auth/access/approved` };

    const response = await fetch(url, {
        body: JSON.stringify(requestBody),
        ...options
    });

    const data = await response.json() as CreateTokenResponse;
    const requestToken = data.request_token;

    /* Save the request token as a cookie to be accessed by 'createAccessToken' */
    const cookieStore = await cookies();
    cookieStore.set("token", requestToken);

    redirect(`https://www.themoviedb.org/auth/access?request_token=${requestToken}`);
};

export async function createAccessToken() {
    /* After redirected to '/api/auth/access/approved' get the 'accessToken' and */
    const url = authURL + "/access_token";

    /* Access the request token to be sent along with the request */
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
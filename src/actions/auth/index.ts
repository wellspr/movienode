"use server";

import { redirect } from "next/navigation";
import { baseURL } from "@/config";
import { cookies } from "next/headers";

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

export async function createRequestToken(returnTo: string) {
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
    await setRequestToken(requestToken);

    /* Save the the current path to redirect back to in the '/auth/access/approved' */
    const cookiestore = await cookies();
    if (!cookiestore.has('returningPath')) {
        cookiestore.set('returningPath', returnTo); 
    }

    redirect(`https://www.themoviedb.org/auth/access?request_token=${requestToken}`);
};

export async function createAccessToken() {
    /* After redirected to '/api/auth/access/approved' get the 'accessToken' and */
    const url = authURL + "/access_token";

    /* Access the request token to be sent along with the request */
    const requestToken = await getRequestToken();
    
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

/* Functions to manage request token cookie */
export const setRequestToken = async (token: string) => {
    const cookieStore = await cookies();
    cookieStore.set("token", token);
};

export const getRequestToken = async () => {
    const cookieStore = await cookies();
    const requestToken = cookieStore.get("token")?.value;
    cookieStore.delete('token');
    return requestToken;
};
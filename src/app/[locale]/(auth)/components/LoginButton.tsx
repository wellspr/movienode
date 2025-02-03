"use client";

import { createRequestToken, requestUserApproval } from "@/actions/auth";
import { authStore } from "../authStore";

export const LoginButton = () => {

    const authorizeUser = async () => {

        const requestToken = await createRequestToken();

        authStore.setItem("token", requestToken);

        requestUserApproval(requestToken);
    }

    return (
        <button onClick={authorizeUser}>
            Enter
        </button>
    );
};
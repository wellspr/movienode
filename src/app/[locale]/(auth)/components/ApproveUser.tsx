"use client";

import { createAccessToken } from "@/actions/auth";
import { authStore } from "../authStore";
import { redirect } from "next/navigation";
import { createSession } from "@/actions/user";

export const ApproveUser = () => {

    authStore.getItem("token")
        .then(token => {

            console.log(token);

            createAccessToken(token as string)
                .then(userData => {
                    authStore.removeItem("token")
                        .then(() => {
                            authStore.setItem("userData", userData)
                                .then(() => {
                                    createSession(userData.access_token)
                                    .then(sessionData => {
                                        authStore.setItem("sessionId", sessionData.session_id);
                                    })
                                    .catch(err => console.log(err));
                                    
                                    redirect("/");
                                })
                        });
                })
                .catch(err => console.log(err));

        })
        .catch(err => console.log(err));

    return null;
};
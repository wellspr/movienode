"use client";

import { getGravatarDetails, getUserDetails, UserDetails } from "@/actions/user";
import { authStore, UserData } from "@/app/[locale]/(auth)/authStore";
import Image from "next/image";
import { useEffect, useState } from "react";

export const UserProfile = () => {

    const [user, setUser] = useState<UserDetails>();

    useEffect(() => {
        authStore.getItem("userData")
            .then(data => {
                //console.log("1)", data);
                const userData = data as UserData;
                const { account_id } = userData;

                authStore.getItem("sessionId")
                    .then(data => {
                        const sessionId = data as string;
                        console.log(data, userData);

                        getUserDetails(account_id, sessionId)
                            .then(user => {
                                console.log(user);
                                
                                getGravatarDetails(user.avatar.gravatar.hash)
                                    .then(r => {
                                        console.log(r);
                                    });
                                setUser(user);
                            })

                    });
            });
    }, []);

    return (
        <div className="user-profile">
            <h2 className="user-profile__heading">{ user?.name ? `Hello ${user.name}` : "Profile"}</h2>

            <div className="user-profile__image">
                {
                    user && user.avatar &&
                    <Image
                        src={`https://gravatar.com/avatar/${user.avatar.gravatar.hash}?s=300`}
                        alt="avatar image"
                        width={200}
                        height={200}
                    />
                }
            </div>

            <p className="user-profile__text">Logged in as {user?.username}</p>
        </div>
    );
};


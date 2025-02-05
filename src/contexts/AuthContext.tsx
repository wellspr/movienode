"use client";

import { getAuthenticationDetails, getUserDetails, UserDetails } from "@/actions/user";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    user: UserDetails | null,
    setUser: React.Dispatch<React.SetStateAction<UserDetails | null>>
}

const defaultValue: AuthContextType = {
    setUser: () => {},
    user: null,
};

const Context = createContext(defaultValue);

export const AuthContext = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<UserDetails | null>(null);

    useEffect(() => {
        console.log("Auth Widget Effect...");
        getAuthenticationDetails()
            .then(r => {
                console.log(r);
                if (r) {
                    const { accountId, sessionId } = r;

                    getUserDetails(accountId, sessionId)
                        .then(r => {
                            console.log("USER: ", r);
                            if (r) {
                                setUser(r);
                            }
                        })
                }
            })
    }, []);

    return (
        <Context.Provider value={{ user, setUser }}>
            {children}
        </Context.Provider>
    );
};

export const useAuth = () => useContext(Context);
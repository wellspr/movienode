"use client";

import { getAuthenticationDetails, getUserDetails, UserDetails } from "@/actions/user";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    user: UserDetails | null,
    setUser: React.Dispatch<React.SetStateAction<UserDetails | null>>
}

const defaultValue: AuthContextType = {
    setUser: () => { },
    user: null,
};

const Context = createContext(defaultValue);

export const AuthContext = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<UserDetails | null>(null);

    useEffect(() => {
        console.log("Auth Widget Effect...");
         
        getAuthenticationDetails()
            .then(r => {
                console.log("Auth details: ", r);
                
                if (r) {
                    const { accountId, sessionId } = r;

                    if (accountId && sessionId) {
                        getUserDetails(accountId, sessionId)
                            .then(r => {
                                console.log("USER: ", r);
                                if (r && r.id) {
                                    setUser(r);
                                } else {
                                    setUser(null);
                                }
                            })
                    }
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
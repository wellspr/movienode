"use client";

import { destroySession } from "@/actions/session";
import { useAuth } from "@/contexts/AuthContext";
import { useCallback } from "react";

export const LogoutButton = () => {

    const { setUser } = useAuth();

    const logoutUser = useCallback(() => {
        destroySession()
            .then(() => {
                setUser(null);
            })
    }, [setUser]);

    return (
        <button className="logout-button" onClick={logoutUser}>
            Disconnect from TMDB
        </button>
    );
};
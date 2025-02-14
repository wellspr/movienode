"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { LoginButton } from "./LoginButton";

export const NoSession = () => {

    const { setUser } = useAuth();

    useEffect(() => {
        setUser(null);
    }, [setUser]);

    return (
        <div className="no-session">
            <p className="no-session__text">Entre com sua conta TMDB para visualizar suas recomendações, seus favoritos e suas listas.</p>

            <LoginButton className="button no-session__button"/>
        </div>
    );
};
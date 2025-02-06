"use client";

import Image from "next/image";
import { LoginButton } from "./LoginButton";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { useAuth } from "@/contexts/AuthContext";

export const AuthWidget = ({ locale }: { locale: Locale }) => {

    const { user } = useAuth();

    if (!user) {
        return (
            <div className="auth-widget">
                <LoginButton />
            </div>
        ); /* In fact, redirect to login or to a guest page... */
    }

    return (
        <div className="auth-widget">
            <Link href={"/user/profile"} locale={locale}>
                <Image
                    src={`https://gravatar.com/avatar/${user.avatar.gravatar.hash}?s=300`}
                    alt="avatar image"
                    width={30}
                    height={30}
                />
            </Link>
        </div>
    );
};
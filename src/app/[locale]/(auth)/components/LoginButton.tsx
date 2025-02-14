"use client"

import { createRequestToken } from "@/actions/auth";
import { usePathname } from "@/i18n/routing";

export const LoginButton = ({
    className,
    label,
}: {
    className?: string
    label?: string
}) => {

    const path = usePathname();

    return (
        <button
            className={className ? className : "auth-login-button"}
            onClick={() => createRequestToken(path)}
        >
            {label ? label : "Enter"}
        </button>
    );
};
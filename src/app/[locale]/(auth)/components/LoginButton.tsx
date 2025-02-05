import { createRequestToken } from "@/actions/auth";

export const LoginButton = () => {
    return (
        <button className="auth-login-button" onClick={createRequestToken}>
            Enter
        </button>
    );
};
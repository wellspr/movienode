import { LoginButton } from "@/app/[locale]/(auth)/components/LoginButton";

export default async function Page() {
    return (
        <div className="login">
            <div>Conecte a sua conta TMDB</div>

            <LoginButton className="button" />
        </div>
    );
}
import { UserProfile } from "../../components/UserProfile";
import { getUserDetails } from "@/actions/user";
import { getSession } from "@/actions/session";
import { getLists } from "@/actions/user/lists";
import { getLocale } from "next-intl/server";
import { Locale } from "@/i18n/types";
import { LoginButton } from "@/app/[locale]/(auth)/components/LoginButton";

export default async function Page() {

    const session = await getSession();

    const locale = await getLocale() as Locale;

    if (!session) {
        return (
            <div className="user-profile user-profile__disconnected">
                <h2 className="user-profile__disconnected__heading">Login</h2>

                <p className="user-profile__disconnected__text">Conecte sua conta do TMDB</p>

                <LoginButton
                    className="user-profile__disconnected__button"
                    label="Entrar con TMDB"
                />
            </div>
        ); /* In fact, redirect to login or to a guest page... */
    }

    const { accountId, sessionId } = session;

    const user = await getUserDetails(accountId, sessionId);

    const lists = await getLists(accountId, locale);

    return <UserProfile user={user} lists={lists} />;
}
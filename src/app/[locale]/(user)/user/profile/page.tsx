import { UserProfile } from "../../components/UserProfile";
import { getAuthenticationDetails, getUserDetails } from "@/actions/user";
import { createRequestToken } from "@/actions/auth";

export default async function Page() {
    
    const session = await getAuthenticationDetails();

    if (!session)
        return (
            <div className="user-profile user-profile__disconnected">
                <h2 className="user-profile__disconnected__heading">Login</h2>

                <p className="user-profile__disconnected__text">Conecte sua conta do TMDB</p>

                <button className="user-profile__disconnected__button" onClick={createRequestToken}>
                    Entrar con TMDB
                </button>
            </div>
        ); /* In fact, redirect to login or to a guest page... */

    const { accountId, sessionId } = session;

    const user = await getUserDetails(accountId, sessionId);

    return <UserProfile user={user} />;
}
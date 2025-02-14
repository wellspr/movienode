import { getSession } from "@/actions/session";
import { NoSession } from "../(auth)/components/NoSession";

export default async function Layout({ children }: { children: React.ReactNode }) {

    const session = await getSession();

    return (
        <>
            {!session && <NoSession />}
            {children}
        </>
    );
}
import Link from "next/link";

export const LogoutButton = () => {
    return (
        <Link className="logout-button" href={"/api/auth/logout"}>
            Disconnect from TMDB
        </Link>
    );
};
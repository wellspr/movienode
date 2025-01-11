import { appName } from "@/config";
import { IconBrandGithubFilled } from "@tabler/icons-react";
import Link from "next/link";

export const Footer = () => {

    return (
        <footer className="footer">
            <div className="footer__main">
                <div className="footer__main__copy">
                    <p>{appName} - &copy;2025</p>
                </div>
                <div className="footer__main__links">
                    <Link href={"https://github.com/wellspr/movieflix"} target="_blank">
                        <IconBrandGithubFilled />
                    </Link>
                </div>
                <div className="footer__main__powered-by">
                    Powered by <Link href="https://www.themoviedb.org/" target="_blank">TMDB</Link>
                </div>
            </div>
        </footer>
    );
};
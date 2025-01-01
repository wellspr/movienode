import { navLinks } from "@/config";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { useParams } from "next/navigation";

export const HeaderNav = () => {

    const params = useParams();
    const locale = params.locale as Locale;

    return (
        <nav className="nav">
            {
                navLinks.map(link => {
                    return (
                        <Link className="link" key={link.id} locale={locale} href={link.url}>
                            {link.name}
                        </Link>
                    );
                })
            }
        </nav>
    );
};
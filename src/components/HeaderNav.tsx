import { navLinks } from "@/config";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { useTranslations } from "next-intl";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

export const HeaderNav = () => {

    const params = useParams();
    const locale = params.locale as Locale;

    const t = useTranslations("HeaderNav");

    const segment = useSelectedLayoutSegment();


    return (
        <nav className="nav">
            {
                navLinks.map(link => {
                    return (
                        <Link className={segment === link.translation ? "link--active" : "link"}
                            key={link.id} locale={locale} href={link.url}>
                            {t(`${link.translation}`)}
                        </Link>
                    );
                })
            }
        </nav>
    );
};
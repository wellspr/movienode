import { baseImageUrl } from "@/config";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { IconMovie } from "@tabler/icons-react";
import Image from "next/image";

export const Poster = ({
    baseClassName,
    href,
    locale,
    posterPath,
    placeholder
}: {
    locale: Locale
    href: string
    baseClassName: string
    posterPath: string
    placeholder: string
}) => {
    return (
        <Link
            locale={locale}
            href={href}
            className={`${baseClassName}__list__item__link`}
            draggable={false}
        >
            <li className={`${baseClassName}__list__item`}>
                <div className={`${baseClassName}__list__item__image`}>
                    {
                        posterPath ?
                            <Image
                                src={baseImageUrl(500) + posterPath}
                                alt={placeholder}
                                fill
                                draggable={false}
                            /> :
                            <div className={`${baseClassName}__list__item__image__placeholder`}>
                                <div className={`${baseClassName}__list__item__image__placeholder__title`}>
                                    {placeholder}
                                </div>
                                <IconMovie size={40} />
                            </div>
                    }
                </div>
            </li>
        </Link>
    );
};

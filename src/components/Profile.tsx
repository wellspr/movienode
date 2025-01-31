import { Link } from "@/i18n/routing"
import { Locale } from "@/i18n/types"
import Image from "next/image"
import { baseImageUrl } from "@/config"
import { IconUser } from "@tabler/icons-react"
import { PersonDetailsType, PersonType } from "@/types"

export const Profile = ({
    baseClassName,
    locale,
    href,
    result,
}: {
    baseClassName: string
    locale: Locale
    href: string
    result: PersonType | PersonDetailsType
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
                        result.profile_path ?
                            <Image
                                src={baseImageUrl(500) + result.profile_path}
                                alt={result.name}
                                fill
                                draggable={false}
                            /> :
                            <div className={`${baseClassName}__list__item__image__placeholder`}>
                                <div className={`${baseClassName}__list__item__image__placeholder__title`}>
                                    {result.name}
                                </div>
                                <IconUser size={40} />
                            </div>
                    }
                </div>
                <div className={`${baseClassName}__list__item__info`}>
                    <h3>{result.name}</h3>
                    <h4>{ result.known_for_department }</h4>
                </div>
            </li>
        </Link>
    );
};
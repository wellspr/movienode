import { baseImageUrl } from "@/config";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { MovieDetailsType, WatchProvidersMod, WatchProvidersType } from "@/types";
import { IconExternalLink } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const WatchProviders = ({
    locale,
    movie,
    className
}: {
    locale: Locale,
    movie: MovieDetailsType,
    className: string,
}) => {

    const t = useTranslations("Movie.WatchProviders");

    if (!movie.watch_providers) return null;
    if (!movie.watch_providers.results) return null;
    if (!movie.watch_providers.results[locale.split('-')[1]]) return null;

    const watchProviders = movie.watch_providers as WatchProvidersType;
    const watchProvidersOptions = movie.watch_providers.results[locale.split('-')[1]];

    return (
        <div className="watch-providers">
            <div className={className ? `${className}__watch-now` : "watch-now"}>
                <h4>{t('heading')}</h4>
                <p>
                    {t('info.line_1')} {" "}
                    <Link className="link inline-link" href="https://www.justwatch.com/" target="_blank">
                        JustWatch
                        <IconExternalLink size={20} />
                    </Link>
                    {". "}
                    {t('info.line_2')}.
                </p>


                <div className={className ? `${className}__watch-now__options` : "watch-now__options"}>
                    {
                        Object.entries(watchProvidersOptions).map(([key, value]) => {
                            if (key !== 'link') {
                                return (
                                    <div key={key}
                                        className={
                                            className ?
                                                `${className}__watch-now__options__option` :
                                                "watch-now__options__option"}>
                                        <h5>{t(`watch_now.${key as WatchProvidersMod}`)}</h5>
                                        <ul className={
                                            className ?
                                                `${className}__watch-now__options__option__providers` :
                                                "watch-now__options__option__providers"
                                        }>
                                            {
                                                Object.values(value).map((provider, index) => (
                                                    <li key={index}>
                                                        <Link href={`${watchProviders?.results[locale.split('-')[1]].link}`} target="_blank" className="link">
                                                            <Image
                                                                src={baseImageUrl() + provider.logo_path}
                                                                alt={provider.provider_name}
                                                                width={50}
                                                                height={50}
                                                            />
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        })

                    }
                </div>
            </div>
        </div>
    );
}
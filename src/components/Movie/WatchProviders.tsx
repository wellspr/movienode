import { baseImageUrl } from "@/config";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { WatchProvidersMod, WatchProvidersType } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const WatchProviders = ({
    locale,
    watchProviders
}: {
    locale: Locale,
    watchProviders: WatchProvidersType
}) => {

    const t = useTranslations("Movie.WatchProviders");

    return (
        <div className="watch-providers">
            <div className="movie-info__watch-now">
                <h4>{t('heading')}</h4>
                <p>{t('info')}</p>

                <div className="movie-info__watch-now__options">
                    {
                        Object.entries(watchProviders.results[locale.split('-')[1]]).map(([key, value]) => {
                            if (key !== 'link') {
                                return (
                                    <div className="movie-info__watch-now__options__option" key={key}>
                                        <h5>{t(`watch_now.${key as WatchProvidersMod}`)}</h5>
                                        <ul className="movie-info__watch-now__options__option__providers">
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
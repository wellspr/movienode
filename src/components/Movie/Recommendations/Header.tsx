"use client";

import { MovieDetailsType } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { baseImageUrl } from "@/config";
import { Link } from "@/i18n/routing";

export const Header = ({ referenceMovie }: { referenceMovie: MovieDetailsType }) => {

    const t = useTranslations("Movie");

    return (
        <div className="recommendations__header">
            <div className="recommendations__header__reference">
                <h2 className="recommendations__header__reference__movie-title">
                    <Link href={`/movie/${referenceMovie.id}`}>
                        {referenceMovie.title}
                    </Link>
                </h2>
                <div className="recommendations__header__reference__poster">
                    <Image
                        src={baseImageUrl(500) + referenceMovie.poster_path}
                        alt={referenceMovie.title}
                        sizes="100vw, 50rem, 100%"
                        fill
                    />
                </div>
            </div>
            <h3 className="recommendations__header__title">{t('recommendations')}</h3>
        </div>
    );
};
"use client";

import { MovieDetailsType } from "@/types"
import { IconCalendar } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export const ReleaseDate = ({ movie, className }: { movie: MovieDetailsType, className: string }) => {

    const t = useTranslations("Movie");
    const { locale } = useParams();

    if (movie.release_date) {
        return (
            /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat */
            <div className={className ? `${className}__release-date` : "release-date"}>
                <IconCalendar size={18} />
                {
                    movie.status.toLowerCase() === "released" ?
                        <p>{movie.release_date.split('-')[0]}</p> :
                        <p>{t('release_date')} : {new Intl.DateTimeFormat(locale).format(new Date(movie.release_date))}</p>
                }
            </div>
        )
    }
};
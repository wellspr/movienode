"use client";

import { TVSeriesDetailsType } from "@/types"
import { IconCalendar } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export const ReleaseDate = ({ series, className }: { series: TVSeriesDetailsType, className: string }) => {

    const t = useTranslations("Movie");
    const { locale } = useParams();

    if (series.first_air_date) {
        return (
            /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat */
            <div className={className ? `${className}__release-date` : "release-date"}>
                <IconCalendar size={18} />
                {
                    series.status.toLowerCase() === "returning series" ?
                        <p>{series.first_air_date.split('-')[0]}</p> :
                        <p>{t('release_date')} : {new Intl.DateTimeFormat(locale).format(new Date(series.first_air_date))}</p>
                }
            </div>
        )
    }
};
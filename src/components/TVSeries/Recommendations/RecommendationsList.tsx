"use client";

import { Link } from "@/i18n/routing";
import { TVSeriesDetailsType } from "@/types";
import { List } from "../List";
import { useTranslations } from "next-intl";
import { paths } from "@/config";
import { useScroll } from "@/hooks/useScroll";
import { ListNavigationButtons } from "@/components/ListNavigationButtons";

export const RecommendationsList = ({
    series,
}: {
    series: TVSeriesDetailsType
}) => {

    const t = useTranslations("Movie");

    const scroll = useScroll();

    if (!series.recommendations) return null;
    if (!series.recommendations.results) return null;
    if (series.recommendations.results.length === 0) return null;

    return (
        <div className={`movie-recommendations`}>
            <div className={`movie-recommendations__header`}>
                <h4>{t('recommendations')}</h4>
                <ListNavigationButtons scroll={scroll} />
            </div>

            <List
                results={series.recommendations.results}
                scroll={scroll}
                appendItem={
                    <Link
                        className="link"
                        href={paths.movie_recommendations(String(series.id))}>
                        More
                    </Link>
                }
            />
        </div>
    );
};
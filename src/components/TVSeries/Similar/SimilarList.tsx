"use client";

import { Link } from "@/i18n/routing";
import { TVSeriesDetailsType } from "@/types";
import { useTranslations } from "next-intl";
import { List } from "../List";
import { paths } from "@/config";
import { useScroll } from "@/hooks/useScroll";
import { ListNavigationButtons } from "@/components/ListNavigationButtons";

export const SimilarList = ({
    series,
}: {
    series: TVSeriesDetailsType
}) => {

    const t = useTranslations("Movie");

    const scroll = useScroll();

    if (!series.similar) return null;
    if (!series.similar.results) return null;
    if (series.similar.results.length === 0) return null;

    return (
        <div className={`movie-similar`}>
            <div className={`movie-similar__header`}>
                <h4>{t('similar')}</h4>
                <ListNavigationButtons scroll={scroll} />
            </div>

            <List
                results={series.similar.results}
                scroll={scroll}
                appendItem={
                    <Link
                        className="link"
                        href={paths.movie_similar(String(series.id))}>
                        More
                    </Link>
                }
            />
        </div>
    );
};
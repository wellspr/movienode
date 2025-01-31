"use client";

import { Link } from "@/i18n/routing";
import { MovieDetailsType } from "@/types";
import { List } from "../List";
import { useTranslations } from "next-intl";
import { paths } from "@/config";
import { useScroll } from "@/hooks/useScroll";
import { ListNavigationButtons } from "@/components/ListNavigationButtons";


export const RecommendationsList = ({
    movie,
}: {
    movie: MovieDetailsType
}) => {

    const t = useTranslations("Movie");

    const scroll = useScroll();

    if (!movie.recommendations) return null;
    if (!movie.recommendations.results) return null;
    if (movie.recommendations.results.length === 0) return null;

    return (
        <div className={`movie-recommendations`}>
            <div className={`movie-recommendations__header`}>
                <h4>{t('recommendations')}</h4>
                <ListNavigationButtons scroll={scroll} />
            </div>

            <List
                results={movie.recommendations.results}
                scroll={scroll}
                appendItem={
                    <Link
                        className="link"
                        href={paths.movie_recommendations(String(movie.id))}>
                        More
                    </Link>
                }
            />
        </div>
    );
};
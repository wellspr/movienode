"use client";

import { Link } from "@/i18n/routing";
import { MovieDetailsType } from "@/types";
import { useTranslations } from "next-intl";
import { List } from "../List";
import { paths } from "@/config";
import { useScroll } from "@/hooks/useScroll";
import { ListNavigationButtons } from "@/components/ListNavigationButtons";


export const SimilarList = ({
    movie,
}: {
    movie: MovieDetailsType
}) => {

    const t = useTranslations("Movie");

    const scroll = useScroll();

    if (!movie.similar) return null;
    if (!movie.similar.results) return null;
    if (movie.similar.results.length === 0) return null;

    return (
        <div className={`movie-similar`}>
            <div className={`movie-similar__header`}>
                <h4>{t('similar')}</h4>
                <ListNavigationButtons scroll={scroll} />
            </div>

            <List
                results={movie.similar.results}
                scroll={scroll}
                appendItem={
                    <Link className="link" href={paths.movie_similar(String(movie.id))}>
                        More
                    </Link>
                }
            />
        </div>
    );
};
"use client";

import { useScroll } from "@/hooks/useScroll";
import { MovieCategoryType, MovieType } from "@/types";
import { ListNavigationButtons } from "../ListNavigationButtons";
import { navLinks } from "@/config";
import { Link } from "@/i18n/routing";
import { List } from "../Movie/List";
import { useTranslations } from "next-intl";

export const MovieList = ({ results, category }: { results: MovieType[], category: MovieCategoryType }) => {

    const scroll = useScroll();

    const t = useTranslations("Homepage.movies");

    let href = "";

    if (navLinks.movies.map(movie => movie.translation).includes(category)) {
        href = navLinks.movies.find(movie => movie.translation === category)?.url as string;
    } else {
        href = `/user/${category}/movie`;
    }

    return (
        <div className="banner">
            <div className="banner__header">
                <h4>{
                    t(`${category}`)
                }</h4>
                <ListNavigationButtons scroll={scroll} />
            </div>
            <List
                results={results}
                scroll={scroll}
                appendItem={
                    <Link href={href}>More</Link>
                }
            />
        </div>
    );
};
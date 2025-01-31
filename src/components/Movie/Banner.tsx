"use client";

import { useScroll } from "@/hooks/useScroll";
import { List } from "./List";
import { MovieCategoryType, MovieType } from "@/types";
import { ListNavigationButtons } from "../ListNavigationButtons";
import { navLinks } from "@/config";
import { Link } from "@/i18n/routing";

export const Banner = ({ results, category }: { results: MovieType[], category: MovieCategoryType }) => {

    const scroll = useScroll();

    const href = navLinks.movies.find(movie => movie.translation === category)?.url as string;

    return (
        <div className="banner">
            <div className="banner__header">
                <h4>{
                    navLinks.movies.find(movie => movie.translation === category)?.name
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
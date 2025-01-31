"use client";

import { useScroll } from "@/hooks/useScroll";
import { List } from "./List";
import { TVSeriesCategoryType, TVSeriesType } from "@/types";
import { ListNavigationButtons } from "../ListNavigationButtons";
import { navLinks } from "@/config";
import { Link } from "@/i18n/routing";

export const Banner = ({ results, category }: { results: TVSeriesType[], category: TVSeriesCategoryType }) => {

    const scroll = useScroll();

    const href = navLinks.tv.find(tv => tv.translation === category)?.url as string;

    return (
        <div className="banner">
            <div className="banner__header">
                <h4>{
                    navLinks.tv.find(tv => tv.translation === category)?.name
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
"use client";

import { useScroll } from "@/hooks/useScroll";
import { TVSeriesCategoryType, TVSeriesType } from "@/types";
import { ListNavigationButtons } from "../ListNavigationButtons";
import { navLinks } from "@/config";
import { Link } from "@/i18n/routing";
import { List } from "../TVSeries/List";
import { useTranslations } from "next-intl";

export const TVSeriesList = ({ results, category }: { results: TVSeriesType[], category: TVSeriesCategoryType }) => {

    const scroll = useScroll();

    const t = useTranslations("Homepage.tv");

    let href = "";

    if (navLinks.tv.map(tv => tv.translation).includes(category)) {
        href = navLinks.tv.find(tv => tv.translation === category)?.url as string;
    } else {
        href = `/user/${category}/tv`;
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
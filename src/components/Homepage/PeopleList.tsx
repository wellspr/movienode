"use client";

import { useScroll } from "@/hooks/useScroll";
import { ListNavigationButtons } from "../ListNavigationButtons";
import { PeopleCategoryType, PersonType } from "@/types";
import { Link } from "@/i18n/routing";
import { List } from "../Person/List";
import { useTranslations } from "next-intl";

export const PeopleList = ({ results, category }: { results: PersonType[], category: PeopleCategoryType }) => {

    const scroll = useScroll();

    const t = useTranslations("Homepage.people")

    const href = `/person/list/${category}`;

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
}
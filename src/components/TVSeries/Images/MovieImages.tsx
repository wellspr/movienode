"use client";

import { TVSeriesDetailsType } from "@/types";
import { Backdrops } from "./Backdrops";
import { useTranslations } from "next-intl";
import { useScroll } from "@/hooks/useScroll";
import { ListNavigationButtons } from "@/components/ListNavigationButtons";

export const MovieImages = ({ series }: { series: TVSeriesDetailsType }) => {

    const t = useTranslations("Movie");

    const scroll = useScroll();

    if (!series.images) return null;
    if (series.images.backdrops.length === 0) return null;

    return (
        <div className="movie-images">
            <div className="movie-images__header">
                <h4>{t("image_gallery")}</h4>
                <ListNavigationButtons scroll={scroll} />
            </div>
            <Backdrops backdrops={series.images.backdrops} scroll={scroll} />
        </div>
    );
};
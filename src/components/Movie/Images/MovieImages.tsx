"use client";

import { MovieDetailsType } from "@/types";
import { Backdrops } from "./Backdrops";
import { useTranslations } from "next-intl";
import { useScroll } from "@/hooks/useScroll";
import { ListNavigationButtons } from "@/components/ListNavigationButtons";

export const MovieImages = ({ movie }: { movie: MovieDetailsType }) => {

    const t = useTranslations("Movie");

    const scroll = useScroll();

    if (!movie.images) return null;
    if (movie.images.backdrops.length === 0) return null;

    return (
        <div className="movie-images">
            <div className="movie-images__header">
                <h4>{t("image_gallery")}</h4>
                <ListNavigationButtons scroll={scroll} />
            </div>
            <Backdrops backdrops={movie.images.backdrops} scroll={scroll} />
        </div>
    );
};
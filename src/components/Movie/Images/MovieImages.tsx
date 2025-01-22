"use client";

import { MovieDetailsType } from "@/types";
import { Backdrops } from "./Backdrops";
import { useTranslations } from "next-intl";

export const MovieImages = ({movie}:{movie: MovieDetailsType}) => {

    const t = useTranslations("Movie");

    if (!movie.images) return null;
    if (movie.images.backdrops.length === 0) return null;

    return (
        <div className="movie-images">
            <h4>{t("image_gallery")}</h4>
            <Backdrops backdrops={movie.images.backdrops} />
        </div>
    );
};
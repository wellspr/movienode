import { z } from "zod";

export const TMDBIdSchema = z.string().regex(/^\d+$/, {
    message: "Invalid TMDB ID",
});

export const TMDBSeasonNumberSchema = z.string().regex(/^(0|[1-9][0-9]?)$/, {
    message: "Invalid TMDB season number",
});

export const TMDBEpisodeNumberSchema = z.string().regex(/^(0|[1-9][0-9]?)$/, {
    message: "Invalid TMDB episode number",
})

export const TMDBMovieCategorySchema = z.enum(
    [
        "popular",
        "top_rated",
        "upcoming",
        "now_playing",
        "trending",
        "recommendations",
        "favorites",
        "watchlist",
    ],
    { message: "Invalid TMDB movie category" },
);

export const TMDBTVCategorySchema = z.enum(
    [
        "airing_today",
        "on_the_air",
        "popular",
        "top_rated",
        "trending",
        "recommendations",
        "favorites",
        "watchlist",
    ],
    { message: "Invalid TMDB TV category" },
);

export const TMDBPeopleCategorySchema = z.enum(["popular", "trending"], {
    message: "Invalid TMDB people category",
});

export const TMDBError = (error: z.ZodError) => z.treeifyError(error);

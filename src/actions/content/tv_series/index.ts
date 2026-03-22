"use server";

import { regions } from "@/i18n/config";
import { Locale } from "@/i18n/types";

import {
    GenresType,
    GenreType,
    TVSeriesCategoryType,
    WatchProvidersType,
    TVSeriesDetailsType,
    TVSeriesCast,
    TVSeriesCrew,
    TVSeriesRecommendationsType,
    SimilarTVSeriesType,
    TVSeasonsType,
    TVEpisodesType,
    TrendingTVSeriesType,
} from "@/types";

const options: RequestInit = {
    method: "GET",
    cache: "force-cache",
    next: { revalidate: 3600 },
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
};

const baseURL = `https://api.themoviedb.org/3`;

const createQueryString = (queryParams: { key: string; value: string }[]) => {
    const query = new URLSearchParams();
    queryParams.forEach((entry) => {
        query.set(entry.key, entry.value);
    });

    return query.toString();
};

/* TV Series */
export const getTVSeries = async (
    locale: Locale,
    category: TVSeriesCategoryType,
    page: string = "1",
) => {
    try {
        const query = createQueryString([
            { key: "page", value: page },
            { key: "language", value: locale },
            { key: "region", value: regions[locale] },
        ]);

        const url = `${baseURL}/tv/${category}?${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { results, total_pages, total_results } = await response.json();

        return {
            results,
            total_pages,
            total_results,
        };
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const getTVSeriesDetails = async (locale: Locale, seriesId: string) => {
    try {
        const query = createQueryString([
            { key: "language", value: locale },
            { key: "region", value: regions[locale] },
            {
                key: "append_to_response",
                value: "images,videos,release_dates,translations",
            },
            { key: "include_image_language", value: locale + ",null" },
        ]);
        const url = `${baseURL}/tv/${seriesId}?language=${locale}&${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const tvSeriesDetails = await response.json();

        return tvSeriesDetails as TVSeriesDetailsType;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const getTVSeriesSeasonDetails = async (
    locale: Locale,
    seriesId: string,
    seasonNumber: string,
) => {
    try {
        const query = createQueryString([
            { key: "language", value: locale },
            { key: "region", value: regions[locale] },
            {
                key: "append_to_response",
                value: "images,videos,release_dates,translations",
            },
            { key: "include_image_language", value: locale + ",null" },
        ]);

        const url = `${baseURL}/tv/${seriesId}/season/${seasonNumber}?${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const season = await response.json();

        return season as TVSeasonsType;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const getTVSeriesEpisodeDetails = async (
    locale: Locale,
    seriesId: string,
    seasonNumber: string,
    episodeNumber: string,
) => {
    try {
        const query = createQueryString([
            { key: "language", value: locale },
            { key: "region", value: regions[locale] },
            {
                key: "append_to_response",
                value: "images,videos,release_dates,translations",
            },
            { key: "include_image_language", value: locale + ",null" },
        ]);

        const url = `${baseURL}/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}?${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const episode = await response.json();

        return episode as TVEpisodesType;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const getTVSeriesCredits = async (locale: Locale, seriesId: string) => {
    try {
        const query = createQueryString([{ key: "language", value: locale }]);

        const url = `${baseURL}/tv/${seriesId}/credits?${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const credits = await response.json();

        return credits as {
            id: string;
            cast: TVSeriesCast;
            crew: TVSeriesCrew;
        };
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const getTVSeriesRecommendations = async (
    locale: Locale,
    seriesId: string,
    page: string = "1",
) => {
    try {
        const query = createQueryString([
            { key: "page", value: page },
            { key: "language", value: locale },
        ]);

        const url = `${baseURL}/tv/${seriesId}/recommendations?${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const recommendations = await response.json();

        return recommendations as TVSeriesRecommendationsType;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const getSimilarTVSeries = async (
    locale: Locale,
    seriesId: string,
    page: string = "1",
) => {
    try {
        const query = createQueryString([
            { key: "page", value: page },
            { key: "language", value: locale },
        ]);

        const url = `${baseURL}/tv/${seriesId}/similar?${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const similar = await response.json();

        return similar as SimilarTVSeriesType;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const getTVSeriesGenreList = async (locale: Locale) => {
    try {
        const query = createQueryString([{ key: "language", value: locale }]);

        const url = `${baseURL}/genre/tv/list?${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { genres } = await response.json();

        return genres as GenresType;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const getTVSeriesGenre = async (locale: Locale, id: string) => {
    const genres = await getTVSeriesGenreList(locale);

    if (!genres) {
        return null;
    }

    const genre = genres.filter((genre) => {
        return String(genre.id) === id;
    })[0];

    return genre as GenreType;
};

export const getTVSeriesWatchProviders = async (
    locale: Locale,
    seriesId: string,
) => {
    try {
        const query = createQueryString([{ key: "language", value: locale }]);

        const url = `${baseURL}/tv/${seriesId}/watch/providers?${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const watchProviders = await response.json();

        return watchProviders as WatchProvidersType;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const getTrendingTVSeries = async (
    locale: Locale,
    page: string = "1",
) => {
    try {
        const query = createQueryString([
            { key: "page", value: page },
            { key: "language", value: locale },
        ]);

        const url = `${baseURL}/trending/tv/week?${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const results = await response.json();

        return results as TrendingTVSeriesType;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

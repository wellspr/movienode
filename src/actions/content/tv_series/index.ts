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
    method: 'GET',
    cache: 'force-cache',
    next: { revalidate: 3600 },
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
};

const baseURL = `https://api.themoviedb.org/3`;


/* TV Series */
export const getTVSeries = async (locale: Locale, category: TVSeriesCategoryType, page: string = '1') => {
    const url = `${baseURL}/tv/${category}?language=${locale}&region=${regions[locale]}&page=${page}`;

    const response = await fetch(url, options);

    const {
        results,
        total_pages,
        total_results,
    } = await response.json();

    return {
        results,
        total_pages,
        total_results,
    };
};

export const getTVSeriesDetails = async (locale: Locale, seriesId: string) => {
    const url = `${baseURL}/tv/${seriesId}?language=${locale}&region=${regions[locale]}&append_to_response=images,videos,release_dates,translations&include_image_language=${locale},null`;

    const response = await fetch(url, options);

    const tvSeriesDetails = await response.json();

    return tvSeriesDetails as TVSeriesDetailsType;
};

export const getTVSeriesSeasonDetails = async (locale: Locale, seriesId: string, seasonNumber: string) => {
    const url = `${baseURL}/tv/${seriesId}/season/${seasonNumber}?language=${locale}&region=${regions[locale]}&append_to_response=images,videos,release_dates,translations&include_image_language=${locale},null`;

    const response = await fetch(url, options);

    const season = await response.json();

    return season as TVSeasonsType;
};

export const getTVSeriesEpisodeDetails = async (locale: Locale, seriesId: string, seasonNumber: string, episodeNumber: string) => {
    const url = `${baseURL}/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}?language=${locale}&region=${regions[locale]}&append_to_response=images,videos,release_dates,translations&include_image_language=${locale},null`;

    const response = await fetch(url, options);

    const episode = await response.json();

    return episode as TVEpisodesType;
};

export const getTVSeriesCredits = async (locale: Locale, seriesId: string) => {
    const url = `${baseURL}/tv/${seriesId}/credits?language=${locale}`;

    const response = await fetch(url, options);

    const credits = await response.json();

    return credits as { id: string, cast: TVSeriesCast, crew: TVSeriesCrew };
};

export const getTVSeriesRecommendations = async (locale: Locale, seriesId: string, page: string = "1") => {

    const url = `${baseURL}/tv/${seriesId}/recommendations?language=${locale}&page=${page}`;

    const response = await fetch(url, options);

    const recommendations = await response.json();

    return recommendations as TVSeriesRecommendationsType;
};

export const getSimilarTVSeries = async (locale: Locale, seriesId: string, page: string = '1') => {
    const url = `${baseURL}/tv/${seriesId}/similar?language=${locale}&page=${page}`;

    const response = await fetch(url, options);

    const similar = await response.json();

    return similar as SimilarTVSeriesType;
};

export const getTVSeriesGenreList = async (locale: Locale) => {
    const url = `${baseURL}/genre/tv/list?language=${locale}`;

    const response = await fetch(url, options);

    const { genres } = await response.json();

    return genres as GenresType;
};

export const getTVSeriesGenre = async (locale: Locale, id: string) => {

    const genres = await getTVSeriesGenreList(locale);

    const genre = genres.filter(genre => {
        return String(genre.id) === id;
    })[0];

    return genre as GenreType;
};

export const getTVSeriesWatchProviders = async (locale: Locale, seriesId: string) => {
    const url = `${baseURL}/tv/${seriesId}/watch/providers?language=${locale}`;

    const response = await fetch(url, options);

    const watchProviders = await response.json();

    return watchProviders as WatchProvidersType;
};

export const getTrendingTVSeries = async (locale: Locale, page: string = '1') => {

	const url = `${baseURL}/trending/tv/week?language=${locale}&page=${page}`;

	const response = await fetch(url, options);

	const results = await response.json();

	return results as TrendingTVSeriesType;
};
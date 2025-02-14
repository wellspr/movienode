"use server";

import { regions } from "@/i18n/config";
import { Locale } from "@/i18n/types";

import {
	MovieCategoryType,
	MovieCast,
	MovieCrew,
	MovieDetailsType,
	GenresType,
	GenreType,
	MovieRecommendationsType,
	SimilarMoviesType,
    ReleaseDatesType,
    WatchProvidersType,
    TrendingMoviesType,
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

/* Movies */
export const getMovies = async (locale: Locale, category: MovieCategoryType, page: string = '1') => {
    const url = `${baseURL}/movie/${category}?language=${locale}&region=${regions[locale]}&page=${page}`;

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

export const getMovieDetails = async (locale: Locale, movieId: string) => {
    const url = `${baseURL}/movie/${movieId}?language=${locale}&region=${regions[locale]}&append_to_response=images,videos,release_dates,translations&include_image_language=${locale},null`;

    const response = await fetch(url, options);

    const movieDetails = await response.json();

    return movieDetails as MovieDetailsType;
};

export const getMovieCredits = async (locale: Locale, movieId: string) => {
    const url = `${baseURL}/movie/${movieId}/credits?language=${locale}`;

    const response = await fetch(url, options);

    const movieCredits = await response.json();

    return movieCredits as { id: string, cast: MovieCast, crew: MovieCrew };
};

export const getMovieRecommendations = async (locale: Locale, movieId: string, page: string = '1') => {

    const url = `${baseURL}/movie/${movieId}/recommendations?language=${locale}&page=${page}`;

    const response = await fetch(url, options);

    const movieRecommendations = await response.json();

    return movieRecommendations as MovieRecommendationsType;
};

export const getSimilarMovies = async (locale: Locale, movieId: string, page: string = '1') => {
    const url = `${baseURL}/movie/${movieId}/similar?language=${locale}&page=${page}`;

    const response = await fetch(url, options);

    const similarMovies = await response.json();

    return similarMovies as SimilarMoviesType;
};

export const getMovieGenreList = async (locale: Locale) => {
    const url = `${baseURL}/genre/movie/list?language=${locale}`;

    const response = await fetch(url, options);

    const { genres } = await response.json();

    return genres as GenresType;
};

export const getMovieGenre = async (locale: Locale, id: string) => {

    const genres = await getMovieGenreList(locale);

    const genre = genres.filter(genre => {
        return String(genre.id) === id;
    })[0];

    return genre as GenreType;
};

export const getReleaseDates = async (locale: Locale, movieId: string) => {
    const url = `${baseURL}/movie/${movieId}/release_dates?language=${locale}`;

    const response = await fetch(url, options);

    const releaseDates = await response.json();

    return releaseDates as ReleaseDatesType;
}

export const getWatchProviders = async (locale: Locale, movieId: string) => {
    const url = `${baseURL}/movie/${movieId}/watch/providers?language=${locale}`;

    const response = await fetch(url, options);

    const watchProviders = await response.json();

    return watchProviders as WatchProvidersType;
};

export const getTrendingMovies = async (locale: Locale, page: string = '1') => {

    const url = `${baseURL}/trending/movie/week?language=${locale}&page=${page}`;

    const response = await fetch(url, options);

    const results = await response.json();

    return results as TrendingMoviesType;
};

import { regions } from "@/i18n/config";
import { Locale } from "@/i18n/types";
import {
	CategoryType,
	MovieCreditsType,
	MovieDetailsType,
	MovieRecommendationsType,
	SearchResultsType,
	SimilarMoviesType,
	WatchProvidersType,
} from "@/types";

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
	},
};

const baseMovieURL = `https://api.themoviedb.org/3`;

export const getMovies = async (locale: Locale, category: CategoryType, page?: string) => {
	const moviesURL = (page?: string) => {
		if (!page) {
			page = '1';
		}

		return `${baseMovieURL}/movie/${category}?language=${locale}&region=${regions[locale]}&page=${page}`;
	};

	const response = await fetch(moviesURL(page), {
		cache: 'no-store',
		...options
	});

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
	const movieDetailsURL = `${baseMovieURL}/movie/${movieId}?language=${locale}&region=${regions[locale]}&append_to_response=images,videos&include_image_language=${locale},null`;

	const response = await fetch(movieDetailsURL, {
		cache: 'no-store',
		...options
	});

	const movieDetails = await response.json();

	return movieDetails as MovieDetailsType;
};

export const getMovieCredits = async (locale: Locale, movieId: string) => {
	const movieCreditsURL = `${baseMovieURL}/movie/${movieId}/credits?language=${locale}`;

	const response = await fetch(movieCreditsURL, {
		cache: 'no-store',
		...options
	});

	const movieCredits = await response.json();

	return movieCredits as MovieCreditsType;
};

export const getMovieRecommendations = async (locale: Locale, movieId: string, page?: string) => {

	const movieRecommendationsURL = (page?: string) => {
		if (!page) {
			page = '1';
		}

		return `${baseMovieURL}/movie/${movieId}/recommendations?language=${locale}&page=${page}`;
	}

	const response = await fetch(movieRecommendationsURL(page), {
		cache: 'no-store',
		...options
	});

	const movieRecommendations = await response.json();

	return movieRecommendations as MovieRecommendationsType;
};

export const getSimilarMovies = async (locale: Locale, movieId: string, page?: string) => {
	const similarMoviesURL = (page?: string) => {
		if (!page) {
			page = '1';
		}

		return `${baseMovieURL}/movie/${movieId}/similar?language=${locale}&page=${page}`;
	}

	const response = await fetch(similarMoviesURL(page), {
		cache: 'no-store',
		...options
	});

	const similarMovies = await response.json();

	return similarMovies as SimilarMoviesType;
};

export const getWatchProviders = async (locale: Locale, movieId: string) => {
	const watchProvidersURL = `${baseMovieURL}/movie/${movieId}/watch/providers?language=${locale}`;

	const response = await fetch(watchProvidersURL, {
		cache: 'no-store',
		...options
	});

	const watchProviders = await response.json();

	return watchProviders as WatchProvidersType;
};

export const searchMovie = async (locale: Locale, query: string, page?: string) => {
	const searchMovieURL = (page?: string) => {
		if (!page) {
			page = '1';
		}

		return `${baseMovieURL}/search/movie?language=${locale}&query=${query}&page=${page}`;
	};

	const response = await fetch(searchMovieURL(page), {
		cache: 'no-store',
		...options
	});

	const searchResults = await response.json();

	return searchResults as SearchResultsType;
};
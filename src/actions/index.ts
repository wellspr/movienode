"use server";

import { regions } from "@/i18n/config";
import { Locale } from "@/i18n/types";

import {
	MovieCategoryType,
	CollectionType,
	CreditDetailsType,
	FilteringType,
	MovieCast,
	MovieCrew,
	MovieDetailsType,
	GenresType,
	GenreType,
	MovieRecommendationsType,
	PersonDetailsType,
	ReleaseDatesType,
	SearchMovieResultsType,
	SearchPersonResultsType,
	SimilarMoviesType,
	TVSeriesCategoryType,
	WatchProvidersType,
	TVSeriesDetailsType,
	TVSeriesCast,
	TVSeriesCrew,
	TVSeriesRecommendationsType,
	SimilarTVSeriesType,
	TVSearchResultsType,
	TVSeasonsType,
	TVEpisodesType,
	PeopleListType,
	TrendingPeopleType,
	TrendingMoviesType,
	TrendingTVSeriesType,
} from "@/types";

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
	},
};

const baseURL = `https://api.themoviedb.org/3`;

/* Movies */
export const getMovies = async (locale: Locale, category: MovieCategoryType, page?: string) => {
	const url = (page?: string) => {
		if (!page) {
			page = '1';
		}

		return `${baseURL}/movie/${category}?language=${locale}&region=${regions[locale]}&page=${page}`;
	};

	const response = await fetch(url(page), {
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
	const url = `${baseURL}/movie/${movieId}?language=${locale}&region=${regions[locale]}&append_to_response=images,videos,release_dates,translations&include_image_language=${locale},null`;

	const response = await fetch(url, {
		cache: 'no-store',
		...options
	});

	const movieDetails = await response.json();

	return movieDetails as MovieDetailsType;
};

export const getMovieCredits = async (locale: Locale, movieId: string) => {
	const url = `${baseURL}/movie/${movieId}/credits?language=${locale}`;

	const response = await fetch(url, {
		cache: 'no-store',
		...options
	});

	const movieCredits = await response.json();

	return movieCredits as { id: string, cast: MovieCast, crew: MovieCrew };
};

export const getMovieRecommendations = async (locale: Locale, movieId: string, page?: string) => {

	const url = (page?: string) => {
		if (!page) {
			page = '1';
		}

		return `${baseURL}/movie/${movieId}/recommendations?language=${locale}&page=${page}`;
	}

	const response = await fetch(url(page), {
		cache: 'no-store',
		...options
	});

	const movieRecommendations = await response.json();

	return movieRecommendations as MovieRecommendationsType;
};

export const getSimilarMovies = async (locale: Locale, movieId: string, page?: string) => {
	const url = (page?: string) => {
		if (!page) {
			page = '1';
		}

		return `${baseURL}/movie/${movieId}/similar?language=${locale}&page=${page}`;
	}

	const response = await fetch(url(page), {
		cache: 'no-store',
		...options
	});

	const similarMovies = await response.json();

	return similarMovies as SimilarMoviesType;
};

export const getMovieGenreList = async (locale: Locale) => {
	const url = `${baseURL}/genre/movie/list?language=${locale}`;

	const response = await fetch(url, {
		cache: 'default',
		...options
	});

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

export const getCreditDetails = async (locale: Locale, creditId: string) => {
	const url = `${baseURL}/credit/${creditId}`;

	const response = await fetch(url, {
		cache: 'default',
		...options
	});

	const creditsDetails = await response.json();

	return creditsDetails as CreditDetailsType;
};

export const getPersonDetails = async (locale: Locale, personId: string) => {
	const url = `${baseURL}/person/${personId}?language=${locale}&region=${regions[locale]}&append_to_response=images,movie_credits&include_image_language=${locale},null`;

	const response = await fetch(url, {
		cache: 'default',
		...options
	});

	const personDetails = await response.json();

	return personDetails as PersonDetailsType;
};

export const getReleaseDates = async (locale: Locale, movieId: string) => {
	const url = `${baseURL}/movie/${movieId}/release_dates?language=${locale}`;

	const response = await fetch(url, {
		cache: 'default',
		...options
	});

	const releaseDates = await response.json();

	return releaseDates as ReleaseDatesType;
}

export const getCollection = async (locale: Locale, collectionId: string) => {
	const url = `${baseURL}/collection/${collectionId}?language=${locale}`;

	const response = await fetch(url, {
		cache: 'default',
		...options
	});

	const collection = await response.json();

	return collection as CollectionType;
}

export const getWatchProviders = async (locale: Locale, movieId: string) => {
	const url = `${baseURL}/movie/${movieId}/watch/providers?language=${locale}`;

	const response = await fetch(url, {
		cache: 'no-store',
		...options
	});

	const watchProviders = await response.json();

	return watchProviders as WatchProvidersType;
};


/* TV Series */
export const getTVSeries = async (locale: Locale, category: TVSeriesCategoryType, page?: string) => {
	const url = (page?: string) => {
		if (!page) {
			page = '1';
		}

		return `${baseURL}/tv/${category}?language=${locale}&region=${regions[locale]}&page=${page}`;
	};

	const response = await fetch(url(page), {
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

export const getTVSeriesDetails = async (locale: Locale, seriesId: string) => {
	const url = `${baseURL}/tv/${seriesId}?language=${locale}&region=${regions[locale]}&append_to_response=images,videos,release_dates,translations&include_image_language=${locale},null`;

	const response = await fetch(url, {
		cache: 'no-store',
		...options
	});

	const tvSeriesDetails = await response.json();

	return tvSeriesDetails as TVSeriesDetailsType;
};

export const getTVSeriesSeasonDetails = async (locale: Locale, seriesId: string, seasonNumber: string) => {
	const url = `${baseURL}/tv/${seriesId}/season/${seasonNumber}?language=${locale}&region=${regions[locale]}&append_to_response=images,videos,release_dates,translations&include_image_language=${locale},null`;

	const response = await fetch(url, {
		cache: 'no-store',
		...options
	});

	const season = await response.json();

	return season as TVSeasonsType;
};

export const getTVSeriesEpisodeDetails = async (locale: Locale, seriesId: string, seasonNumber: string, episodeNumber: string) => {
	const url = `${baseURL}/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}?language=${locale}&region=${regions[locale]}&append_to_response=images,videos,release_dates,translations&include_image_language=${locale},null`;

	const response = await fetch(url, {
		cache: 'no-store',
		...options
	});

	const episode = await response.json();

	return episode as TVEpisodesType;
};

export const getTVSeriesCredits = async (locale: Locale, seriesId: string) => {
	const url = `${baseURL}/tv/${seriesId}/credits?language=${locale}`;

	const response = await fetch(url, {
		cache: 'no-store',
		...options
	});

	const credits = await response.json();

	return credits as { id: string, cast: TVSeriesCast, crew: TVSeriesCrew };
};

export const getTVSeriesRecommendations = async (locale: Locale, seriesId: string, page?: string) => {

	const url = (page?: string) => {
		if (!page) {
			page = '1';
		}

		return `${baseURL}/tv/${seriesId}/recommendations?language=${locale}&page=${page}`;
	}

	const response = await fetch(url(page), {
		cache: 'no-store',
		...options
	});

	const recommendations = await response.json();

	return recommendations as TVSeriesRecommendationsType;
};

export const getSimilarTVSeries = async (locale: Locale, seriesId: string, page?: string) => {
	const url = (page?: string) => {
		if (!page) {
			page = '1';
		}

		return `${baseURL}/tv/${seriesId}/similar?language=${locale}&page=${page}`;
	}

	const response = await fetch(url(page), {
		cache: 'no-store',
		...options
	});

	const similar = await response.json();

	return similar as SimilarTVSeriesType;
};

export const getTVSeriesGenreList = async (locale: Locale) => {
	const url = `${baseURL}/genre/tv/list?language=${locale}`;

	const response = await fetch(url, {
		cache: 'default',
		...options
	});

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

	const response = await fetch(url, {
		cache: 'no-store',
		...options
	});

	const watchProviders = await response.json();

	return watchProviders as WatchProvidersType;
};


/* Persons */
export const getPopularPeople = async (locale: Locale, page?: string) => {

	const url = (page?: string) => {
		if (!page) {
			page = '1';
		}

		return `${baseURL}/person/popular?language=${locale}&page=${page}`;
	};

	const response = await fetch(url(page), {
		cache: 'no-store',
		...options
	});

	const results = await response.json();

	return results as PeopleListType;
};

export const getTrendingPeople = async (locale: Locale, page?: string) => {

	const url = (page?: string) => {
		if (!page) {
			page = '1';
		}

		return `${baseURL}/trending/person/week?language=${locale}&page=${page}`;
	};

	const response = await fetch(url(page), {
		cache: 'no-store',
		...options
	});

	const results = await response.json();

	return results as TrendingPeopleType;
};

export const getTrendingMovies = async (locale: Locale, page?: string) => {

	const url = (page?: string) => {
		if (!page) {
			page = '1';
		}

		return `${baseURL}/trending/movie/week?language=${locale}&page=${page}`;
	};

	const response = await fetch(url(page), {
		cache: 'no-store',
		...options
	});

	const results = await response.json();

	return results as TrendingMoviesType;
};

export const getTrendingTVSeries = async (locale: Locale, page?: string) => {

	const url = (page?: string) => {
		if (!page) {
			page = '1';
		}

		return `${baseURL}/trending/tv/week?language=${locale}&page=${page}`;
	};

	const response = await fetch(url(page), {
		cache: 'no-store',
		...options
	});

	const results = await response.json();

	return results as TrendingTVSeriesType;
};

/* Search  */
export const searchMovie = async (locale: Locale, query: string, page?: string) => {
	const url = (page?: string) => {
		if (!page) {
			page = '1';
		}

		return `${baseURL}/search/movie?language=${locale}&query=${query}&page=${page}`;
	};

	const response = await fetch(url(page), {
		cache: 'no-store',
		...options
	});

	const searchResults = await response.json();

	return searchResults as SearchMovieResultsType;
};

export const searchPerson = async (locale: Locale, query: string, page?: string) => {
	const url = (page?: string) => {
		if (!page) {
			page = '1';
		}

		return `${baseURL}/search/person?language=${locale}&query=${query}&page=${page}`;
	};

	const response = await fetch(url(page), {
		cache: 'no-store',
		...options
	});

	const searchResults = await response.json();

	return searchResults as SearchPersonResultsType;
};

export const discoverMovie = async (locale: Locale, queryList: FilteringType, page?: string) => {

	let url = `${baseURL}/discover/movie?language=${locale}`;

	if (page) {
		url = url + `&page=${page}`;
	}

	Object.entries(queryList).forEach(([key, value]) => {
		url = url + `&${key}=${value}`;
	});

	const response = await fetch(url, {
		cache: 'no-cache',
		...options,
	});

	const results = await response.json();

	return results;
};

export const searchTVSeries = async (locale: Locale, query: string, page?: string) => {
	const url = (page?: string) => {
		if (!page) {
			page = '1';
		}

		return `${baseURL}/search/tv?language=${locale}&query=${query}&page=${page}`;
	};

	const response = await fetch(url(page), {
		cache: 'no-store',
		...options
	});

	const searchResults = await response.json();

	return searchResults as TVSearchResultsType;
};

export const discoverTVSeries = async (locale: Locale, queryList: FilteringType, page?: string) => {

	let url = `${baseURL}/discover/tv?language=${locale}`;

	if (page) {
		url = url + `&page=${page}`;
	}

	Object.entries(queryList).forEach(([key, value]) => {
		url = url + `&${key}=${value}`;
	});

	const response = await fetch(url, {
		cache: 'no-cache',
		...options,
	});

	const results = await response.json();

	return results;
};
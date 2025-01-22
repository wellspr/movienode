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
	MovieGenresType,
	MovieGenreType,
	MovieRecommendationsType,
	PersonDetailsType,
	ReleaseDatesType,
	SearchMovieResultsType,
	SearchPersonResultsType,
	SimilarMoviesType,
	TVSeriesCategoryType,
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

export const getMovies = async (locale: Locale, category: MovieCategoryType, page?: string) => {
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

export const getTVSeries = async (locale: Locale, category: TVSeriesCategoryType, page?: string) => {
	const url = (page?: string) => {
		if (!page) {
			page = '1';
		}

		return `${baseMovieURL}/tv/${category}?language=${locale}&region=${regions[locale]}&page=${page}`;
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
	const movieDetailsURL = `${baseMovieURL}/movie/${movieId}?language=${locale}&region=${regions[locale]}&append_to_response=images,videos,release_dates,translations&include_image_language=${locale},null`;

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

	return movieCredits as { id: string, cast: MovieCast, crew: MovieCrew };
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
	const url = (page?: string) => {
		if (!page) {
			page = '1';
		}

		return `${baseMovieURL}/search/movie?language=${locale}&query=${query}&page=${page}`;
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

		return `${baseMovieURL}/search/person?language=${locale}&query=${query}&page=${page}`;
	};

	const response = await fetch(url(page), {
		cache: 'no-store',
		...options
	});

	const searchResults = await response.json();

	return searchResults as SearchPersonResultsType;
};

export const discoverMovie = async (locale: Locale, queryList: FilteringType, page?: string) => {

	let url = `${baseMovieURL}/discover/movie?language=${locale}`;

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

export const getMovieGenreList = async (locale: Locale) => {
	const url = `${baseMovieURL}/genre/movie/list?language=${locale}`;

	const response = await fetch(url, {
		cache: 'default',
		...options
	});

	const { genres } = await response.json();

	return genres as MovieGenresType;
};

export const getMovieGenre = async (locale: Locale, id: string) => {

	const genres = await getMovieGenreList(locale);

	const genre = genres.filter(genre => {
		return String(genre.id) === id;
	})[0];

	return genre as MovieGenreType;
};

export const getCreditDetails = async (locale: Locale, creditId: string) => {
	const url = `${baseMovieURL}/credit/${creditId}`;

	const response = await fetch(url, {
		cache: 'default',
		...options
	});

	const creditsDetails = await response.json();

	return creditsDetails as CreditDetailsType;
};

export const getPersonDetails = async (locale: Locale, personId: string) => {
	const url = `${baseMovieURL}/person/${personId}?language=${locale}&region=${regions[locale]}&append_to_response=images,movie_credits&include_image_language=${locale},null`;

	const response = await fetch(url, {
		cache: 'default',
		...options
	});

	const personDetails = await response.json();

	return personDetails as PersonDetailsType;
};

export const getReleaseDates = async (locale: Locale, movieId: string) => {
	const url = `${baseMovieURL}/movie/${movieId}/release_dates?language=${locale}`;

	const response = await fetch(url, {
		cache: 'default',
		...options
	});

	const releaseDates = await response.json();

	return releaseDates as ReleaseDatesType;
}

export const getCollection = async (locale: Locale, collectionId: string) => {
	const url = `${baseMovieURL}/collection/${collectionId}?language=${locale}`;

	const response = await fetch(url, {
		cache: 'default',
		...options
	});

	const collection = await response.json();

	return collection as CollectionType;
}
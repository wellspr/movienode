import { regions } from "@/i18n/config";
import { Locale } from "@/i18n/types";
import { MovieDetails } from "@/types";

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
	},
};

const baseMovieURL = `https://api.themoviedb.org/3/movie`;

type Category = "now_playing" | "popular" | "top_rated" | "upcoming";

export const getMovies = async (locale: Locale, category: Category, page?: string) => {
	const moviesURL = (page?: string) => {
		if (!page) {
			page = '1';
		}
	
		return `${baseMovieURL}/${category}?language=${locale}&region=${regions[locale]}&page=${page}`;
	};

    const response = await fetch(moviesURL(page), {
		//cache: 'force-cache',
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
}


export const getMovieDetails = async (locale: Locale, movieId: string) => {
	const movieDetailsURL = `${baseMovieURL}/${movieId}?language=${locale}&region=${regions[locale]}&append_to_response=images,videos&include_image_language=${locale},null`;

    const response = await fetch(movieDetailsURL, {
		//cache: 'force-cache',
		cache: 'no-store',
		...options
	});

    const movieDetails = await response.json();

    return movieDetails as MovieDetails;
}
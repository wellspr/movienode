export const baseImageUrl = (width?: number) => {
    if (!width) {
        return "https://image.tmdb.org/t/p/original";
    }

    return `https://image.tmdb.org/t/p/w${String(width)}`;
};

export const paths = {
    home: () => '/',
    movie: (movie_id: string) => `/movie/${movie_id}`,
    genres: (genre_id: string) => `/genres/${genre_id}`,
    tv: (series_id: string) => `/tv-series/${series_id}`,
    person: (person_id: string) => `/person/${person_id}`,
    search: () => "/search",
    movie_recommendations: (movie_id: string) => `/movie/${movie_id}/recommendations`,
    movie_similar: (movie_id: string) => `/movie/${movie_id}/similar`,
}

export const navLinks = [
    {id: 1, name: "Popular", url: "/movies/popular", translation: "popular"},
    {id: 2, name: "Now Playing", url: "/movies/now_playing", translation: "now_playing"},
    {id: 3, name: "Top Rated", url: "/movies/top_rated", translation: "top_rated"},
    {id: 4, name: "Upcoming", url: "/movies/upcoming", translation: "upcoming"},
];

export const appName = "MovieNode";
export const baseURL = () => {
    const env = process.env.NODE_ENV;
    
    if (env === "production") {
        const url = process.env.PRODUCTION_URL;
        if (url) {
            return url;
        }
    }
    
    return "http://localhost:3000";
};

export const domain = () => {
    const env = process.env.NODE_ENV;

    if (env === "production") {
        const domain = process.env.PRODUCTION_DOMAIN;
        if (domain) {
            return domain;
        }
    }

    return "localhost";
};

export const baseImageUrl = (width?: number) => {
    if (!width) {
        return "https://image.tmdb.org/t/p/original";
    }

    return `https://image.tmdb.org/t/p/w${String(width)}`;
};

export const paths = {
    home: () => '/',
    movies: (movie_id: string) => `/movies/${movie_id}`,
    movies_genres: (genre_id: string) => `/movies/genres/${genre_id}`,
    tv_genres: (genre_id: string) => `/tv/genres/${genre_id}`,
    tv: (series_id: string) => `/tv/${series_id}`,
    tv_season: (series_id: string, season_number: string) => `/tv/${series_id}/season/${season_number}`,
    tv_episode: (series_id: string, season_number: string, episode_number: string) => `/tv/${series_id}/season/${season_number}/episode/${episode_number}`,
    person: (person_id: string) => `/person/${person_id}`,
    search: () => "/search",
    movie_recommendations: (movie_id: string) => `/movies/${movie_id}/recommendations`,
    movie_similar: (movie_id: string) => `/movies/${movie_id}/similar`,
};

export const navLinks = {
    movies: [
        { id: 1, name: "Popular", url: "/movies/lists/popular", translation: "popular" },
        { id: 2, name: "Now Playing", url: "/movies/lists/now_playing", translation: "now_playing" },
        { id: 3, name: "Top Rated", url: "/movies/lists/top_rated", translation: "top_rated" },
        { id: 4, name: "Upcoming", url: "/movies/lists/upcoming", translation: "upcoming" },
        { id: 5, name: "Trending", url: "/movies/lists/trending", translation: "trending" },
    ],
    tv: [
        { id: 1, name: "Popular", url: "/tv/lists/popular", translation: "popular" },
        { id: 2, name: "On the air", url: "/tv/lists/on_the_air", translation: "on_the_air" },
        { id: 3, name: "Top Rated", url: "/tv/lists/top_rated", translation: "top_rated" },
        { id: 4, name: "Airing today", url: "/tv/lists/airing_today", translation: "airing_today" },
        { id: 5, name: "Trending", url: "/tv/lists/trending", translation: "trending" },
    ],
    main: [
        { id: 1, name: "Movies", url: "/movies", translation: "movies" },
        { id: 2, name: "tv", url: "/tv", translation: "tv" },
    ]
};

export const appName = "MovieNode";
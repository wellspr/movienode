export const baseImageUrl = (width?: number) => {
    if (!width) {
        return "https://image.tmdb.org/t/p/original";
    }

    return `https://image.tmdb.org/t/p/w${String(width)}`;
};

export const paths = {
    home: () => '/',
    movie_details: (movie_id: string) => `/details/${movie_id}`,
}

export const navLinks = [
    {id: 1, name: "Popular", url: "/popular", translation: "popular"},
    {id: 2, name: "Now Playing", url: "/now_playing", translation: "now_playing"},
    {id: 3, name: "Top Rated", url: "/top_rated", translation: "top_rated"},
    {id: 4, name: "Upcoming", url: "/upcoming", translation: "upcoming"},
];

export const appName = "MovieNode";
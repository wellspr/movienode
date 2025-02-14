export type ListsType = {
    page: number
    results: {
        account_object_id: string
        adult: number
        average_rating: number
        created_at: string
        description: string
        featured: number
        id: number
        iso_3166_1: string
        iso_639_1: string
        name: string
        number_of_items: number
        public: number
        revenue: string
        runtime: number
        sort_by: number
        updated_at: string
    }[]
    total_pages: number
    total_results: number
}

export type FavoriteMoviesType = {
    page: number
    results: {
        adult: boolean
        backdrop_path: string
        genre_ids: number[]
        id: number
        original_language: string
        original_title: string
        overview: string
        popularity: number
        poster_path: string
        release_date: string
        title: string
        video: boolean
        vote_average: number
        vote_count: number
    }[]
    total_pages: number
    total_results: number
}

export type FavoriteTVShowsType = {
    page: number
    results: {
        adult: boolean
        backdrop_path: string
        genre_ids: number[]
        id: number
        origin_country: string[]
        original_language: string
        original_name: string
        overview: string
        popularity: number
        poster_path: string
        first_air_date: string
        name: string
        vote_average: number
        vote_count: number
    }[]
    total_pages: number
    total_results: number
}

export type RatedMoviesType = {
    page: number
    results: {
        adult: boolean
        backdrop_path: string
        genre_ids: number[]
        id: number
        original_language: string
        original_title: string
        overview: string
        popularity: number
        poster_path: string
        release_date: string
        title: string
        video: boolean
        vote_average: number
        vote_count: number
        account_rating: {
            created_at: string
            value: number
        }
    }[]
    total_pages: number
    total_results: number
}

export type RatedTVShowsType = {
    page: number
    results: {
        adult: boolean
        backdrop_path: string
        genre_ids: number[]
        id: number
        origin_country: string[]
        original_language: string
        original_name: string
        overview: string
        popularity: number
        poster_path: string
        first_air_date: string
        name: string
        vote_average: number
        vote_count: number
        account_rating: {
            created_at: string
            value: number
        }
    }[]
    total_pages: number
    total_results: number
}

export type RecommendedMoviesType = {
    page: number

    results: {
        adult: boolean
        backdrop_path: string
        genre_ids: number[]
        id: number
        media_type: string
        original_language: string
        original_title: string
        overview: string
        poster_path: string
        popularity: number
        release_date: string
        title: string
        video: boolean
        vote_average: number
        vote_count: number
    }[]
    total_pages: number
    total_results: number
}

export type RecommendedTVShowsType = {
    page: number
    results: {
        adult: boolean
        backdrop_path: string
        id: number
        name: string
        original_language: string
        original_name: string
        overview: string
        poster_path: string
        media_type: string
        genre_ids: number[]
        popularity: number
        first_air_date: string
        vote_average: number
        vote_count: number
        origin_country: string[]
    }[]
    total_pages: number
    total_results: number
}

export type WatchlistMoviesType = {
    page: number
    results: {
        adult: boolean
        backdrop_path: string
        id: number
        title: string
        original_language: string
        original_title: string
        overview: string
        poster_path: string
        media_type: string
        genre_ids: number[]
        popularity: number
        release_date: string
        video: boolean
        vote_average: number
        vote_count: number
    }[]
    total_pages: number
    total_results: number
}

export type WatchlistTVShowsType = {
    page: number
    results: {
        adult: boolean
        backdrop_path: string
        id: number
        name: string
        original_language: string
        original_name: string
        overview: string
        poster_path: string
        media_type: string
        genre_ids: number[]
        popularity: number
        first_air_date: string
        vote_average: number
        vote_count: number
        origin_country: string[]
    }[]
    total_pages: number
    total_results: number
}

export type FavoritePayloadType = {
    media_id: number,
    media_type: string,
    favorite: boolean
}

export type WatchListPayloadType = {
    media_id: number,
    media_type: string,
    watchlist: boolean
}
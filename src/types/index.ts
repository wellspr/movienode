export type MovieType = {
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
}

export type MovieDetailsType = {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: string
    budget: number
    genres: MovieGenresType
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: MovieProductionCompaniesType
    production_countries: MovieProductionCountriesType
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: MovieSpokenLanguages
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    images?: ImagesType
    videos?: VideosType
    credits?: MovieCreditsType
}

export type MovieGenresType = {
    id: number,
    name: string
}[]

export type MovieProductionCompaniesType = {
    id: number
    logo_path: string
    name: string
    origin_country: string
}[]

export type MovieProductionCountriesType = {
    iso_3166_1: string
    name: string
}[]

export type MovieSpokenLanguages = {
    english_name: string
    iso_639_1: string
    name: string
}[]

export type MovieCreditsType = {
    id: number
    cast: MovieCast
    crew: MovieCrew
}

export type MovieCast = {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    cast_id: number
    character: string
    credit_id: string
    order: number
}[]

export type MovieCrew = {
    adult: boolean
    gender: number
    id: number
    known_: string
    name: string
    origin: string
    popula: number
    profil: string
    credit: string
    depart: string
    job: string
}[]

export type ImagesType = {
    backdrops: BackdropsType
    id: number
    logos: LogosType
    posters: PostersType
}

export type BackdropType = {
    aspect_ratio: number
    height: number
    iso_639_1: string
    file_path: string
    vote_average: number
    vote_count: number
    width: number
}

export type BackdropsType = BackdropType[]

export type LogosType = {
    aspect_ratio: number
    height: number
    iso_639_1: string
    file_path: string
    vote_average: number
    vote_count: number
    width: number
}[]

export type PostersType = {
    aspect_ratio: number
    height: number
    iso_639_1: string
    file_path: string
    vote_average: number
    vote_count: number
    width: number
}[]

export type VideosType = {
    results: {
        iso_639_1: string
        iso_3166_1: string
        name: string
        key: string
        site: string
        size: number
        type: string
        official: boolean
        published_at: string
        id: string
    }[]
}

export type CategoryType = "popular" | "top_rated" | "upcoming" | "now_playing";

export type MovieRecommendationsType = {
    page: number
    results: MovieType[]
    total_pages: number
    total_results: number
}

export type SimilarMoviesType = {
    page: number
    results: MovieType[]
    total_pages: number
    total_results: number
}

export type WatchProvidersType = {
    id: number
    results: {
        [key: string]: {
            link: string
            buy: ProviderType[]
            flatrate: ProviderType[]
            rent: ProviderType[]
        }
    }
}

export type ProviderType = {
    logo_path: string
    provider_id: number
    provider_name: string
    display_priority: number
}
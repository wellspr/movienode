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
    belongs_to_collection: {
        id: string,
        name: string,
        poster_path: string,
        backdrop_path: string,
    } | null
    budget: number
    genres: GenresType
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
    images?: MovieImagesType
    videos?: VideosType
    credits?: {
        id: string
        cast: MovieCast
        crew: MovieCrew
    }
    watch_providers?: WatchProvidersType
    recommendations?: MovieRecommendationsType
    similar?: SimilarMoviesType
    release_dates?: ReleaseDatesType
    translations?: TranslationsType
}

export type TranslationsType = {
    id: number
    translations: {
        iso_3166_1: string
        iso_639_1: string
        name: string
        english_name: string
        data: {
            homepage: string
            overview: string
            runtime?: number
            tagline: string
            title?: string
            name?: string
        }
    }[]
}

export type ReleaseDatesType = {
    id: number
    results: {
        iso_3166_1: RegionsType
        release_dates: {
            certification: string
            descriptors: []
            iso_639_1: string
            note: string
            release_date: string
            type: number
        }[]
    }[]
}

export type GenreType = {
    id: number,
    name: string
}

export type GenresType = GenreType[]

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
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    credit_id: string
    department: string
    job: string
}[]

export type MovieImagesType = {
    backdrops: ImageType[]
    id: number
    logos: ImageType[]
    posters: ImageType[]
}

export type ImageType = {
    aspect_ratio: number
    height: number
    iso_639_1: string
    file_path: string
    vote_average: number
    vote_count: number
    width: number
}

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

export type MovieCategoryType =
    "popular" |
    "top_rated" |
    "upcoming" |
    "now_playing" |
    "trending"

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
            ads?: ProviderType[]
            free?: ProviderType[]
            buy: ProviderType[]
            flatrate: ProviderType[]
            rent: ProviderType[]
        }
    }
}

export type WatchProvidersMod =
    'link' | 'ads' | 'free' | 'buy' | 'flatrate' | 'rent'

export type ProviderType = {
    logo_path: string
    provider_id: number
    provider_name: string
    display_priority: number
}

export type SearchMovieResultsType = {
    page: number,
    results: MovieType[],
    total_pages: number,
    total_results: number,
}

export type SearchPersonResultsType = {
    page: number,
    results: PersonDetailsType[],
    total_pages: number,
    total_results: number,
}

export type SearchCollectionResultsType = {
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
    }[]
    total_pages: number
    total_results: number
}

export type FilteringType = {
    include_adult?: boolean
    include_video?: boolean
    language?: string
    page?: number
    primary_release_year?: number
    region?: string
    sort_by?: string
    watch_region?: string
    with_cast?: string
    with_companies?: string
    with_crew?: string
    with_genres?: string
    with_keywords?: string
    with_origin_country?: string
    with_original_language?: string
    with_people?: string
    with_release_type?: number /* possible values are: [1, 2, 3, 4, 5, 6] can be a comma (AND) or pipe (OR) separated query, can be used in conjunction with region */
    with_watch_monetization_types?: string /* possible values are: [flatrate, free, ads, rent, buy] use in conjunction with watch_region, can be a comma (AND) or pipe (OR) separated query */
    with_watch_providers?: string /* use in conjunction with watch_region, can be a comma (AND) or pipe (OR) separated query */
    without_companies?: string
    without_genres?: string
    without_keywords?: string
    without_watch_providers?: string
    year?: number
}

export type CreditDetailsType = {
    credit_type: string
    department: string
    job: string
    media: {
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
        character: string
        episodes: []
        seasons: {
            air_date: string
            episode_count: number
            id: number
            name: string
            overview: string
            poster_path: string
            season_number: number
            show_id: number
        }[]
    }
    media_type: string
    id: string
    person: {
        adult: boolean
        id: number
        name: string
        original_name: string
        media_type: string
        popularity: number
        gender: number
        known_for_department: string
        profile_path: string
    }
}

export type PersonDetailsType = {
    adult: boolean
    also_known_as: string[]
    biography: string
    birthday: string
    deathday: string
    gender: number
    homepage: string
    id: number
    imdb_id: string
    known_for_department: string
    name: string
    place_of_birth: string
    popularity: number
    profile_path: string
    images?: {
        profiles: ImageType[]
    }
    movie_credits?: MovieCreditsType
}

export type PeopleListType = {
    page: number
    results: PersonType[]
    total_pages: number
    total_results: number
}

export type PersonType = {
    adult: boolean
    gender: number
    id: number
    known_for: KnownFor
    known_for_department: string
    media_type?: string
    name: string
    original_name?: string
    popularity: number
    profile_path: string
}

export type KnownFor = {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    media_type: string
    original_language: string
    original_title: string
    overview: string
    poster_path: string
    popularity?: number
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}[]

export type TrendingMoviesType = {
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

export type TrendingTVSeriesType = {
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

export type TrendingPeopleType = {
    page: number
    results: PersonType[]
    total_pages: number
    total_results: number
}

export type PeopleCategoryType = "popular" | "trending"

export type MovieCreditsType = {
    cast: {
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
        character: string
        credit_id: string
        order: number
    }[]
    crew: {
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
        credit_id: string
        department: string
        job: string
    }[]
    id: number
}

export type SearchType =
    "collection" |
    "company" |
    "keyword" |
    "movie" |
    "multi" |
    "person" |
    "tv"

export type CollectionType = {
    id: number
    name: string
    overview: string
    poster_path: string
    backdrop_path: string
    parts: {
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
}

export type CollectionImagesType = {
    id: number
    backdrops: {
        aspect_ratio: number
        height: number
        iso_639_1: string
        file_path: string
        vote_average: number
        vote_count: number
        width: number
    }[]
    posters: {
        aspect_ratio: number
        height: number
        iso_639_1: string
        file_path: string
        vote_average: number
        vote_count: number
        width: number
    }[]
}

export type ReviewsType = {
    id: number
    page: number
    results: {
        author: string
        author_details: {
            name: string
            username: string
            avatar_path: string
            rating: string
        }
        content: string
        created_at: string
        id: string
        updated_at: string
        url: string
    }[]
    total_pages: number
    total_results: number
}

export type TVSeriesType = {
    adult?: boolean
    backdrop_path: string
    first_air_date: string
    genre_ids: number[]
    id: number
    media_type?: string
    name: string
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    vote_average: number
    vote_count: number
}

export type TVSeriesDetailsType = {
    adult: boolean
    backdrop_path: string
    created_by: {
        id: number
        credit_id: string
        name: string
        gender: number
        profile_path: string
    }[]
    episode_run_time: number[]
    first_air_date: string
    genres: {
        id: number
        name: string
    }[]
    homepage: string
    id: number
    in_production: boolean
    languages: string[]
    last_air_date: string
    last_episode_to_air: {
        id: number
        name: string
        overview: string
        vote_average: number
        vote_count: number
        air_date: string
        episode_number: number
        production_code: string
        runtime: number
        season_number: number
        show_id: number
        still_path: string
    }
    name: string
    next_episode_to_air: string
    networks: {
        id: number
        logo_path: string
        name: string
        origin_country: string
    }[]
    number_of_episodes: number
    number_of_seasons: number
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: {
        id: number
        logo_path: string
        name: string
        origin_country: string
    }[]
    production_countries: {
        iso_3166_1: string
        name: string
    }[]
    seasons: {
        air_date: string
        episode_count: number
        id: number
        name: string
        overview: string
        poster_path: string
        season_number: number
        vote_average: number
    }[]
    spoken_languages: {
        english_name: string
        iso_639_1: string
        name: string
    }[]
    status: string
    tagline: string
    type: string
    vote_average: number
    vote_count: number
    images?: MovieImagesType
    videos?: VideosType
    credits?: {
        id: string
        cast: TVSeriesCast
        crew: TVSeriesCrew
    }
    watch_providers?: WatchProvidersType
    recommendations?: TVSeriesRecommendationsType
    similar?: SimilarTVSeriesType
    release_dates?: ReleaseDatesType
    translations?: TranslationsType
}

export type TVSeriesCategoryType =
    "airing_today" |
    "on_the_air" |
    "popular" |
    "top_rated" |
    "trending"

export type TVSeriesCreditsType = {
    cast: {
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
        character: string
        credit_id: string
        episode_count: number
    }[]
    crew: {
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
        credit_id: string
        department: string
        episode_count: number
        job: string
    }[]
    id: number
}

export type TVSeriesCast = {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    character: string
    credit_id: string
    order: number
}[]

export type TVSeriesCrew = {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    credit_id: string
    department: string
    job: string
}[]

export type TVSearchResultsType = {
    page: number
    results: TVSeriesType[]
    total_pages: number
    total_results: number
}

export type TVSeriesRecommendationsType = {
    page: number
    results: TVSeriesType[]
    total_pages: number
    total_results: number
}

export type SimilarTVSeriesType = {
    page: number
    results: TVSeriesType[]
    total_pages: number
    total_results: number
}

export type TVSeasonsType = {
    _id: string
    air_date: string
    episodes: {
        air_date: string
        episode_number: number
        id: number
        name: string
        overview: string
        production_code: string
        runtime: number
        season_number: number
        show_id: number
        still_path: string
        vote_average: number
        vote_count: number
        crew: {
            department: string
            job: string
            credit_id: string
            adult: boolean
            gender: number
            id: number
            known_for_department: string
            name: string
            original_name: string
            popularity: number
            profile_path: string
        }[]
        guest_stars: {
            character: string
            credit_id: string
            order: number
            adult: boolean
            gender: number
            id: number
            known_for_department: string
            name: string
            original_name: string
            popularity: number
            profile_path: string
        }[]
    }[]
    name: string
    overview: string
    id: number
    poster_path: string
    season_number: number
    vote_average: number
}

export type TVEpisodesType = {
    air_date: string
    crew: {
        department: string
        job: string
        credit_id: string
        adult: boolean
        gender: number
        id: number
        known_for_department: string
        name: string
        original_name: string
        popularity: number
        profile_path: string
    }[]
    episode_number: number
    guest_stars: {
        character: string
        credit_id: string
        order: number
        adult: boolean
        gender: number
        id: number
        known_for_department: string
        name: string
        original_name: string
        popularity: number
        profile_path: string
    }[]
    name: string
    overview: string
    id: number
    production_code: string
    runtime: number
    season_number: number
    still_path: string
    vote_average: number
    vote_count: number
}


export type RegionsType =
    'AD' |
    'AE' |
    'AF' |
    'AG' |
    'AI' |
    'AL' |
    'AM' |
    'AO' |
    'AQ' |
    'AR' |
    'AS' |
    'AT' |
    'AU' |
    'AW' |
    'AX' |
    'AZ' |
    'BA' |
    'BB' |
    'BD' |
    'BE' |
    'BF' |
    'BG' |
    'BH' |
    'BI' |
    'BJ' |
    'BL' |
    'BM' |
    'BN' |
    'BO' |
    'BQ' |
    'BR' |
    'BS' |
    'BT' |
    'BV' |
    'BW' |
    'BY' |
    'BZ' |
    'CA' |
    'CC' |
    'CD' |
    'CF' |
    'CG' |
    'CH' |
    'CI' |
    'CK' |
    'CL' |
    'CM' |
    'CN' |
    'CO' |
    'CR' |
    'CU' |
    'CV' |
    'CW' |
    'CX' |
    'CY' |
    'CZ' |
    'DE' |
    'DJ' |
    'DK' |
    'DM' |
    'DO' |
    'DZ' |
    'EC' |
    'EE' |
    'EG' |
    'EH' |
    'ER' |
    'ES' |
    'ET' |
    'FI' |
    'FJ' |
    'FK' |
    'FM' |
    'FO' |
    'FR' |
    'GA' |
    'GB' |
    'GD' |
    'GE' |
    'GF' |
    'GG' |
    'GH' |
    'GI' |
    'GL' |
    'GM' |
    'GN' |
    'GP' |
    'GQ' |
    'GR' |
    'GS' |
    'GT' |
    'GU' |
    'GW' |
    'GY' |
    'HK' |
    'HM' |
    'HN' |
    'HR' |
    'HT' |
    'HU' |
    'ID' |
    'IE' |
    'IL' |
    'IM' |
    'IN' |
    'IO' |
    'IQ' |
    'IR' |
    'IS' |
    'IT' |
    'JE' |
    'JM' |
    'JO' |
    'JP' |
    'KE' |
    'KG' |
    'KH' |
    'KI' |
    'KM' |
    'KN' |
    'KP' |
    'KR' |
    'KW' |
    'KY' |
    'KZ' |
    'LA' |
    'LB' |
    'LC' |
    'LI' |
    'LK' |
    'LR' |
    'LS' |
    'LT' |
    'LU' |
    'LV' |
    'LY' |
    'MA' |
    'MC' |
    'MD' |
    'ME' |
    'MF' |
    'MG' |
    'MH' |
    'MK' |
    'ML' |
    'MM' |
    'MN' |
    'MO' |
    'MP' |
    'MQ' |
    'MR' |
    'MS' |
    'MT' |
    'MU' |
    'MV' |
    'MW' |
    'MX' |
    'MY' |
    'MZ' |
    'NA' |
    'NC' |
    'NE' |
    'NF' |
    'NG' |
    'NI' |
    'NL' |
    'NO' |
    'NP' |
    'NR' |
    'NU' |
    'NZ' |
    'OM' |
    'PA' |
    'PE' |
    'PF' |
    'PG' |
    'PH' |
    'PK' |
    'PL' |
    'PM' |
    'PN' |
    'PR' |
    'PS' |
    'PT' |
    'PW' |
    'PY' |
    'QA' |
    'RE' |
    'RO' |
    'RS' |
    'RU' |
    'RW' |
    'SA' |
    'SB' |
    'SC' |
    'SD' |
    'SE' |
    'SG' |
    'SH' |
    'SI' |
    'SJ' |
    'SK' |
    'SL' |
    'SM' |
    'SN' |
    'SO' |
    'SR' |
    'SS' |
    'ST' |
    'SV' |
    'SX' |
    'SY' |
    'SZ' |
    'TC' |
    'TD' |
    'TF' |
    'TG' |
    'TH' |
    'TJ' |
    'TK' |
    'TL' |
    'TM' |
    'TN' |
    'TO' |
    'TR' |
    'TT' |
    'TV' |
    'TW' |
    'TZ' |
    'UA' |
    'UG' |
    'UM' |
    'US' |
    'UY' |
    'UZ' |
    'VA' |
    'VC' |
    'VE' |
    'VG' |
    'VI' |
    'VN' |
    'VU' |
    'WF' |
    'WS' |
    'YE' |
    'YT' |
    'ZA' |
    'ZM' |
    'ZW'

import { TMDBError, TMDBIdSchema, TMDBMovieCategorySchema, TMDBTVCategorySchema, TMDBPeopleCategorySchema, TMDBSeasonNumberSchema, TMDBEpisodeNumberSchema } from "@/schemas/tmdb";
import { MovieCategoryType, PeopleCategoryType, TVSeriesCategoryType } from "@/types";

const options: RequestInit = {
    method: "GET",
    cache: "force-cache",
    next: { revalidate: 3600 },
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
};

const baseURL = `https://api.themoviedb.org/3`;

/**
 * Creates a URL query string from the given query parameters
 * @param {Array<Object>} queryParams - array of query parameters
 * @returns {string} - URL query string
 */
const createQueryString = (
    queryParams: { key: string; value: string | number | boolean }[],
): string => {
    const query = new URLSearchParams();
    queryParams.forEach((entry) => {
        query.set(entry.key, entry.value.toString());
    });

    return query.toString();
};

/**
 * Wraps a function with error handling.
 * @param {(...args: Args) => ReturnValue} fn - the function to wrap
 * @returns {(...args: Args) => ReturnValue | null} - the wrapped function
 * @template Args - the types of the arguments
 * @template ReturnValue - the return type of the function
 */
export const withErrorHandling = <Args extends unknown[], ReturnValue>(
    fn: (...args: Args) => ReturnValue,
): ((...args: Args) => ReturnValue | null) => {
    return (...args: Args) => {
        try {
            return fn(...args);
        } catch (error) {
            console.log("Error: ", error);
            return null;
        }
    };
};

/**
 * Makes a request to the TMDB API. Must be called inside a try/catch block
 * @param {Object} obj - request object
 * @param {Object} obj.queryParams - query parameters
 * @param {string} obj.path - path to the TMDB API resource
 * @returns {Promise<Response>} - response from the TMDB API
 * @throws {Error} - if there is an HTTP error
  
    This code snippet defines a function called `TMDBRequest` that makes a request to the TMDB API. It takes an object as a parameter with two properties: `queryParams` and `path`. 

    The `queryParams` property is an array of objects, where each object has two properties: `key` and `value`. These properties represent the query parameters that will be included in the request URL.

    The `path` property is a string that represents the path to the TMDB API resource.

    The function first creates a query string from the `queryParams` array using the `createQueryString` function. It then constructs the full URL by concatenating the `baseURL` and `path` with the query string.

    Next, it uses the `fetch` function to send a GET request to the constructed URL with the `options` object as the request configuration.

    If the response is not successful (i.e., the `ok` property is `false`), it throws an error with the HTTP status code.

    Finally, it returns the response as a `Response` object.

    The purpose of this code is to provide a reusable function for making requests to the TMDB API with customizable query parameters and resource paths.
*/
export const TMDBRequest = async ({
    queryParams,
    path,
}: {
    queryParams: {
        key: string;
        value: string | number | boolean;
    }[];
    path: string;
}): Promise<Response> => {
    const query = createQueryString(queryParams);
    const url = new URL(`${baseURL}${path}?${query}`);

    const response = await fetch(url.toString(), options);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response as Response;
};

/**
 * Validates a TMDB ID.
 * @param {string} id - the TMDB ID to validate
 * @throws {Error} - if there is a validation error
 * @returns {string} - the validated TMDB ID
 */
export const TMDBIdValidator = (id: string): string => {
    const validation = TMDBIdSchema.safeParse(id);

    if (!validation.success) {
        const errorMessage = TMDBError(validation.error);
        throw new Error(`Validation error: ${errorMessage}`);
    }

    return validation.data;
};

/**
 * Validates a TMDB movie category.
 * @param {MovieCategoryType} movieCategory - the TMDB movie category to validate
 * @throws {Error} - if there is a validation error
 * @returns {MovieCategoryType} - the validated TMDB movie category
 */
export const TMDBMovieCategoryValidator = (movieCategory: MovieCategoryType): MovieCategoryType => {
    const validation = TMDBMovieCategorySchema.safeParse(movieCategory);

    if (!validation.success) {
        const errorMessage = TMDBError(validation.error);
        throw new Error(`Validation error: ${errorMessage}`);
    }

    return validation.data as MovieCategoryType;
};

/**
 * Validates a TMDB TV category.
 * @param {TVSeriesCategoryType} tvCategory - the TMDB TV category to validate
 * @throws {Error} - if there is a validation error
 * @returns {TVSeriesCategoryType} - the validated TMDB TV category
 */
export const TMDBTVCategoryValidator = (tvCategory: TVSeriesCategoryType): TVSeriesCategoryType => {
    const validation = TMDBTVCategorySchema.safeParse(tvCategory);

    if (!validation.success) {
        const errorMessage = TMDBError(validation.error);
        throw new Error(`Validation error: ${errorMessage}`);
    }

    return validation.data as TVSeriesCategoryType;
};

/**
 * Validates a TMDB people category.
 * @throws {Error} - if there is a validation error
 * @returns {PeopleCategoryType} - the validated TMDB people category
 */
export const TMDBPeopleCategoryValidator = (peopleCategory: PeopleCategoryType): PeopleCategoryType => {
    const validation = TMDBPeopleCategorySchema.safeParse(peopleCategory);

    if (!validation.success) {
        const errorMessage = TMDBError(validation.error);
        throw new Error(`Validation error: ${errorMessage}`);
    }

    return validation.data as PeopleCategoryType;
};

/**
 * Validates a TMDB season number.
 * @param {string} seasonNumber - the TMDB season number to validate
 * @throws {Error} - if there is a validation error
 * @returns {string} - the validated TMDB season number
 */
export const TMDBSeasonNumberValidator = (seasonNumber: string): string => {
    const validation = TMDBSeasonNumberSchema.safeParse(seasonNumber);

    if (!validation.success) {
        const errorMessage = TMDBError(validation.error);
        throw new Error(`Validation error: ${errorMessage}`);
    }

    return validation.data;
};

/**
 * Validate episode number.
 *
 * The episode number should be a string in the form of a number
 * (e.g. "1", "2", etc.).
 *
 * @param {string} episodeNumber - The episode number to validate.
 * @returns {string} The validated episode number.
 * @throws {Error} If the validation fails.
 */
export const TMDBEpisodeNumberValidator = (episodeNumber: string): string => {
    const validation = TMDBEpisodeNumberSchema.safeParse(episodeNumber);

    if (!validation.success) {
        const errorMessage = TMDBError(validation.error);
        throw new Error(`Validation error: ${errorMessage}`);
    }

    return validation.data;
};
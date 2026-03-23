import { TMDBError, TMDBIdSchema } from "@/schemas/tmdb";
import { FilteringType } from "@/types";

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
    const url = `${baseURL}${path}?${query}`;

    const response = await fetch(url, options);

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
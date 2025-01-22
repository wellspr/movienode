import { MovieDetailsType } from "@/types"
import { getLocale } from "next-intl/server";

export const Title = async ({ movie, className }: { movie: MovieDetailsType, className: string }) => {

    const translations = movie.translations?.translations;
    const locale = await getLocale();

    const englishTranslation = translations && translations.filter(translation => {
        return translation.iso_3166_1 === 'US';
    })[0];

    const currentTranslation = translations && translations.filter(translation => {
        return translation.iso_3166_1 === locale.split('-')[1];
    })[0];

    console.log("Current: ", currentTranslation);
    console.log("English: ", englishTranslation);

    if (currentTranslation) {
        if (currentTranslation.data.title.length > 0) {
            return <h2 className={className ? `${className}__title` : "title"}>{currentTranslation.data.title}</h2>;
        }
    } else if (englishTranslation) {
        if (englishTranslation.data.title.length > 0) {
            return <h2 className={className ? `${className}__title` : "title"}>{englishTranslation.data.title}</h2>;
        }
    }
    return <h2 className={className ? `${className}__title` : "title"}>{movie.title}</h2>;
};
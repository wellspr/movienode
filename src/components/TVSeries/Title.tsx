import { TVSeriesDetailsType } from "@/types"
import { getLocale } from "next-intl/server";

export const Title = async ({ series, className }: { series: TVSeriesDetailsType, className: string }) => {

    const translations = series.translations?.translations;
    const locale = await getLocale();

    const englishTranslation = translations && translations.filter(translation => {
        return translation.iso_3166_1 === 'US';
    })[0];

    const currentTranslation = translations && translations.filter(translation => {
        return translation.iso_3166_1 === locale.split('-')[1];
    })[0];

    if (currentTranslation && currentTranslation.data.name) {
        if (currentTranslation.data.name.length > 0) {
            return <h2 className={className ? `${className}__title` : "title"}>{currentTranslation.data.name}</h2>;
        }
    } else if (englishTranslation && englishTranslation.data.name) {
        if (englishTranslation.data.name.length > 0) {
            return <h2 className={className ? `${className}__title` : "title"}>{englishTranslation.data.name}</h2>;
        }
    }
    return <h2 className={className ? `${className}__title` : "title"}>{series.name}</h2>;
};
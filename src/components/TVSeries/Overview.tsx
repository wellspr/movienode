import { TVSeriesDetailsType } from "@/types"
import { getLocale } from "next-intl/server";

export const Overview = async ({ series, className }: { series: TVSeriesDetailsType, className: string }) => {

    const translations = series.translations?.translations;
    const locale = await getLocale();

    const englishTranslation = translations && translations.filter(translation => {
        return translation.iso_3166_1 === 'US';
    })[0];

    const currentTranslation = translations && translations.filter(translation => {
        return translation.iso_3166_1 === locale.split('-')[1];
    })[0];

    if (currentTranslation) {
        return <p className={className ? `${className}__overview` : "overview"}>{series.overview}</p>
    } else {
        return <p className={className ? `${className}__overview` : "overview"}>{englishTranslation?.data.overview}</p>
    }
};
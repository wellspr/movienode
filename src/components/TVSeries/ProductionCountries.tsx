"use client";

import { MovieProductionCountriesType, TVSeriesDetailsType } from "@/types";
import { useTranslations } from "next-intl";

export const ProductionCountries = ({ series }: { series: TVSeriesDetailsType }) => {

    const t = useTranslations("Movie");

    if (!series.production_countries) return null;
    if (series.production_countries.length === 0) return null;

    const movieProductionCountries = series.production_countries as MovieProductionCountriesType;

    return (
        <div className="movie-production-countries">
            <h4>{t('country', { count: series.production_countries.length })}</h4>
            <ul className="movie-production-countries__list">
                {
                    movieProductionCountries.map((country) => {
                        return (
                            <li className="movie-production-countries__list__item" key={country.name}>
                                {country.name}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};
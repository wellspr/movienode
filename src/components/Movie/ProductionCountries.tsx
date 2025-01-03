import { MovieProductionCountriesType } from "@/types";

export const ProductionCountries = ({movieProductionCountries}: {movieProductionCountries: MovieProductionCountriesType}) => {
    return (
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
    );
}
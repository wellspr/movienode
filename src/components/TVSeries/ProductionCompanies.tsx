import { baseImageUrl } from "@/config";
import { MovieProductionCompaniesType, TVSeriesDetailsType } from "@/types";
import Image from "next/image";

export const ProductionCompanies = ({
    series
}: {
    series: TVSeriesDetailsType
}) => {

    if (!series.production_companies) return null;
    if (series.production_companies.length === 0) return null;

    const movieProductionCompanies = series.production_companies as MovieProductionCompaniesType;

    return (
        <div className="movie-production-companies">
            <ul className="movie-production-companies__list">
                {
                    movieProductionCompanies.map((company) => {
                        return (
                            <li className="movie-production-companies__list__item" key={company.id}>
                                <div className="movie-production-companies__list__item__logo">
                                    {
                                        company.logo_path ?
                                            <Image
                                                className="movie-production-companies__list__item__logo__image"
                                                src={baseImageUrl() + company.logo_path}
                                                alt={company.name}
                                                fill
                                                draggable={false}
                                            /> :
                                            <div className="movie-production-companies__list__item__logo__company-name">
                                                {company.name}
                                            </div>
                                    }
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};
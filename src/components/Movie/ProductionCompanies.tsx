import { baseImageUrl } from "@/config";
import { MovieProductionCompaniesType } from "@/types";
import Image from "next/image";

export const ProductionCompanies = ({
    movieProductionCompanies
}: {
    movieProductionCompanies: MovieProductionCompaniesType
}) => {

    return (
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
    );
}
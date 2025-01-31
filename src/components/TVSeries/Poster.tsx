import { baseImageUrl } from "@/config";
import { TVSeriesDetailsType } from "@/types";
import { IconMovie } from "@tabler/icons-react";
import Image from "next/image";

export const Poster = ({ series }: { series: TVSeriesDetailsType }) => {

    return (
        <div className="movie-poster">
            <div className="movie-poster__wrapper">
                {
                    series.poster_path ?
                        <Image
                            src={baseImageUrl(500) + series.poster_path}
                            alt={series.name}
                            //sizes="100%"
                            fill
                            draggable={false}
                        /> :
                        <div className="movie-poster__placeholder">
                            <div className="movie-poster__placeholder__title">
                                {series.name}
                            </div>
                            <IconMovie size={40} />
                        </div>
                }
            </div>
        </div>
    );
}
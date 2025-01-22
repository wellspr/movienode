import { MovieDetailsType } from "@/types"

export const SpokenLanguages = ({ className, movie }: { className: string, movie: MovieDetailsType }) => {

    if (!movie.spoken_languages) return null;

    const spokenLanguages = movie.spoken_languages.map(lang => lang.english_name).join(", ");

    return (
        <div className={className ? `${className}__spoken-languages` : "spoken-languages"}>
            {spokenLanguages}
        </div>
    );
}
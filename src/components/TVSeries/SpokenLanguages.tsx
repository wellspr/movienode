import { TVSeriesDetailsType } from "@/types"

export const SpokenLanguages = ({ className, series }: { className: string, series: TVSeriesDetailsType }) => {

    if (!series.spoken_languages) return null;

    const spokenLanguages = series.spoken_languages.map(lang => lang.english_name).join(", ");

    return (
        <div className={className ? `${className}__spoken-languages` : "spoken-languages"}>
            {spokenLanguages}
        </div>
    );
}
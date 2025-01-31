import { TVSeriesDetailsType } from "@/types";

export const OriginalTitle = ({ className, series }: { className: string, series: TVSeriesDetailsType }) => {

    if (!series.original_name) return null;

    return (
        <div className={className ? `${className}__original-title` : "original-title"}>
            {series.original_name}
        </div>
    );
};
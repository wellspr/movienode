import { TVSeriesDetailsType } from "@/types"

export const Tagline = ({ series, className }: { series: TVSeriesDetailsType, className: string }) => {
    return <h3 className={className ? `${className}__tagline` : "tagline"}>{series.tagline}</h3>
};
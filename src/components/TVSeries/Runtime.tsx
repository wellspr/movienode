import { TVSeriesDetailsType } from "@/types"
import { IconClock } from "@tabler/icons-react"

export const Runtime = ({ series, className }: { series: TVSeriesDetailsType, className: string }) => {
    if (series.episode_run_time) {
        return (
            <div className={className ? `${className}__runtime` : "runtime"}>
                <IconClock size={18} />
                {series.episode_run_time}
                <span>min</span>
            </div>
        );
    }
};
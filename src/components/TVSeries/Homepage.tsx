import { Link } from "@/i18n/routing"
import { TVSeriesDetailsType } from "@/types"
import { IconExternalLink } from "@tabler/icons-react"

export const Homepage = ({ series, className }: { series: TVSeriesDetailsType, className: string }) => {
    if (series.homepage) {
        return (
            <Link
                className={className ? `link ${className}__link` : "link"}
                href={series.homepage}
                target="_blank">
                {series.homepage} <IconExternalLink />
            </Link>
        );
    }
};
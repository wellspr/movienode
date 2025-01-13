import { Locale } from "@/i18n/types";
import { ReleaseDatesType } from "@/types";
import { useTranslations } from "next-intl";

export const Certification = ({ releaseDates, locale }: { releaseDates: ReleaseDatesType, locale: Locale }) => {

    const t = useTranslations("Movie.Certification");

    const result = releaseDates.results.filter(result => {
        return result.iso_3166_1 === locale.split('-')[1];
    });

    if (result.length === 0) return null;

    const releases = result[0].release_dates.filter(release => {
        return release.certification;
    });

    if (releases.length === 0) return null;

    const release = releases[0]

    return (
        <div className="certification">
            {
                <p className="certification__value">
                    {t('classification')}: {release.certification}
                </p>
            }

            {
                release.descriptors &&

                <div className="certification__descriptors">
                    {release.descriptors.join(", ")}
                </div>
            }
        </div>
    );
}
import { getPersonDetails } from "@/actions";
import { Person } from "@/components/Person";
import { Locale } from "@/i18n/types";

export default async function Page({
    params,
}: {
    params: Promise<{ personId: string, locale: Locale }>
}) {
    const { personId, locale } = await params;

    const personDetails = await getPersonDetails(locale, personId);

    return <Person person={personDetails} locale={locale} />;
}
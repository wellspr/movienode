import { getTrendingPeople } from "@/actions";
import { Locale } from "@/i18n/types";
import { PeopleList } from "./PeopleList";

export const HomepageTrendingPeopleBanner = async ({ locale }: { locale: Locale }) => {

    const { results } = await getTrendingPeople(locale, '1');

    return <PeopleList category="trending" results={results} />
}
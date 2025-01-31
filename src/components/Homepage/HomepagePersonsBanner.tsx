import { getPopularPeople } from "@/actions";
import { Locale } from "@/i18n/types";
import { PeopleList } from "./PeopleList";

export const HomepagePersonsBanner = async ({ locale }: { locale: Locale }) => {

    const { results } = await getPopularPeople(locale, '1');

    return <PeopleList results={results} category="popular" />
}
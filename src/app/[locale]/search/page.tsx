import { getMovieGenreList } from "@/actions";
import { Search } from "@/components/Search";
import { Locale } from "@/i18n/types";

export default async function Page({params}: {params: Promise<{locale: Locale}>}) {

    const {locale} = await params;

    const genres = await getMovieGenreList(locale);

    return <Search locale={locale} genres={genres} />;
}
import { getMovieGenreList } from "@/actions";
import { GenresList } from "@/components/Genres/GenresList";
import { Form, ShowResults } from "@/components/Search";
import { Locale } from "@/i18n/types";

export default async function Layout({
    params,
    movie,
    person,
}: {
    params: Promise<{ locale: Locale }>,
    movie: React.ReactNode,
    person: React.ReactNode,
    children: React.ReactNode
}) {

    const { locale } = await params;
    const genres = await getMovieGenreList(locale);

    return (
        <div className="search">
            <Form />
            <GenresList genres={genres} locale={locale} />
            <ShowResults movie={movie} person={person} />
        </div>
    );
}
import { Form, ShowResults } from "@/components/Search";

export default async function Layout({
    movie,
    person,
    tv,
}: {
    movie: React.ReactNode,
    person: React.ReactNode,
    tv: React.ReactNode,
}) {
    return (
        <div className="search">
            <Form />
            <ShowResults movie={movie} person={person} tv={tv} />
        </div>
    );
}
"use client";

import { SearchType } from "@/types";
import { useSearchParams } from "next/navigation";

export const ShowResults = ({
    movie,
    tv,
    person,
}: {
    movie: React.ReactNode,
    tv: React.ReactNode,
    person: React.ReactNode,
}) => {

    const searchParams = useSearchParams();
    const query = searchParams.get('query')?.toString();
    const type = searchParams.get('type')?.toString() as SearchType;

    if (query && type === "movie") {
        return <>{movie}</>
    }

    if (query && type == "person") {
        return <>{person}</>
    }

    if (query && type === "tv") {
        return <>{tv}</>
    }
};
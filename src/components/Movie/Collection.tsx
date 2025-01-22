"use server";

import { getCollection } from "@/actions";
import { baseImageUrl } from "@/config";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { MovieDetailsType } from "@/types";
import Image from "next/image";

export const Collection = async ({
    locale,
    movie,
}: {
    locale: Locale,
    movie: MovieDetailsType
}) => {

    if (!movie.belongs_to_collection) return null;

    const collectionId = movie.belongs_to_collection.id;
    const collection = await getCollection(locale, collectionId);

    return (
        <div className="collection">
            <h4 className="collection__name">{movie.belongs_to_collection.name}</h4>
            <p className="collection__overview">{collection.overview}</p>

            <div className="collection__parts">
                {
                    collection.parts.map(part => {
                        return (
                            <div key={part.id} className="collection__parts__part">
                                <Link href={`/movie/${part.id}`}>
                                    <div className="collection__parts__part__poster">
                                        <Image
                                            src={baseImageUrl() + part.poster_path}
                                            alt={part.title}
                                            fill
                                        />
                                    </div>
                                    {part.title}
                                </Link>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};
"use client";

import { addFavorite, isItemInFavorites } from "@/actions/user";
import { IconHeart } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { FavoritePayloadType } from "@/actions/user/lists/types";
import { usePathname } from "@/i18n/routing";
import { ButtonAddToList } from "../ButtonAddToList";

export const AddToFavorites = ({ id }: { id: number }) => {

    const [payload, setPayload] = useState<FavoritePayloadType>({ media_id: id, media_type: 'movie', favorite: true });

    const [isIn, setIsIn] = useState(false);

    const AddToFavoritesButton = () => {

        const status = useFormStatus();

        useEffect(() => {
            isItemInFavorites(id, 'movie')
                .then(r => {
                    setIsIn(r);
                })
                .catch(err => console.log(err));
        }, [status.pending]);

        return (
            <ButtonAddToList label="Add to favorites" pending={status.pending} size={25}>
                <div className={isIn ? "button__icon button__icon--favorites" : "button__icon"}>
                    <IconHeart size={25} />
                </div>
            </ButtonAddToList>
        );
    };

    useEffect(() => {
        setPayload({ media_id: id, media_type: 'movie', favorite: !isIn });
    }, [id, isIn]);

    const pathname = usePathname();

    const addMovieToFavorites = addFavorite.bind(null, payload, pathname);

    return (
        <form action={addMovieToFavorites}>
            <AddToFavoritesButton />
        </form>
    );
};
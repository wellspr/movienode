"use client";

import { addFavorite, isItemInFavorites } from "@/actions/user";
import { IconHeart } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { FavoritePayloadType } from "@/actions/user/lists/types";
import { usePathname } from "@/i18n/routing";
import { ButtonAddToList } from "../ButtonAddToList";

export const AddToFavorites = ({ id }: { id: number }) => {

    const [payload, setPayload] = useState<FavoritePayloadType>({ media_id: id, media_type: 'tv', favorite: true });

    const [isIn, setIsIn] = useState(false);

    const AddToFavoritesButton = () => {

        const status = useFormStatus();

        useEffect(() => {
            isItemInFavorites(id, 'tv')
                .then(r => {
                    setIsIn(r);
                })
                .catch(err => console.log(err));
        }, [status.pending]);

        return (
            <ButtonAddToList label="Add to favorites" pending={status.pending} size={25}>
                <div className={isIn ? "button__icon--favorites" : ""}>
                    <IconHeart />
                </div>
            </ButtonAddToList>
        );
    };

    useEffect(() => {
        setPayload({ media_id: id, media_type: 'tv', favorite: !isIn });
    }, [id, isIn]);

    const pathname = usePathname();

    const addMovieToFavorites = addFavorite.bind(null, payload, pathname);

    return (
        <div>
            <form action={addMovieToFavorites}>
                <AddToFavoritesButton />
            </form>
        </div>
    );
};
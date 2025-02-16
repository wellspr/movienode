"use client";

import { addFavorite, isItemInFavorites } from "@/actions/user";
import { IconHeart } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { ButtonLoader } from "../ButtonLoader";
import { FavoritePayloadType } from "@/actions/user/lists/types";
import { usePathname } from "@/i18n/routing";

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
            <button type="submit" className={`button button__add-to-list`}>
                Add to favorites
                {
                    status.pending ?
                        <ButtonLoader size={25} /> :
                        <div className={isIn ? "button__icon--favorites" : ""}>
                            <IconHeart size={25} />
                        </div>
                }
            </button>
        );
    };

    useEffect(() => {
        setPayload({ media_id: id, media_type: 'movie', favorite: !isIn });
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
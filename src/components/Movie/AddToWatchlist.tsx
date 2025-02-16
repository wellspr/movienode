"use client";

import { addToWatchlist, isItemInWatchList } from "@/actions/user";
import { IconBookmark } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { WatchListPayloadType } from "@/actions/user/lists/types";
import { usePathname } from "@/i18n/routing";
import { ButtonAddToList } from "../ButtonAddToList";

export const AddToWatchlist = ({ id }: { id: number }) => {

    const [payload, setPayload] = useState<WatchListPayloadType>({ media_id: id, media_type: 'movie', watchlist: true });

    const [isIn, setIsIn] = useState(false);

    const AddToWatchlistButton = () => {

        const status = useFormStatus();

        useEffect(() => {
            isItemInWatchList(id, 'movie')
                .then(r => {
                    setIsIn(r);
                })
                .catch(err => console.log(err));
        }, [status.pending]);

        return (
            <ButtonAddToList label="Add to watchlist" pending={status.pending} size={25}>
                <div className={isIn ? "button__icon button__icon--watchlist" : "button__icon"}>
                    <IconBookmark size={25} />
                </div>
            </ButtonAddToList>
        );
    };

    useEffect(() => {
        setPayload({ media_id: id, media_type: 'movie', watchlist: !isIn });
    }, [id, isIn]);

    const pathname = usePathname();

    const addMovieToWatchlist = addToWatchlist.bind(null, payload, pathname);

    return (
        <form action={addMovieToWatchlist}>
            <AddToWatchlistButton />
        </form>
    );
};
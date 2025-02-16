"use client";

import { addToWatchlist, isItemInWatchList } from "@/actions/user";
import { IconBookmark } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { WatchListPayloadType } from "@/actions/user/lists/types";
import { usePathname } from "@/i18n/routing";
import { ButtonAddToList } from "../ButtonAddToList";

export const AddToWatchlist = ({ id }: { id: number }) => {

    const [payload, setPayload] = useState<WatchListPayloadType>({ media_id: id, media_type: 'tv', watchlist: true });

    const [isIn, setIsIn] = useState(false);

    const AddToWatchlistButton = () => {

        const status = useFormStatus();

        useEffect(() => {
            isItemInWatchList(id, 'tv')
                .then(r => {
                    setIsIn(r);
                })
                .catch(err => console.log(err));
        }, [status.pending]);

        return (
            <ButtonAddToList label="Add to watchlist" pending={status.pending} size={25}>
                <div className={isIn ? "button__icon--watchlist" : ""}>
                    <IconBookmark />
                </div>
            </ButtonAddToList>
        );
    };

    useEffect(() => {
        setPayload({ media_id: id, media_type: 'tv', watchlist: !isIn });
    }, [id, isIn]);

    const pathname = usePathname();

    const addMovieToWatchlist = addToWatchlist.bind(null, payload, pathname);

    return (
        <div>
            <form action={addMovieToWatchlist}>
                <AddToWatchlistButton />
            </form>
        </div>
    );
};
"use client";

import { ListMarkers } from "@/components/ListMarkers";
import { Scroller } from "@/components/Scroller";
import { baseImageUrl, paths } from "@/config";
import { Scroll } from "@/hooks/useScroll";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { ImageType } from "@/types";
import Image from "next/image";
import { useParams } from "next/navigation";

export const Backdrops = ({ backdrops, scroll }: { backdrops?: ImageType[], scroll: Scroll }) => {    

    const { seriesId, locale } = useParams();

    return (
        <div className="backdrops">
            <Scroller>
                <ul className="movie-images__list" ref={scroll.containerRef}>
                    {
                        backdrops && backdrops.map(image => {
                            return (
                                <li key={image.file_path}
                                    className="movie-images__list__item"
                                    draggable={false}>
                                    <Link
                                        href={`${paths.tv(String(seriesId))}/images?focusedImage=${image.file_path}`}
                                        locale={locale as Locale}
                                        draggable={false}>
                                        <Image
                                            src={baseImageUrl(500) + image.file_path}
                                            alt={image.file_path}
                                            fill
                                            draggable={false}
                                        />
                                    </Link>
                                </li>
                            );
                        })
                    }
                </ul>
            </Scroller>
            <ListMarkers
                currentScrollPage={scroll.currentScrollPage}
                markerRef={scroll.markerRef}
                totalScrollPages={scroll.totalScrollPages}
                isOverflown={scroll.isOverflown}
            />
        </div>
    );
};


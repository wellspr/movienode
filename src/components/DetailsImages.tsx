"use client";

import { baseImageUrl } from "@/config";
import { useScroll } from "@/hooks/useScroll";
import { BackdropType, ImagesType } from "@/types";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const DetailsImages = ({ movieImages }: { movieImages: ImagesType }) => {

    const { containerRef } = useScroll({wheelScroll: true});

    const query = useSearchParams();

    const [selected, setSelected] = useState<{
        previous: BackdropType | null,
        current: BackdropType | null,
        next: BackdropType | null,
    }>({ previous: null, current: movieImages.backdrops[0], next: movieImages.backdrops[1] || null });

    useEffect(() => {
        const focusedImageFilePath = query.get("focusedImage");
        if (focusedImageFilePath) {
            movieImages.backdrops.forEach((image, index) => {
                if (image.file_path === focusedImageFilePath) {
                    const previous = index - 1 >= 0 ? movieImages.backdrops[index - 1] : null;
                    const current = movieImages.backdrops[index];
                    const next = index + 1 < movieImages.backdrops.length ? movieImages.backdrops[index + 1] : null;
                    setSelected({ previous, current, next });
                }
            })
        }
    }, [movieImages.backdrops, query]);

    useEffect(() => {
        document.getElementById(selected.current?.file_path as string)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }, [selected]);

    useEffect(() => {
        console.log(query.get("focusedImage"));
    }, [query]);

    /*     useEffect(() => {
            const container = containerRef.current;
    
            const handleWheel = (event: WheelEvent) => {
                if (container?.contains(event.target as Node)) {                
                    console.log(event);
                    document.body.style.position = "fixed";
                }
            };
    
            container?.addEventListener("wheel", handleWheel);
    
            return () => {
                container?.removeEventListener("wheel", handleWheel);
            }
        }, [containerRef]); */

    return (
        <div className="movie-details__images">
            <div className="movie-details__images__selected-outer">
                {
                    movieImages.backdrops.length > 1 && selected.previous &&
                    <button className="icon movie-details__images__nav-button movie-details__images__nav-button--left"
                        onClick={() => {
                            movieImages.backdrops.forEach((image, index) => {
                                if (image.file_path === selected.current?.file_path) {
                                    const previous = index - 2 >= 0 ? movieImages.backdrops[index - 2] : null;
                                    const current = index - 1 >= 0 ? movieImages.backdrops[index - 1] : null;
                                    if (index > 0) {
                                        setSelected({ previous, current, next: image });
                                    }
                                }
                            });
                        }}>
                        <IconChevronLeft size={30} />
                    </button>
                }
                <div className="movie-details__images__selected">
                    <Image
                        src={baseImageUrl() + selected.current?.file_path}
                        alt={selected.current?.file_path as string}
                        fill
                    />
                </div>
                {
                    movieImages.backdrops.length > 1 && selected.next &&
                    <button className="icon movie-details__images__nav-button movie-details__images__nav-button--right"
                        onClick={() => {
                            movieImages.backdrops.forEach((image, index) => {
                                if (image.file_path === selected.current?.file_path) {
                                    const l = movieImages.backdrops.length;
                                    const current = index + 1 < l ? movieImages.backdrops[index + 1] : null;
                                    const next = index + 2 < l ? movieImages.backdrops[index + 2] : null;
                                    if (current) {
                                        setSelected({ previous: image, current, next });
                                    }
                                }
                            });
                        }}>
                        <IconChevronRight size={30} />
                    </button>
                }
            </div>

            <ul className="movie-details__images__list" ref={containerRef}>
                {
                    movieImages?.backdrops.map((image, index) => {
                        return (
                            <li key={image.file_path}
                                className="movie-details__images__list__item"
                                style={selected.current?.file_path === image.file_path ? { border: "3px solid white" } : {}}
                                onClick={() => {
                                    const previous = index - 1 >= 0 ? movieImages.backdrops[index - 1] : null;
                                    const next = index + 1 < movieImages.backdrops.length ? movieImages.backdrops[index + 1] : null
                                    setSelected({ previous, current: image, next });
                                }}>
                                <Image
                                    id={image.file_path}
                                    src={baseImageUrl(500) + image.file_path}
                                    alt={image.file_path}
                                    fill
                                />
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};
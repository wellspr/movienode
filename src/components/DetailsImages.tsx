"use client";

import { baseImageUrl } from "@/config";
import { useScroll } from "@/hooks/useScroll";
import { ImageType, MovieImagesType } from "@/types";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const DetailsImages = ({ movieImages }: { movieImages: MovieImagesType }) => {

    const { containerRef, isOverflown } = useScroll({ wheelScroll: true });

    const query = useSearchParams();

    const [selected, setSelected] = useState<{
        previous: ImageType | null,
        current: ImageType | null,
        next: ImageType | null,
    }>();

    useEffect(() => {
        const focusedImageFilePath = query.get("focusedImage");
        const initialImage = { previous: null, current: movieImages.backdrops[0], next: movieImages.backdrops[1] || null };
        if (focusedImageFilePath) {
            movieImages.backdrops.forEach((image, index) => {
                if (image.file_path === focusedImageFilePath) {
                    const previous = index - 1 >= 0 ? movieImages.backdrops[index - 1] : null;
                    const current = movieImages.backdrops[index];
                    const next = index + 1 < movieImages.backdrops.length ? movieImages.backdrops[index + 1] : null;
                    setSelected({ previous, current, next });
                }
            });
        } else {
            setSelected(initialImage);
        }
    }, [movieImages.backdrops, query]);

    useEffect(() => {
        if (selected && selected.current) {
            const selectedImage = document.getElementById(selected.current?.file_path as string);
            if (selectedImage) {
                selectedImage.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
            }
        }
    }, [selected]);

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

    if (!selected) return null;

    return (
        <div className="movie-details__images">
            <div className="movie-details__images__selected-outer">
                {
                    movieImages.backdrops.length > 1 &&
                    <button className={selected.previous ? "icon movie-details__images__nav-button movie-details__images__nav-button--left" : "hide"}
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
                        draggable={false}
                    />
                </div>
                {
                    movieImages.backdrops.length > 1 &&
                    <button className={selected.next ? "icon movie-details__images__nav-button movie-details__images__nav-button--right" : "hide"}
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

            <ul className={isOverflown ? "movie-details__images__list" : "movie-details__images__list centered" } ref={containerRef}>
                {
                    movieImages?.backdrops.map((image, index) => {
                        return (
                            <li key={image.file_path}
                                className={
                                    selected.current?.file_path === image.file_path ?
                                        "movie-details__images__list__item movie-details__images__list__item--current" :
                                        "movie-details__images__list__item"}
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
                                    draggable={false}
                                />
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};
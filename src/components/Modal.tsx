"use client";

import { IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export const Modal = ({ children, showCloseButton, href }: { children: React.ReactNode, showCloseButton?: boolean, href?: string }) => {

    const router = useRouter();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentContainer = ref.current;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                router.back();
            }
        };

        const handleCLick = (event: MouseEvent) => {
            if (currentContainer && !currentContainer.contains(event.target as Node)) {
                router.back();
            }
        };

        window.addEventListener('click', handleCLick);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('click', handleCLick);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [router]);

    return (
        <div className="modal">
            <div className="modal__overlay">
                <div className="modal__content" ref={ref}>
                    <div className="modal__content__header">
                        {
                            showCloseButton && (

                                href ? <CloseButton href={href} /> : <CloseButton />
                            )
                        }
                    </div>
                    <div className="modal__content__main">
                        {children}
                    </div>
                    <div className="modal__content__footer"></div>
                </div>
            </div>
        </div>
    );
};

export const CloseButton = ({ href }: { href?: string }) => {

    const router = useRouter();

    return (
        <button className="icon modal__content__header__button-close"
            onClick={() => {
                if (href) {
                    router.push(href, { scroll: false });
                    console.log(href);
                } else {
                    router.back();
                }
            }}>
            <IconX />
        </button>
    );
};
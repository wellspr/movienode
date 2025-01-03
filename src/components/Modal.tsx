"use client";

import { IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export const Modal = ({ children }: { children: React.ReactNode }) => {

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
                        <button className="icon modal__content__header__button-close"
                            onClick={router.back}>
                            <IconX />
                        </button>
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
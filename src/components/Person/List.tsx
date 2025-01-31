"use client";

import { Scroll } from "@/hooks/useScroll";
import { PersonType } from "@/types";
import { Scroller } from "../Scroller";
import { ListMarkers } from "../ListMarkers";
import { Card } from "./Card";

export const List = ({ results, scroll, appendItem }: { results: PersonType[], scroll: Scroll, appendItem?: React.ReactNode }) => {

    return (
        <div className={`horizontal-list-container`}>
            <Scroller>
                <ul className={`horizontal-list`} ref={scroll.containerRef}>
                    {
                        results.map((person) => {
                            return <Card key={person.id} person={person} />;
                        })
                    }
                    {
                        appendItem &&
                        <div className="person-card person-card--appended">
                            {appendItem}
                        </div>
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
}
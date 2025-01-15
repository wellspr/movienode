export const ListMarkers = ({
    totalScrollPages,
    currentScrollPage,
    markerRef,
    isOverflown,
}: {
    totalScrollPages: number,
    currentScrollPage: number,
    markerRef: React.RefObject<HTMLDivElement | null>,
    isOverflown: boolean,
}) => {

    if (!isOverflown) return null;
    
    const markers = [];
    for (let i = 0; i < totalScrollPages; i++) {
        markers.push(i);
    }

    return (
        <div className="markers" ref={markerRef}>
            {
                markers.map((marker, index) => {
                    return (
                        <div key={index} className={marker === currentScrollPage - 1 ? "marker marker--current" : "marker"}></div>
                    );
                })
            }
        </div>
    );
};
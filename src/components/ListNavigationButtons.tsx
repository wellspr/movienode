import { Scroll } from "@/hooks/useScroll";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export const ListNavigationButtons = ({scroll}:{scroll: Scroll}) => {
    if (!scroll.isOverflown) return null;
    return (
        <div className="horizontal-list__buttons">
            <button
                className={`icon horizontal-list__buttons__button horizontal-list__buttons__button--left`}
                disabled={scroll.buttonLeftDisabled}
                ref={scroll.buttonLeftRef}
                onClick={scroll.scrollLeft}>
                <IconChevronLeft size={30} />
            </button>
            <button
                className={`icon horizontal-list__buttons__button horizontal-list__buttons__button--right`}
                disabled={scroll.buttonRightDisabled}
                ref={scroll.buttonRightRef}
                onClick={scroll.scrollRight}>
                <IconChevronRight size={30} />
            </button>
        </div>
    );
};
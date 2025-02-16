import { IconLoader2 } from "@tabler/icons-react";

export const ButtonLoader = ({ size }: { size?: number }) => {
    if (!size) {
        size = 30;
    }
    
    return (
        <div className="loader button__loader">
            <div className="loader__loading"
                style={{ width: `${size}px`, height: `${size}px` }}>
                <IconLoader2 size={size} />
            </div>
        </div>
    );
};
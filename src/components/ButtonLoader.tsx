import { IconLoader2 } from "@tabler/icons-react";

export const ButtonLoader = ({size}: {size?: number}) => {
    return (
        <div className="loading button__loader">
            <IconLoader2 size={size} />
        </div>
    );
};
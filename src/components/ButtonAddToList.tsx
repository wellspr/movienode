import { ButtonLoader } from "./ButtonLoader";

export const ButtonAddToList = ({
    pending,
    label,
    size,
    children
}: {
    pending: boolean
    label: string
    size: number
    children: React.ReactNode
}) => {

    return (
        <button type="submit" className={`button button__add-to-list`} disabled={pending}>
            {label}
            <div style={{ width: `${size}px`, height: `${size}px` }}>
                {
                    pending ?
                        <ButtonLoader size={size} /> :
                        <>{children}</>
                }
            </div>
        </button>
    );
};
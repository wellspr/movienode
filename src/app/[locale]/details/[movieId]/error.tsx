"use client";

import { useEffect } from "react";

export default function Error({ 
    error,
    reset,
}: { 
    error: Error & { digest?: string },
    reset: () => void,
}) {

    useEffect(() => {
        console.log(error);
    }, [error]);

    return (
        <div className="error">
            <h2>Error</h2>
            <p>Something went wrong</p>
            <button onClick={reset}>Try again</button>
        </div>
    );
}
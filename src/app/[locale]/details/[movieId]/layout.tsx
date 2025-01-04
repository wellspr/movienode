export default function Layout({
    children,
    recommendations,
}: {
    children: React.ReactNode,
    recommendations: React.ReactNode,
}) {
    return (
        <>
            {children}
            {recommendations}
        </>
    );
}
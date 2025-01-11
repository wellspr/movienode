import { Similar } from "@/components/Movie/Similar";
import { Locale } from "@/i18n/types";

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ movieId: string, locale: Locale }>
    searchParams: Promise<{ page: string }>
}) {
    const { movieId } = await params;

    const page = (await searchParams).page || '1';

    return <Similar movieId={movieId} page={page} />;
}
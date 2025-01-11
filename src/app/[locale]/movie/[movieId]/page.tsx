import { Details } from "@/components/Details";
import {  } from "@/components/Movie/";
import { Locale } from "@/i18n/types";

export default async function Page({
    params,
}: {
    params: Promise<{ movieId: string, locale: Locale }>
}) {
    const { movieId, locale } = await params;

    return <Details locale={locale as Locale} movieId={movieId} />;
}
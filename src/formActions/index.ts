"use server";

import { Locale } from "@/i18n/types";
import { SearchType } from "@/types";
import { redirect } from "next/navigation";

export async function searchAction(formData: FormData) {

    const searchType = formData.get("searchType")?.toString() as SearchType;
    const locale = formData.get("locale")?.toString() as Locale;
    const query = formData.get("query")?.toString() as string;
    const page = formData.get("page")?.toString() || '1' as string;

    const redirectURL = encodeURI(`/${locale}/search?query=${query}&type=${searchType}&page=${page}`);
    
    redirect(redirectURL);
}
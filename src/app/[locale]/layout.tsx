import { Header } from "@/components/Header";
import { routing } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function Layout({
	modal,
	children,
}: {
	modal: React.ReactNode,
	children: React.ReactNode,
}) {

	const locale = await getLocale() as Locale;

	if (!routing.locales.includes(locale)) {
		notFound();
	}

	const messages = await getMessages();

	return (
		<NextIntlClientProvider messages={messages}>
			<Header />
			{modal}
			{children}
		</NextIntlClientProvider>
	);
}

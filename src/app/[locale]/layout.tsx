import { Footer } from "@/components/Layout/Footer";
import { Header } from "@/components/Layout/Header";
import { Main } from "@/components/Layout/Main";
import { routing } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function Layout({
	imagesModal,
	children,
}: {
	imagesModal: React.ReactNode,
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
			<Main>
				{imagesModal}
				{children}
			</Main>
			<Footer />
		</NextIntlClientProvider>
	);
}
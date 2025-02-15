import { Footer } from "@/components/Layout/Footer";
import { Header } from "@/components/Layout/Header";
import { Main } from "@/components/Layout/Main";
import { AuthContext } from "@/contexts/AuthContext";
import { routing } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function Layout({
	params,
	imagesModal,
	menuModal,
	children,
}: {
	params: Promise<{ locale: Locale }>
	imagesModal: React.ReactNode
	menuModal: React.ReactNode
	children: React.ReactNode
}) {

	const { locale } = await params;

	if (!routing.locales.includes(locale)) {
		notFound();
	}

	const messages = await getMessages();

	return (
		<NextIntlClientProvider messages={messages}>
			<AuthContext>
				<Header />
				<Main>
					{menuModal}
					{imagesModal}
					{children}
				</Main>
				<Footer />
			</AuthContext>
		</NextIntlClientProvider>
	);
}
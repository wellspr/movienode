import { HomepageBanner } from "@/components/Homepage/Banner";
import { Locale } from "@/i18n/types";

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {

	const { locale } = await params;

	return (
		<div className="homepage">
			<HomepageBanner banner_type={"movie"} locale={locale} movieCategory="trending" />
			<HomepageBanner banner_type={"tv"} locale={locale} tvSeriesCategory="trending" />
			<HomepageBanner banner_type={"person"} locale={locale} peopleCategory="trending" />
			
			<HomepageBanner banner_type="movie" locale={locale} movieCategory="recommendations" />
			<HomepageBanner banner_type="movie" locale={locale} movieCategory="favorites" />
			<HomepageBanner banner_type="movie" locale={locale} movieCategory="watchlist" />

			<HomepageBanner banner_type="movie" locale={locale} movieCategory="popular" />
			<HomepageBanner banner_type="tv" locale={locale} tvSeriesCategory="popular" />
			<HomepageBanner banner_type="person" locale={locale} peopleCategory="popular" />

			<HomepageBanner banner_type="tv" locale={locale} tvSeriesCategory="recommendations" />
			<HomepageBanner banner_type="tv" locale={locale} tvSeriesCategory="favorites" />
			<HomepageBanner banner_type="tv" locale={locale} tvSeriesCategory="watchlist" />
		</div>
	);
}

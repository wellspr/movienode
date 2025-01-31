import { HomepageMovieBanner } from "@/components/Homepage/HomepageMovieBanner";
import { HomepagePersonsBanner } from "@/components/Homepage/HomepagePersonsBanner";
import { HomepageTrendingMoviesBanner } from "@/components/Homepage/HomepageTrendingMoviesBanner";
import { HomepageTrendingPeopleBanner } from "@/components/Homepage/HomepageTrendingPeopleBanner";
import { HomepageTrendingTVSeriesBanner } from "@/components/Homepage/HomepageTrendingTVSeriesBanner";
import { HomepageTVSeriesBanner } from "@/components/Homepage/HomepageTVSeriesBanner";
import { Locale } from "@/i18n/types";

export default async function Page({
	params,
}: {
	params: Promise<{ locale: Locale }>
}) {

	const { locale } = await params;

	return (
		<div className="homepage">
			<HomepageTrendingMoviesBanner locale={locale} />
			<HomepageTrendingTVSeriesBanner locale={locale} />
			<HomepageTrendingPeopleBanner locale={locale} />
			<HomepageMovieBanner locale={locale} category="popular" />
			<HomepageTVSeriesBanner locale={locale} category="popular" />
			<HomepagePersonsBanner locale={locale} />
		</div>
	);
}

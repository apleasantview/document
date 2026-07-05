import baseline, {
  config as baselineConfig,
} from "@apleasantview/eleventy-plugin-baseline";

const siteUrl = process.env.URL || 'http://localhost:8080/';

const settings = {
  title: 'document',
  url: siteUrl,
  defaultLanguage: "en",
  head: {
		link: [{ rel: 'stylesheet', href: '/assets/css/index.css' }],
		meta: [{ name: 'color-scheme', content: 'light dark' }],
		// Pre-paint: honour a saved theme before the body renders, so no flash.
		script: [
			{ content: "var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;" }
		]
	},
  seo: {
    preserveQueryParams: false,
    ogImage: { url: new URL('/og.jpg', siteUrl).href, width: 1200, height: 630, alt: "CSS Profile, an inquiry into the document's identity" },
    openGraph: { type: 'website' },
    twitter: { card: 'summary_large_image' }
  }
};

export default async function (eleventyConfig) {
  await eleventyConfig.addPlugin(
    baseline(settings, {
      head: {
        showGenerator: true,
      },
    }),
  );

  eleventyConfig.addGlobalData('settings', settings);
}

export const config = baselineConfig;

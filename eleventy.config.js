import baseline, {
  config as baselineConfig,
} from "@apleasantview/eleventy-plugin-baseline";

const settings = {
  title: "Document",
  url: process.env.URL,
  defaultLanguage: "en",
};

export default async function (eleventyConfig) {
  await eleventyConfig.addPlugin(
    baseline(settings, {
      head: {
        showGenerator: true,
      },
    }),
  );
}

export const config = baselineConfig;

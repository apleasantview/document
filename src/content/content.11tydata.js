export default {
	lang: 'en',
	layout: 'base.njk',

	// permalink (covered below)
	permalink: function (data) {
		const { slug, page, section } = data;

		// Don't try to render the data file itself as a page.
		if (page.inputPath.includes('11tydata.js')) {
			return false;
		}

		// Front-matter slug wins; otherwise fall back to the file's own slug.
		const slugified = slug ? this.slugify(slug) : page.fileSlug;

		// Compose /<section[0]>/<section[1]>/.../<slug>/.
		const parts = (section ?? []).map((part) => this.slugify(part));
		// A section-index page already names itself in its section chain
		// (e.g. /lexicon/ carries section ['lexicon']); don't repeat the segment.
		if (parts[parts.length - 1] !== slugified) parts.push(slugified);

		// Leading slash anchors to the site root; trailing slash is the project convention.
		return '/' + parts.join('/') + '/';
	},

	// Within-section prev/next, derived from navigation.js — the single source of
	// order, so the links can't drift. Find this page among a section's children
	// and hand back its neighbours; pages outside the nav (home, landings) get null.
	eleventyComputed: {
		pageNav: (data) => {
			const url = data.page.url;
			for (const item of data.navigation ?? []) {
				const kids = item.children ?? [];
				const i = kids.findIndex((c) => c.url === url);
				if (i !== -1) return { prev: kids[i - 1] ?? null, next: kids[i + 1] ?? null };
			}
			return null;
		}
	}
};

import type { MetaTagsProps } from 'svelte-meta-tags';

const title = 'Year Trail';
const tagline = 'Counting Down the Days';
const description = 'Watch the year progress through a visuals.';

export const load = ({ url }) => {
	const baseMetaTags = Object.freeze({
		title,
		titleTemplate: `%s - ${tagline}`,
		description,
		canonical: new URL(url.pathname, url.origin).href,
		openGraph: {
			type: 'website',
			url: new URL(url.pathname, url.origin).href,
			locale: 'en_IE',
			title,
			description,
			siteName: title
		}
	}) satisfies MetaTagsProps;

	return {
		baseMetaTags
	};
};

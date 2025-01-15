import type { PageLoad } from './$types';
import type { MetaTagsProps } from 'svelte-meta-tags';

const title = 'Year Dots';
const tagline = 'Counting Down the Days Using Dots';
const description = 'Watch the year progress through a dots.';
const favicon = '🟢';

export const load = (async () => {
	const pageMetaTags = Object.freeze({
		title,
		titleTemplate: `%s - ${tagline}`,
		description,
		openGraph: {
			title,
			description,
			siteName: title
		}
	}) satisfies MetaTagsProps;

	return {
		pageMetaTags,
		favicon
	};
}) satisfies PageLoad;

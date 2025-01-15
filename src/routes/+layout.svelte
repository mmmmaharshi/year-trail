<script lang="ts">
	import { MetaTags, deepMerge } from 'svelte-meta-tags';

	import { page } from '$app/state';
	import '../app.css';

	let { data, children } = $props();

	let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));
</script>

<MetaTags {...metaTags} />

<svelte:head>
	<link
		rel="icon"
		href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>{data.favicon}</text></svg>"
	/>
</svelte:head>

{@render children()}

<script lang="ts">
	import { MetaTags, deepMerge } from 'svelte-meta-tags';

	import { page } from '$app/state';
	import '../app.css';

	let { data, children } = $props();

	let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));
</script>

<MetaTags {...metaTags} />

{@render children()}

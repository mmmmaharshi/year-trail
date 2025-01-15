<script lang="ts">
	let { data } = $props();

	import { onMount } from 'svelte';

	let totalDaysInYear: number = $state(0);
	let daysPassed: number = $state(0);

	let displayedDays = $state(0);

	function getOrdinalSuffix(day: number): string {
		const suffixes = ['th', 'st', 'nd', 'rd'];
		const v = day % 100;
		return day + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
	}

	function formatDay(index: number): string {
		const currentYear = new Date().getFullYear();
		const date = new Date(currentYear, 0, index);
		const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
		return `${weekday}, ${getOrdinalSuffix(index)} day`;
	}

	onMount(() => {
		const currentYear = new Date().getFullYear();
		const startOfYear = new Date(currentYear, 0, 1);
		const endOfYear = new Date(currentYear + 1, 0, 1);

		const elapsedDays: number = Math.round(
			(new Date().getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
		);

		totalDaysInYear = Math.round(
			(endOfYear.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
		);

		daysPassed = Math.round((new Date().getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));

		displayedDays = elapsedDays;
	});
</script>

<svelte:head>
	<link
		rel="icon"
		href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>{data.favicon}</text></svg>"
	/>
</svelte:head>

{#if totalDaysInYear > 0}
	<main
		class="container mx-auto flex h-full min-h-svh w-full max-w-screen-lg animate-blurred-fade-in items-center justify-center"
	>
		<div class="w-full max-w-xl px-5">
			<div class="grid w-full grid-cols-[repeat(auto-fit,minmax(8px,1fr))] gap-3 lg:gap-5">
				{#each Array(totalDaysInYear).fill(0) as _, index}
					<div
						class="aspect-auto h-2 w-2 rounded-full {index < daysPassed
							? 'bg-primary'
							: 'bg-neutral'}"
						title={formatDay(index + 1)}
					></div>
				{/each}
			</div>
			<div class="mt-3 flex items-center justify-between text-xs">
				<p class="text-base-content">{new Date().getFullYear()}</p>
				<p>{totalDaysInYear - displayedDays} days left</p>
			</div>
		</div>
	</main>
{/if}

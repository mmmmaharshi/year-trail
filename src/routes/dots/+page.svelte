<script lang="ts">
	import { onMount } from 'svelte';
	import { Spring } from 'svelte/motion';

	let totalDaysInYear: number = $state(0);
	let daysPassed: number = $state(0);

	const displayedDays = new Spring<number>(0, {
		stiffness: 0.1,
		damping: 0.8
	});

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

		displayedDays.target = elapsedDays;
	});
</script>

{#if totalDaysInYear > 0}
	<main
		class="container mx-auto flex h-full min-h-svh w-full max-w-screen-lg items-center justify-center"
	>
		<div class="w-full max-w-xl px-5">
			<div class="grid w-full grid-cols-[repeat(auto-fit,minmax(8px,1fr))] gap-3 lg:gap-5">
				{#each Array(totalDaysInYear).fill(0) as _, index}
					<div
						class="aspect-auto h-2 w-2 rounded-full {index < daysPassed
							? 'bg-primary'
							: 'bg-neutral'}"
						title={`Day ${index + 1}`}
					></div>
				{/each}
			</div>
			<div class="mt-3 flex items-center justify-between text-xs">
				<p class="text-base-content">{new Date().getFullYear()}</p>
				<p>{Math.round(displayedDays.current)} / {totalDaysInYear} days</p>
			</div>
		</div>
	</main>
{/if}

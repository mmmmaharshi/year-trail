<script lang="ts">
	import { onMount } from 'svelte';

	let progress: number = $state(0);
	let displayedDays = $state(0);
	let totalDays: number = $state(0);

	function calculateProgress(): number {
		const now: Date = new Date();
		const start: Date = new Date(now.getFullYear(), 0, 1);
		const end: Date = new Date(now.getFullYear() + 1, 0, 1);
		const elapsed: number = now.getTime() - start.getTime();
		const total: number = end.getTime() - start.getTime();

		const elapsedDays: number = Math.floor(elapsed / (1000 * 60 * 60 * 24));
		totalDays = Math.floor(total / (1000 * 60 * 60 * 24));
		displayedDays = elapsedDays;

		return (elapsed / total) * 100;
	}

	onMount((): (() => void) => {
		progress = calculateProgress();
		const timer: number = setInterval(() => {
			progress = calculateProgress();
		}, 86400000);

		return () => clearInterval(timer);
	});
</script>

<div class="relative min-h-screen overflow-hidden">
	<div
		class="absolute inset-0 origin-top bg-primary transition-transform duration-1000"
		style="transform: scaleY({progress / 100})"
	></div>

	<div
		class="relative z-10 flex min-h-screen animate-fade-in-down flex-col items-center justify-center"
	>
		<h1 class="mb-4 text-8xl text-base-content mix-blend-difference">
			{new Date().getFullYear()}
		</h1>
		<div class="text-xl text-base-content mix-blend-difference">
			{Math.round(displayedDays)} /
			{totalDays} days
		</div>
	</div>
</div>

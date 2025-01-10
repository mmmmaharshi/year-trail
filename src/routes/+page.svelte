<script lang="ts">
	import { onMount } from 'svelte';
	import { Spring } from 'svelte/motion';

	let progress: number = 0;

	const displayedDays = new Spring<number>(0, {
		stiffness: 0.1,
		damping: 0.8
	});
	let totalDays: number = 0;

	function calculateProgress(): number {
		const now: Date = new Date();
		const start: Date = new Date(now.getFullYear(), 0, 1);
		const end: Date = new Date(now.getFullYear() + 1, 0, 1);
		const elapsed: number = now.getTime() - start.getTime();
		const total: number = end.getTime() - start.getTime();

		const elapsedDays: number = Math.floor(elapsed / (1000 * 60 * 60 * 24));
		totalDays = Math.floor(total / (1000 * 60 * 60 * 24));
		displayedDays.target = elapsedDays;

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
	<!-- Progress overlay -->
	<div
		class="bg-primary absolute inset-0 origin-top transition-transform duration-1000"
		style="transform: scaleY({progress / 100})"
	></div>

	<!-- Content -->
	<div class="relative z-10 flex min-h-screen flex-col items-center justify-center">
		<h1 class="text-base-content mb-4 font-mono text-8xl mix-blend-difference">
			{new Date().getFullYear()}
		</h1>
		<div class="text-base-content font-mono text-xl mix-blend-difference">
			{Math.round(displayedDays.current)} / {totalDays} days
		</div>
	</div>
</div>

import animations from '@midudev/tailwind-animations';
import daisyui from 'daisyui/';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [daisyui, animations],
	daisyui: {
		themes: ['forest']
	}
} satisfies Config;

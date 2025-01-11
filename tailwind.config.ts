import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {},

    fontFamily: {
      mono: 'ui-monospace, Consolas, -apple-system, monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
  },

	plugins: []
} satisfies Config;

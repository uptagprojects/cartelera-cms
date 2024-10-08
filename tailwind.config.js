/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./tests/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./tests/e2e/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {}
	},
	plugins: []
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
        'sky-400',
        'sky-600',
        'bg-sky-600',
        'hover:bg-sky-700',
        'focus:bg-sky-700',
        'text-sky-400',
        'shadow-sky-950/50',
        'rose-400',
        'rose-600',
        'bg-rose-600',
        'hover:bg-rose-700',
        'focus:bg-rose-700',
        'text-rose-400',
        'shadow-rose-950/50'
      ]
}
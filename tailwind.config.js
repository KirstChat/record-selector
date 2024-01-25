/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [],
    safelist: [
        'bg-sky-700',
        'hover:bg-sky-800',
        'focus:bg-sky-800',
        'shadow-sky-950/50',
        'bg-rose-700',
        'hover:bg-rose-800',
        'focus:bg-rose-800',
        'shadow-rose-950/50',
    ],
};

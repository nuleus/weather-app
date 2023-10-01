/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "#09090b",
                input: "#27272a",
                subtitle: "#a1a1aa",
            },
        },
    },
    plugins: [],
};

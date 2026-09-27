import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sistine: {
          dark: '#1e293b',
          navy: '#0f172a',
          blue: '#2c3e50',
          sand: '#f5f3ee',
          cream: '#faf9f5',
          gold: '#c69234',
          goldLight: '#fef3c7',
          border: '#e2e8f0',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Cinzel', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;

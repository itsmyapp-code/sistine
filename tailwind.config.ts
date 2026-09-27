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
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#38a5f6',
          500: '#0e87e9',
          600: '#026bc7',
          700: '#0355a1',
          800: '#074884',
          900: '#0b3c6f',
          950: '#08274a',
        },
        trade: {
          slate: '#0f172a',
          navy: '#1e293b',
          muted: '#64748b',
          gold: '#c69234',
          goldHover: '#ad7e28',
          goldLight: '#fef3c7',
          cream: '#fcfbf7',
          border: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'trade': '0 10px 30px -10px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)',
        'trade-lg': '0 20px 40px -15px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.05)',
        'trade-gold': '0 10px 25px -5px rgba(198, 146, 52, 0.3)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at 50% 0%, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};
export default config;

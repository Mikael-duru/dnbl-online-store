import type { Config } from "tailwindcss"

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '425px',
        'xl': '1280px',
        '2xl': '1440px',
      },
      colors: {
        'dark-brown' : 'rgba(252, 202, 77, 0.2)',
        'border-gray': 'rgba(255, 255, 255, 0.25)',
        'text-gray': 'rgba(255, 255, 255, 0.80)',
        'brown-gold': 'rgba(221, 166, 39, 0.80)',
        'light-brown-gold': 'rgba(221, 166, 39, 0.08)',
        'light-black': 'rgba(30, 30, 30, 0.90)',
        'lighter-black': 'rgba(30, 30, 30, 0.80)',
        'light-border-black': 'rgba(30, 30, 30, 0.60)',
        'lighter-gray': 'rgba(0, 0, 0, 0.5)',
        'blue-black': 'rgba(30, 30, 30, 1)',
        'gold-border': 'rgba(180, 123, 43, 0.3)',
        'gold-text': 'rgba(180, 123, 43, 1)',
        'gray-light': 'rgba(102, 113, 133, 1)',
        'dark-blue': 'rgba(16, 25, 40, 1)',
        'gray-border': 'rgba(208, 213, 221, 1)',
        'light-gray': 'rgba(253, 253, 253, 0.9)',
        'wishList-bg': 'rgba(207, 207, 207, 0.3)',
        'product-card-border': 'rgba(20, 20, 20, 0.1)',
        'figure-text': 'rgba(20, 20, 20, 1)',
        'old-price-text': 'rgba(215, 215, 215, 1)',
        'product-details-bg': 'rgba(215, 215, 215, 0.2)',
        'star-rating-color': 'rgba(251, 130, 0, 1)',
        'error': "#800501"
      },
      boxShadow: {
        'header-shadow': '0px 4px 40px 0px rgba(0, 0, 0, 0.10)',
        'incentives-shadow': '0px 4px 14px 0px rgba(0, 0, 0, 0.25)',
        'btn-shadow': '0px 3px 2px -2px rgba(0, 0, 0, 0.06), 0px 5px 3px -2px rgba(0, 0, 0, 0.02)',
      },
      backgroundColor: {
        'banner-layer': 'rgba(0, 0, 0, 0.70)',
        'sign-in-layer': 'rgba(30, 30, 30, 0.4)',
      },
      backgroundImage: {
        'btn-gold': 'linear-gradient(90deg, #DDA627 0%, #B47B2B 0.01%)',
        'gold-gradient': 'linear-gradient(90deg, #DDA627 0%, #B47B2B 22.22%, #EDCC32 66.99%, #FED649 84.51%)',
        'btn-gradient': 'linear-gradient(90deg, #DDA627 0%, #B47B2B 0.01%)',
      },
      fontFamily: {
        'open-sans': ['"Open Sans", sans-serif'],
        'roboto': ['"Roboto", sans-serif'],
        'libre-franklin': ['"Libre Franklin", sans-serif'],
        'inter': ['"Inter", sans-serif'],
        'poppins-black': ['"Poppins", sans-serif'],
        'rubik': ['"Rubik", sans-serif'],
        'work-sans': ['"Work Sans", sans-serif'],
        'fredoka': ['"Fredoka", sans-serif'],
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} satisfies Config

export default config
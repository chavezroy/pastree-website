/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pastree-orange': '#ed8e5b',
        'pastree-orange-hover': '#e77c43',
        'pastree-dark': '#212529',
        'pastree-light': '#f8f9fa',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(261deg, #FFCF98 17.53%, #FFECE0 88.29%)',
        'orange-gradient': 'linear-gradient(135deg, #ed8e5b, #f4a261)',
      },
    },
  },
  plugins: [],
}

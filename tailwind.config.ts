/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        cartographCF: ['var(--font-cartographCF)', 'sans-serif'],
        switzer: ['var(--font-switzer)', 'sans-serif'],
        hoshiko: ['var(--font-hoshiko)', 'sans-serif'],
        beVietnamPro: ['var(--font-beVietnamPro)', 'sans-serif'],
      },
      colors: {
        light: '#edf2f4',
        dark: '#0a0908',
      },
    },
  },
};
const defualtTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        gtWalshiemPro: ["'GT Walsheim Pro'", ...defualtTheme.fontFamily.sans]
      },
      animation: {
        'fade-in': 'animate-fade-in',
        'faster': 'animate-faster'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

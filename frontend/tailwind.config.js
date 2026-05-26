/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    backgroundImage: {
      'gradientPinkRed': 'linear-gradient(180deg, #ec008c 0%, #fc6767 100%)',
    },
    borderRadius: {
      'large': '20px',
      'b-large': '20px',
      'full': '9999px',
      'lg':'.5rem'
    },
    boxShadow: {
      themeShadow: '2px 1px 7px rgba(0, 0, 0, 0.05)',
      'homeBackgroundColor': '0 4px 6px rgba(0, 0, 0, 0.1)',
      'custom-white': '0 -25px 15px 15px #ffffff',
      'card': '0 4px 6px rgba(0, 0, 0, 0.1)',
      'addLinkPopup': '0 0 6px #777',


    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      sidebar: "980px",
      xs: "420px",


    },
    extend: {

      height: {
        '30': '7.5rem',
        '48': '12rem'
      },
      width: {
        '18': '4.5rem',
        '38': '9.5rem',
      },

      backgroundImage: {
        'gradientPinkRed': 'linear-gradient(to right, var(--gradientPinkRed-from), var(--gradientPinkRed-to))',
        'gradient-to-r-purple-blue': 'linear-gradient(to right, var(--purple-500), var(--blue-500))',

      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        greyWhite: "var(--greyWhite)",
        primaryBlack: "var(--primaryBlack)",
        homeBackgroundColor: "var(--homeBackgroundColor)",
        inputBackground : "var(--inputBackground)",
        inputBorder: "var(--inputBorder)",
        gradientPinkRed: "var(--gradientPinkRed)",
        brandDarkBlue: "var(--brandDarkBlue)",
        specialSandLight: "var(--specialSandLight)",
        green: {
          400: '#4ade80',
        },
        teal: {
          500: '#14b8a6',
        },
      },
    },
  },
  plugins: [

  ],
};

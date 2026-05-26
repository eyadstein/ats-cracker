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
      'glow-violet': '0 0 40px rgba(139, 92, 246, 0.4)',
      'glow-indigo': '0 0 60px rgba(99, 102, 241, 0.3)',
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
        'hero-gradient': 'linear-gradient(135deg, #0f0c29 0%, #1a1040 40%, #0d1b4b 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(99,102,241,0.1) 100%)',
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
        brand: {
          navy: '#0f0c29',
          violet: '#8b5cf6',
          indigo: '#6366f1',
          neon: '#a78bfa',
          glow: '#c4b5fd',
        },
        green: { 400: '#4ade80' },
        teal: { 500: '#14b8a6' },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        indigo: {
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-18px) rotate(1deg)' },
          '66%': { transform: 'translateY(-8px) rotate(-1deg)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139,92,246,0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(139,92,246,0.7), 0 0 100px rgba(99,102,241,0.3)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

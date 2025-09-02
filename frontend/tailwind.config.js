/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./components/**/*.{html,js}",
    "./pages/**/*.{html,js}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
    },
      fontFamily: {
        antonio: ['Antonio', 'sans-serif'],
        bree: ['Bree Serif', 'serif'],
        inter: ['Inter', 'sans-serif'],
        merriweather: ['Merriweather', 'serif'],
        mona: ['Mona Sans', 'sans-serif'],
        mozilla: ['Mozilla Headline', 'sans-serif'],
        noto: ['Noto Sans', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        playwrite: ['Playwrite HU', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        rubik: ['Rubik Wet Paint', 'cursive'],
        story: ['Story Script', 'cursive'],
      },
      keyframes: {
        navbar: {
          '0%': {opacity: '0.8', transform: 'translateY(-60px)'},
          '100%': {opacity: '1', transform: 'translateY(0px)'}
        },
        note: {
          '0%': {opacity: '0'},
          '100%': {opacity: '1'}
        },
        lefter: {
          '0%': {transform: 'translateX(-350px)', pointerEvents: 'none'},
          '100%': {transform: 'translateX(0px)', pointerEvents: 'auto'},
        },
        righter: {
          '0%': {transform: 'translateX(350px)', pointerEvents: 'none'},
          '100%': {transform: 'translateX(0px)', pointerEvents: 'auto'},
        },
        bottomer: {
          '0%': {transform: 'translateY(350px)', pointerEvents: 'none'},
          '100%': {transform: 'translateY(0px)', pointerEvents: 'auto'},
        },
      },
      animation: {
        navbar: 'navbar 0.8s linear',
        note: 'note 0.6s linear',
        lefter: 'lefter 0.6s linear',
        righter: 'righter 0.6s linear',
        bottomer: 'bottomer 0.6s linear',
      },
    },
  },
  plugins: [],
}
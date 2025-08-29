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
    },
  },
  plugins: [],
}
module.exports = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        fasterOne: ['Faster One', 'cursive'],
        roboto: ['Roboto', 'sans-serif'],
        vastShadow: ['Vast Shadow', 'cursive'],
      },
    },
  },
  plugins: [],
}

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (_theme) => ({
        'circuit-board-pattern': "url('/assets/images/circuit-board.svg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

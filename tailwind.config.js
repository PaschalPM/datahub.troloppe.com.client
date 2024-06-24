/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "lighter-blue": "#F4F4F6",
        "light-blue": "#817DAE",
        secondary: "#E16529",
        "dark-blue": "#27246A",
        "dodger-blue": "#159AFF",
        "violet-blue": "#352E74",
      }
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')
,require('@tailwindcss/forms')
,require('@tailwindcss/typography')
],
};

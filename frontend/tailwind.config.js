/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      primary: ["Poppins, sans-serif"],
      secondary: ["Roboto, sans-serif"],
    },
    colors: {
      highlight: {
        primary: "#1DE782",
        hover: "#17C769",
        inactive: "#A1D9BE",
        disabled: "#D5E5F0",
      },
      textColor: {
        primary: "#101012",
        secondary: "#5A5A5D",
        tertiary: "#BEBEBF",
      },
      border: "#DDDEDF",
      white: "#FFFFFF",
    },
    borderRadius: {
      card: "20px",
      button: "8px",
      location: "39px",
      time: "4px",
      seat: "6px",
      input: "8px",
      tags: "50px",
    },
    extend: {},
  },
  plugins: [],
};

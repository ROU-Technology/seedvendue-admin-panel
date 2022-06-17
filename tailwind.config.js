/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    minWidth: {
      "1/2": "50%",
      100: "100px",
      200: "200px",
      300: "300px",
      400: "400px",
      500: "500px",
      600: "600px",
    },
    minHeight: {
      "1/2": "50%",
      100: "100px",
      200: "200px",
      300: "300px",
      400: "400px",
      500: "500px",
      600: "600px",
    },
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      "primary-app": "#0073aa",
      secondary: "#23282d",
      tertiary: "#81b5cd",
      "off-white": "#798687",
      tomato: "#E74C3C",
      "off-black": "#212529",
      green: "#50D287",
    },
    borderWidth: {
      1: "1px",
    },
    extend: {},
  },
  plugins: [],
};

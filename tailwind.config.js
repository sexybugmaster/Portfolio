/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07111f",
        panel: "#0d1b2d",
        line: "#203449",
        mist: "#d8e3ee",
        cyan: "#34d5e8",
        mint: "#67e8b9",
        signal: "#8fb9ff",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(52, 213, 232, 0.14)",
      },
    },
  },
  plugins: [],
};

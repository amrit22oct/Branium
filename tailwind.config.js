/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // adjust if needed
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-conic":
          "conic-gradient(from var(--angle), var(--tw-gradient-stops))",
      },
      animation: {
        "spin-slow": "spinBorder 3s linear infinite",
      },
      keyframes: {
        spinBorder: {
          from: { "--angle": "0deg" },
          to: { "--angle": "360deg" },
        },
      },
    },
  },
  plugins: [],
};

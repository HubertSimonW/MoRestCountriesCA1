export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        hubert: {
          "primary": "#5b7fff",
          "secondary": "#ff7a59",
          "accent": "#22c55e",
          "neutral": "#1f2937",
          "base-100": "#242323ff", // page bg
          "base-200": "#414141ff",
          "base-300": "#1f2937",
          "info": "#38bdf8",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
      "light",
      "dark",
    ],
  },
};




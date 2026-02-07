import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        vinted: { DEFAULT: "#09B1BA", dark: "#078A91" },
      },
    },
  },
  plugins: [],
};

export default config;

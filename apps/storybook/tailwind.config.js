import uiPreset from "@dev-in-realtime/ui/tailwind-preset";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [uiPreset],
  content: [
    "./stories/**/*.{ts,tsx,mdx}",
    "./.storybook/**/*.{ts,tsx}",
    "../../packages/ui/dist/**/*.js",
  ],
};

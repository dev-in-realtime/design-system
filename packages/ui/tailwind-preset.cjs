/**
 * Tailwind preset mapping utility classes to @dev-in-realtime/tokens CSS variables.
 * Consumers extend this in their own tailwind.config:
 *
 *   module.exports = {
 *     presets: [require("@dev-in-realtime/ui/tailwind-preset")],
 *     content: [..., "./node_modules/@dev-in-realtime/ui/dist/**\/*.js"],
 *   };
 *
 * Note: colors resolve to plain hex/CSS-var values (not the hsl() + <alpha-value>
 * trick), because @dev-in-realtime/tokens is deliberately framework-free. Tailwind
 * opacity modifiers (e.g. bg-primary/50) are therefore not supported on these
 * colors; use CSS color-mix() directly if you need that.
 */
module.exports = {
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      fontFamily: {
        sans: ["var(--font-family-sans)"],
        mono: ["var(--font-family-mono)"],
      },
    },
  },
  plugins: [],
};

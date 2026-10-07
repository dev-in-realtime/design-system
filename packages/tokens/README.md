# @dev-in-realtime/tokens

Platform-agnostic design tokens for any project: color, spacing, radius, and typography.

This package has **no dependency on React, Tailwind, or any UI framework**. It's the single source of truth that platform-specific packages (web, and eventually React Native) style themselves from.

## Authoring

Tokens are authored as [W3C Design Tokens (DTCG)](https://design-tokens.github.io/community-group/format/) JSON in `tokens/`, and built with [Style Dictionary](https://styledictionary.com/) (`scripts/build.js`) into:

- `dist/css/variables.css` — `:root` CSS custom properties (light theme / defaults)
- `dist/css/variables-dark.css` — `[data-theme="dark"]` overrides
- `dist/js/tokens.js` + `.d.ts` — flat typed JS exports for anything that isn't CSS (e.g. a future React Native package)

## Usage (web)

```css
@import "@dev-in-realtime/tokens/css";
@import "@dev-in-realtime/tokens/css/dark";
```

## Usage (JS/TS)

```ts
import { color_semantic_primary, spacing_4 } from "@dev-in-realtime/tokens";
```

## Adding/editing tokens

Edit the JSON files in `tokens/`, then `pnpm build`. Semantic color tokens (`color.semantic.*`) map 1:1 to shadcn/ui's expected CSS variable names (`--background`, `--primary`, `--border`, etc.) so `packages/ui` can consume them without renaming.

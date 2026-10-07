# Design System

Monorepo for a design system and component library built with React, Tailwind, and Radix.

## Packages

- **`@dev-in-realtime/tokens`** — Platform-agnostic design tokens (color, spacing, radius, typography) built with Style Dictionary. Zero dependencies—CSS variables and JS/TS exports.
- **`@dev-in-realtime/ui`** — React component library using Radix primitives and styled via Tailwind, consuming `@dev-in-realtime/tokens`.
- **Storybook** — Component playground and documentation.

## Why tokens are separate

`@dev-in-realtime/tokens` has zero framework dependencies. It's the single source of truth for design, built once into CSS custom properties (for web) and flat JS/TS exports (for anything else). `@dev-in-realtime/ui` is the only package that knows about React, Tailwind, or Radix.

## Development

```bash
pnpm install
pnpm build          # builds all packages (tokens first, then ui)
pnpm dev            # turbo dev mode across workspace
```

To develop components with live docs:

```bash
cd apps/storybook
pnpm dev            # http://localhost:6006
```

## Versioning & Publishing

Package versions are managed with Changesets. After changes to tokens or ui:

```bash
pnpm changeset      # describe the change
```

Merging to main triggers a "Version Packages" PR; merging that publishes to npm under the `@dev-in-realtime` scope.

## License

MIT

import StyleDictionary from "style-dictionary";
import { transformTypes } from "style-dictionary/enums";

const PRIMITIVE_GROUPS = new Set(["gray", "brand", "red", "base"]);

/**
 * Emits shadcn-compatible variable names for semantic color tokens
 * (--background, --primary, ...) while keeping full paths for primitives
 * and other token groups (--color-gray-500, --spacing-4, --font-size-sm).
 */
function nameForToken(token) {
  const path = token.path;

  if (path[0] === "color" && path[1] === "semantic") {
    return path.slice(2).join("-");
  }
  if (path[0] === "color" && PRIMITIVE_GROUPS.has(path[1])) {
    return path.join("-");
  }
  return path.join("-");
}

StyleDictionary.registerTransform({
  name: "name/rtd-css",
  type: transformTypes.name,
  transform: (token) => nameForToken(token),
});

function toCamelSegment(segment) {
  return segment.replace(/-([a-zA-Z0-9])/g, (_, c) => c.toUpperCase());
}

StyleDictionary.registerTransform({
  name: "name/rtd-js",
  type: transformTypes.name,
  transform: (token) => token.path.map(toCamelSegment).join("_"),
});

const ALL_SOURCES = [
  "tokens/color.primitive.json",
  "tokens/spacing.json",
  "tokens/typography.json",
];

const lightSource = [...ALL_SOURCES, "tokens/color.semantic.light.json"];
const darkSource = ["tokens/color.primitive.json", "tokens/color.semantic.dark.json"];

const lightCss = new StyleDictionary({
  source: lightSource,
  platforms: {
    css: {
      transformGroup: "css",
      transforms: ["name/rtd-css", "color/css", "size/px", "fontFamily/css"],
      buildPath: "dist/css/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
          options: { selector: ":root", outputReferences: false },
        },
      ],
    },
  },
});

const darkCss = new StyleDictionary({
  source: darkSource,
  platforms: {
    css: {
      transformGroup: "css",
      transforms: ["name/rtd-css", "color/css"],
      buildPath: "dist/css/",
      files: [
        {
          destination: "variables-dark.css",
          format: "css/variables",
          filter: (token) => token.path[0] === "color" && token.path[1] === "semantic",
          options: { selector: '[data-theme="dark"]', outputReferences: false },
        },
      ],
    },
  },
});

const js = new StyleDictionary({
  source: lightSource,
  platforms: {
    js: {
      transformGroup: "js",
      transforms: ["name/rtd-js"],
      buildPath: "dist/js/",
      files: [
        {
          destination: "tokens.js",
          format: "javascript/es6",
        },
        {
          destination: "tokens.d.ts",
          format: "typescript/es6-declarations",
        },
      ],
    },
  },
});

for (const sd of [lightCss, darkCss, js]) {
  await sd.hasInitialized;
  await sd.cleanAllPlatforms();
  await sd.buildAllPlatforms();
}

console.log("[@dev-in-realtime/tokens] built dist/css + dist/js");

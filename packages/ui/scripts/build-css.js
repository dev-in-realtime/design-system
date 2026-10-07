import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const tokensDist = path.resolve(dir, "../../tokens/dist/css");
const outDir = path.resolve(dir, "../dist");

mkdirSync(outDir, { recursive: true });

const light = readFileSync(path.join(tokensDist, "variables.css"), "utf8");
const dark = readFileSync(path.join(tokensDist, "variables-dark.css"), "utf8");

writeFileSync(
  path.join(outDir, "styles.css"),
  `/* Re-exported from @dev-in-realtime/tokens. Edit tokens there, not here. */\n\n${light}\n${dark}`,
);

console.log("[@dev-in-realtime/ui] wrote dist/styles.css");

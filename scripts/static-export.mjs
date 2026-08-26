import { access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

const vinextDist = path.dirname(fileURLToPath(import.meta.resolve("vinext")));
const [{
  PHASE_PRODUCTION_BUILD,
  loadNextConfig,
  resolveNextConfig,
}, { emitPrerenderPathManifest }, { runPrerender }] = await Promise.all([
  import(pathToFileURL(path.join(vinextDist, "config", "next-config.js"))),
  import(pathToFileURL(path.join(vinextDist, "build", "prerender-paths.js"))),
  import(pathToFileURL(path.join(vinextDist, "build", "run-prerender.js"))),
]);

const root = process.cwd();
const nextConfig = await resolveNextConfig(
  await loadNextConfig(root, PHASE_PRODUCTION_BUILD),
  root,
);

await runPrerender({ root, nextConfig });
await emitPrerenderPathManifest({ root, nextConfig });

const outputDirectory = path.join(root, "dist", "client");
for (const file of [
  "index.html",
  "index.rsc",
  "about.html",
  "about.rsc",
  "projects.html",
  "projects.rsc",
  "owner-analytics.html",
  "owner-analytics.rsc",
  "404.html",
  "sahil-singh-resume.pdf",
  "_next",
]) {
  await access(path.join(outputDirectory, file));
}

console.log("Static export verified in dist/client.");

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server renders the Sahil portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Sahil — Researcher, Engineer, Student<\/title>/i);
  assert.match(html, /rel="icon"[^>]*href="\/favicon\.svg"/i);
  assert.match(html, /hey, I[’']m Sahil(?!\.)/i);
  assert.match(html, /mailto:gensahilsingh@gmail\.com[^>]*>gensahilsingh@gmail\.com/);
  assert.doesNotMatch(html, /tel:\+17244574644|724-457-4644/);
  assert.match(html, /href="\/sahil-singh-resume\.pdf"[^>]*target="_blank"/i);
  assert.match(html, /<h2>Papers<\/h2>/);
  assert.match(html, /<article id="papers" class="work-card papers-card">/);
  assert.match(html, /<a class="work-card work-card-link" href="\/sahil-singh-resume\.pdf"[^>]*target="_blank"[^>]*rel="noreferrer"[^>]*>[\s\S]*<h2>Résumé<\/h2>[\s\S]*Open résumé/);
  assert.match(html, /<a class="work-card work-card-link" href="https:\/\/www\.linkedin\.com\/in\/sahil-singh-17a641239"[^>]*target="_blank"[^>]*rel="noreferrer"[^>]*>[\s\S]*<h2>LinkedIn<\/h2>[\s\S]*Find me there/);
  assert.match(html, /href="#papers">Papers/);
  assert.equal((html.match(/<details class="paper-disclosure"/g) ?? []).length, 2);
  assert.match(html, /<summary>[\s\S]*GEML[\s\S]*Pending EMNLP MathNLP submission/);
  assert.match(html, /<summary>[\s\S]*BPC-FNO/);
  assert.match(html, /href="\/papers\/geml-paper\.pdf"/);
  assert.match(html, /href="\/papers\/bpc-fno-paper\.pdf"/);
  assert.match(html, /https:\/\/saidlaboratory\.github\.io\/GEML\//);
  assert.match(html, /https:\/\/github\.com\/saidlaboratory\/GEML/);
  assert.match(html, /<button type="button" class="mini-pill github-trigger" aria-haspopup="menu"/);
  assert.match(html, /role="menu" aria-label="GitHub profiles"/);
  assert.match(html, /role="menuitem" href="https:\/\/github\.com\/sahilsinghthefirst"[^>]*target="_blank"[^>]*rel="noreferrer"/);
  assert.match(html, /role="menuitem" href="https:\/\/github\.com\/gensahilsingh"[^>]*target="_blank"[^>]*rel="noreferrer"/);
  assert.match(html, /assets\/github-mark\.svg/);
  assert.match(html, /class="github-label">GitHub<\/span>/);
  assert.match(html, /class="github-arrow"[^>]*>→<\/span>/);
  assert.doesNotMatch(html, /github-mark\.png|github-caret/);
  assert.match(html, /sahilsinghthefirst/);
  assert.match(html, /https:\/\/github\.com\/sahilsinghthefirst/);
  assert.match(html, /gensahilsingh/);
  assert.match(html, /https:\/\/github\.com\/gensahilsingh/);
  assert.doesNotMatch(html, /details class="github-menu"|github-summary/);
  assert.doesNotMatch(html, /href="#work">Work|href="#affiliations">Affiliations/);
  assert.doesNotMatch(html, /A concise view of the questions|The public thread for new work/);
  assert.match(html, /In Progress[\s\S]*World Model Occlusion Paper \(with Algoverse\)/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/sahil-singh-17a641239/);
  assert.match(html, /assets\/ptmc-badge\.png/);
  assert.match(html, /assets\/korucusat-2\.png/);
  assert.match(html, /assets\/algoverse\.webp/);
  assert.ok(html.indexOf('id="affiliations"') < html.indexOf('id="work"'));
  assert.doesNotMatch(html, /Making room for|Researcher <span|Currently learning in public|Curious by default/i);
  assert.doesNotMatch(html, /id="about"|id="resume"|Coming soon|Say hello/i);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("keeps the final page free of starter preview infrastructure", async () => {
  const [page, layout, packageJson, css, nextConfig, vercelConfig, gitignore, readme, staticExport, qrSvg] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../vercel.json", import.meta.url), "utf8"),
    readFile(new URL("../.gitignore", import.meta.url), "utf8"),
    readFile(new URL("../README.md", import.meta.url), "utf8"),
    readFile(new URL("../scripts/static-export.mjs", import.meta.url), "utf8"),
    readFile(new URL("../public/sahil-portfolio-qr.svg", import.meta.url), "utf8"),
  ]);

  assert.match(page, /LINK_TARGETS/);
  assert.match(page, /resume: "\/sahil-singh-resume\.pdf"/);
  assert.match(page, /id="papers"/);
  assert.match(layout, /title: "Sahil — Researcher, Engineer, Student"/);
  assert.match(layout, /icons:\s*\{[\s\S]*icon: "\/favicon\.svg"/);
  assert.doesNotMatch(page, /#about|#resume|Coming soon|Keep in touch|Say hello/);
  assert.doesNotMatch(page, /tel:\+17244574644|724-457-4644/);
  assert.doesNotMatch(page, /A concise view of the questions|The public thread for new work/);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /_sites-preview|codex-preview|Starter Project/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(packageJson, /"build":\s*"vite build && node scripts\/static-export\.mjs"/);
  assert.match(staticExport, /runPrerender/);
  assert.match(staticExport, /emitPrerenderPathManifest/);
  assert.match(staticExport, /index\.html[\s\S]*index\.rsc[\s\S]*404\.html/);
  assert.match(nextConfig, /output:\s*["']export["']/);
  const vercel = JSON.parse(vercelConfig);
  assert.equal(vercel.$schema, "https://openapi.vercel.sh/vercel.json");
  assert.equal(vercel.framework, null);
  assert.equal(vercel.installCommand, "npm ci");
  assert.equal(vercel.buildCommand, "npm run build");
  assert.equal(vercel.outputDirectory, "dist/client");
  assert.match(gitignore, /(^|\r?\n)\/output\/(\r?\n|$)/);
  assert.match(readme, /# Sahil Singh Portfolio/);
  assert.match(readme, /npm ci/);
  assert.match(readme, /npm run dev/);
  assert.match(readme, /npm test/);
  assert.match(readme, /npm run lint/);
  assert.match(readme, /dist\/client/);
  assert.match(qrSvg, /data-target="https:\/\/gensahilsingh\.vercel\.app"/);
  assert.match(qrSvg, /data-error-correction="H"/);
  assert.match(qrSvg, /data-quiet-zone-modules="4"/);
  assert.match(qrSvg, /SAHIL SINGH[\s\S]*SCAN TO VIEW PORTFOLIO[\s\S]*gensahilsingh\.vercel\.app/);
  assert.match(qrSvg, /#f4efe5/);
  assert.match(qrSvg, /#22201d/);
  assert.match(qrSvg, /#c76a3b/);
  assert.doesNotMatch(css, /\.section-rule\s*\{[^}]*border-top\s*:/s);
  assert.doesNotMatch(css, /\.site-nav\s*\{[^}]*border-bottom\s*:/s);
  assert.match(css, /\.github-menu:hover\s*>\s*\.github-popover/);
  assert.match(css, /\.github-menu:focus-within\s*>\s*\.github-popover/);
  assert.match(css, /left:\s*calc\(100%\s*\+\s*6px\)/);
  assert.match(css, /\.github-popover\s*\{[^}]*top:\s*50%[^}]*transform:\s*translate\(-4px,\s*-50%\)/s);
  assert.match(css, /\.github-menu:hover\s*>\s*\.github-popover,[\s\r\n]*\.github-menu:focus-within\s*>\s*\.github-popover\s*\{[^}]*transform:\s*translate\(0,\s*-50%\)/s);
  assert.match(css, /\.github-menu::after\s*\{[^}]*top:\s*50%[^}]*height:\s*84px[^}]*transform:\s*translateY\(-50%\)/s);
  assert.doesNotMatch(css, /\.github-trigger img\s*\{[^}]*mix-blend-mode/s);
  assert.doesNotMatch(css, /\.github-trigger\s*\{[^}]*font:\s*inherit/s);
  assert.match(css, /\.mini-pill\s*\{[^}]*font-family:\s*var\(--sans\)[^}]*font-size:\s*0\.68rem[^}]*font-weight:\s*700[^}]*line-height:\s*1\.5/s);
  assert.match(css, /\.github-label\s*\{[^}]*color:\s*inherit[^}]*font-family:\s*var\(--sans\)/s);
  assert.match(css, /\.github-arrow\s*\{[^}]*color:\s*var\(--accent\)/s);
  assert.match(css, /\.github-break\s*\{[^}]*flex-basis:\s*100%/s);
  assert.match(css, /@media\s*\(max-width:\s*340px\)[\s\S]*\.github-popover\s*\{[^}]*min-width:\s*min\(184px,\s*calc\(100vw\s*-\s*152px\)\)/s);
  assert.match(css, /@media\s*\(max-width:\s*780px\)[\s\S]*\.paper-disclosure summary \.summary-icon\s*\{[^}]*grid-column:\s*2[^}]*grid-row:\s*1[^}]*justify-self:\s*end[^}]*width:\s*max-content/s);
  assert.match(css, /@media\s*\(max-width:\s*780px\)[\s\S]*\.paper-disclosure \.paper-status\s*\{[^}]*grid-column:\s*1\s*\/\s*-1[^}]*grid-row:\s*2/s);
  assert.match(css, /\.work-card h2,[\s\r\n]*\.work-card h3\s*\{[^}]*margin:\s*0\s+0\s+10px/s);
  assert.doesNotMatch(css, /\.papers-card h2/);
  assert.match(css, /\.work-card-link:focus-visible\s*\{[^}]*outline:\s*2px\s+solid\s+var\(--accent\)/s);
  assert.match(css, /\.work-card-link:hover \.card-link/);

  await assert.rejects(
    access(new URL("../app/_sites-preview", import.meta.url)),
  );
  await access(new URL("../public/favicon.svg", import.meta.url));
  await access(new URL("../public/sahil-singh-resume.pdf", import.meta.url));
  await access(new URL("../public/assets/ptmc.png", import.meta.url));
  await access(new URL("../public/assets/ptmc-badge.png", import.meta.url));
  await access(new URL("../public/assets/github-mark.svg", import.meta.url));
  await assert.rejects(access(new URL("../public/assets/github-mark.png", import.meta.url)));
  await access(new URL("../public/papers/geml-paper.pdf", import.meta.url));
  await access(new URL("../public/papers/bpc-fno-paper.pdf", import.meta.url));
  await access(new URL("../public/sahil-portfolio-qr.svg", import.meta.url));
  await access(new URL("../public/sahil-portfolio-qr.png", import.meta.url));
});

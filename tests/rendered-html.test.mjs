import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const ABOUT_COPY_SHA256 = "81a4e4de46f91548739ff230155a30e0b07e62c3e9f4e3f053154906e4dc8f41";

function normalizeBio(value) {
  return value
    .replace(/\u00a0/g, " ")
    .replace(/\r\n/g, "\n")
    .replace(/\s+/gu, " ")
    .trim();
}

function stripMarkup(value) {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function includesStandalonePhrase(value, phrase) {
  const index = value.indexOf(phrase);
  return index >= 0 && !/[A-Za-z]/.test(value[index + phrase.length] ?? "");
}

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
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
  const aboutResponse = await render("/about");
  assert.equal(aboutResponse.status, 200);
  assert.match(aboutResponse.headers.get("content-type") ?? "", /^text\/html\b/i);
  const aboutHtml = await aboutResponse.text();
  assert.match(aboutHtml, /<title>About Sahil<\/title>/i);
  assert.match(aboutHtml, /<meta name="robots" content="[^"]*index[^"]*follow/i);
  assert.doesNotMatch(aboutHtml, /noindex|nofollow/i);
  assert.match(aboutHtml, /<main class="about-page" aria-labelledby="about-title">/);
  assert.match(aboutHtml, /<a[^>]*href="\/"[^>]*class="brand about-home"[^>]*aria-label="Back to Sahil home"/);
  assert.match(aboutHtml, /<h1 id="about-title">hey, I’m Sahil\.<\/h1>/);
  assert.match(aboutHtml, /<p class="about-sublead">I’m currently a 10th grader at Fulton Science Academy, in Alpharetta, Georgia\.<\/p>/);
  assert.match(aboutHtml, /href="https:\/\/plume\.hackmit\.org\/project\/lwjjl-xrsqe-ucvue-rsqap"[^>]*target="_blank"[^>]*rel="noreferrer"[^>]*>https:\/\/plume\.hackmit\.org\/project\/lwjjl-xrsqe-ucvue-rsqap<\/a>/);
  for (const id of ["problem-solving", "bpc-fno-rit", "symbolic-mathematics", "korucusat-2", "competitions-robotics", "hackathons", "closing"]) {
    assert.match(aboutHtml, new RegExp(`<section class="about-section[^"]*" id="${id}"`));
  }
  const aboutArticle = aboutHtml.match(/<article class="about-prose"[^>]*>([\s\S]*?)<\/article>/)?.[1] ?? "";
  assert.doesNotMatch(aboutArticle, /hey, I’m Sahil\.|I’m currently a 10th grader at Fulton Science Academy, in Alpharetta, Georgia\./);
  const renderedArticleBio = [...aboutArticle.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)]
    .map((match) => stripMarkup(match[1]))
    .join("\n\n");
  for (const phrase of [
    "a naturally tendency",
    "I am research and learning about ML",
    "I had recently got at internship",
    "directed acrylic graphs (DAG)",
    "mechanistic interpretibility",
    "experimentatio",
    "I am apart of FTC Team",
  ]) {
    assert.equal(includesStandalonePhrase(renderedArticleBio, phrase), false, `old phrase remains: ${phrase}`);
  }
  for (const phrase of [
    "a natural tendency",
    "I am researching and learning about ML",
    "I recently began an internship",
    "directed acyclic graphs (DAGs)",
    "mechanistic interpretability side,",
    "experimentation",
    "I am a part of FTC Team",
  ]) {
    assert.equal(renderedArticleBio.includes(phrase), true, `corrected phrase missing: ${phrase}`);
  }
  const kielSentence = "The real data was from a public data set, the Kiel Cardio Database.";
  const clarification = "The current benchmark is synthetic; the Kiel Cardio Database was used as a reference for realistic MCG signal scale and sensor geometry.";
  assert.equal(renderedArticleBio.split(clarification).length - 1, 1);
  assert.ok(renderedArticleBio.includes(`${kielSentence} ${clarification}`));
  const heroHeading = aboutHtml.match(/<h1 id="about-title">([\s\S]*?)<\/h1>/)?.[1] ?? "";
  const heroSublead = aboutHtml.match(/<p class="about-sublead">([\s\S]*?)<\/p>/)?.[1] ?? "";
  const renderedBio = [stripMarkup(heroHeading), stripMarkup(heroSublead), renderedArticleBio].join("\n\n");
  assert.equal(createHash("sha256").update(normalizeBio(renderedBio)).digest("hex"), ABOUT_COPY_SHA256);
  assert.match(html, /<title>Sahil Singh<\/title>/i);
  assert.match(html, /<a[^>]*href="\/"[^>]*class="brand"[^>]*aria-label="Sahil home"/);
  assert.match(html, /rel="icon"[^>]*href="\/favicon\.ico"/i);
  assert.match(html, /rel="shortcut icon"[^>]*href="\/favicon\.ico"/i);
  assert.match(html, /rel="apple-touch-icon"[^>]*href="\/favicon\.png"/i);
  assert.match(html, /hey, I[’']m Sahil(?!\.)/i);
  assert.match(html, /mailto:gensahilsingh@gmail\.com[^>]*>gensahilsingh@gmail\.com/);
  assert.match(html, /<div class="quick-links[\s\S]*?<a class="mini-pill about-cta" href="\/about">\s*Read about me in detail\s*<span class="text-arrow"[^>]*>→\uFE0E<\/span>[\s\S]*?<span class="about-cta-break"[^>]*>[\s\S]*?<a class="mini-pill" href="#papers">/);
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
  assert.match(html, /class="github-arrow text-arrow"[^>]*>→\uFE0E<\/span>/);
  assert.ok((html.match(/class="text-arrow"[^>]*>↗\uFE0E<\/span>/g) ?? []).length >= 10);
  assert.doesNotMatch(html, /↗(?!\uFE0E)/);
  assert.doesNotMatch(html, /class="text-arrow"[^>]*>[↓→](?!\uFE0E)/);
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
  assert.match(html, /class="logo-set" role="list"/);
  assert.match(html, /class="logo-set logo-set-clone" role="list" aria-hidden="true"/);
  assert.equal((html.match(/class="logo-set" role="list"/g) ?? []).length, 1);
  assert.equal((html.match(/class="logo-set logo-set-clone"/g) ?? []).length, 1);
  assert.ok(html.indexOf('id="affiliations"') < html.indexOf('id="work"'));
  assert.doesNotMatch(html, /Making room for|Researcher <span|Currently learning in public|Curious by default/i);
  assert.doesNotMatch(html, /id="about"|id="resume"|Coming soon|Say hello/i);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("keeps the final page free of starter preview infrastructure", async () => {
  const [page, aboutPage, aboutCopy, layout, packageJson, css, nextConfig, vercelConfig, gitignore, readme, staticExport, qrSvg] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/about/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/about/about-copy.ts", import.meta.url), "utf8"),
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
  assert.match(page, /className="mini-pill about-cta" href="\/about"/);
  assert.match(page, /Read about me in detail/);
  assert.match(page, /about-cta-break/);
  assert.match(aboutPage, /title:\s*"About Sahil"/);
  assert.match(aboutPage, /robots:\s*\{[\s\S]*index:\s*true[\s\S]*follow:\s*true/);
  assert.doesNotMatch(aboutPage, /noindex|nofollow|about-placeholder/);
  assert.match(aboutPage, /ABOUT_SECTIONS/);
  assert.match(aboutPage, /introSection\s*=\s*ABOUT_SECTIONS\[0\]/);
  assert.match(aboutPage, /articleSections\s*=\s*ABOUT_SECTIONS\.slice\(1\)/);
  assert.match(aboutPage, /contentsSections\s*=\s*articleSections\.slice\(0,\s*-1\)/);
  assert.match(aboutPage, /CASCADE_URL/);
  assert.match(aboutCopy, /export const ABOUT_COPY_SHA256 = "81a4e4de46f91548739ff230155a30e0b07e62c3e9f4e3f053154906e4dc8f41"/);
  assert.match(aboutCopy, /"hey, I’m Sahil\."/);
  assert.match(aboutCopy, /"I’m currently a 10th grader at Fulton Science Academy, in Alpharetta, Georgia\."/);
  assert.match(aboutCopy, /Problem-solving & learning/);
  assert.match(aboutCopy, /BPC-FNO & RIT/);
  assert.match(aboutCopy, /Symbolic mathematics & interpretability/);
  assert.match(aboutCopy, /KORUCUSAT-2/);
  assert.match(aboutCopy, /Competitions & robotics/);
  assert.match(aboutCopy, /Hackathons/);
  assert.match(aboutCopy, /https:\/\/plume\.hackmit\.org\/project\/lwjjl-xrsqe-ucvue-rsqap/);
  assert.match(page, /id="papers"/);
  assert.match(layout, /title: "Sahil Singh"/);
  assert.match(layout, /icons:\s*\{[\s\S]*icon: "\/favicon\.ico"[\s\S]*shortcut: "\/favicon\.ico"[\s\S]*apple: "\/favicon\.png"/);
  assert.doesNotMatch(page, /#about|#resume|Coming soon|Keep in touch|Say hello/);
  assert.doesNotMatch(page, /tel:\+17244574644|724-457-4644/);
  assert.match(page, /const TEXT_ARROWS\s*=\s*\{[\s\S]*external:\s*"\\u2197\\uFE0E"/);
  assert.equal((page.match(/className="text-arrow" aria-hidden="true">\{TEXT_ARROWS\.external\}<\/span>/g) ?? []).length, 9);
  assert.match(page, /className="text-arrow" aria-hidden="true">\{TEXT_ARROWS\.down\}<\/span>/);
  assert.match(page, /className="github-arrow text-arrow" aria-hidden="true">\{TEXT_ARROWS\.right\}<\/span>/);
  assert.doesNotMatch(page, /↗(?!\uFE0E)/);
  assert.doesNotMatch(page, /A concise view of the questions|The public thread for new work/);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /_sites-preview|codex-preview|Starter Project/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(packageJson, /"build":\s*"vite build && node scripts\/static-export\.mjs"/);
  assert.match(staticExport, /runPrerender/);
  assert.match(staticExport, /emitPrerenderPathManifest/);
  assert.match(staticExport, /index\.html[\s\S]*index\.rsc[\s\S]*about\.html[\s\S]*about\.rsc[\s\S]*404\.html/);
  assert.match(nextConfig, /output:\s*["']export["']/);
  const vercel = JSON.parse(vercelConfig);
  assert.equal(vercel.$schema, "https://openapi.vercel.sh/vercel.json");
  assert.equal(vercel.framework, null);
  assert.equal(vercel.installCommand, "npm ci");
  assert.equal(vercel.buildCommand, "npm run build");
  assert.equal(vercel.outputDirectory, "dist/client");
  assert.equal(vercel.cleanUrls, true);
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
  assert.match(css, /\.text-arrow\s*\{[^}]*font-family:\s*var\(--sans\)[^}]*font-variant-emoji:\s*text/s);
  assert.match(css, /\.github-break\s*\{[^}]*flex-basis:\s*100%/s);
  assert.match(css, /@media\s*\(max-width:\s*340px\)[\s\S]*\.github-popover\s*\{[^}]*min-width:\s*min\(184px,\s*calc\(100vw\s*-\s*152px\)\)/s);
  assert.match(css, /@media\s*\(max-width:\s*780px\)[\s\S]*\.paper-disclosure summary \.summary-icon\s*\{[^}]*grid-column:\s*2[^}]*grid-row:\s*1[^}]*justify-self:\s*end[^}]*width:\s*max-content/s);
  assert.match(css, /@media\s*\(max-width:\s*780px\)[\s\S]*\.paper-disclosure \.paper-status\s*\{[^}]*grid-column:\s*1\s*\/\s*-1[^}]*grid-row:\s*2/s);
  assert.match(css, /\.work-card h2,[\s\r\n]*\.work-card h3\s*\{[^}]*margin:\s*0\s+0\s+10px/s);
  assert.doesNotMatch(css, /\.papers-card h2/);
  assert.match(css, /\.work-card-link:focus-visible\s*\{[^}]*outline:\s*2px\s+solid\s+var\(--accent\)/s);
  assert.match(css, /\.work-card-link:hover \.card-link/);
  assert.match(css, /\.about-cta\s*\{[^}]*background:\s*var\(--warm-black\)[^}]*color:\s*var\(--cream\)/s);
  assert.match(css, /\.about-cta\s+span\s*\{[^}]*color:\s*#f1a67f/s);
  assert.match(css, /\.about-cta-break\s*\{[^}]*display:\s*none/s);
  assert.match(css, /@media\s*\(max-width:\s*780px\)[\s\S]*\.about-cta-break\s*\{[^}]*display:\s*block[^}]*flex-basis:\s*100%/s);
  assert.match(css, /\.about-layout\s*\{[^}]*grid-template-columns:\s*minmax\(150px,\s*210px\)\s+minmax\(0,\s*760px\)/s);
  assert.match(css, /\.about-contents\s*\{[^}]*position:\s*sticky/s);
  assert.match(css, /\.about-prose\s*\{[^}]*min-width:\s*0/s);
  assert.match(css, /\.about-sublead\s*\{[\s\S]*font-family:\s*var\(--serif\)/s);
  assert.match(css, /\.about-closing\s*\{[\s\S]*margin-top:/s);
  assert.match(css, /\.about-section p\s*\{[^}]*overflow-wrap:\s*anywhere/s);
  assert.match(css, /@media\s*\(max-width:\s*780px\)[\s\S]*\.about-layout\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/s);
  assert.match(css, /@media\s*\(max-width:\s*780px\)[\s\S]*\.about-contents\s*\{[^}]*position:\s*static/s);
  assert.match(css, /\.logo-track\s*\{[^}]*width:\s*100%[^}]*gap:\s*12px/s);
  assert.match(css, /\.logo-set\s*\{[^}]*width:\s*100%[^}]*flex:\s*1\s+1\s+auto[^}]*gap:\s*12px/s);
  assert.match(css, /\.logo-set-clone\s*\{[^}]*display:\s*none/s);
  assert.match(css, /@keyframes\s+affiliation-marquee[\s\S]*translate3d\(calc\(-50%\s*-\s*6px\)/s);
  assert.match(css, /\.logo-strip\s*\{[^}]*overflow-x:\s*auto[^}]*touch-action:\s*pan-x/s);
  assert.match(css, /\.logo-strip::-webkit-scrollbar\s*\{[^}]*display:\s*none/s);
  assert.match(css, /@media\s*\(max-width:\s*700px\)[\s\S]*\.logo-track\s*\{[^}]*width:\s*max-content[^}]*animation:\s*affiliation-marquee\s+24s\s+linear\s+infinite/s);
  assert.match(css, /@media\s*\(max-width:\s*700px\)[\s\S]*\.logo-set\s*\{[^}]*width:\s*max-content[^}]*flex:\s*0\s+0\s+auto/s);
  assert.match(css, /@media\s*\(max-width:\s*700px\)[\s\S]*\.logo-set-clone\s*\{[^}]*display:\s*flex/s);
  assert.match(css, /@media\s*\(max-width:\s*700px\)[\s\S]*\.logo-strip:active \.logo-track,[\s\r\n]*\.logo-strip:focus-within \.logo-track\s*\{[^}]*animation-play-state:\s*paused/s);
  assert.match(css, /@media\s*\(hover:\s*hover\)\s+and\s+\(pointer:\s*fine\)[\s\S]*\.logo-strip:hover \.logo-track\s*\{[^}]*animation-play-state:\s*paused/s);
  assert.doesNotMatch(css, /@media\s*\(max-width:\s*700px\)[\s\S]*\.logo-strip:hover \.logo-track,[\s\r\n]*\.logo-strip:active \.logo-track/s);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*\.logo-track\s*\{[^}]*animation:\s*none\s*!important[^}]*transform:\s*none\s*!important[\s\S]*\.logo-set-clone\s*\{[^}]*display:\s*none\s*!important/s);

  await assert.rejects(
    access(new URL("../app/_sites-preview", import.meta.url)),
  );
  const faviconPng = await readFile(new URL("../public/favicon.png", import.meta.url));
  const faviconIco = await readFile(new URL("../public/favicon.ico", import.meta.url));
  assert.equal(faviconPng.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.equal(faviconPng.readUInt32BE(16), 512);
  assert.equal(faviconPng.readUInt32BE(20), 512);
  assert.equal(faviconPng[25], 6);
  assert.equal(faviconIco.readUInt16LE(0), 0);
  assert.equal(faviconIco.readUInt16LE(2), 1);
  assert.ok(faviconIco.readUInt16LE(4) >= 3);
  const icoSizes = Array.from({ length: faviconIco.readUInt16LE(4) }, (_, index) => {
    const offset = 6 + index * 16;
    return [faviconIco[offset] || 256, faviconIco[offset + 1] || 256];
  });
  for (const size of [[16, 16], [32, 32], [48, 48]]) {
    assert.ok(icoSizes.some(([width, height]) => width === size[0] && height === size[1]));
  }
  await assert.rejects(access(new URL("../public/favicon.svg", import.meta.url)));
  await access(new URL("../public/sahil-singh-resume.pdf", import.meta.url));
  await access(new URL("../public/assets/ptmc.png", import.meta.url));
  await access(new URL("../public/assets/ptmc-badge.png", import.meta.url));
  await access(new URL("../public/assets/github-mark.svg", import.meta.url));
  await assert.rejects(access(new URL("../public/assets/github-mark.png", import.meta.url)));
  await access(new URL("../public/papers/geml-paper.pdf", import.meta.url));
  await access(new URL("../public/papers/bpc-fno-paper.pdf", import.meta.url));
  await access(new URL("../public/sahil-portfolio-qr.svg", import.meta.url));
  await access(new URL("../public/sahil-portfolio-qr.png", import.meta.url));
  await access(new URL("../dist/client/about.html", import.meta.url));
  await access(new URL("../dist/client/about.rsc", import.meta.url));
});

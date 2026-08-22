# Sahil Singh Portfolio

A single-page portfolio for Sahil Singh, with paper links, résumé and LinkedIn
contact points, GitHub profiles, and affiliation marks.

## Local development

Prerequisite: Node.js `>=22.13.0`.

```bash
npm ci
npm run dev
```

## Validation and production build

```bash
npm test
npm run lint
npm run build
```

The production build is a static export. `vercel.json` configures Vercel to
install with `npm ci`, run `npm run build`, and serve the exported site from
`dist/client`.

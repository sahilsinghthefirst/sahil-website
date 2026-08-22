export const LINK_TARGETS = {
  papers: "https://saidlaboratory.github.io/GEML/",
  resume: "/sahil-singh-resume.pdf",
  linkedin: "https://www.linkedin.com/in/sahil-singh-17a641239",
} as const;

const TEXT_ARROWS = {
  down: "\u2193\uFE0E",
  external: "\u2197\uFE0E",
  right: "\u2192\uFE0E",
} as const;

const workLinks = [
  {
    title: "Résumé",
    href: LINK_TARGETS.resume,
    label: "Open résumé",
  },
  {
    title: "LinkedIn",
    href: LINK_TARGETS.linkedin,
    label: "Find me there",
  },
] as const;

type Affiliation = {
  name: string;
  shortName: string;
  src?: string;
  wordmark?: string;
  alt: string;
};

const affiliations: Affiliation[] = [
  {
    name: "Rochester Institute of Technology",
    shortName: "RIT",
    wordmark: "RIT",
    alt: "Rochester Institute of Technology",
  },
  {
    name: "Algoverse AI Research",
    shortName: "Algoverse",
    src: "/assets/algoverse.webp",
    alt: "Algoverse AI Research",
  },
  {
    name: "PTMC",
    shortName: "PTMC",
    src: "/assets/ptmc-badge.png",
    alt: "PTMC",
  },
  {
    name: "KORUCUSAT-2 · Fulton Science Academy",
    shortName: "KORUCUSAT-2",
    src: "/assets/korucusat-2.png",
    alt: "KORUCUSAT-2, Fulton Science Academy",
  },
  {
    name: "Fulton Science Academy",
    shortName: "Fulton Science Academy",
    src: "/assets/fulton-science-academy.png",
    alt: "Fulton Science Academy",
  },
];

function AffiliationSet({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      className={duplicate ? "logo-set logo-set-clone" : "logo-set"}
      role="list"
      aria-hidden={duplicate ? true : undefined}
    >
      {affiliations.map((affiliation) => (
        <div className="logo-card" role="listitem" key={`${duplicate ? "clone-" : ""}${affiliation.name}`}>
          {affiliation.src ? (
            <img
              className={`affiliation-logo logo-${affiliation.shortName.toLowerCase().replaceAll(" ", "-")}`}
              src={affiliation.src}
              alt={duplicate ? "" : affiliation.alt}
              loading="lazy"
            />
          ) : (
            <span className="affiliation-wordmark rit-wordmark" aria-label={duplicate ? undefined : affiliation.alt}>
              {affiliation.wordmark}
            </span>
          )}
          <span className="logo-name">{affiliation.shortName}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Sahil home">
          <span className="brand-mark" aria-hidden="true">
            S
          </span>
          <span>Sahil</span>
        </a>
      </header>

      <div id="top" />
      <section id="main-content" className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title" className="reveal reveal-delay-1">
            hey, I&apos;m Sahil
          </h1>
          <div className="contact-row reveal reveal-delay-2" aria-label="Contact details">
            <a href="mailto:gensahilsingh@gmail.com">gensahilsingh@gmail.com</a>
          </div>
          <div className="quick-links reveal reveal-delay-2" aria-label="Portfolio links">
            <a className="mini-pill" href="#papers">
              Papers <span className="text-arrow" aria-hidden="true">{TEXT_ARROWS.down}</span>
            </a>
            <a className="mini-pill" href={LINK_TARGETS.resume} target="_blank" rel="noreferrer">
              Résumé <span className="text-arrow" aria-hidden="true">{TEXT_ARROWS.external}</span>
            </a>
            <a className="mini-pill" href={LINK_TARGETS.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <span className="text-arrow" aria-hidden="true">{TEXT_ARROWS.external}</span>
            </a>
            <span className="github-break" aria-hidden="true" />
            <div className="github-menu">
              <button type="button" className="mini-pill github-trigger" aria-haspopup="menu" aria-label="Open GitHub profiles">
                <img src="/assets/github-mark.svg" alt="" aria-hidden="true" />
                <span className="github-label">GitHub</span>
                <span className="github-arrow text-arrow" aria-hidden="true">{TEXT_ARROWS.right}</span>
              </button>
              <div className="github-popover" role="menu" aria-label="GitHub profiles">
                <a role="menuitem" href="https://github.com/sahilsinghthefirst" target="_blank" rel="noreferrer">
                  sahilsinghthefirst <span className="text-arrow" aria-hidden="true">{TEXT_ARROWS.external}</span>
                </a>
                <a role="menuitem" href="https://github.com/gensahilsingh" target="_blank" rel="noreferrer">
                  gensahilsingh <span className="text-arrow" aria-hidden="true">{TEXT_ARROWS.external}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="affiliations" className="affiliations section-rule" aria-label="Affiliations">
        <div className="logo-strip" aria-label="Affiliations">
          <div className="logo-track">
            <AffiliationSet />
            <AffiliationSet duplicate />
          </div>
        </div>
      </section>

      <section id="work" className="work section-rule" aria-label="Work">
        <div className="work-grid">
          <article id="papers" className="work-card papers-card">
            <h2>Papers</h2>
            <div className="paper-list">
              <details className="paper-disclosure">
                <summary>
                  <span className="paper-name">GEML</span>
                  <span className="paper-status">Pending EMNLP MathNLP submission</span>
                  <span className="summary-icon" aria-hidden="true">+</span>
                </summary>
                <div className="paper-panel">
                  <a href="/papers/geml-paper.pdf" target="_blank" rel="noreferrer">
                    Paper <span className="text-arrow" aria-hidden="true">{TEXT_ARROWS.external}</span>
                  </a>
                  <a href={LINK_TARGETS.papers} target="_blank" rel="noreferrer">
                    Project page <span className="text-arrow" aria-hidden="true">{TEXT_ARROWS.external}</span>
                  </a>
                  <a href="https://github.com/saidlaboratory/GEML" target="_blank" rel="noreferrer">
                    GitHub repository <span className="text-arrow" aria-hidden="true">{TEXT_ARROWS.external}</span>
                  </a>
                </div>
              </details>
              <details className="paper-disclosure">
                <summary>
                  <span className="paper-name">BPC-FNO</span>
                  <span className="paper-status">Paper</span>
                  <span className="summary-icon" aria-hidden="true">+</span>
                </summary>
                <div className="paper-panel">
                  <a href="/papers/bpc-fno-paper.pdf" target="_blank" rel="noreferrer">
                    Paper <span className="text-arrow" aria-hidden="true">{TEXT_ARROWS.external}</span>
                  </a>
                </div>
              </details>
              <div className="paper-static">
                <span className="paper-static-status">In Progress</span>
                <span className="paper-static-title">World Model Occlusion Paper (with Algoverse)</span>
              </div>
            </div>
          </article>
          {workLinks.map((item) => (
            <a
              className="work-card work-card-link"
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${item.title}: ${item.label}`}
              key={item.title}
            >
              <h2>{item.title}</h2>
              <span className="card-link">
                {item.label} <span className="text-arrow" aria-hidden="true">{TEXT_ARROWS.external}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <footer className="site-footer section-rule">
        <div className="footer-meta">
          <span>© 2026 Sahil</span>
        </div>
      </footer>
    </main>
  );
}

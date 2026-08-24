import type { Metadata } from "next";
import Link from "next/link";

import { ABOUT_SECTIONS, CASCADE_URL } from "./about-copy";

export const metadata: Metadata = {
  title: "About Sahil",
  description: "A closer look at Sahil's research, learning, and projects.",
  robots: {
    index: true,
    follow: true,
  },
};

function renderParagraph(paragraph: string) {
  const linkStart = paragraph.indexOf(CASCADE_URL);

  if (linkStart === -1) {
    return paragraph;
  }

  const linkEnd = linkStart + CASCADE_URL.length;

  return (
    <>
      {paragraph.slice(0, linkStart)}
      <a href={CASCADE_URL} target="_blank" rel="noreferrer">
        {CASCADE_URL}
      </a>
      {paragraph.slice(linkEnd)}
    </>
  );
}

export default function AboutPage() {
  const introSection = ABOUT_SECTIONS[0];
  const articleSections = ABOUT_SECTIONS.slice(1);
  const contentsSections = articleSections.slice(0, -1);

  return (
    <main className="about-page" aria-labelledby="about-title">
      <header className="about-header">
        <Link className="brand about-home" href="/" aria-label="Back to Sahil home">
          <span className="brand-mark" aria-hidden="true">
            S
          </span>
          <span>Sahil</span>
        </Link>
        <div className="about-heading">
          <p className="about-kicker">About</p>
          <h1 id="about-title">{introSection.paragraphs[0]}</h1>
          <p className="about-sublead">{introSection.paragraphs[1]}</p>
        </div>
      </header>

      <div className="about-layout">
        <aside className="about-contents" aria-label="About page sections">
          <p className="about-contents-label">On this page</p>
          <nav aria-label="About sections">
            <ol>
              {contentsSections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="about-prose" aria-label="About Sahil biography">
          {articleSections.map((section) => (
            <section
              className={`about-section${section.id === "closing" ? " about-closing" : ""}`}
              id={section.id}
              key={section.id}
            >
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={`${section.id}-${index}`}>{renderParagraph(paragraph)}</p>
              ))}
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}

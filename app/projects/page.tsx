import type { Metadata } from "next";
import Link from "next/link";

import {
  ADDITIONAL_PROJECTS,
  AREAS,
  CURRENT_DIRECTION,
  MAJOR_PROJECTS,
  RECOGNITION_GROUPS,
  RESOURCE_INTRO,
  RESOURCES,
  SKILLS,
} from "./projects-data";

export const metadata: Metadata = {
  title: "Project Portfolio — Sahil Singh",
  description: "A structured index of Sahil Singh's research, engineering projects, recognition, and technical work.",
  robots: {
    index: true,
    follow: true,
  },
};

const EXTERNAL_ARROW = "\u2197\uFE0E";

function ExternalArrow() {
  return (
    <span className="text-arrow" aria-hidden="true">
      {EXTERNAL_ARROW}
    </span>
  );
}

export default function ProjectsPage() {
  return (
    <main className="projects-page" aria-labelledby="projects-title">
      <header className="projects-header">
        <Link className="brand projects-home" href="/" aria-label="Back to Sahil home">
          <span className="brand-mark" aria-hidden="true">
            S
          </span>
          <span>Sahil</span>
        </Link>
        <div className="projects-heading">
          <p className="projects-kicker">Sahil Singh</p>
          <h1 id="projects-title">Project Portfolio</h1>
          <p className="projects-lead">{CURRENT_DIRECTION.research}</p>
        </div>
      </header>

      <div className="projects-layout">
        <aside className="projects-index" aria-label="Project portfolio sections">
          <p className="projects-index-label">Portfolio index</p>
          <nav aria-label="Project sections">
            <ol>
              <li>
                <a href="#snapshot">Current direction</a>
              </li>
              <li>
                <a href="#areas">Areas</a>
              </li>
              <li>
                <a href="#major-projects">Major projects</a>
              </li>
              <li>
                <a href="#additional-projects">Additional projects</a>
              </li>
              <li>
                <a href="#recognition">Recognition &amp; skills</a>
              </li>
              <li>
                <a href="#resources">Resources</a>
              </li>
            </ol>
          </nav>
        </aside>

        <div className="projects-content">
          <section id="snapshot" className="projects-section projects-snapshot" aria-labelledby="snapshot-title">
            <div className="projects-section-heading">
              <h2 id="snapshot-title">Current direction</h2>
            </div>
            <div className="projects-snapshot-grid">
              <article className="projects-snapshot-item">
                <h3>Research focus</h3>
                <p>{CURRENT_DIRECTION.researchFocus}</p>
              </article>
              <article className="projects-snapshot-item">
                <h3>Engineering focus</h3>
                <p>{CURRENT_DIRECTION.engineeringFocus}</p>
              </article>
              <article className="projects-snapshot-item">
                <h3>Recognition</h3>
                <p>{CURRENT_DIRECTION.recognition}</p>
              </article>
              <article className="projects-snapshot-item">
                <h3>Presentation</h3>
                <p>{CURRENT_DIRECTION.presentation}</p>
              </article>
            </div>
          </section>

          <section id="areas" className="projects-section" aria-labelledby="areas-title">
            <div className="projects-section-heading">
              <h2 id="areas-title">Area / Examples in this portfolio</h2>
            </div>
            <div className="area-list" role="list">
              {AREAS.map((item) => (
                <div className="area-row" role="listitem" key={item.area}>
                  <h3>{item.area}</h3>
                  <p>{item.examples}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="major-projects" className="projects-section" aria-labelledby="major-projects-title">
            <div className="projects-section-heading">
              <h2 id="major-projects-title">Six major projects</h2>
            </div>
            <div className="major-project-list">
              {MAJOR_PROJECTS.map((project, index) => (
                <details className="project-disclosure" key={project.id} open={index === 0}>
                  <summary>
                    <span className="project-number">{project.number}</span>
                    <span className="project-summary-main">
                      <span className="project-name">{project.name}</span>
                      <span className="project-subtitle">{project.subtitle}</span>
                      {project.lead ? <span className="project-lead">{project.lead}</span> : null}
                      <span className="project-tags" aria-label={`${project.name} tags`}>
                        {project.tags.map((tag) => (
                          <span className="project-tag" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </span>
                    </span>
                    <span className="project-summary-meta">
                      <span className="project-status">{project.statusSummary}</span>
                      <span className="project-disclosure-icon" aria-hidden="true">
                        +
                      </span>
                    </span>
                  </summary>
                  <div className="project-panel">
                    <div className="project-copy-grid">
                      <div>
                        <h3>Problem</h3>
                        <p>{project.problem}</p>
                      </div>
                      <div>
                        <h3>Approach</h3>
                        <p>{project.approach}</p>
                      </div>
                      <div>
                        <h3>Novel / technical contribution</h3>
                        <p>{project.contribution}</p>
                      </div>
                      <div>
                        <h3>Status</h3>
                        <p>{project.status}</p>
                      </div>
                    </div>
                    {project.supplementalSections?.map((section) => (
                      <section className="project-supplemental" key={section.label} aria-labelledby={`${project.id}-${section.label.toLowerCase().replaceAll(" ", "-")}`}>
                        <h3 id={`${project.id}-${section.label.toLowerCase().replaceAll(" ", "-")}`}>{section.label}</h3>
                        <ul>
                          {section.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </section>
                    ))}
                    {project.technicalStack ? (
                      <div className="technical-stack">
                        <h3>Technical stack and outputs</h3>
                        <div className="technical-stack-grid">
                          {project.technicalStack.map((item) => (
                            <div key={item.label}>
                              <h4>{item.label}</h4>
                              <p>{item.items}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section id="additional-projects" className="projects-section" aria-labelledby="additional-projects-title">
            <div className="projects-section-heading">
              <h2 id="additional-projects-title">Additional selected projects</h2>
            </div>
            <div className="additional-project-grid" role="list">
              {ADDITIONAL_PROJECTS.map((project) => (
                <article className="additional-project-card" role="listitem" key={project.name}>
                  <h3>{project.name}</h3>
                  <p>{project.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="recognition" className="projects-section" aria-labelledby="recognition-title">
            <div className="projects-section-heading">
              <h2 id="recognition-title">Recognition and technical profile</h2>
            </div>
            <div className="recognition-grid">
              {RECOGNITION_GROUPS.map((group) => (
                <article className="recognition-block" key={group.label}>
                  <h3>{group.label}</h3>
                  <p>{group.text}</p>
                </article>
              ))}
              <article className="recognition-block skills-block">
                <h3>Skills</h3>
                <ul className="skills-list">
                  {SKILLS.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          <section id="resources" className="projects-section projects-resources" aria-labelledby="resources-title">
            <div className="projects-section-heading">
              <h2 id="resources-title">Resources</h2>
            </div>
            <div className="resource-intro">
              <p className="resource-context">{RESOURCE_INTRO.scope}</p>
              <p>{RESOURCE_INTRO.photos}</p>
              <p>{RESOURCE_INTRO.presentations}</p>
            </div>
            <div className="resource-grid" role="list">
              {RESOURCES.map((resource) => (
                <div role="listitem" key={resource.href}>
                  <a className="resource-card" href={resource.href} target="_blank" rel="noreferrer">
                    <span>{resource.label}</span>
                    <ExternalArrow />
                  </a>
                </div>
              ))}
            </div>
          </section>

          <p className="projects-about-link">
            <Link href="/about">Read the detailed About page</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

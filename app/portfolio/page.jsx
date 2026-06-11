"use client";

import { useMemo, useState } from "react";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { asset, projects } from "../site-data";

export default function PortfolioPage() {
  const [projectType, setProjectType] = useState("All");
  const visibleProjects = useMemo(() => projectType === "All" ? projects : projects.filter((project) => project.type === projectType), [projectType]);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <img src={asset("com-hero.jpg")} alt="True Designs portfolio" />
          <div>
            <p className="eyebrow">Portfolio</p>
            <h1>Selected residential and commercial interiors.</h1>
            <p>Explore spaces shaped through warm materials, practical planning, and polished execution.</p>
          </div>
        </section>

        <section className="portfolio-section page-section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Selected Work</p>
              <h2>Filter by project type.</h2>
            </div>
            <div className="project-filter">
              {["All", "Residential", "Commercial"].map((type) => (
                <button className={projectType === type ? "active" : ""} key={type} onClick={() => setProjectType(type)}>
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="project-grid">
            {visibleProjects.map((project) => (
              <article className="project-card" key={project.title}>
                <img src={asset(project.image)} alt={project.title} />
                <div><span>{project.type} | {project.location}</span><h3>{project.title}</h3><p>{project.detail}</p></div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

"use client";

import { useMemo, useState } from "react";
import PortfolioGallery from "../components/PortfolioGallery";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import usePortfolioProjects from "../components/usePortfolioProjects";
import { asset } from "../site-data";

export default function PortfolioPage() {
  const [projectType, setProjectType] = useState("All");
  const projects = usePortfolioProjects();
  const visibleProjects = useMemo(() => projectType === "All" ? projects : projects.filter((project) => project.type === projectType), [projectType, projects]);

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
          <PortfolioGallery projects={visibleProjects} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

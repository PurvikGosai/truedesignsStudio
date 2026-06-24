"use client";

import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import PortfolioGallery from "../../components/PortfolioGallery";
import usePortfolioProjects from "../../components/usePortfolioProjects";
import { asset } from "../../site-data";

export default function CommercialProjectsPage() {
  const projects = usePortfolioProjects();
  const commercial = projects.filter((project) => project.type === "Commercial");
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <img src={asset("com-hero.jpg")} alt="Commercial projects" />
          <div className="reveal-up"><p className="eyebrow">Portfolio</p><h1>Commercial Projects</h1><p>Workspaces designed for authority, productivity, privacy, and confident first impressions.</p></div>
        </section>
        <section className="portfolio-section page-section"><PortfolioGallery projects={commercial} /></section>
      </main>
      <SiteFooter />
    </>
  );
}

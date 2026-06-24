"use client";

import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import PortfolioGallery from "../../components/PortfolioGallery";
import usePortfolioProjects from "../../components/usePortfolioProjects";
import { asset } from "../../site-data";

export default function ResidentialProjectsPage() {
  const projects = usePortfolioProjects();
  const residential = projects.filter((project) => project.type === "Residential");
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <img src={asset("res-open-layout.jpg")} alt="Residential projects" />
          <div className="reveal-up"><p className="eyebrow">Portfolio</p><h1>Residential Projects</h1><p>Homes shaped around comfort, warmth, storage, and refined everyday living.</p></div>
        </section>
        <section className="portfolio-section page-section"><PortfolioGallery projects={residential} /></section>
      </main>
      <SiteFooter />
    </>
  );
}

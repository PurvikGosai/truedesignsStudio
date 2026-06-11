import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { asset, projects } from "../../site-data";

export const metadata = {
  title: "Residential Projects | True Designs",
  description: "Residential interior projects by True Designs in Vadodara.",
};

export default function ResidentialProjectsPage() {
  const residential = projects.filter((project) => project.type === "Residential");
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <img src={asset("res-open-layout.jpg")} alt="Residential projects" />
          <div className="reveal-up"><p className="eyebrow">Portfolio</p><h1>Residential Projects</h1><p>Homes shaped around comfort, warmth, storage, and refined everyday living.</p></div>
        </section>
        <section className="portfolio-section page-section"><div className="project-grid">{residential.map((project) => <article className="project-card reveal-up" key={project.title}><img src={asset(project.image)} alt={project.title} /><div><span>{project.type} | {project.location}</span><h3>{project.title}</h3><p>{project.detail}</p></div></article>)}</div></section>
      </main>
      <SiteFooter />
    </>
  );
}

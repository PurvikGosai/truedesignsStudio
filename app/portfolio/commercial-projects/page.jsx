import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { asset, projects } from "../../site-data";

export const metadata = {
  title: "Commercial Projects | True Designs",
  description: "Commercial interior projects by True Designs in Vadodara.",
};

export default function CommercialProjectsPage() {
  const commercial = projects.filter((project) => project.type === "Commercial");
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <img src={asset("com-hero.jpg")} alt="Commercial projects" />
          <div className="reveal-up"><p className="eyebrow">Portfolio</p><h1>Commercial Projects</h1><p>Workspaces designed for authority, productivity, privacy, and confident first impressions.</p></div>
        </section>
        <section className="portfolio-section page-section"><div className="project-grid">{commercial.map((project) => <article className="project-card reveal-up" key={project.title}><img src={asset(project.image)} alt={project.title} /><div><span>{project.type} | {project.location}</span><h3>{project.title}</h3><p>{project.detail}</p></div></article>)}</div></section>
      </main>
      <SiteFooter />
    </>
  );
}

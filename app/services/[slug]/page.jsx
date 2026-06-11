import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { asset, servicePages, services } from "../../site-data";

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }) {
  const service = servicePages.find((item) => item.slug === params.slug) || servicePages[0];
  return {
    title: `${service.title} | True Designs`,
    description: service.intro,
  };
}

export default function ServiceDetailPage({ params }) {
  const service = servicePages.find((item) => item.slug === params.slug) || servicePages[0];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <img src={asset(service.image)} alt={service.title} />
          <div className="reveal-up">
            <p className="eyebrow">Service</p>
            <h1>{service.title}</h1>
            <p>{service.intro}</p>
          </div>
        </section>
        <section className="services-section">
          <div className="section-copy reveal-up">
            <p className="eyebrow">Scope</p>
            <h2>Designed for beauty, function, and execution clarity.</h2>
          </div>
          <div className="service-list">
            {services.slice(0, 4).map(([title, description]) => (
              <article className="reveal-up" key={title}><h3>{title}</h3><p>{description}</p></article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

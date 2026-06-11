import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { asset, services } from "../site-data";

export const metadata = {
  title: "Services | True Designs",
  description: "Residential interiors, commercial interiors, turnkey execution, modular kitchens, renovation, and 3D visualization.",
};

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <img src={asset("res-kitchen.jpg")} alt="Interior design services" />
          <div>
            <p className="eyebrow">Services</p>
            <h1>Design, detailing, and execution under one roof.</h1>
            <p>From the first layout conversation to final handover, every service is planned around usability and finish quality.</p>
          </div>
        </section>

        <section className="services-section">
          <div className="section-copy">
            <p className="eyebrow">What We Do</p>
            <h2>Interior services for homes, offices, and renovations.</h2>
          </div>
          <div className="service-list">
            {services.map(([title, description]) => (
              <article key={title}><h3>{title}</h3><p>{description}</p></article>
            ))}
          </div>
        </section>

        <section className="commercial-story">
          <div>
            <p className="eyebrow">Turnkey Support</p>
            <h2>One clear team from design direction to site work.</h2>
            <p>Material selection, vendor coordination, supervision, and final detailing are handled with a practical execution mindset.</p>
          </div>
          <img src={asset("com-corridor.jpg")} alt="Commercial interior execution" />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { asset, processSteps } from "../site-data";

export const metadata = {
  title: "Process | True Designs",
  description: "See the True Designs process from consultation and design direction to execution and final handover.",
};

export default function ProcessPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <img src={asset("res-dining.jpg")} alt="Interior design process" />
          <div>
            <p className="eyebrow">Process</p>
            <h1>A calm, clear path from conversation to handover.</h1>
            <p>The process keeps decisions visible, execution practical, and the final space aligned with the design intent.</p>
          </div>
        </section>

        <section className="process-section">
          <div className="section-head">
            <div><p className="eyebrow">How It Works</p><h2>Four stages, one coherent result.</h2></div>
          </div>
          <div className="process-grid">
            {processSteps.map(([number, title, description]) => (
              <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>
            ))}
          </div>
        </section>

        <section className="signature">
          <img src={asset("com-glass.jpg")} alt="Workspace planning" />
          <div>
            <p className="eyebrow">Execution Mindset</p>
            <h2>Design decisions are made with the site in mind.</h2>
            <p>Layouts, lighting, materials, and details are considered not only for presentation, but for installation, maintenance, and daily use.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

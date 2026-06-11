import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { asset, recognitions } from "../site-data";

export const metadata = {
  title: "Recognitions | True Designs",
  description: "Recognitions and strengths of True Designs interior studio in Vadodara.",
};

export default function RecognitionsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <img src={asset("com-detail-blue.jpg")} alt="True Designs recognitions" />
          <div className="reveal-up">
            <p className="eyebrow">Recognitions</p>
            <h1>Recognized through detail, trust, and practical execution.</h1>
            <p>Our reputation is built through finished spaces, clear communication, and interiors that hold up beyond the first impression.</p>
          </div>
        </section>
        <section className="process-section">
          <div className="process-grid">
            {recognitions.map(([title, description], index) => (
              <article className="count-card" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

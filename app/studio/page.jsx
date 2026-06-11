import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { asset, highlights } from "../site-data";

export const metadata = {
  title: "Studio | True Designs",
  description: "Learn about True Designs, an elegant interior design and turnkey execution studio in Vadodara.",
};

export default function StudioPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <img src={asset("res-feature-entry.jpg")} alt="True Designs signature interior" />
          <div>
            <p className="eyebrow">The Studio</p>
            <h1>Interior design with calm, clarity, and careful execution.</h1>
            <p>True Designs creates homes and workspaces that feel refined without becoming impractical.</p>
          </div>
        </section>

        <section className="numbers" aria-label="Studio highlights">
          {highlights.map(([value, label]) => (
            <div key={value}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </section>

        <section className="studio-section">
          <div className="section-copy">
            <p className="eyebrow">Philosophy</p>
            <h2>Luxury is proportion, light, material, and restraint.</h2>
          </div>
          <div className="studio-text">
            <p>Every project begins with listening: how you live, work, host, store, cook, rest, and move through the space.</p>
            <p>From there, the studio shapes a design language that feels premium, personal, and usable long after handover.</p>
            <p>The work is rooted in warm materials, practical storage, clean execution, and lighting that transforms the mood of a room.</p>
          </div>
        </section>

        <section className="signature">
          <img src={asset("res-open-layout.jpg")} alt="Open residential interior" />
          <div>
            <p className="eyebrow">What We Care About</p>
            <h2>Rooms should look beautiful and behave beautifully.</h2>
            <p>Good interiors solve daily problems quietly: where keys land, how storage disappears, how guests enter, how light falls, and how each surface will age.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

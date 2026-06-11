import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { asset } from "../site-data";

export const metadata = {
  title: "About Designers | True Designs",
  description: "Meet the design approach behind True Designs interiors in Vadodara.",
};

export default function DesignersPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <img src={asset("res-living-soft.jpg")} alt="True Designs designers" />
          <div className="reveal-up">
            <p className="eyebrow">About Designers</p>
            <h1>Designers who balance feeling, function, and finish.</h1>
            <p>True Designs approaches every site with a sharp eye for proportions, materials, movement, and the lives unfolding inside the space.</p>
          </div>
        </section>
        <section className="studio-section">
          <div className="section-copy reveal-up">
            <p className="eyebrow">Design Thinking</p>
            <h2>Good design starts with listening closely.</h2>
          </div>
          <div className="studio-text reveal">
            <p>The team studies how a client lives, works, hosts, stores, cooks, rests, and moves through the site before deciding form and finish.</p>
            <p>That listening becomes spatial planning, material selection, lighting mood, and execution details that make the project feel complete.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

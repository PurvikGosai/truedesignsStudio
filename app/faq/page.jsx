import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { asset, faqs } from "../site-data";

export const metadata = {
  title: "FAQ | True Designs",
  description: "Frequently asked questions about True Designs interior design and turnkey execution services.",
};

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <img src={asset("res-dining.jpg")} alt="True Designs FAQ" />
          <div className="reveal-up">
            <p className="eyebrow">FAQ</p>
            <h1>Answers before we begin.</h1>
            <p>Common questions about design, execution, consultation, and how to start a project with True Designs.</p>
          </div>
        </section>
        <section className="faq-section">
          {faqs.map(([question, answer]) => (
            <details className="reveal-up" key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

import { ConsultationForm, SiteFooter, SiteHeader } from "../components/SiteChrome";
import { address, asset, email, googleMapEmbedUrl, googleMapUrl, openingDays, openingHours } from "../site-data";

export const metadata = {
  title: "Contact | True Designs",
  description: "Contact True Designs for interior design and turnkey execution consultations in Vadodara.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <img src={asset("com-lounge.jpg")} alt="Contact True Designs" />
          <div>
            <p className="eyebrow">Contact</p>
            <h1>Tell us about the space you want to shape.</h1>
            <p>Share your requirement and the team will connect with you for a design consultation.</p>
          </div>
        </section>

        <section className="contact-map-section">
          <div className="map-panel">
            <iframe
              title="True Designs office location"
              src={googleMapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a className="map-link" href={googleMapUrl} target="_blank" rel="noopener noreferrer">View larger map</a>
          </div>
          <aside className="contact-info-panel">
            <h2>Contact <span>Us</span></h2>
            <div className="contact-info-block">
              <h3>Office Address</h3>
              <p>{address}</p>
            </div>
            <div className="contact-info-block">
              <h3>Reach Us</h3>
              <p><a href="tel:+919409649255">(+91) 9409649255</a></p>
              <p><a href={`mailto:${email}`}>{email}</a></p>
            </div>
            <div className="contact-info-block">
              <h3>Opening Time</h3>
              <p>{openingHours}</p>
              <p>{openingDays}</p>
            </div>
          </aside>
        </section>

        <section className="contact-section contact-page-section">
          <div className="contact-copy">
            <p className="eyebrow">Get Free Quotation</p>
            <h2>Share your project requirement.</h2>
            <p>Whether you are planning a home, office, renovation, or turnkey interior project, send a few details and the team will connect with you.</p>
          </div>
          <ConsultationForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

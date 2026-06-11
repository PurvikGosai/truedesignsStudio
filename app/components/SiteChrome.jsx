"use client";

import { useEffect } from "react";
import { address, asset, email, phone, whatsapp } from "../site-data";

export function MotionBoot() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal, .reveal-up, .reveal-image, .count-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.16 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return null;
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="True Designs home">
        <img src={asset("logo.jpg")} alt="True Designs logo" />
        <span>True Designs</span>
      </a>
      <nav>
        <a href="/">Home</a>
        <div className="nav-group">
          <a href="/studio">About</a>
          <div className="nav-menu">
            <a href="/studio">About True Designs</a>
            <a href="/designers">About Designers</a>
          </div>
        </div>
        <div className="nav-group">
          <a href="/services">Services</a>
          <div className="nav-menu">
            <a href="/services/residential-interior-design">Residential Interior Design</a>
            <a href="/services/commercial-interior-design">Commercial Interior Design</a>
            <a href="/services/turnkey-interior-design">Turnkey Interior Design</a>
            <a href="/services/space-planning">Space Planning</a>
            <a href="/services/home-styling">Home Styling</a>
            <a href="/services/lighting-design">Lighting Design</a>
          </div>
        </div>
        <div className="nav-group">
          <a href="/portfolio">Portfolio</a>
          <div className="nav-menu">
            <a href="/portfolio/residential-projects">Residential Projects</a>
            <a href="/portfolio/commercial-projects">Commercial Projects</a>
          </div>
        </div>
        <a href="/process">Process</a>
        <a href="/recognitions">Recognitions</a>
        <a href="/faq">FAQ</a>
        <a href="/contact">Contact</a>
      </nav>
      <a className="header-action" href={whatsapp("Hi True Designs, I want to discuss an interior project.")}>
        Start a Project
      </a>
    </header>
  );
}

export function SiteFooter() {
  return (
    <>
      <MotionBoot />
      <footer className="site-footer">
        <div>
          <strong>True Designs</strong>
          <p>Interior Designing & Turnkey Projects<br />{address}</p>
          <p><a href="tel:+919409649255">(+91) 9409649255</a><br /><a href={`mailto:${email}`}>{email}</a></p>
        </div>
        <div>
          <a href="/portfolio">Portfolio</a>
          <a href="/services">Services</a>
          <a href="/contact">Consultation</a>
        </div>
      </footer>
      <div className="mobile-bar">
        <a href={whatsapp("Hi True Designs, I want an interior design consultation.")}>WhatsApp</a>
        <a href={`tel:+${phone}`}>Call</a>
      </div>
      <a className="floating-whatsapp" href={whatsapp("Hi True Designs, I want an interior design consultation.")} aria-label="Open WhatsApp">
        WA
      </a>
    </>
  );
}

export function ConsultationForm() {
  function sendConsultation(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = `Hi True Designs, I want an interior design consultation.

Name: ${form.get("name")}
Phone: ${form.get("phone")}
Space: ${form.get("space")}
Budget: ${form.get("budget")}
Message: ${form.get("message")}`;

    window.open(whatsapp(text), "_blank");
  }

  return (
    <form className="contact-form" onSubmit={sendConsultation}>
      <input name="name" required placeholder="Your name" />
      <input name="phone" required placeholder="Phone number" />
      <select name="space" defaultValue="Apartment">
        <option>Apartment</option>
        <option>Villa / Bungalow</option>
        <option>Office / Commercial</option>
        <option>Renovation</option>
        <option>Modular Kitchen</option>
      </select>
      <select name="budget" defaultValue="Rs.10L-Rs.20L">
        <option>Below Rs.5L</option>
        <option>Rs.5L-Rs.10L</option>
        <option>Rs.10L-Rs.20L</option>
        <option>Rs.20L+</option>
      </select>
      <textarea name="message" placeholder="Tell us about your requirement" />
      <button className="button primary" type="submit">Send on WhatsApp</button>
    </form>
  );
}

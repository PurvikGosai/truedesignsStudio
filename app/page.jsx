"use client";

import { useEffect, useMemo, useState } from "react";
import InteriorScene from "./components/InteriorScene";
import { ConsultationForm, SiteFooter, SiteHeader } from "./components/SiteChrome";
import usePortfolioProjects from "./components/usePortfolioProjects";
import { address, asset, highlights, processSteps, services, whatsapp } from "./site-data";

export default function Home() {
  const [projectType, setProjectType] = useState("All");
  const [activeHero, setActiveHero] = useState(0);
  const projects = usePortfolioProjects();

  const heroSlides = [
    {
      image: "res-hero.jpg",
      eyebrow: "Welcome to True Designs",
      title: "Where luxury meets functionality.",
      copy: "We craft spaces with premium finishes, efficient layouts, and details that make everyday living feel elevated.",
    },
    {
      image: "res-open-layout.jpg",
      eyebrow: "Best Interior Designers in Vadodara",
      title: "Where spaces tell your story.",
      copy: "Homes and workspaces are shaped around personality, movement, storage, mood, and the way people truly use them.",
    },
    {
      image: "com-hero.jpg",
      eyebrow: "Best Interior Services",
      title: "Elevate your living and working experience.",
      copy: "From residential warmth to commercial presence, True Designs balances aesthetics, comfort, and execution.",
    },
  ];

  const visibleProjects = useMemo(() => {
    if (projectType === "All") return projects;
    return projects.filter((project) => project.type === projectType);
  }, [projectType, projects]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroSlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <>
      <SiteHeader />

      <main>
        <section className="hero">
          <div className="hero-image hero-slider">
            {heroSlides.map((slide, index) => (
              <img className={activeHero === index ? "active" : ""} src={asset(slide.image)} alt={slide.title} key={slide.title} />
            ))}
          </div>
          <div className="hero-panel reveal-up">
            <p className="eyebrow">{heroSlides[activeHero].eyebrow}</p>
            <h1>{heroSlides[activeHero].title}</h1>
            <p>{heroSlides[activeHero].copy}</p>
            <div className="hero-actions">
              <a className="button primary" href="/contact">Book Consultation</a>
              <a className="button secondary" href="/portfolio">View Work</a>
            </div>
            <div className="hero-dots" aria-label="Hero slides">
              {heroSlides.map((slide, index) => (
                <button className={activeHero === index ? "active" : ""} aria-label={slide.title} key={slide.title} onClick={() => setActiveHero(index)} />
              ))}
            </div>
          </div>
        </section>

        <section className="numbers" aria-label="Studio highlights">
          {highlights.map(([value, label]) => (
            <div className="count-card" key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section className="studio-section">
          <div className="section-copy reveal-up">
            <p className="eyebrow">The Studio</p>
            <h2>Designed with restraint. Built for real life.</h2>
          </div>
          <div className="studio-text reveal">
            <p>
              A premium interior is not made by adding more. It is made by choosing the right proportion,
              material, light, storage, and detail for the people who will use the space every day.
            </p>
            <a className="text-link" href="/studio">Visit the studio page</a>
          </div>
        </section>

        <section className="signature">
          <img className="reveal-image" src={asset("res-feature-entry.jpg")} alt="Signature entry interior" />
          <div className="reveal-up">
            <p className="eyebrow">Signature Approach</p>
            <h2>Warm woods, soft light, clean storage, and details that age well.</h2>
            <p>
              Each project is shaped around the site and the client: how the room is entered,
              where the eye rests, where daily objects live, and how the space feels after sunset.
            </p>
          </div>
        </section>

        <section className="spatial-section">
          <InteriorScene />
          <div className="spatial-copy reveal-up">
            <p className="eyebrow">3D Spatial Thinking</p>
            <h2>Before a room is built, we study how volume, light, and furniture work together.</h2>
            <p>
              Interior design is not only surface selection. It is circulation, scale, storage, sightlines,
              lighting layers, and how every object belongs inside the room.
            </p>
            <a className="button primary" href="/services/space-planning">Explore Space Planning</a>
          </div>
        </section>

        <section className="portfolio-section">
          <div className="section-head reveal-up">
            <div>
              <p className="eyebrow">Selected Work</p>
              <h2>Residential warmth and commercial presence.</h2>
            </div>
            <div className="project-filter" aria-label="Project filters">
              {["All", "Residential", "Commercial"].map((type) => (
                <button className={projectType === type ? "active" : ""} key={type} onClick={() => setProjectType(type)}>
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="project-grid">
            {visibleProjects.slice(0, 3).map((project) => (
              <article className="project-card reveal-up" key={project.title}>
                <img src={asset(project.image)} alt={project.title} />
                <div>
                  <span>{project.type} | {project.location}</span>
                  <h3>{project.title}</h3>
                  <p>{project.detail}</p>
                </div>
              </article>
            ))}
          </div>
          <a className="section-button" href="/portfolio">Explore full portfolio</a>
        </section>

        <section className="services-section">
          <div className="section-copy reveal-up">
            <p className="eyebrow">Services</p>
            <h2>Everything required to move from idea to finished interior.</h2>
          </div>
          <div className="service-list">
            {services.slice(0, 4).map(([title, description]) => (
              <article className="reveal-up" key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="commercial-story">
          <div className="reveal-up">
            <p className="eyebrow">Commercial Interiors</p>
            <h2>Workspaces with authority, comfort, and a clear first impression.</h2>
            <p>
              From executive cabins to reception lounges and glass partitions, commercial projects are planned
              for productivity, circulation, privacy, and client confidence.
            </p>
          </div>
          <img className="reveal-image" src={asset("com-hero.jpg")} alt="Executive commercial interior" />
        </section>

        <section className="process-section">
          <div className="section-head reveal-up">
            <div>
              <p className="eyebrow">Process</p>
              <h2>A clear path from conversation to handover.</h2>
            </div>
            <a className="text-link" href="/process">See full process</a>
          </div>
          <div className="process-grid">
            {processSteps.map(([number, title, description]) => (
              <article className="count-card" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section">
          <div className="contact-copy">
            <p className="eyebrow">Start Your Project</p>
            <h2>Tell us about the space you want to shape.</h2>
            <p>Share a few details and the team will connect with you for a consultation.</p>
            <div className="contact-links">
              <a href="tel:+919409649255">+91 94096 49255</a>
              <span>{address}</span>
              <a href="https://share.google/qsRX7Qp7JFNKfxetw" target="_blank" rel="noopener noreferrer">Google Profile</a>
            </div>
          </div>
          <ConsultationForm />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { asset } from "../site-data";

export default function PortfolioGallery({ projects }) {
  const [activeProject, setActiveProject] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const visibleProjects = projects.filter((project) => project.title && project.image);
  const gallery = activeProject
    ? (activeProject.gallery?.length ? activeProject.gallery : [activeProject.image]).filter(Boolean)
    : [];

  useEffect(() => {
    if (!activeProject) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") setActiveProject(null);
      if (event.key === "ArrowRight" && gallery.length) setActiveImage((index) => (index + 1) % gallery.length);
      if (event.key === "ArrowLeft" && gallery.length) setActiveImage((index) => (index - 1 + gallery.length) % gallery.length);
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProject, gallery.length]);

  function openProject(project) {
    setActiveProject(project);
    setActiveImage(0);
  }

  function moveImage(direction) {
    if (!gallery.length) return;
    setActiveImage((index) => (index + direction + gallery.length) % gallery.length);
  }

  return (
    <>
      {!visibleProjects.length && (
        <div className="portfolio-empty">
          <h3>No portfolio projects are available.</h3>
          <p>Add or edit projects from the admin panel, then refresh this page.</p>
        </div>
      )}
      <div className="project-grid">
        {visibleProjects.map((project) => (
          <button className="project-card" key={project.id || project.title} type="button" onClick={() => openProject(project)}>
            <img src={asset(project.image)} alt={project.title} />
            <div>
              <span>{project.type} | {project.location}</span>
              <h3>{project.title}</h3>
              <p>{project.detail}</p>
            </div>
          </button>
        ))}
      </div>

      {activeProject && (
        <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={`${activeProject.title} gallery`}>
          <button className="gallery-backdrop" type="button" aria-label="Close gallery" onClick={() => setActiveProject(null)} />
          <div className="gallery-panel">
            <div className="gallery-topbar">
              <div>
                <span>{activeProject.type} | {activeProject.location}</span>
                <h2>{activeProject.title}</h2>
              </div>
              <button className="gallery-close" type="button" aria-label="Close gallery" onClick={() => setActiveProject(null)}>
                X
              </button>
            </div>

            <div className="gallery-stage">
              {gallery.length > 1 && (
                <button className="gallery-arrow prev" type="button" aria-label="Previous image" onClick={() => moveImage(-1)}>
                  &lsaquo;
                </button>
              )}
              {gallery.length ? (
                <img src={asset(gallery[activeImage])} alt={`${activeProject.title} image ${activeImage + 1}`} />
              ) : (
                <div className="gallery-empty">No photos are saved for this project.</div>
              )}
              {gallery.length > 1 && (
                <button className="gallery-arrow next" type="button" aria-label="Next image" onClick={() => moveImage(1)}>
                  &rsaquo;
                </button>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="gallery-thumbs" aria-label="Gallery thumbnails">
                {gallery.map((image, index) => (
                  <button className={activeImage === index ? "active" : ""} key={image} type="button" onClick={() => setActiveImage(index)} aria-label={`Show image ${index + 1}`}>
                    <img src={asset(image)} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

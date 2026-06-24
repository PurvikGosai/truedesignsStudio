"use client";

import { useEffect, useMemo, useState } from "react";
import { asset } from "../../site-data";

const emptyProject = {
  id: "",
  title: "",
  type: "Residential",
  location: "Vadodara",
  detail: "",
  image: "",
  gallery: [],
};

function galleryText(project) {
  return (project.gallery || []).join("\n");
}

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [formProject, setFormProject] = useState(emptyProject);
  const [galleryValue, setGalleryValue] = useState("");
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const isEditing = Boolean(formProject.id);
  const coverOptions = useMemo(() => galleryValue.split("\n").map((item) => item.trim()).filter(Boolean), [galleryValue]);
  const galleryImages = coverOptions;

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const response = await fetch("/api/admin/portfolio", { cache: "no-store" });
    if (response.status === 401) {
      window.location.href = "/admin/login";
      return;
    }
    const data = await response.json();
    setProjects(data.projects || []);
  }

  function editProject(project) {
    setFormProject(project);
    setGalleryValue(galleryText(project));
    setFiles([]);
    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setFormProject(emptyProject);
    setGalleryValue("");
    setFiles([]);
    setMessage("");
    setError("");
  }

  function setGalleryImages(images) {
    const nextImages = images.filter(Boolean);
    setGalleryValue(nextImages.join("\n"));
    if (formProject.image && !nextImages.includes(formProject.image)) {
      setFormProject({ ...formProject, image: nextImages[0] || "" });
    }
  }

  function removeGalleryImage(imageToRemove) {
    setMessage("");
    setError("");
    setGalleryImages(galleryImages.filter((image) => image !== imageToRemove));
  }

  function removePendingFile(fileToRemove) {
    setFiles(files.filter((file) => file !== fileToRemove));
  }

  async function saveProject(event) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");
    setError("");

    const body = new FormData();
    body.append("id", formProject.id);
    body.append("title", formProject.title);
    body.append("type", formProject.type);
    body.append("location", formProject.location);
    body.append("detail", formProject.detail);
    body.append("image", formProject.image);
    body.append("existingGallery", galleryValue);
    files.forEach((file) => body.append("photos", file));

    const response = await fetch("/api/admin/portfolio", {
      method: "POST",
      body,
    });
    const data = await response.json();
    setIsSaving(false);

    if (!response.ok) {
      setError(data.error || "Could not save project.");
      return;
    }

    setProjects(data.projects || []);
    setFormProject(data.project || emptyProject);
    setGalleryValue(galleryText(data.project || emptyProject));
    setFiles([]);
    setMessage("Project saved.");
  }

  async function deleteProject(project) {
    const confirmed = window.confirm(`Delete "${project.title}" from the portfolio?`);
    if (!confirmed) return;

    const response = await fetch(`/api/admin/portfolio?id=${encodeURIComponent(project.id)}`, { method: "DELETE" });
    if (response.status === 401) {
      window.location.href = "/admin/login";
      return;
    }

    const data = await response.json();
    setProjects(data.projects || []);
    if (formProject.id === project.id) resetForm();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <main className="admin-dashboard">
      <header className="admin-dashboard-head">
        <div>
          <p className="eyebrow">True Designs Admin</p>
          <h1>Manage Portfolio</h1>
        </div>
        <div className="admin-actions">
          <a className="section-button" href="/portfolio" target="_blank" rel="noopener noreferrer">View Site</a>
          <button className="section-button" type="button" onClick={logout}>Logout</button>
        </div>
      </header>

      <section className="admin-editor">
        <form className="admin-form" onSubmit={saveProject}>
          <div className="admin-form-head">
            <h2>{isEditing ? "Edit Project" : "Add Project"}</h2>
            <button className="text-link admin-reset" type="button" onClick={resetForm}>New Project</button>
          </div>

          <label>
            Project title
            <input value={formProject.title} onChange={(event) => setFormProject({ ...formProject, title: event.target.value })} required />
          </label>

          <div className="admin-form-row">
            <label>
              Type
              <select value={formProject.type} onChange={(event) => setFormProject({ ...formProject, type: event.target.value })}>
                <option>Residential</option>
                <option>Commercial</option>
              </select>
            </label>
            <label>
              Location
              <input value={formProject.location} onChange={(event) => setFormProject({ ...formProject, location: event.target.value })} required />
            </label>
          </div>

          <label>
            Description
            <textarea value={formProject.detail} onChange={(event) => setFormProject({ ...formProject, detail: event.target.value })} required />
          </label>

          <label>
            Cover image
            <select value={formProject.image} onChange={(event) => setFormProject({ ...formProject, image: event.target.value })}>
              <option value="">Use first uploaded image</option>
              {coverOptions.map((image) => (
                <option value={image} key={image}>{image}</option>
              ))}
            </select>
          </label>

          <div className="admin-gallery-manager">
            <div>
              <span>Current gallery images</span>
              <p>Remove photos from this project, then save the project.</p>
            </div>
            {galleryImages.length ? (
              <div className="admin-image-grid">
                {galleryImages.map((image) => (
                  <div className="admin-image-tile" key={image}>
                    <img src={asset(image)} alt="" />
                    <div>
                      <small>{image === formProject.image ? "Cover image" : image}</small>
                      <button type="button" onClick={() => removeGalleryImage(image)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="admin-empty-note">No saved images in this project yet.</p>
            )}
          </div>

          <label>
            Add new photos
            <input type="file" accept="image/*" multiple onChange={(event) => setFiles(Array.from(event.target.files || []))} />
          </label>

          {files.length > 0 && (
            <div className="admin-upload-list">
              <span>Selected photos to upload</span>
              {files.map((file) => (
                <div key={`${file.name}-${file.size}`}>
                  <p>{file.name}</p>
                  <button type="button" onClick={() => removePendingFile(file)}>Remove</button>
                </div>
              ))}
            </div>
          )}

          {message && <p className="admin-success">{message}</p>}
          {error && <p className="admin-error">{error}</p>}

          <button className="button primary" type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Project"}
          </button>
        </form>

        <div className="admin-preview">
          <h2>Projects</h2>
          <div className="admin-project-list">
            {projects.map((project) => (
              <article className="admin-project-item" key={project.id}>
                <img src={asset(project.image)} alt={project.title} />
                <div>
                  <span>{project.type} | {project.location}</span>
                  <h3>{project.title}</h3>
                  <p>{project.detail}</p>
                  <div>
                    <button type="button" onClick={() => editProject(project)}>Edit</button>
                    <button type="button" onClick={() => deleteProject(project)}>Delete</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "../../../lib/admin-auth";
import { makeProjectId, readProjects, saveUploadedImages, writeProjects } from "../../../lib/portfolio-store";

export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "Please login to manage portfolio." }, { status: 401 });
}

function projectFromForm(form, currentProjects) {
  const existingId = String(form.get("id") || "").trim();
  const title = String(form.get("title") || "").trim();
  const existingGallery = String(form.get("existingGallery") || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    id: makeProjectId(title, currentProjects, existingId),
    title,
    type: String(form.get("type") || "Residential").trim(),
    location: String(form.get("location") || "").trim(),
    detail: String(form.get("detail") || "").trim(),
    image: String(form.get("image") || "").trim(),
    gallery: existingGallery,
  };
}

export async function GET() {
  if (!(await isAdminLoggedIn())) return unauthorized();
  return NextResponse.json({ projects: await readProjects() });
}

export async function POST(request) {
  if (!(await isAdminLoggedIn())) return unauthorized();

  const form = await request.formData();
  const projects = await readProjects();
  const project = projectFromForm(form, projects);
  const uploads = await saveUploadedImages(form.getAll("photos"));

  project.gallery = [...project.gallery, ...uploads];
  if (project.image && !project.gallery.includes(project.image)) project.image = project.gallery[0] || "";
  if (!project.image && project.gallery.length) project.image = project.gallery[0];
  if (!project.title || !project.location || !project.detail || !project.image) {
    return NextResponse.json({ error: "Title, location, detail, and at least one image are required." }, { status: 400 });
  }

  const existingIndex = projects.findIndex((item) => item.id === project.id);
  const nextProjects = [...projects];
  if (existingIndex >= 0) nextProjects[existingIndex] = project;
  else nextProjects.unshift(project);

  await writeProjects(nextProjects);
  return NextResponse.json({ project, projects: nextProjects });
}

export async function DELETE(request) {
  if (!(await isAdminLoggedIn())) return unauthorized();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const projects = await readProjects();
  const nextProjects = projects.filter((project) => project.id !== id);

  await writeProjects(nextProjects);
  return NextResponse.json({ projects: nextProjects });
}

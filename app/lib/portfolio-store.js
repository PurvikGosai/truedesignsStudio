import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "portfolio-projects.json");
const uploadDir = path.join(process.cwd(), "public", "assets", "portfolio");

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanProject(project) {
  const title = String(project.title || "").trim();
  const type = String(project.type || "Residential").trim();
  const location = String(project.location || "").trim();
  const detail = String(project.detail || "").trim();
  const image = String(project.image || "").trim();
  const gallery = Array.isArray(project.gallery) ? project.gallery.map((item) => String(item).trim()).filter(Boolean) : [];

  return {
    id: String(project.id || slugify(title) || Date.now()).trim(),
    title,
    type,
    image: image || gallery[0] || "",
    gallery: gallery.length ? gallery : image ? [image] : [],
    location,
    detail,
  };
}

export async function readProjects() {
  const content = await readFile(dataFile, "utf8");
  return JSON.parse(content).map(cleanProject);
}

export async function writeProjects(projects) {
  await writeFile(dataFile, `${JSON.stringify(projects.map(cleanProject), null, 2)}\n`, "utf8");
}

export async function saveUploadedImages(files) {
  const imageFiles = files.filter((file) => file && file.size > 0 && file.type.startsWith("image/"));
  if (!imageFiles.length) return [];

  await mkdir(uploadDir, { recursive: true });

  const saved = [];
  for (const file of imageFiles) {
    const ext = path.extname(file.name || "").toLowerCase() || ".jpg";
    const base = slugify(path.basename(file.name || "portfolio-image", ext)) || "portfolio-image";
    const filename = `${base}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadDir, filename), buffer);
    saved.push(`portfolio/${filename}`);
  }

  return saved;
}

export function makeProjectId(title, currentProjects, existingId = "") {
  if (existingId) return existingId;
  const base = slugify(title) || `project-${Date.now()}`;
  let id = base;
  let count = 2;
  while (currentProjects.some((project) => project.id === id)) {
    id = `${base}-${count}`;
    count += 1;
  }
  return id;
}

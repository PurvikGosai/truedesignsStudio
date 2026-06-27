import { servicePages } from "./site-data";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://truedesignsstudio.com").replace(/\/$/, "");

export default function sitemap() {
  const now = new Date();
  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/studio", priority: 0.8 },
    { path: "/designers", priority: 0.7 },
    { path: "/services", priority: 0.9 },
    { path: "/portfolio", priority: 0.9 },
    { path: "/portfolio/residential-projects", priority: 0.8 },
    { path: "/portfolio/commercial-projects", priority: 0.8 },
    { path: "/process", priority: 0.7 },
    { path: "/recognitions", priority: 0.6 },
    { path: "/faq", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
  ];

  const serviceRoutes = servicePages.map((service) => ({
    path: `/services/${service.slug}`,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}

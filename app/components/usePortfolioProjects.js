"use client";

import { useEffect, useState } from "react";
import { projects as fallbackProjects } from "../site-data";

export default function usePortfolioProjects() {
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/portfolio", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load portfolio.");
        return response.json();
      })
      .then((data) => {
        if (isMounted && Array.isArray(data.projects) && data.projects.length > 0) setProjects(data.projects);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return projects;
}

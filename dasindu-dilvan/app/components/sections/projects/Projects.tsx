// app/components/sections/projects/Projects.tsx
"use client";
import { useEffect, useState } from "react";
import "./Projects.css";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

interface ProjectsData {
  heading: string;
  subtitle: string;
  items: Project[];
}

export default function Projects() {
  const [data, setData] = useState<ProjectsData | null>(null);

  useEffect(() => {
    const load = () => {
      const d = (window as any).portfolioData;
      if (d) setData(d.projects);
      else setTimeout(load, 100);
    };
    load();
  }, []);

  if (!data) return null;

  return (
    <section id="projects" className="section projects-section">

      {/* --- Section Header --- */}
      <h2 className="section-heading">{data.heading}</h2>
      <p className="section-subtitle">{data.subtitle}</p>

      {/* --- Projects Grid --- */}
      <div className="projects-grid">
        {data.items.map((project) => (
          <article key={project.id} className="project-card">

            {/* Project image placeholder */}
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-image-fallback">{project.title[0]}</div>
            </div>

            {/* Project details */}
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              {/* Technology tags */}
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>

              {/* Links */}
              <div className="project-links">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                    Live Demo ↗
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                    Source Code ↗
                  </a>
                )}
              </div>
            </div>

          </article>
        ))}
      </div>
    </section>
  );
}

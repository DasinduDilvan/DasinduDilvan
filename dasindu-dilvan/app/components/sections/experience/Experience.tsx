// app/components/sections/experience/Experience.tsx
"use client";
import { useEffect, useState } from "react";
import "./Experience.css";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

interface ExperienceData {
  heading: string;
  subtitle: string;
  items: ExperienceItem[];
}

export default function Experience() {
  const [data, setData] = useState<ExperienceData | null>(null);

  useEffect(() => {
    const load = () => {
      const d = (window as any).portfolioData;
      if (d) setData(d.experience);
      else setTimeout(load, 100);
    };
    load();
  }, []);

  if (!data) return null;

  return (
    <section id="experience" className="section experience-section">

      {/* --- Section Header --- */}
      <h2 className="section-heading">{data.heading}</h2>
      <p className="section-subtitle">{data.subtitle}</p>

      {/* --- Timeline --- */}
      <div className="timeline">
        {data.items.map((exp) => (
          <div key={exp.id} className="timeline-item">

            {/* Timeline dot */}
            <div className="timeline-dot" />

            {/* Content card */}
            <div className="timeline-card">
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-role">{exp.role}</h3>
                  <p className="timeline-company">{exp.company}</p>
                </div>
                <div className="timeline-meta">
                  <span className="timeline-period">{exp.period}</span>
                  <span className="timeline-location">{exp.location}</span>
                </div>
              </div>

              {/* Responsibilities */}
              <ul className="timeline-desc">
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

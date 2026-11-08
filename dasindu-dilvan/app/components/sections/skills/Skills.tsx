// app/components/sections/skills/Skills.tsx
"use client";
import { useEffect, useState } from "react";
import "./Skills.css";

interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

interface SkillsData {
  heading: string;
  subtitle: string;
  categories: SkillCategory[];
}

export default function Skills() {
  const [data, setData] = useState<SkillsData | null>(null);

  useEffect(() => {
    const load = () => {
      const d = (window as any).portfolioData;
      if (d) setData(d.skills);
      else setTimeout(load, 100);
    };
    load();
  }, []);

  if (!data) return null;

  return (
    <section id="skills" className="section skills-section">

      {/* --- Section Header --- */}
      <h2 className="section-heading">{data.heading}</h2>
      <p className="section-subtitle">{data.subtitle}</p>

      {/* --- Skills Categories Grid --- */}
      <div className="skills-grid">
        {data.categories.map((cat) => (
          <div key={cat.id} className="skill-category">

            {/* Category heading */}
            <h3 className="skill-category-name">{cat.name}</h3>

            {/* Individual skill tags */}
            <div className="skill-list">
              {cat.skills.map((skill) => (
                <span key={skill} className="skill-item">{skill}</span>
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

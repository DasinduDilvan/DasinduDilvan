// app/components/sections/about/About.tsx
"use client";
import { useEffect, useState } from "react";
import "./About.css";

interface AboutData {
  heading: string;
  paragraphs: string[];
  highlights: { label: string; value: string }[];
}

export default function About() {
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    const load = () => {
      const d = (window as any).portfolioData;
      if (d) setData(d.about);
      else setTimeout(load, 100);
    };
    load();
  }, []);

  if (!data) return null;

  return (
    <section id="about" className="section about-section">

      {/* --- Section Header --- */}
      <h2 className="section-heading">{data.heading}</h2>
      <p className="section-subtitle">A brief introduction about myself and my background.</p>

      <div className="about-content">

        {/* --- Description Paragraphs --- */}
        <div className="about-text">
          {data.paragraphs.map((p, i) => (
            <p key={i} className="about-paragraph">{p}</p>
          ))}
        </div>

        {/* --- Highlight Stats --- */}
        <div className="about-highlights">
          {data.highlights.map((h, i) => (
            <div key={i} className="highlight-card">
              <span className="highlight-value">{h.value}</span>
              <span className="highlight-label">{h.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

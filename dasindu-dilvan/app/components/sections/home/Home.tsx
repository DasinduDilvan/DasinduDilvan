// app/components/sections/home/Home.tsx
"use client";
import { useEffect, useState } from "react";
import "./Home.css";

// Type for the personal data from data.js
interface PersonalData {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  photo: string;
  resume: string;
}

export default function Home() {
  // State to hold data loaded from window.portfolioData
  const [data, setData] = useState<PersonalData | null>(null);

  useEffect(() => {
    // Wait for data.js to load, then read from window
    const loadData = () => {
      const d = (window as any).portfolioData;
      if (d) setData(d.personal);
      else setTimeout(loadData, 100); // Retry until loaded
    };
    loadData();
  }, []);

  // Show nothing while data loads (prevents flash)
  if (!data) return null;

  return (
    <section id="home" className="home-section">
      <div className="home-container">

        {/* --- TEXT CONTENT --- */}
        <div className="home-text">
          <p className="home-greeting">Hello, I&apos;m</p>
          <h1 className="home-name">{data.name}</h1>
          <h2 className="home-title">{data.title}</h2>
          <p className="home-subtitle">{data.subtitle}</p>
          <p className="home-bio">{data.bio}</p>

          {/* Action buttons */}
          <div className="home-actions">
            <a href="#contact" className="btn-primary">
              Get in Touch
            </a>
            <a href={data.resume} target="_blank" rel="noopener noreferrer" className="btn-outline">
              Download CV
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </a>
          </div>
        </div>

        {/* --- PHOTO --- */}
        <div className="home-photo-wrapper">
          <div className="home-photo-frame">
            <img src={data.photo} alt={`${data.name} – Profile Photo`} className="home-photo" />
          </div>
        </div>

      </div>
    </section>
  );
}

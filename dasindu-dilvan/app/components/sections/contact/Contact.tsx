// app/components/sections/contact/Contact.tsx
"use client";
import { useEffect, useState } from "react";
import "./Contact.css";

interface ContactData {
  heading: string;
  subtitle: string;
}

interface PersonalData {
  email: string;
  phone: string;
  location: string;
}

interface SocialData {
  github: string;
  linkedin: string;
  twitter: string;
}

export default function Contact() {
  const [contact, setContact] = useState<ContactData | null>(null);
  const [personal, setPersonal] = useState<PersonalData | null>(null);
  const [socials, setSocials] = useState<SocialData | null>(null);

  useEffect(() => {
    const load = () => {
      const d = (window as any).portfolioData;
      if (d) {
        setContact(d.contact);
        setPersonal(d.personal);
        setSocials(d.socials);
      } else {
        setTimeout(load, 100);
      }
    };
    load();
  }, []);

  if (!contact || !personal || !socials) return null;

  return (
    <section id="contact" className="section contact-section">

      {/* --- Section Header --- */}
      <h2 className="section-heading">{contact.heading}</h2>
      <p className="section-subtitle">{contact.subtitle}</p>

      <div className="contact-content">

        {/* --- Contact Info Cards --- */}
        <div className="contact-info">

          {/* Email */}
          <div className="contact-card">
            <div className="contact-icon">✉</div>
            <div>
              <h4 className="contact-card-label">Email</h4>
              <a href={`mailto:${personal.email}`} className="contact-card-value">
                {personal.email}
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="contact-card">
            <div className="contact-icon">☎</div>
            <div>
              <h4 className="contact-card-label">Phone</h4>
              <a href={`tel:${personal.phone}`} className="contact-card-value">
                {personal.phone}
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="contact-card">
            <div className="contact-icon">📍</div>
            <div>
              <h4 className="contact-card-label">Location</h4>
              <p className="contact-card-value">{personal.location}</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="contact-socials">
            <a href={socials.github} target="_blank" rel="noopener noreferrer" className="social-link">
              GitHub
            </a>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
              LinkedIn
            </a>
            <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
              Twitter
            </a>
          </div>

        </div>

        {/* --- Contact Form --- */}
        <form className="contact-form" onSubmit={(e) => {
          e.preventDefault();
          alert("Thank you for your message! I will get back to you soon.");
        }}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Your name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="your@email.com" required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" placeholder="What is this about?" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} placeholder="Write your message..." required />
          </div>

          <button type="submit" className="form-submit">
            Send Message
          </button>
        </form>

      </div>

      {/* --- Footer --- */}
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Dasindu. All rights reserved.</p>
      </footer>

    </section>
  );
}

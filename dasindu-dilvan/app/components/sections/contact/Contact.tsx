
import "./Contact.css";

export default function Contact() {
  return (
    <>
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <p className="contact-label">GET IN TOUCH</p>

          <h2>Let's Work <span>Together</span></h2>

          <p className="contact-description">
            I'm always interested in discussing new
            projects, creative ideas, and opportunities.
            Feel free to contact me.
          </p>

          <div className="contact-details">
            <a href="mailto:your-email@example.com"><span>Email</span>your-email@example.com</a>

            <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" >
              <span>GitHub</span>
              github.com/your-username
            </a>

            <a href="https://linkedin.com/in/your-username" target="_blank"
              rel="noopener noreferrer"
            >
              <span>LinkedIn</span>
              linkedin.com/in/your-username
            </a>
          </div>

          <a
            href="mailto:your-email@example.com"
            className="contact-button"
          >
            Send Me an Email ↗
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <a href="#home" className="footer-logo">
            Dasindu<span>.</span>
          </a>

          <p>
            © 2026 Dasindu Dilvan.
            All rights reserved.
          </p>

          <a href="#home" className="back-to-top">
            Back to Top ↑
          </a>
        </div>
      </footer>
    </>
  );
}

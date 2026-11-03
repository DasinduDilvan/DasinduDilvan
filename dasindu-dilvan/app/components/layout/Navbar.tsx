
import "./Navbar.css";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar-container">

        <a href="#home" className="navbar-logo">
          Dasindu<span>.</span>
        </a>

        <div className="navbar-links">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href}>
              {link.name}
            </a>
          ))}
        </div>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-resume"
        >
          Resume ↗
        </a>

        <details className="mobile-menu">
          <summary aria-label="Open navigation menu">
            <span></span>
            <span></span>
            <span></span>
          </summary>

          <div className="mobile-menu-links">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href}>
                {link.name}
              </a>
            ))}

            <a href="/resume.pdf" target="_blank">
              Resume ↗
            </a>
          </div>
        </details>

      </nav>
    </header>
  );
}

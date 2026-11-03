
import "./Home.css";

export default function Home() {
  return (
    <section id="home" className="home-section">
      <div className="home-container">

        <p className="home-label">
          WELCOME TO MY PORTFOLIO
        </p>

        <h1>
          Hi, I'm <span>Dasindu Dilvan</span>
        </h1>

        <h2>Full-Stack Developer</h2>

        <p className="home-description">
          I am an ICT undergraduate interested in
          developing modern web applications and
          building useful software systems.
        </p>

        <div className="home-buttons">
          <a href="#projects">View My Projects</a>
          <a href="#about">About Me</a>
        </div>

      </div>
    </section>
  );
}

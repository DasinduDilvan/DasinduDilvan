
import "./About.css";

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">

        <p className="about-label">GET TO KNOW ME</p>

        <h2 className="about-title">
          About <span>Me</span>
        </h2>

        <p className="about-description">
          I'm Dasindu Dilvan Wijethunga, an ICT undergraduate
          at the University of Ruhuna, Sri Lanka. I enjoy
          learning new technologies and developing software
          applications that solve real-world problems.
        </p>

        <div className="about-grid">

          <div className="about-card">
            <h3>Who I Am</h3>

            <p>
              I am interested in full-stack development,
              software engineering, database management,
              and modern web technologies.
            </p>
          </div>

          <div className="about-card">
            <h3>My Education</h3>

            <h4>University of Ruhuna</h4>

            <p>
              Bachelor of Information and Communication
              Technology
            </p>

            <p>Faculty of Technology</p>
          </div>

        </div>

      </div>
    </section>
  );
}

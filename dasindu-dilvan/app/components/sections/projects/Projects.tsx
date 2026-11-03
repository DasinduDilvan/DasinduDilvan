
import "./Projects.css";

const projects = [
  {
    number: "01",
    name: "UniMIS",
    description:
      "A Faculty Academic Management Information System developed to manage academic records and university activities.",
    technologies: ["Java", "MySQL", "JDBC", "Java Swing"],
  },
  {
    number: "02",
    name: "Personal Portfolio",
    description:
      "A personal portfolio website to showcase my projects, technical skills, and development journey.",
    technologies: ["Next.js", "TypeScript", "CSS"],
  },
  {
    number: "03",
    name: "Upcoming Project",
    description:
      "A new software development project that I am planning to build.",
    technologies: ["Next.js", "Database"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">

        <p className="projects-label">MY WORK</p>

        <h2 className="projects-title">
          Featured <span>Projects</span>
        </h2>

        <p className="projects-description">
          Here are some of the projects I have developed
          and worked on.
        </p>

        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.number}>

              <p className="project-number">
                PROJECT {project.number}
              </p>

              <h3>{project.name}</h3>

              <p className="project-description">
                {project.description}
              </p>

              <div className="project-technologies">
                {project.technologies.map((technology) => (
                  <span key={technology}>
                    {technology}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

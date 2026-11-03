
import "./Skills.css";

const skillGroups = [
  {
    title: "Frontend Development",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "TypeScript"],
  },
  {
    title: "Backend Development",
    skills: ["Java", "Node.js", "REST APIs"],
  },
  {
    title: "Database Management",
    skills: ["MySQL", "Database Design", "SQL"],
  },
  {
    title: "Development Tools",
    skills: ["Git", "GitHub", "VS Code", "IntelliJ IDEA"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">

        <p className="skills-label">MY TECHNICAL SKILLS</p>

        <h2 className="skills-title">
          Technologies I <span>Use</span>
        </h2>

        <p className="skills-description">
          Technologies and tools I am learning and using
          in software development.
        </p>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div className="skill-card" key={group.title}>

              <h3>{group.title}</h3>

              <div className="skill-list">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

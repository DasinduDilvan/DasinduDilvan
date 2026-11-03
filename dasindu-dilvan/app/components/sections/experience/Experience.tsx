
import "./Experience.css";

const experiences = [
  {
    category: "EDUCATION",
    title: "Bachelor of Information and Communication Technology",
    organization: "University of Ruhuna",
    description:
      "Studying information and communication technology with an interest in software engineering, programming, and database management.",
    period: "Current",
  },
  {
    category: "PROJECT EXPERIENCE",
    title: "UniMIS - Academic Management System",
    organization: "University Mini Project",
    description:
      "Worked on a Java and MySQL desktop application for managing faculty academic information, including users, courses, marks, and attendance.",
    period: "2026",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="experience-container">

        <p className="experience-label">MY JOURNEY</p>

        <h2 className="experience-title">
          Education & <span>Experience</span>
        </h2>

        <p className="experience-description">
          My academic background and development experience.
        </p>

        <div className="experience-list">
          {experiences.map((item) => (
            <div className="experience-item" key={item.title}>

              <div className="experience-marker"></div>

              <div className="experience-card">

                <p className="experience-category">
                  {item.category}
                </p>

                <h3>{item.title}</h3>

                <h4>{item.organization}</h4>

                <p>{item.description}</p>

                <span className="experience-period">
                  {item.period}
                </span>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

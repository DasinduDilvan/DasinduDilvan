// ============================================
// PORTFOLIO DATA - Edit this file to update your portfolio
// Last updated: 2026-11-08T09:40:49.681Z
// ============================================

const portfolioData = {
  "personal": {
    "name": "Dilvan",
    "firstName": "Dasindu",
    "lastName": "Wijetunga",
    "title": "Solution Engineer",
    "subtitle": "Full-Stack Developer & IT Professional",
    "email": "dasindu@example.com",
    "phone": "+94 70 322 9611",
    "location": "Colombo, Sri Lanka",
    "photo": "/photo.png",
    "resume": "/cv.pdf",
    "bio": "I craft reliable, scalable software solutions with clean code and thoughtful architecture. Passionate about turning complex problems into simple, elegant products. "
  },
  "socials": {
    "github": "https://github.com/dasindu",
    "linkedin": "https://linkedin.com/in/dasindu",
    "twitter": "https://twitter.com/dasindu",
    "email": "mailto:dasindu@example.com"
  },
  "about": {
    "heading": "About Me",
    "paragraphs": [
      "I am a passionate Software Engineer with expertise in building modern web applications. With a strong foundation in both front-end and back-end technologies, I deliver solutions that are performant, accessible, and maintainable.",
      "My approach combines clean architecture principles with pragmatic problem-solving. I believe in writing code that other developers can read, understand, and extend with confidence.",
      "When I'm not coding, I enjoy contributing to open-source projects, mentoring junior developers, and staying current with industry best practices."
    ],
    "highlights": [
      {
        "label": "Experience",
        "value": "3+ Years"
      },
      {
        "label": "Projects",
        "value": "20+ Completed"
      },
      {
        "label": "Clients",
        "value": "15+ Satisfied"
      },
      {
        "label": "Education",
        "value": "BSc in CS"
      }
    ]
  },
  "projects": {
    "heading": "Projects",
    "subtitle": "A selection of my recent work and personal projects.",
    "items": [
      {
        "id": "p1",
        "title": "E-Commerce Platform",
        "description": "A full-featured online store with payment integration, inventory management, and admin dashboard. Built with Next.js and Stripe.",
        "tags": [
          "Next.js",
          "Node.js",
          "PostgreSQL",
          "Stripe"
        ],
        "image": "/projects/ecommerce.jpg",
        "liveUrl": "https://example.com",
        "githubUrl": "https://github.com/dasindu/ecommerce"
      },
      {
        "id": "p2",
        "title": "Task Management App",
        "description": "Collaborative project management tool with real-time updates, team workspaces, and Kanban boards.",
        "tags": [
          "React",
          "Firebase",
          "Tailwind CSS"
        ],
        "image": "/projects/taskapp.jpg",
        "liveUrl": "https://example.com",
        "githubUrl": "https://github.com/dasindu/taskapp"
      },
      {
        "id": "p3",
        "title": "Healthcare Portal",
        "description": "Patient management system for clinics with appointment scheduling, medical records, and billing.",
        "tags": [
          "TypeScript",
          "Express",
          "MongoDB"
        ],
        "image": "/projects/healthcare.jpg",
        "liveUrl": "",
        "githubUrl": "https://github.com/dasindu/healthcare"
      },
      {
        "id": "p4",
        "title": "Analytics Dashboard",
        "description": "Real-time business intelligence dashboard with interactive charts, data filtering, and PDF report generation.",
        "tags": [
          "React",
          "D3.js",
          "Python",
          "FastAPI"
        ],
        "image": "/projects/analytics.jpg",
        "liveUrl": "https://example.com",
        "githubUrl": ""
      }
    ]
  },
  "skills": {
    "heading": "Skills & Technologies",
    "subtitle": "Tools and technologies I work with regularly.",
    "categories": [
      {
        "id": "s1",
        "name": "Frontend",
        "skills": [
          "React",
          "Next.js",
          "TypeScript",
          "HTML5",
          "CSS3",
          "Tailwind CSS"
        ]
      },
      {
        "id": "s2",
        "name": "Backend",
        "skills": [
          "Node.js",
          "Express",
          "Python",
          "Java",
          "REST APIs",
          "GraphQL"
        ]
      },
      {
        "id": "s3",
        "name": "Database",
        "skills": [
          "PostgreSQL",
          "MongoDB",
          "MySQL",
          "Redis",
          "Firebase"
        ]
      },
      {
        "id": "s4",
        "name": "DevOps & Tools",
        "skills": [
          "Git",
          "Docker",
          "AWS",
          "Linux",
          "CI/CD",
          "Vercel"
        ]
      }
    ]
  },
  "experience": {
    "heading": "Experience",
    "subtitle": "My professional journey and career milestones.",
    "items": [
      {
        "id": "e1",
        "role": "Software Engineer",
        "company": "Tech Solutions Ltd",
        "location": "Colombo, Sri Lanka",
        "period": "Jan 2023 – Present",
        "description": [
          "Lead development of client-facing web applications serving 10,000+ daily users.",
          "Implemented CI/CD pipelines reducing deployment time by 60%.",
          "Mentored 3 junior developers and conducted code reviews."
        ]
      },
      {
        "id": "e2",
        "role": "Junior Developer",
        "company": "Digital Agency Co",
        "location": "Colombo, Sri Lanka",
        "period": "Jun 2021 – Dec 2022",
        "description": [
          "Built responsive websites and web applications for 10+ clients.",
          "Collaborated with designers to implement pixel-perfect UI components.",
          "Optimized database queries improving page load times by 40%."
        ]
      },
      {
        "id": "e3",
        "role": "Intern – Software Development",
        "company": "StartUp Hub",
        "location": "Colombo, Sri Lanka",
        "period": "Jan 2021 – May 2021",
        "description": [
          "Assisted in developing a React-based inventory management system.",
          "Wrote unit tests achieving 85% code coverage.",
          "Participated in agile sprints and daily standups."
        ]
      }
    ]
  },
  "contact": {
    "heading": "Get in Touch",
    "subtitle": "Have a project in mind or want to discuss opportunities? I'd love to hear from you.",
    "formFields": [
      "Name",
      "Email",
      "Subject",
      "Message"
    ]
  }
};

if (typeof window !== "undefined") {
  window.portfolioData = portfolioData;
}
if (typeof module !== "undefined") {
  module.exports = portfolioData;
}

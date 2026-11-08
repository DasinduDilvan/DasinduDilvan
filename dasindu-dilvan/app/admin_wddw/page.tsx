"use client";

import { useEffect, useState } from "react";
import "./admin.css";

// ============================================
// ADMIN PANEL
// Edits public/data.js directly via API routes.
// Also handles file uploads (photo, CV, project images).
// ============================================

// --- TYPE DEFINITIONS ---

interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  photo: string;
  resume: string;
  bio: string;
}

interface Socials {
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
}

interface Highlight {
  label: string;
  value: string;
}

interface AboutInfo {
  heading: string;
  paragraphs: string[];
  highlights: Highlight[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

interface PortfolioData {
  personal: PersonalInfo;
  socials: Socials;
  about: AboutInfo;
  projects: { heading: string; subtitle: string; items: Project[] };
  skills: { heading: string; subtitle: string; categories: SkillCategory[] };
  experience: { heading: string; subtitle: string; items: ExperienceItem[] };
  contact: { heading: string; subtitle: string; formFields: string[] };
}

// Sidebar tab names
type TabName =
  | "personal"
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "files";

// Save status for user feedback
type SaveStatus = "idle" | "saving" | "success" | "error";

export default function AdminPage() {
  // Main portfolio data
  const [data, setData] = useState<PortfolioData | null>(null);

  // Current active tab
  const [activeTab, setActiveTab] = useState<TabName>("personal");

  // Save button status
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  // Tracks if there are unsaved changes
  const [hasChanges, setHasChanges] = useState(false);

  // Error message for display
  const [errorMsg, setErrorMsg] = useState("");

  // Load current data.js content on mount
  useEffect(() => {
    const load = () => {
      const d = (window as any).portfolioData;
      if (d) {
        // Deep clone to avoid mutating global data
        setData(JSON.parse(JSON.stringify(d)));
      } else {
        setTimeout(load, 150);
      }
    };
    load();
  }, []);

  // ==========================================
  // WARN USER BEFORE LEAVING WITH UNSAVED CHANGES
  // ==========================================
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges]);

  // Show loading screen
  if (!data) {
    return (
      <div className="admin-loading">
        <p>Loading portfolio data...</p>
      </div>
    );
  }

  // ==========================================
  // SAVE DATA TO data.js VIA API
  // ==========================================
  const saveData = async () => {
    setSaveStatus("saving");
    setErrorMsg("");

    try {
      const response = await fetch("/api/save-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });

      const result = await response.json();

      if (result.success) {
        setSaveStatus("success");
        setHasChanges(false);
        // Reset status to idle after 2 seconds
        setTimeout(() => setSaveStatus("idle"), 2000);
      } else {
        setSaveStatus("error");
        setErrorMsg(result.error || "Failed to save");
      }
    } catch (error: any) {
      setSaveStatus("error");
      setErrorMsg(error.message || "Network error");
    }
  };

  // ==========================================
  // UPLOAD FILE VIA API
  // Returns the public URL on success
  // ==========================================
  const uploadFile = async (
    file: File,
    type: "photo" | "cv" | "project"
  ): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        return result.url;
      } else {
        alert("Upload failed: " + result.error);
        return null;
      }
    } catch (error: any) {
      alert("Upload error: " + error.message);
      return null;
    }
  };

  // ==========================================
  // WRAPPER: update state + mark as unsaved
  // ==========================================
  const updateData = (newData: PortfolioData) => {
    setData(newData);
    setHasChanges(true);
  };

  // ==========================================
  // UPDATE HELPERS - Personal & Socials
  // ==========================================
  const updatePersonal = (field: keyof PersonalInfo, value: string) => {
    updateData({
      ...data,
      personal: { ...data.personal, [field]: value },
    });
  };

  const updateSocials = (field: keyof Socials, value: string) => {
    updateData({
      ...data,
      socials: { ...data.socials, [field]: value },
    });
  };

  // ==========================================
  // UPDATE HELPERS - About
  // ==========================================
  const updateAboutParagraph = (index: number, value: string) => {
    const newParagraphs = [...data.about.paragraphs];
    newParagraphs[index] = value;
    updateData({
      ...data,
      about: { ...data.about, paragraphs: newParagraphs },
    });
  };

  const addAboutParagraph = () => {
    updateData({
      ...data,
      about: {
        ...data.about,
        paragraphs: [...data.about.paragraphs, "New paragraph..."],
      },
    });
  };

  const removeAboutParagraph = (index: number) => {
    updateData({
      ...data,
      about: {
        ...data.about,
        paragraphs: data.about.paragraphs.filter((_, i) => i !== index),
      },
    });
  };

  const updateHighlight = (
    index: number,
    field: "label" | "value",
    value: string
  ) => {
    const newHighlights = [...data.about.highlights];
    newHighlights[index] = { ...newHighlights[index], [field]: value };
    updateData({
      ...data,
      about: { ...data.about, highlights: newHighlights },
    });
  };

  const addHighlight = () => {
    updateData({
      ...data,
      about: {
        ...data.about,
        highlights: [
          ...data.about.highlights,
          { label: "New", value: "0" },
        ],
      },
    });
  };

  const removeHighlight = (index: number) => {
    updateData({
      ...data,
      about: {
        ...data.about,
        highlights: data.about.highlights.filter((_, i) => i !== index),
      },
    });
  };

  // ==========================================
  // UPDATE HELPERS - Projects
  // ==========================================
  const updateProject = (
    index: number,
    field: keyof Project,
    value: any
  ) => {
    const newItems = [...data.projects.items];
    newItems[index] = { ...newItems[index], [field]: value };
    updateData({
      ...data,
      projects: { ...data.projects, items: newItems },
    });
  };

  const addProject = () => {
    const newProject: Project = {
      id: "p" + Date.now(),
      title: "New Project",
      description: "Project description...",
      tags: ["Tag1"],
      image: "/projects/placeholder.jpg",
      liveUrl: "",
      githubUrl: "",
    };
    updateData({
      ...data,
      projects: {
        ...data.projects,
        items: [...data.projects.items, newProject],
      },
    });
  };

  const removeProject = (index: number) => {
    if (!confirm("Delete this project?")) return;
    updateData({
      ...data,
      projects: {
        ...data.projects,
        items: data.projects.items.filter((_, i) => i !== index),
      },
    });
  };

  // Handle project image upload for a specific project
  const handleProjectImageUpload = async (
    index: number,
    file: File
  ) => {
    const url = await uploadFile(file, "project");
    if (url) {
      updateProject(index, "image", url);
    }
  };

  // ==========================================
  // UPDATE HELPERS - Skills
  // ==========================================
  const updateSkillCategory = (
    catIndex: number,
    value: string
  ) => {
    const cats = [...data.skills.categories];
    cats[catIndex] = { ...cats[catIndex], name: value };
    updateData({
      ...data,
      skills: { ...data.skills, categories: cats },
    });
  };

  const updateSkillItem = (
    catIndex: number,
    skillIndex: number,
    value: string
  ) => {
    const cats = [...data.skills.categories];
    const skills = [...cats[catIndex].skills];
    skills[skillIndex] = value;
    cats[catIndex] = { ...cats[catIndex], skills };
    updateData({
      ...data,
      skills: { ...data.skills, categories: cats },
    });
  };

  const addSkillToCategory = (catIndex: number) => {
    const cats = [...data.skills.categories];
    cats[catIndex] = {
      ...cats[catIndex],
      skills: [...cats[catIndex].skills, "New Skill"],
    };
    updateData({
      ...data,
      skills: { ...data.skills, categories: cats },
    });
  };

  const removeSkillFromCategory = (
    catIndex: number,
    skillIndex: number
  ) => {
    const cats = [...data.skills.categories];
    cats[catIndex] = {
      ...cats[catIndex],
      skills: cats[catIndex].skills.filter((_, i) => i !== skillIndex),
    };
    updateData({
      ...data,
      skills: { ...data.skills, categories: cats },
    });
  };

  const addSkillCategory = () => {
    updateData({
      ...data,
      skills: {
        ...data.skills,
        categories: [
          ...data.skills.categories,
          {
            id: "s" + Date.now(),
            name: "New Category",
            skills: ["Skill 1"],
          },
        ],
      },
    });
  };

  const removeSkillCategory = (index: number) => {
    if (!confirm("Delete this category?")) return;
    updateData({
      ...data,
      skills: {
        ...data.skills,
        categories: data.skills.categories.filter((_, i) => i !== index),
      },
    });
  };

  // ==========================================
  // UPDATE HELPERS - Experience
  // ==========================================
  const updateExperience = (
    index: number,
    field: keyof ExperienceItem,
    value: any
  ) => {
    const items = [...data.experience.items];
    items[index] = { ...items[index], [field]: value };
    updateData({
      ...data,
      experience: { ...data.experience, items },
    });
  };

  const updateExpDesc = (
    expIndex: number,
    descIndex: number,
    value: string
  ) => {
    const items = [...data.experience.items];
    const desc = [...items[expIndex].description];
    desc[descIndex] = value;
    items[expIndex] = { ...items[expIndex], description: desc };
    updateData({
      ...data,
      experience: { ...data.experience, items },
    });
  };

  const addExpDesc = (expIndex: number) => {
    const items = [...data.experience.items];
    items[expIndex] = {
      ...items[expIndex],
      description: [
        ...items[expIndex].description,
        "New responsibility...",
      ],
    };
    updateData({
      ...data,
      experience: { ...data.experience, items },
    });
  };

  const removeExpDesc = (expIndex: number, descIndex: number) => {
    const items = [...data.experience.items];
    items[expIndex] = {
      ...items[expIndex],
      description: items[expIndex].description.filter(
        (_, i) => i !== descIndex
      ),
    };
    updateData({
      ...data,
      experience: { ...data.experience, items },
    });
  };

  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: "e" + Date.now(),
      role: "New Role",
      company: "Company Name",
      location: "Location",
      period: "Start - End",
      description: ["Responsibility 1"],
    };
    updateData({
      ...data,
      experience: {
        ...data.experience,
        items: [...data.experience.items, newExp],
      },
    });
  };

  const removeExperience = (index: number) => {
    if (!confirm("Delete this experience?")) return;
    updateData({
      ...data,
      experience: {
        ...data.experience,
        items: data.experience.items.filter((_, i) => i !== index),
      },
    });
  };

  // ==========================================
  // TAB DEFINITIONS
  // ==========================================
  const tabs: { key: TabName; label: string }[] = [
    { key: "personal", label: "Personal & Socials" },
    { key: "about", label: "About" },
    { key: "projects", label: "Projects" },
    { key: "skills", label: "Skills" },
    { key: "experience", label: "Experience" },
    { key: "files", label: "Files (Photo / CV)" },
  ];

  // ==========================================
  // SAVE BUTTON LABEL BASED ON STATUS
  // ==========================================
  const getSaveButtonText = () => {
    if (saveStatus === "saving") return "Saving...";
    if (saveStatus === "success") return "Saved!";
    if (saveStatus === "error") return "Save Failed";
    return hasChanges ? "Save Changes" : "No Changes";
  };

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div className="admin-page">
      {/* --- SIDEBAR --- */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Admin Panel</h2>
          <p>Portfolio Manager</p>
        </div>

        <nav className="admin-nav">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={
                "admin-nav-btn " +
                (activeTab === tab.key ? "active" : "")
              }
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <a href="/" className="admin-back-link">
            ← Back to Portfolio
          </a>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="admin-main">

        {/* --- STICKY SAVE BAR (top of content) --- */}
        <div className="save-bar">
          <div className="save-bar-info">
            {hasChanges && (
              <span className="save-indicator unsaved">
                ● Unsaved changes
              </span>
            )}
            {!hasChanges && saveStatus === "idle" && (
              <span className="save-indicator saved">
                ✓ All changes saved
              </span>
            )}
            {saveStatus === "error" && (
              <span className="save-indicator error">
                Error: {errorMsg}
              </span>
            )}
          </div>

          <button
            className={"save-btn status-" + saveStatus}
            onClick={saveData}
            disabled={saveStatus === "saving" || !hasChanges}
          >
            {getSaveButtonText()}
          </button>
        </div>

        {/* ===== PERSONAL TAB ===== */}
        {activeTab === "personal" && (
          <div className="admin-panel">
            <h3 className="panel-title">Personal Information</h3>
            <p className="panel-desc">
              Update your name, title, contact info, and social links.
            </p>

            <div className="form-grid">
              {(
                [
                  "name",
                  "firstName",
                  "lastName",
                  "title",
                  "subtitle",
                  "email",
                  "phone",
                  "location",
                ] as (keyof PersonalInfo)[]
              ).map((field) => (
                <div key={field} className="admin-field">
                  <label>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    value={data.personal[field]}
                    onChange={(e) =>
                      updatePersonal(field, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>

            <div className="admin-field full-width">
              <label>Bio</label>
              <textarea
                rows={3}
                value={data.personal.bio}
                onChange={(e) =>
                  updatePersonal("bio", e.target.value)
                }
              />
            </div>

            <h4 className="sub-title">Social Links</h4>
            <div className="form-grid">
              {(
                ["github", "linkedin", "twitter", "email"] as (keyof Socials)[]
              ).map((field) => (
                <div key={field} className="admin-field">
                  <label>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    value={data.socials[field]}
                    onChange={(e) =>
                      updateSocials(field, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== ABOUT TAB ===== */}
        {activeTab === "about" && (
          <div className="admin-panel">
            <h3 className="panel-title">About Section</h3>
            <p className="panel-desc">
              Edit your about paragraphs and highlight stats.
            </p>

            <h4 className="sub-title">Paragraphs</h4>
            {data.about.paragraphs.map((p, i) => (
              <div key={i} className="admin-field full-width removable">
                <label>Paragraph {i + 1}</label>
                <textarea
                  rows={3}
                  value={p}
                  onChange={(e) =>
                    updateAboutParagraph(i, e.target.value)
                  }
                />
                <button
                  className="btn-remove"
                  onClick={() => removeAboutParagraph(i)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button className="btn-add" onClick={addAboutParagraph}>
              + Add Paragraph
            </button>

            <h4 className="sub-title">Highlights</h4>
            <div className="form-grid">
              {data.about.highlights.map((h, i) => (
                <div key={i} className="admin-card removable">
                  <div className="admin-field">
                    <label>Label</label>
                    <input
                      type="text"
                      value={h.label}
                      onChange={(e) =>
                        updateHighlight(i, "label", e.target.value)
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Value</label>
                    <input
                      type="text"
                      value={h.value}
                      onChange={(e) =>
                        updateHighlight(i, "value", e.target.value)
                      }
                    />
                  </div>
                  <button
                    className="btn-remove"
                    onClick={() => removeHighlight(i)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button className="btn-add" onClick={addHighlight}>
              + Add Highlight
            </button>
          </div>
        )}

        {/* ===== PROJECTS TAB ===== */}
        {activeTab === "projects" && (
          <div className="admin-panel">
            <h3 className="panel-title">Projects</h3>
            <p className="panel-desc">
              Add, edit, or remove portfolio projects. Upload images directly.
            </p>

            <div className="form-grid">
              <div className="admin-field">
                <label>Section Heading</label>
                <input
                  type="text"
                  value={data.projects.heading}
                  onChange={(e) =>
                    updateData({
                      ...data,
                      projects: {
                        ...data.projects,
                        heading: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="admin-field">
                <label>Section Subtitle</label>
                <input
                  type="text"
                  value={data.projects.subtitle}
                  onChange={(e) =>
                    updateData({
                      ...data,
                      projects: {
                        ...data.projects,
                        subtitle: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>

            {data.projects.items.map((project, i) => (
              <div key={project.id} className="admin-card removable">
                <h4 className="card-label">
                  Project {i + 1}: {project.title}
                </h4>

                <div className="form-grid">
                  <div className="admin-field">
                    <label>Title</label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) =>
                        updateProject(i, "title", e.target.value)
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Image Path</label>
                    <input
                      type="text"
                      value={project.image}
                      onChange={(e) =>
                        updateProject(i, "image", e.target.value)
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Live URL</label>
                    <input
                      type="text"
                      value={project.liveUrl}
                      onChange={(e) =>
                        updateProject(i, "liveUrl", e.target.value)
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>GitHub URL</label>
                    <input
                      type="text"
                      value={project.githubUrl}
                      onChange={(e) =>
                        updateProject(
                          i,
                          "githubUrl",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                <div className="admin-field full-width">
                  <label>Description</label>
                  <textarea
                    rows={2}
                    value={project.description}
                    onChange={(e) =>
                      updateProject(
                        i,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="admin-field full-width">
                  <label>Tags (comma separated)</label>
                  <input
                    type="text"
                    value={project.tags.join(", ")}
                    onChange={(e) =>
                      updateProject(
                        i,
                        "tags",
                        e.target.value
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean)
                      )
                    }
                  />
                </div>

                {/* Image upload for this project */}
                <div className="admin-field full-width">
                  <label>Upload Project Image</label>
                  <div className="upload-row">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleProjectImageUpload(i, f);
                      }}
                    />
                    {project.image && (
                      <img
                        src={project.image}
                        alt="preview"
                        className="upload-preview"
                        onError={(e) =>
                          ((e.target as HTMLImageElement).style.display =
                            "none")
                        }
                      />
                    )}
                  </div>
                </div>

                <button
                  className="btn-remove"
                  onClick={() => removeProject(i)}
                >
                  Remove Project
                </button>
              </div>
            ))}

            <button className="btn-add" onClick={addProject}>
              + Add Project
            </button>
          </div>
        )}

        {/* ===== SKILLS TAB ===== */}
        {activeTab === "skills" && (
          <div className="admin-panel">
            <h3 className="panel-title">Skills & Technologies</h3>
            <p className="panel-desc">
              Manage skill categories and individual skills.
            </p>

            {data.skills.categories.map((cat, ci) => (
              <div key={cat.id} className="admin-card removable">
                <div className="admin-field">
                  <label>Category Name</label>
                  <input
                    type="text"
                    value={cat.name}
                    onChange={(e) =>
                      updateSkillCategory(ci, e.target.value)
                    }
                  />
                </div>

                <div className="skills-edit-list">
                  {cat.skills.map((skill, si) => (
                    <div key={si} className="skill-edit-row">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) =>
                          updateSkillItem(ci, si, e.target.value)
                        }
                      />
                      <button
                        className="btn-remove-small"
                        onClick={() =>
                          removeSkillFromCategory(ci, si)
                        }
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  className="btn-add-small"
                  onClick={() => addSkillToCategory(ci)}
                >
                  + Add Skill
                </button>
                <button
                  className="btn-remove"
                  onClick={() => removeSkillCategory(ci)}
                >
                  Remove Category
                </button>
              </div>
            ))}

            <button className="btn-add" onClick={addSkillCategory}>
              + Add Category
            </button>
          </div>
        )}

        {/* ===== EXPERIENCE TAB ===== */}
        {activeTab === "experience" && (
          <div className="admin-panel">
            <h3 className="panel-title">Experience</h3>
            <p className="panel-desc">
              Edit your work experience timeline.
            </p>

            {data.experience.items.map((exp, i) => (
              <div key={exp.id} className="admin-card removable">
                <h4 className="card-label">
                  {exp.role} at {exp.company}
                </h4>

                <div className="form-grid">
                  <div className="admin-field">
                    <label>Role</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) =>
                        updateExperience(i, "role", e.target.value)
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(i, "company", e.target.value)
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Location</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) =>
                        updateExperience(
                          i,
                          "location",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Period</label>
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) =>
                        updateExperience(i, "period", e.target.value)
                      }
                    />
                  </div>
                </div>

                <h5 className="sub-label">Responsibilities</h5>
                {exp.description.map((desc, di) => (
                  <div key={di} className="skill-edit-row">
                    <input
                      type="text"
                      value={desc}
                      onChange={(e) =>
                        updateExpDesc(i, di, e.target.value)
                      }
                    />
                    <button
                      className="btn-remove-small"
                      onClick={() => removeExpDesc(i, di)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  className="btn-add-small"
                  onClick={() => addExpDesc(i)}
                >
                  + Add Responsibility
                </button>

                <button
                  className="btn-remove"
                  onClick={() => removeExperience(i)}
                >
                  Remove Experience
                </button>
              </div>
            ))}

            <button className="btn-add" onClick={addExperience}>
              + Add Experience
            </button>
          </div>
        )}

        {/* ===== FILES TAB (photo + CV upload) ===== */}
        {activeTab === "files" && (
          <div className="admin-panel">
            <h3 className="panel-title">Files Management</h3>
            <p className="panel-desc">
              Upload your profile photo and CV. Files are saved directly to the <code>public/</code> folder.
            </p>

            {/* Profile Photo Upload */}
            <div className="file-upload-card">
              <h4 className="card-label">Profile Photo</h4>
              <p className="file-desc">
                Current path: <code>{data.personal.photo}</code>
              </p>

              {/* Preview */}
              <div className="file-preview">
                <img
                  src={data.personal.photo}
                  alt="Profile"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    const url = await uploadFile(f, "photo");
                    if (url) {
                      updatePersonal("photo", url);
                      alert("Photo uploaded! Click 'Save Changes' to update data.js.");
                    }
                  }
                }}
              />
            </div>

            {/* CV Upload */}
            <div className="file-upload-card">
              <h4 className="card-label">CV / Resume</h4>
              <p className="file-desc">
                Current path: <code>{data.personal.resume}</code>
              </p>

              <a
                href={data.personal.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="file-link"
              >
                View current CV →
              </a>

              <input
                type="file"
                accept="application/pdf"
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    const url = await uploadFile(f, "cv");
                    if (url) {
                      updatePersonal("resume", url);
                      alert("CV uploaded! Click 'Save Changes' to update data.js.");
                    }
                  }
                }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
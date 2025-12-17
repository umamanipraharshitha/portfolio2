import React, { useState } from "react";
import { FaPython, FaReact, FaNodeJs, FaLocationArrow } from "react-icons/fa";
import "./Projects.css";

import rimg from "./assets/r.jpg";
import iimg from "./assets/i.jpg";
import cimg from "./assets/c.jpg";
import h from "./assets/ha.png";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* -------------------- ADVANCED 3D PIN -------------------- */
const PinContainer = ({ children, className, containerClassName }) => {
  const [transform, setTransform] = useState(
    "rotateX(0deg) rotateY(0deg) scale(1)"
  );

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTransform(
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.98)`
    );
  };

  const resetTransform = () => {
    setTransform("rotateX(0deg) rotateY(0deg) scale(1)");
  };

  return (
    <div
      className={cn("pin-group", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTransform}
    >
      <div className="pin-inner-wrapper">
        <div className="pin-card" style={{ transform }}>
          <div className={cn(className)}>{children}</div>
        </div>
      </div>
    </div>
  );
};

/* -------------------- PROJECTS DATA -------------------- */
const projects = [
  {
    id: 1,
    title: "RAG-Based Multi-Modal QA System",
    des: "Multi-modal RAG with PDF/DOCX/CSV/Image ingestion, OCR, vector search and ChromaDB, powered by Gemini.",
    sourceCode:
      "https://github.com/umamanipraharshitha/RAG-Based-Multi-Modal-QA-Summarization-System",
    icons: [FaPython, FaNodeJs],
    img: rimg,
  },
  {
    id: 2,
    title: "AI Interview Automation Pipeline",
    des: "Automated ATS scoring, resume insights and reporting with Gemini, Drive and Sheets APIs.",
    sourceCode:
      "https://github.com/umamanipraharshitha/ai-interview-automation-pipeline",
    icons: [FaPython, FaReact],
    img: iimg,
  },
  {
    id: 3,
    title: "CareerGuidance Roadmap Generator",
    des: "AI career roadmap generator with Firebase, used by 50+ students for personalised planning.",
    sourceCode:
      "https://github.com/umamanipraharshitha/CareerGuidance_Roadmap_Generator",
    icons: [FaReact, FaNodeJs],
    img: cimg,
  },

{
  id: 4,
  title: "WhatsApp-based AI Health Assistant",
  des: "AI-powered WhatsApp assistant for medication reminders and health Q/A using RAG, enabling users to schedule, list, and cancel reminders via natural language.",
  sourceCode: "https://github.com/your-username/whatsapp-ai-health-assistant",
  icons: [FaWhatsapp, FaNodeJs, FaReact],
  img: h,
},
  ];

/* -------------------- PROJECTS SECTION -------------------- */
export const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="projects-heading">
        Recent  <span>Projects</span>
        </h2>
        <p className="projects-subtitle">
          A few things built around RAG systems, AI automation and full-stack web
          apps.
        </p>

        <div className="projects-grid">
          {projects.map(({ id, title, des, img, sourceCode, icons }) => (
            <div key={id} className="project-col">
              <PinContainer>
                <div className="project-content">
                  {/* FULL IMAGE */}
                  <div className="project-img-wrapper">
                    <img
                      src={img}
                      alt={title}
                      className="project-main-img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        transform: "none",
                      }}
                    />
                  </div>

                  <h3 className="project-title">{title}</h3>
                  <p className="project-desc">{des}</p>

                  <div className="project-footer">
                    <div className="project-icons">
                      {icons.map((Icon, i) => (
                        <div
                          key={i}
                          className="project-icon-wrapper"
                          style={{
                            transform: `translateX(-${5 * i * 2}px)`,
                          }}
                        >
                          <Icon className="project-icon-img" />
                        </div>
                      ))}
                    </div>

                    <a
                      href={sourceCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-source"
                    >
                      Source Code
                      <FaLocationArrow className="ml-2 inline-block text-xs align-middle" />
                    </a>
                  </div>
                </div>
              </PinContainer>
            </div>
          ))}
        </div>

        {/* ================= EXPLORE MORE ================= */}
        <div
          style={{
            marginTop: "50px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#99b7c3",
              fontSize: "0.95rem",
              marginBottom: "14px",
            }}
          >
            Want to explore more of my work?
          </p>

          <a
            href="https://github.com/umamanipraharshitha?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "10px 22px",
              borderRadius: "999px",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#7ff6ff",
              border: "1px solid rgba(0, 255, 255, 0.45)",
              textDecoration: "none",
              textShadow: "0 0 8px rgba(0,255,255,0.5)",
            }}
          >
            🚀 Explore more of my projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;

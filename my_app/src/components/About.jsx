import React from "react";
import "./about.css";

export default function About() {
  const aboutItems = [
    {
      title: "Passion",
      desc: "Turning ideas into clean, scalable, and functional digital products.",
      color: "#47c4d2",
    },
    {
      title: "Frontend",
      desc: "React, HTML, CSS, JavaScript, and smooth UI/UX design.",
      color: "#91faff",
    },
    {
      title: "Backend",
      desc: "Node.js, Express.js, MongoDB, SQL, API integration, and cloud deployment.",
      color: "#f48fb1",
    },
    {
      title: "Tools",
      desc: "Git, Docker, Firebase, VS Code, and other modern dev tools.",
      color: "#ffd54f",
    },
    {
      title: "Learning",
      desc: "Exploring AI, machine learning, and scalable backend systems.",
      color: "#90caf9",
    },
    {
      title: "Collaboration",
      desc: "Contributing to open source projects and team-oriented development.",
      color: "#a5d6a7",
    },
  ];

  return (
    <section className="about-section">
      {/* Top background */}
      <div className="about-top">
        <h2 className="about-title">About Me</h2>
        <p className="about-subtitle">
          I'm a passionate web developer focused on crafting modern, performant, and user-friendly digital experiences.
        </p>
      </div>

      {/* Bottom background */}
      <div className="about-bottom">
        <div className="bento-grid">
          {aboutItems.map((item, i) => (
            <div className="bento-card" key={i} style={{ borderTopColor: item.color }}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

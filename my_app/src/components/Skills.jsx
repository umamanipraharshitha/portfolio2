import React, { useState } from "react";
import "./skills.css";
import Fimg from "./assets/f.jpg";
import limg from "./assets/l.png";
import bimg from "./assets/ba.jpg";
import timg from "./assets/t.png";

export default function Skills() {
  const [index, setIndex] = useState(0);

  const slides = [
    { title: "Languages", desc: "C • Java • Python", img: limg },
    { title: "Frontend", desc: "HTML • CSS • JavaScript • React • Bootstrap", img: Fimg },
    { title: "Backend", desc: "Node.js • Express.js • SQL • Firebase • MongoDB • API Integration", img: bimg },
    { title: "Tools", desc: "Git • Docker • Firebase • Cloud Services", img: timg },
  ];

  const goNext = () => setIndex((prev) => (prev + 1) % slides.length);
  const goPrev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="skills-section">
      <h2 className="skill-section-title">Skills</h2>
      <div className="slider-wrapper">
        <div className="slider-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((s, i) => (
            <div className="slide" key={i}>
              <img src={s.img} alt={`${s.title}`} className="slide-img" loading="lazy" />
              <div className="slide-text">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button className="nav-btn left" onClick={goPrev}>❮</button>
        <button className="nav-btn right" onClick={goNext}>❯</button>
      </div>

      {/* Dots */}
      <div className="slider-dots">
        {slides.map((_, i) => (
          <span key={i} className={`dot ${i === index ? "active" : ""}`} onClick={() => setIndex(i)} />
        ))}
      </div>
    </section>
  );
}

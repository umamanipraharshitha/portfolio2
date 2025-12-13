import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import laptopImg from "./assets/b.png";
import "./hero.css";

export default function Hero() {
  const roles = [
    "Aspiring Software Engineer",
    "Full-Stack Web Developer",
    "AI & Data Science Enthusiast",
    "Open-Source Contributor",
  ];

  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [writing, setWriting] = useState(true);

  useEffect(() => {
    const current = roles[roleIndex];
    let timer;

    if (writing) {
      timer = setTimeout(() => {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setWriting(false), 700);
        }
      }, 55);
    } else {
      timer = setTimeout(() => {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setWriting(true);
        }
      }, 30);
    }

    return () => clearTimeout(timer);
  }, [text, writing, roleIndex, roles]);

  return (
    <section className="hero-wrapper" id="home">
      <div className="container">
        <div className="hero">
          {/* LEFT */}
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-title">
              Hey, I am <span className="name">Praharshitha</span>
            </h1>

            <h2 className="typing-role">
              {text}
              <span className="cursor" />
            </h2>

            <motion.p
              className="hero-desc"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              I build focused, user-centered web apps and machine learning
              prototypes. Currently learning scalable backend systems, data
              pipelines and clean front-end architecture.
            </motion.p>

            <div className="hero-actions">
              <a
  className="btn-primary"
  href="/resume.pdf"
  download
>
  Download Resume
</a>
              <a className="btn-outline" href="#contact">
                Contact
              </a>
            </div>
          </motion.div>

          {/* RIGHT - Laptop Image */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img src={laptopImg} alt="Portfolio laptop illustration" />
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="hero-wave" />
    </section>
  );
}

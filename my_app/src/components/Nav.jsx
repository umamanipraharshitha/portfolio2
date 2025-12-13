import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import "./nav.css";

export default function Nav() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section"));

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.id) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.1 } // smaller threshold fixes short sections
    );

    sections.forEach(sec => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Fallback for very short sections
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = Array.from(document.querySelectorAll("section"));
      let found = false;

      sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150 && sec.id) {
          setActive(sec.id);
          found = true;
        }
      });

      if (!found) setActive("home");
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-inner">
        {/* BRAND */}
        <motion.div
          className="brand"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="logo-blob" />
          <div className="brand-text">
            <div className="name">Praharshitha</div>
            <div className="role">Software Engineer Aspirant</div>
          </div>
        </motion.div>

        {/* LINKS */}
        <nav className={`links ${menuOpen ? "open" : ""}`}>
          {["home", "about", "skills", "projects", "contact"].map(item => (
            <a
              key={item}
              href={`#${item}`}
              className={active === item ? "active" : ""}
              onClick={handleLinkClick}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="nav-actions">
          <ThemeToggle />

          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>

          <a className="btn-cta desktop-only" href="#projects">
            See Work
          </a>
        </div>
      </div>
    </header>
  );
}

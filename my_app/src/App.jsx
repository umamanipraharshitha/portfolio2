import React, { useState } from "react";
import { ThemeProvider } from "./theme/ThemeContext";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Intro from "./components/Intro";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <ThemeProvider>
      {showIntro && <Intro onFinish={() => setShowIntro(false)} />}

      <div className="app-root">
        <Nav />

        <main className="main-container">
          <section id="home">
            <Hero />
          </section>

          <section id="about">
            <About />
          </section>

          <section id="skills">
            <Skills />
          </section>

          <section id="projects">
            <Projects />
          </section>

          <section id="contact">
            <Contact />
          </section>
        </main>

        <Footer />
        <Chatbot />
      </div>
    </ThemeProvider>
  );
}

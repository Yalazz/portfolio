import React, { useEffect, useState } from "react";
import "./App.css";

import Hero3D from "./components/Hero3D/Hero3D";
import ProjectGrid from "./components/ProjectGrid/ProjectGrid";
import Experience from "./components/Experience/Experience";
import Education from "./components/Education/Education";
import Contact from "./components/Contact/Contact";
import Monitor from "./components/Monitor/Monitor";
import FloatingSocial from "./components/FloatingSocial/FloatingSocial";
import Loader from "./components/Loader/Loader"; // <== loader eklendi

export default function App() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || (prefersDark ? "dark" : "light")
  );
  const [poweredOn, setPoweredOn] = useState(false);
  const [loading, setLoading] = useState(true); // <== loader state

  // Tema uygulama ve geçici animasyon
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    root.classList.add("theme-fade");
    const t = setTimeout(() => root.classList.remove("theme-fade"), 280);
    return () => clearTimeout(t);
  }, [theme]);

  // İlk açılışta loading ekranı göster
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800); // 1.8 saniye göster
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Loader />; // <== LOADER EKRANI

  return (
    <div className="App">
      {/* === HEADER / NAV === */}
      <header className="navbar" role="navigation" aria-label="Primary">
        <div className="nav-left">
          <a href="#hero" className="brand" aria-label="Go to top">
            <span className="glitch" data-text="EMRE BILICI PORTFOLIO">
              EMRE BILICI PORTFOLIO
            </span>
          </a>
        </div>
        <ul className="nav-right">
          <li><a href="#hero">Home</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </header>

      {/* === MONITOR === */}
      <Monitor
        poweredOn={poweredOn}
        onTogglePower={(next) => {
          if (typeof next === "boolean") setPoweredOn(next);
          else setPoweredOn((v) => !v);
        }}
      />

      {/* === MAIN === */}
      <main className="main-content">
        <section id="hero" className="hero-section">
          <h1 className="hero-title big-glitch">
            <span className="glitch" data-text="EMRE BILICI">
              EMRE BILICI
            </span>
            <span className="hero-subtitle">
              Graphics Engineer - Game Developer
            </span>
          </h1>
          <Hero3D />
        </section>

        <section id="projects" className="section">
          <ProjectGrid />
        </section>

        <section id="experience" className="section">
          <Experience />
        </section>

        <section id="education" className="section">
          <Education />
        </section>

        <section id="contact" className="section">
          <Contact />
        </section>
      </main>

      {/* === FLOATING === */}
      <FloatingSocial
        poweredOn={poweredOn}
        setPoweredOn={(fnOrBool) =>
          setPoweredOn(typeof fnOrBool === "function" ? fnOrBool : !!fnOrBool)
        }
        theme={theme}
        setTheme={setTheme}
      />
    </div>
  );
}

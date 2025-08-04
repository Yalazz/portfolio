import React from "react";
import "./Education.css";

const educationData = [
  {
    degree: "B.A. in Digital Game Design",
    school: "Beykoz University",
    year: "2021 – 2025",
    note: "Graduated with strong emphasis on graphics programming and interactive design.",
  },
  {
    degree: "M.Sc. in Computer Engineering (Planned)",
    school: "ITU / YTU",
    year: "2025+",
    note: "Focusing on GPU-based rendering, Vulkan engine development, and real-time systems.",
  },
];

export default function Education() {
  return (
    <section id="education" className="section">
      <h2 className="section-title">Education</h2>
      <div className="edu-timeline">
        {educationData.map((item, idx) => (
          <div key={idx} className={`edu-item ${idx % 2 === 0 ? "left" : "right"}`}>
            <div className="edu-dot" />
            <div className="edu-content">
              <h3 className="edu-degree">{item.degree}</h3>
              <div className="edu-meta">
                <span className="edu-school">{item.school}</span>
                <span className="edu-sep">•</span>
                <time className="edu-year">{item.year}</time>
              </div>
              <p className="edu-note">{item.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

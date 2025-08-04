import React from "react";
import "./Experience.css";
import { FaBriefcase } from "react-icons/fa";
import RetroCRTBox from "../RetroCRT/RetroCRTScene";



export default function Experience() {
  const experienceData = [
    {
      role: "Software Developer",
      company: "Flowick Teknoloji A.Ş.",
      period: "Oct 2024 – Present",
      details: [
[
  "Developed Python and Java-based bots for advanced automation systems.",
  "Integrated custom translation and scraping solutions into Bubble.io workflows.",
  "Designed user-friendly interfaces and custom email systems using HTML/CSS.",
]

      ],
    },
    {
      role: "Intern – Software Engineer",
      company: "Smart IQ",
      period: "Jul 2024 – Aug 2024",
      details: [
[
  "Built real-time data processing infrastructure using RabbitMQ.",
  "Developed notification systems with .NET Core and SMTP.",
  "Contributed to PostgreSQL logging and Vue.js-based admin panel development.",
]

      ],
    },
  ];

  return (
    <section className="experience-container" aria-labelledby="exp-title">
      <h3 id="exp-title" className="exp-section-title">Experience</h3>
      <div className="experience-with-crt">
        <ul className="experience-list" role="list">
          {experienceData.map((item, index) => (
            <li key={index} className="experience-item">
              <FaBriefcase className="exp-icon" aria-hidden="true" />
              <div className="exp-info">
                <h4 className="exp-role">{item.role}</h4>
                <div className="exp-meta">
                  <span className="exp-company">{item.company}</span>
                  <time className="exp-period">{item.period}</time>
                </div>
                <ul className="exp-details">
                  {item.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <div className="experience-crt">
                <RetroCRTBox />
        </div>
      </div>
    </section>
  );
}

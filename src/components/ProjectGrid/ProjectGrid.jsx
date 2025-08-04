import React from "react";
import "./ProjectGrid.css";
import { SiVulkan, SiUnity, SiNvidia } from "react-icons/si";
import { GiAbstract050 } from "react-icons/gi";

export default function ProjectGrid() {
  const projects = [
    {
      title: "Vulkan Engine",
      description:
        "Custom 3D renderer with real-time lighting, PBR, and GLTF support.",
      tags: ["Vulkan", "C++", "PBR"],
      link: "https://github.com/emrebilici/yalaz-engine",
      icon: <SiVulkan />,
    },
    {
      title: "Unity Game Projects",
      description:
        "Gameplay systems, AI, and UI/UX implementation in Unity 3D.",
      tags: ["Unity", "C#", "Game Design"],
      link: "https://github.com/emrebilici/unity-games",
      icon: <SiUnity />,
    },
    {
      title: "Shader Experiments",
      description:
        "Creative GLSL and Shadertoy visuals: glow, distortion, fractals.",
      tags: ["GLSL", "Shadertoy", "WebGL"],
      link: "https://shadertoy.com/user/emrebilici",
      icon: <GiAbstract050 />, // 👈 önerilen ikon
    },

    {
      title: "GPU Compute / Path Tracer",
      description:
        "Realtime GPU compute renderer with ray/path tracing techniques.",
      tags: ["GPU", "Compute Shader", "Ray Tracing"],
      link: "https://github.com/emrebilici/gpu-tracer",
      icon: <SiNvidia />,
    },
  ];

  return (
    <div className="pg-grid">
      {projects.map((p, idx) => (
        <article className="pg-card" key={idx}>
          <header className="pg-head">
            <span className="pg-icon" aria-hidden="true">{p.icon}</span>
            <h3 className="pg-title">{p.title}</h3>
          </header>

          <p className="pg-desc">{p.description}</p>

          {Array.isArray(p.tags) && p.tags.length > 0 && (
            <div className="pg-tags" aria-label="tags">
              {p.tags.map((t, i) => (
                <span className="pg-tag" key={i}>{t}</span>
              ))}
            </div>
          )}

          {p.link && (
            <a
              className="pg-link"
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              title="View Project"
            >
              View Project →
            </a>
          )}
        </article>
      ))}
    </div>
  );
}

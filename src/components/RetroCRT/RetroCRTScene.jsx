// 📁 src/components/RetroCRT/RetroCRTScene.jsx

import React, { useState, useEffect, useCallback } from "react";

import NESController from "../NESController/NESController";
import ModelViewer from "./ModelViewer";
// import React, { useState, useEffect, useCallback } from "react";


export default function RetroCRTScene() {
  const models = [
    { name: "House", file: "/assets/models/house.glb" },
    { name: "FINAL", file: "/assets/models/FINAL.glb" },
    { name: "BeigeMeetingRoom_2", file: "/assets/models/BeigeMeetingRoom_2.glb" },
  ];

  const [cursorIndex, setCursorIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

const handleInput = useCallback((input) => {
  if (input === "Left" || input === "Up") {
    setCursorIndex((prev) => (prev - 1 + models.length) % models.length);
  } else if (input === "Right" || input === "Down") {
    setCursorIndex((prev) => (prev + 1) % models.length);
  } else if (input === "Select") {
    setSelectedIndex(cursorIndex);
  } else if (input === "A" || input === "B") {
    setSelectedIndex(null);
  }
}, [cursorIndex, models.length]);


useEffect(() => {
  const keyMap = {
    ArrowUp: "Up",
    ArrowDown: "Down",
    ArrowLeft: "Left",
    ArrowRight: "Right",
    Enter: "Select",
    a: "A",
    b: "B",
  };

  const onKeyDown = (e) => {
    const input = keyMap[e.key.toLowerCase()] || keyMap[e.key];
    if (input) handleInput(input);
  };

  window.addEventListener("keydown", onKeyDown);
  return () => window.removeEventListener("keydown", onKeyDown);
}, [handleInput]);


  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "IBM Plex Mono, monospace", marginTop: "2rem" }}>
      {/* Retro TV */}
      <div
        style={{
          width: "900px",
          maxWidth: "95vw",
          background: "linear-gradient(145deg, #1a1a1a, #0f0f0f)",
          borderRadius: "28px",
          boxShadow: "inset 0 0 12px #000, 0 0 30px rgba(0,0,0,0.7)",
          border: "6px solid #222",
          padding: "2rem 2rem 1rem 2rem",
          position: "relative",
          transform: "rotateX(2deg) rotateY(-1deg)",
        }}
      >
        {/* Ekran Camı */}
        <div
          style={{
            background: "radial-gradient(circle at center, rgba(0,0,0,0.2), rgba(0,0,0,0.8))",
            borderRadius: "20px",
            border: "4px solid #111",
            padding: "1rem",
            position: "relative",
            boxShadow: "inset 0 0 60px rgba(0,0,0,0.5), inset 0 0 12px rgba(255,0,0,0.05)",
          }}
        >
          {/* Cam parlaması */}
          <div
            style={{
              content: "",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "20px",
              background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Model Menü */}
          <div style={{ color: "#ff003c", fontSize: "1.1rem", marginBottom: "1rem" }}>
            <strong>Model Seçimi:</strong>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {models.map((model, idx) => (
                <li key={idx} style={{ color: idx === cursorIndex ? "#fff" : "#aaa", fontWeight: idx === cursorIndex ? "bold" : "normal" }}>
                  {idx === cursorIndex ? "▶ " : " "} {model.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Model Viewer */}
          {selectedIndex !== null ? (
            <>
              <div style={{ color: "#fff", textAlign: "center", marginBottom: "0.5rem" }}>
                Aktif Model: {models[selectedIndex].name}
              </div>
              <div style={{ border: "2px solid #333", borderRadius: "12px", overflow: "hidden" }}>
                <ModelViewer modelPath={models[selectedIndex].file} />
              </div>
            </>
          ) : (
            <p style={{ color: "#999", textAlign: "center" }}>SELECT ile yükle • A/B ile iptal</p>
          )}
        </div>

        {/* Hoparlör ve düğmeler */}
        <div
          style={{
            position: "absolute",
            right: "1.5rem",
            top: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div style={{ width: "14px", height: "14px", background: "#c00", borderRadius: "50%", boxShadow: "0 0 4px #f00" }}></div>
          <div style={{ width: "10px", height: "10px", background: "#ccc", borderRadius: "50%" }}></div>
        </div>

        {/* Kaset yuvası */}
        <div
          style={{
            position: "absolute",
            bottom: "0.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            width: "180px",
            height: "16px",
            background: "#111",
            borderRadius: "4px",
            border: "2px inset #222",
          }}
        />
      </div>

      {/* NES Controller */}
      <div style={{ marginTop: "1rem" }}>
        <NESController onInput={handleInput} />
      </div>
    </div>
  );
}

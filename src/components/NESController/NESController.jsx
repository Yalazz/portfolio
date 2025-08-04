// 📁 src/components/RetroCRT/NESController.jsx
import React from "react";
import "./NESController.css";

export default function NESController({ onInput }) {
  const handlePress = (btn) => {
    onInput(btn);
  };

  return (
    <div className="nes-wrapper">
      <div className="nes-console-body">
        <div className="dpad">
          <div onClick={() => handlePress("Up")} className="dpad-btn up">▲</div>
          <div onClick={() => handlePress("Down")} className="dpad-btn down">▼</div>
          <div onClick={() => handlePress("Left")} className="dpad-btn left">◀</div>
          <div onClick={() => handlePress("Right")} className="dpad-btn right">▶</div>
          <div className="dpad-btn center"></div>
        </div>

        <div className="middle-buttons">
          <button onClick={() => handlePress("Select")} className="small-btn">Select</button>
          <button onClick={() => handlePress("Start")} className="small-btn">Start</button>
        </div>

        <div className="action-buttons">
          <button onClick={() => handlePress("A")} className="round-btn">A</button>
          <button onClick={() => handlePress("B")} className="round-btn">B</button>
        </div>
      </div>
    </div>
  );
}

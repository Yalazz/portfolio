import React, { useRef } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaPowerOff,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import "./FloatingSocial.css";

/** Basit beep üretici (Web Audio) */
function useBeep() {
  const ctxRef = useRef(null);

  const ensureCtx = () => {
    if (!ctxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      ctxRef.current = new AudioCtx();
    }
    return ctxRef.current;
  };

  const beep = ({ freq = 600, duration = 120, type = "sine", gain = 0.04 } = {}) => {
    const ctx = ensureCtx();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.value = gain;
    osc.connect(g).connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      osc.disconnect();
      g.disconnect();
    }, duration);
  };

  return { beep };
}

export default function FloatingSocial({ poweredOn, setPoweredOn, theme, setTheme }) {
  const { beep } = useBeep();

  const togglePower = () => {
    // kapalıdan açılırken daha kalın yeşil ton (düşük frekans),
    // açıktan kapanırken kırmızı uyarı (yüksek frekans)
    beep({ freq: poweredOn ? 880 : 420, duration: 110, type: "square", gain: 0.05 });
    if (typeof setPoweredOn === "function") {
      setPoweredOn((v) => !v);
    }
  };

  const toggleTheme = () => {
    beep({ freq: 620, duration: 90, type: "triangle", gain: 0.035 });
    if (typeof setTheme === "function") {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  return (
    <div className="floating-wrap">
      {/* Sol alt: Power + Theme */}
      <div className="floating-left">
        <button
          className={`fs-btn power ${poweredOn ? "on" : "off"}`}
          onClick={togglePower}
          aria-label={poweredOn ? "Turn monitor off" : "Turn monitor on"}
          title={poweredOn ? "Power OFF" : "Power ON"}
        >
          <FaPowerOff />
        </button>

        <button
          className="fs-btn theme"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        >
          <span className="theme-icon sun"><FaSun /></span>
          <span className="theme-icon moon"><FaMoon /></span>
        </button>
        
      </div>

      {/* Sağ alt: Sosyal bağlantılar */}
      <nav className="floating-right" aria-label="Social links">
        <a
          className="fs-btn"
          href="https://github.com/Yalazz"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
        >
          <FaGithub />
        </a>

        <a
          className="fs-btn"
          href="https://linkedin.com/in/emrebilici"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <FaLinkedin />
        </a>
      </nav>
    </div>
  );
}

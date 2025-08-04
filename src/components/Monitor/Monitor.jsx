import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Monitor.css";
import { FaHeart, FaUserAstronaut } from "react-icons/fa";
/**
 * RetroMonitor (Interactive)
 * Props:
 *  - poweredOn?: boolean            // açık/kapalı durumu (true => görünür)
 *  - onTogglePower?: (next?:boolean)=>void  // kapatmak için power off komutu kullanır
 *
 * Davranış:
 *  - Popup modal, ESC ile kapanır (onTogglePower varsa çağırır).
 *  - Komutlar: help, about, projects, experience, education, skills, contact,
 *              github, linkedin, email, site, theme dark|light, clear, power off,
 *              contributors (easter egg: wiirus’a teşekkür).
 */

export default function RetroMonitor({ poweredOn = false, onTogglePower }) {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIndex, setHistIndex] = useState(-1);
  const screenRef = useRef(null);
  const inputRef = useRef(null);

  // Yardım metni
  const helpText = useMemo(
    () => [
      "Available commands:",
      "  help               - Show this help",
      "  about              - About the author",
      "  projects           - Scroll to Projects section",
      "  experience         - Scroll to Experience section",
      "  education          - Scroll to Education section",
      "  skills             - Scroll to Skills section",
      "  contact            - Scroll to Contact section",
      "  github             - Open GitHub profile",
      "  linkedin           - Open LinkedIn profile",
      "  email              - Show email address",
      "  site               - Open personal website",
      "  theme dark|light   - Switch theme",
      "  clear              - Clear screen",
      "  power off          - Turn off this monitor (close popup)",
      "  contributors       - Easter egg",
    ],
    []
  );

  // Açılışta boot satırları
  useEffect(() => {
    if (!poweredOn) return;
    setLines([]);
    const boot = [
      "BOOTING YALAZ RETRO SYSTEM...",
      "Loading graphics core...",
      "Initializing GLSL shaders...",
      "Mounting /projects",
      "Running diagnostics...",
      "Ready.",
      ">> type 'help' to see commands",
    ];
    let i = 0;
    const t = setInterval(() => {
      setLines((prev) => [...prev, { type: "out", text: boot[i] }]);
      i++;
      if (i >= boot.length) clearInterval(t);
    }, 380);
    return () => clearInterval(t);
  }, [poweredOn]);

  // Autoscroll
  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.scrollTop = screenRef.current.scrollHeight;
    }
  }, [lines]);

  // ESC ile kapat (varsa)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && poweredOn) {
        if (onTogglePower) onTogglePower(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [poweredOn, onTogglePower]);

  // Açıkken input’a odaklan
  useEffect(() => {
    if (poweredOn && inputRef.current) inputRef.current.focus();
  }, [poweredOn]);

  // Yardımcılar
  const print = (text) => setLines((prev) => [...prev, { type: "out", text }]);
  const printJSX = (jsx) => setLines((prev) => [...prev, { type: "jsx", jsx }]);
  const echo = (text) => setLines((prev) => [...prev, { type: "cmd", text: `> ${text}` }]);

  const navTo = (id) => {
    const el = document.getElementById(id);
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      print(`Navigating to #${id} ...`);
    } else {
      print(`Section #${id} not found.`);
    }
  };

  const setTheme = (next) => {
    const t = next === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("theme", t); } catch {}
    print(`Theme set to ${t}.`);
  };

  const runCommand = (raw) => {
    const cmd = raw.trim().toLowerCase();

    if (!cmd) return;

    echo(raw);

    // CLEAR
    if (cmd === "clear") {
      setLines([]);
      return;
    }

    // HELP
    if (cmd === "help") {
      helpText.forEach(print);
      return;
    }

    // EASTER EGG
   if (cmd === "contributors") {
      print("Contributors:");
      printJSX(
        <span>
          <FaUserAstronaut style={{ marginRight: "8px" }} />
          <strong>wiirus</strong> — helped with button interactions. Thank you wiirus!
          <FaHeart style={{ color: "#ff003c", marginLeft: "8px" }} />
        </span>
      );
      return;
    }


    // ABOUT
    if (cmd === "about") {
      print("Emre Bilici — Graphics Programmer / Shader Wizard.");
      print("Focus: Vulkan, GLSL, real-time rendering, GPU compute, engine design.");
      return;
    }

    // NAVIGATION
    if (cmd === "projects") return navTo("projects");
    if (cmd === "experience") return navTo("experience");
    if (cmd === "education") return navTo("education");
    if (cmd === "skills") return navTo("skills");
    if (cmd === "contact") return navTo("contact");

    // EXTERNAL
    if (cmd === "github") {
      print("Opening GitHub: github.com/emrebilici");
      window.open("https://github.com/emrebilici", "_blank", "noopener,noreferrer");
      return;
    }
    if (cmd === "linkedin") {
      print("Opening LinkedIn: linkedin.com/in/emrebilici");
      window.open("https://linkedin.com/in/emrebilici", "_blank", "noopener,noreferrer");
      return;
    }
    if (cmd === "email") {
      print("Email: emrebilici@example.com");
      return;
    }
    if (cmd === "site") {
      print("Opening website: emrebilici.dev");
      window.open("https://emrebilici.dev", "_blank", "noopener,noreferrer");
      return;
    }

    // THEME
    if (cmd.startsWith("theme")) {
      const arg = cmd.split(/\s+/)[1];
      if (arg === "dark" || arg === "light") setTheme(arg);
      else print("Usage: theme dark | theme light");
      return;
    }

    // POWER OFF
    if (cmd === "power off") {
      print("Powering down...");
      if (onTogglePower) onTogglePower(false);
      return;
    }

    // Unknown
    print(`Unknown command: "${raw}". Type "help" for list.`);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const val = input.trim();
    if (!val) return;
    setHistory((h) => [val, ...h]);
    setHistIndex(-1);
    setInput("");
    runCommand(val);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistIndex((i) => {
        const next = Math.min(i + 1, history.length - 1);
        const val = history[next] ?? "";
        setInput(val);
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistIndex((i) => {
        const next = Math.max(i - 1, -1);
        const val = next === -1 ? "" : history[next];
        setInput(val);
        return next;
      });
    }
  };

  if (!poweredOn) return null;

  return (
    <div className="monitor-overlay" role="dialog" aria-modal="true" aria-label="Retro Monitor">
      <div className="monitor-popup">
        <header className="monitor-header">
          <span className="power-led on" aria-hidden="true" />
          <div className="monitor-brand">YALAZ / CRT</div>
          <div className="monitor-actions">
            <button
              className="power-toggle-btn"
              onClick={() => onTogglePower && onTogglePower(false)}
              aria-label="Power OFF"
              title="Power OFF"
            >
              OFF
            </button>
          </div>
        </header>

        <div className="monitor-screen" ref={screenRef}>
  <div className="scanline" aria-hidden="true" />
  <div className="screen-text">
    {lines.map((line, idx) => {
      if (line.type === "jsx") {
        return (
          <div key={idx} className="terminal-line out jsx">
            {line.jsx}
          </div>
        );
      }

      return (
        <div
          key={idx}
          className={`terminal-line ${line.type === "cmd" ? "cmd" : "out"}`}
        >
          {line.text}
        </div>
      );
    })}
  </div>
</div>


        <form className="monitor-inputbar" onSubmit={onSubmit}>
          <span className="prompt">&gt;</span>
          <input
            ref={inputRef}
            className="monitor-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder='type "help"'
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Command input"
          />
        </form>

        <footer className="monitor-footer">
          <span className="hint">Enter: run • Esc: close • ↑↓: history</span>
        </footer>
      </div>
    </div>
  );
}

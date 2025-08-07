import React from "react";
import "./Contact.css";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

/**
 * İstersen props ile override edebilirsin:
 * <Contact email="me@domain.com" github="https://github.com/me" linkedin="https://linkedin.com/in/me" />
 */
export default function Contact({
  email = "emreeblici@gmail.com",
  github = "https://github.com/Yalazz",
  linkedin = "https://linkedin.com/in/emre0",
}) {
  return (
    <div className="contact-container" role="region" aria-label="Contact">
      <ul className="contact-links">
        <li className="contact-item">
          <a
            className="contact-link"
            href={`mailto:${email}`}
            aria-label="Send email"
          >
            <FaEnvelope className="contact-icon" aria-hidden="true" />
            <span className="contact-text">{email}</span>
          </a>
        </li>

        <li className="contact-item">
          <a
            className="contact-link"
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open GitHub profile"
          >
            <FaGithub className="contact-icon" aria-hidden="true" />
            <span className="contact-text">
              {github.replace(/^https?:\/\//, "")}
            </span>
          </a>
        </li>

        <li className="contact-item">
          <a
            className="contact-link"
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open LinkedIn profile"
          >
            <FaLinkedin className="contact-icon" aria-hidden="true" />
            <span className="contact-text">
              {linkedin.replace(/^https?:\/\//, "")}
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
}

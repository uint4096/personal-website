import { Header } from "../utilities/link";
import "./intro.css";
import React from "react";

export const Intro = () => {
  return (
    <div className="intro-container">
      <span className="name">Abhishek Kumar</span>
      <span className="designation">Backend Engineer at Vita Mojo</span>
      <div className="about">
        <p>
          {" "}
          I am a full stack developer with slightly more preference towards
          backend technologies. In other words, I am passionate about building
          web applications that scale!
        </p>
        <p>
          {" "}
          In over 5 years as a developer, I have worked with a number of
          languages and frameworks. These days I focus primarily on{" "}
          <span className="highlighted-text">TypeScript</span> and{" "}
          <span className="highlighted-text">node.js</span>, although I've also
          started to dabble in <span className="highlighted-text">Rust</span>.
        </p>
        <p>
          {" "}
          Nowadays I am helping Vita Mojo build scalable solutions for our
          clients in the hospitality industry.
        </p>
      </div>
      <div className="resume-link">
        <a
          href={import.meta.env.VITE_RESUME_LINK}
          download="resume.pdf"
          target="_blank"
        >
          <Header text={"View Résumé"} variant="content"/>
        </a>
      </div>
    </div>
  );
};

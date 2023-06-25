import React from "react";
import "./projects.css";
import { Card } from "../utilities/card";

export const Projects = () => {
  const exp = [
    {
      title: "SynkRemote",
      description: "A command line tool to transfer and sync local files and directories with remote servers. It has options to include/exclude files and directories based on glob patterns.",
      tags: [
        "node.js",
        "TypeScript"
      ],
    },
    {
      title: "StringDiffer",
      description: "A library that uses Levenshtein's algorithm to compare and transform one string into another. It contains functions to both generate steps for string conversion, and apply those steps to a string.",
      tags: [
        "node.js",
        "TypeScript",
      ],
    },
    {
      title: "SubscribeHN",
      description: "A Telegram bot that sends you Hacker News posts based on the topics you subscribe to. It accepts commands to subscribe, unsubscribe, and list topics.",
      tags: [
        "Rust",
        "Telegram"
      ],
    },
    {
      title: "Ark",
      description: "A MongoDB desktop workspace. It contains features such as inline document editing and an embedded mongosh with intellisense.",
      tags: [
        "TypeScript",
        "Electron",
        "MongoDB",
        "React"
      ],
    },
  ];

  return (
    <div className="projects-container">
        <div className="projects-header">Projects</div>
        <div className="projects">
            {exp.map((e) => (
              <Card
                description={e.description}
                title={e.title}
                tags={e.tags}
              />
            ))}
        </div>
    </div>
  );
};

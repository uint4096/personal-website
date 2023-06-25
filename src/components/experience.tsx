import React from "react";
import "./experience.css";
import { Card } from "../utilities/card";

export const WorkExp = () => {
  const exp = [
    {
      title: "Vita Mojo",
      subtitle: "Backend Engineer",
      dateRange: "October 2022 - Present",
      description: "Vita Mojo's tech centers around solving problems for the hospitality industry. I am responsible for maintaining our core microservices based architecture, and building integrations with various delivery and payment providers.",
      tags: [
        "node.js",
        "TypeScript",
        "NestJS",
        "MySQL",
        "AWS Lambda",
        "DynamoDB",
      ],
    },
    {
      title: "Klenty",
      subtitle: "Full-Stack Developer",
      dateRange: "May 2020 - October 2022",
      description: "Klenty is a sales engagement platform that provides a variety of solutions for communicating with and managing prospects. I contributed to a number of core features including an app-wide search, multiple app rewrites, and various large scale migrations.",
      tags: [
        "node.js",
        "TypeScript",
        "Express",
        "MongoDB",
        "RabbitMQ",
        "AWS Lambda",
        "Redis",
        "ElasticSearch",
        "CircleCI"
      ],
    },
    {
      title: "Infosys",
      subtitle: "System Engineer",
      dateRange: "July 2018 - April 2020",
      description: "Infosys provides a range of software solutions for a vast number of clients across the globe. I built features for a number of desktop and web applications, both for our clients, and internal. I also automated several tasks for our clients using PL/SQL.",
      tags: [
        "C#",
        ".NET",
        ".NET Core",
        "PL/SQL"
      ],
    },
  ];

  return (
    <div className="exp-container">
      <div className="exp-header">Work Experience</div>
      <div className="exp-list">
        {exp.map((e) => (
          <Card
            description={e.description}
            title={e.title}
            tags={e.tags}
            dateRange={e.dateRange}
            subtitle={e.subtitle}
          />
        ))} 
      </div>
    </div>
  );
};

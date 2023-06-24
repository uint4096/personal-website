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
  ];

  return (
    <div className="exp-container">
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
  );
};

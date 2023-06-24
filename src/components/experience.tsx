import React from "react";
import './experience.css';
import { Card } from "../utilities/card";

export const WorkExp = () => {
  const vitaMojoDescription =
    "Vita Mojo's tech centers around solving problems for the hospitality industry. I am responsible for maintaining our core microservices based architecture, and building integrations with various delivery and payment providers.";
  
  const exp = [
    {
      title: "Vita Mojo",
      subtitle: "Backend Engineer",
      dateRange: "October 2022 - Present",
      description: vitaMojoDescription,
      tags: ['node.js', 'TypeScript', 'NestJS', 'MySQL', 'AWS Lambda', 'DynamoDB']
    },
  ];

  return (
    <div className="exp-container">
      {exp.map(e => (
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

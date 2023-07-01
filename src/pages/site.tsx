import "./site.css";
import React from "react";
import { Intro } from "../components/Intro";
import { ContactList } from "../components/ContactList/contactList";
import { Work } from "../components/work";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown, faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import { useObserver } from "../Hooks/useObserver";

export const Site = () => {
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
      link: 'https://vitamojo.com/'
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
      link: 'https://www.klenty.com/'
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
      link: 'https://www.infosys.com/'
    },
  ];

  const projects = [
    {
      title: "SynkRemote",
      description: "A command line tool to transfer and sync local files and directories with remote servers. It has options to include/exclude files and directories based on glob patterns.",
      tags: [
        "node.js",
        "TypeScript"
      ],
      link: 'https://www.npmjs.com/package/synkremote'
    },
    {
      title: "StringDiffer",
      description: "A library that uses Levenshtein's algorithm to compare and transform one string into another. It contains functions to both generate steps for string conversion, and apply those steps to a string.",
      tags: [
        "node.js",
        "TypeScript",
      ],
      link: 'https://www.npmjs.com/package/string-differ'
    },
    {
      title: "SubscribeHN",
      description: "A Telegram bot that sends you Hacker News posts based on the topics you subscribe to. It accepts commands to subscribe, unsubscribe, and list topics.",
      tags: [
        "Rust",
        "Telegram"
      ],
      link: 'https://github.com/uint4096/subscribe-hn'
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
      link: 'https://www.arkclient.com/'
    },
  ];

  const element = useObserver();

  return (
    <div className="container">
      <a href={`#${element}`}>
        <div className='scroll-arrow'>
          <FontAwesomeIcon icon={faArrowAltCircleDown} size='4x'/>
        </div>
      </a>
      <div className="about-container">
        <Intro />
        <ContactList />
      </div>
      <div className="exp">
        <Work work={exp} header="Work Experience" id="work"/>
        <Work work={projects} header="Projects" id="projects"/>
      </div>
    </div>
  );
};

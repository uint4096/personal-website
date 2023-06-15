import { faGithub, faNpm } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { CardProps } from './utilities/card';

export const PRE_NAME: Array<JSX.Element> = [
    <span>Hi.</span>,
    <span>My name is <span className='name'>Abhishek Kumar</span>.</span>
];
    
export const POST_NAME: Array<JSX.Element> = [
    <span>I am a full stack developer with slightly more preference towards backend technologies.</span>,
    <span>In other words, I am passionate about building web applications that scale!</span>,
    <span>
        I primarily work with
        <span className={'language'}> Node.js</span> and
        <span className={'language'}> TypeScript</span>.
        Here are a few technologies that I specialize in:
    </span>,
    <div className={'languages-container'}>
        <div>
            <ul>
                <li> NestJS </li>
                <li> MySQL </li>
                <li> React </li>
            </ul>
        </div>
        <div>
            <ul>
                <li> Express </li>
                <li> MongoDB </li>
                <li> Rust </li>
            </ul>
        </div>
    </div>
];

export const PROJECTS: Array<Omit<CardProps, 'size'>> = [
    {
        header: "SynkRemote",
        links: [
            {
                link: "https://github.com/uint4096/synkremote",
                icon: faGithub,
                size: 'very-small' 
            },
            {
                link: "https://www.npmjs.com/package/synkremote",
                icon: faNpm,
                size: "small"
            }
        ],
        content: ["A command line tool to transfer and sync local files and directories with remote servers."],
        tags: ["TypeScript", "Node.js"]
    },
    {
        header: "String-Differ",
        links: [
            {
                link: "https://github.com/uint4096/string-differ",
                icon: faGithub 
            },
            {
                link: "https://www.npmjs.com/package/string-differ",
                icon: faNpm
            }
        ],
        content: ["A library that uses Levenshtein's algorithm to compare and transform one string into another."],
        tags: ["TypeScript", "Node.js"]
    },
    {
        header: "Abbot",
        links: [
            {
                link: "https://github.com/collabhere/abbot",
                icon: faGithub
            },
            {
                link: "https://www.npmjs.com/package/@wheredevsdev/abbot",
                icon: faNpm
            }
        ],
        content: ["A library to analyse existing MongoDB indexes and suggest new ones."],
        tags: ["TypeScript", "Node.js", "MongoDB"]
    },
    {
        header: "Ark",
        links: [
            {
                link: "https://github.com/makeark/ark",
                icon: faGithub
            },
            {
                link: "https://www.arkclient.com",
                icon: faLink
            }
        ],
        content: ["A MongoDB desktop workspace with embedded mongosh."],
        tags: ["TypeScript", "Electron", "MongoDB", "React"]
    }
];

export const workExp = [
    {
        company: 'Vita Mojo',
        link: 'https://www.vitamojo.com/',
        role: 'Backend Engineer',
        dateRange: 'Oct 2022 - Present',
        highlights: [
            'Vita Mojo’s tech centers around solving problems for the hospitality industry, \
                especially restaurants and pubs.',
            'I am responsible for writing and maintaining integrations with various delivery \
                and payment providers in a microservices based architecture.',
            'I work with several languages, frameworks and services such as Node.js, TypeScript, \
                NestJS, MySQL, and AWS Lambda.'  
        ]
    },
    {
        company: 'Klenty',
        link: 'https://www.klenty.com/',
        role: 'Full-Stack Developer',
        dateRange: 'May 2020 - Oct 2022',
        highlights: [
            'Klenty is a sales engagement platform that provides a variety of solutions for\
                communicating with and managing prospects.',
            'I contributed to a number of core features using a diverse \
                set of languages and frameworks such as JavaScript, \
                TypeScript, NodeJS, React, Angular, and Express.',
            'I also worked with and managed database technologies such as MongoDB, Redis and ElasticSearch, \
                and cloud technologies such as AWS Lambda, EC2, and S3.'
        ]
    },
    {
        company: 'Infosys',
        link: 'https://www.infosys.com/',
        role: 'System Engineer',
        dateRange: 'July 2018 - April 2020',
        highlights: [
            'Infosys provides a range of software solutions for a vast number of clients across \
                the globe.',
            'I worked on a number of desktop and web applications using languages and frameworks \
            such as C#, .NET, and .NET Core',
            'I also built core features and automated several tasks for our clients using Oracle PL/SQL.',
        ]
    }
];
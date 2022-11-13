import { faGithub, faNpm } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { CardProps } from './molecules/card';

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
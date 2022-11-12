import React, { useEffect, useState } from 'react';
import { ContactList } from '../organisms/ContactList/contactList';
import Intro from '../organisms/Intro/intro';
import { Navbar } from '../organisms/Navbar/navbar';
import { animated } from 'react-spring';
import './portfolio.css';
import { useFadeIn } from '../Hooks/useAnimation';
import { WorkExp } from '../organisms/Timeline/timeline';
import { Headers, HEADERS } from '../constants';

export default function Portfolio() {

    const [ topic, setTopic ] = useState<Headers>('About Me');

    const header = <animated.span style={useFadeIn({ delay: 0 })}>
        Hi.
    </animated.span>;

    const content = [
        <animated.span style={useFadeIn({ delay: 500 })}>
            I work at <span className={'company'}>
                <a className={'company-link'}href='https://www.klenty.com'>
                    Klenty
                </a>
            </span>.
        </animated.span>,
        <animated.span style={useFadeIn({ delay: 800 })}>
            I'm a full-stack developer with over 3 years of experience.
        </animated.span>,
        <animated.span style={useFadeIn({ delay: 1100 })}>
            I'm passionate about building web-apps that scale.
        </animated.span>,
        <animated.span style={useFadeIn({ delay: 1400 })}>
            I specialize in MERN stack.
        </animated.span>,
        <animated.span style={useFadeIn({ delay: 1700 })}>
            I'm also a DevOps enthusiast.
        </animated.span>,
    ];

    // const workExp = [
    //     {
    //         company: 'Klenty',
    //         role: 'Full-stack developer',
    //         dateRange: 'May 2020 - Present',
    //         highlights: [
    //             'Write modern and performant code using a diverse \
    //                 set of languages and frameworks such as JavaScript, \
    //                 TypeScript, NodeJS, React, Angular, and ExpressJS.',
    //             'Work with and manage database technologies such as MongoDB and Redis.',
    //             'Work with cloud technologies such as AWS Lambda and AWS EC2.',
    //             'Use tools such as Docker and CircleCI to ensure continuous \
    //                 integration and deployment.'
    //         ]
    //     },
    //     {
    //         company: 'Infosys',
    //         role: 'System Engineer',
    //         dateRange: 'July 2018 - April 2020',
    //         highlights: [
    //             'Worked on desktop and web applications using languages and frameworks \
    //             such as C#, .NET, and .NET Core',
    //             'Built core features for our clients using Oracle PL/SQL.',
    //             'Communicated and clarified requirements with clients regularly.'
    //         ]
    //     }
    // ];

    const headerGroup = HEADERS.map(header => ({
        text: header,
        onClick: () => setTopic(header),
        isActive: topic === header
    }));

    return (
        <div className={'container'}>
            <div className='content'>
                <div className='topic'>
                    <span>{topic}</span>
                    <div className='hr'></div>
                </div> 
                <div className='primary-container'>
                    <Intro header={header} content={content}></Intro>
                </div>    
            </div>
            <div className='navbar'>
               <Navbar headerDetails={headerGroup}/> 
            </div>
            <ContactList />
        </div>
    );
}
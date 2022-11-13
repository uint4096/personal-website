import React, { useEffect, useState } from 'react';
import { ContactList } from '../organisms/ContactList/contactList';
import Intro from '../organisms/Intro/intro';
import { Navbar } from '../organisms/Navbar/navbar';
import { animated } from 'react-spring';
import './portfolio.css';
import { useFadeIn } from '../Hooks/useAnimation';
import { WorkExp } from '../organisms/Timeline/timeline';
import { Card, CardProps } from '../molecules/card';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { POST_NAME, PRE_NAME, PROJECTS } from '../constants';
import { CardGroup } from '../organisms/CardGroup/cardGroup';

type Headers = 'About Me' | 'Experience' | 'Projects' | 'Resume';

export default function Portfolio() {
    const HEADERS: Array<Headers> = [
        'About Me',
        'Experience',
        'Projects',
        'Resume'
    ];    
    
    const [ topic, setTopic ] = useState<Headers>('About Me');

    const preNameSet = PRE_NAME.map(
        (elem, i) => (
            <animated.span style={useFadeIn({ delay: (i+1)*1000 })}>
                {elem}
            </animated.span>
        )
    );

    const postNameSet = POST_NAME.map(
        (elem, i) => (
            <animated.span style={useFadeIn({ delay: 2000 + ((i+1)*(500)) })}>
                {elem}
            </animated.span>
        )
    );

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

    const projects = PROJECTS.map(project => ({...project, size: 'small' as const}));

    return (
        <div className={'container'}>
            <div className='content'>
                <div className='topic'>
                    <span>{topic}</span>
                    <div className='hr'></div>
                </div> 
                {
                    topic === 'About Me' &&
                    <div className='primary-container'>
                        <Intro preName={preNameSet} postName={postNameSet}></Intro>
                    </div>
                }
                {
                    topic === 'Projects' &&
                    <div className='projects-container'>
                        <CardGroup cards={projects} />
                    </div>
                }
            </div>
            <div className='navbar'>
               <Navbar headerDetails={headerGroup}/> 
            </div>
            <ContactList />
        </div>
    );
}
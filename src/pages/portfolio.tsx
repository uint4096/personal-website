import React, { useEffect, useState } from 'react';
import { ContactList } from '../organisms/ContactList/contactList';
import Intro from '../organisms/Intro/intro';
import { Navbar } from '../organisms/Navbar/navbar';
import { animated } from 'react-spring';
import './portfolio.css';
import { useFadeIn } from '../Hooks/useAnimation';
import { WorkExp } from '../organisms/Timeline/timeline';

type Headers = 'About Me' | 'Experience' | 'Projects' | 'Resume';

export default function Portfolio() {
    const HEADERS: Array<Headers> = [
        'About Me',
        'Experience',
        'Projects',
        'Resume'
    ];

    const PRE_NAME: Array<JSX.Element> = [
        <span>Hi.</span>,
        <span>My name is <span className='name'>Abhishek Kumar</span>.</span>
    ];
    
    const POST_NAME: Array<JSX.Element> = [
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
            </div>
            <div className='navbar'>
               <Navbar headerDetails={headerGroup}/> 
            </div>
            <ContactList />
        </div>
    );
}
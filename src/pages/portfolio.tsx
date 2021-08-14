import React from 'react';
import { ContactList } from '../organisms/ContactList/contactList';
import Intro from '../organisms/Intro/intro';
import { Navbar } from '../organisms/Navbar/navbar';
import { animated } from 'react-spring';
import './portfolio.css';
import { useFadeIn } from '../Hooks/useAnimation';

export default function Portfolio() {
    const header = <animated.span style={useFadeIn({ delay: 0 })}>
        Hi, my name is <span className={'name'}>Abhishek Kumar.</span>
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

    const buttonGroup = [
        {
            text: 'Experience',
            onClick: () => {}
        },
        {
            text: 'Skills',
            onClick: () => {}
        },
        {
            text: 'Projects',
            onClick: () => {}
        },
    ]

    return (
        <div className={'container'}>
            <Navbar buttonData={buttonGroup}/>
            <ContactList />
            <div className={'primary-container'}>
                <div><Intro header={header} content={content}/></div>
            </div>
        </div>
    );
}
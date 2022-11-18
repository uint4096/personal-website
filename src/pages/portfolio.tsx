import React, { useState } from 'react';
import { ContactList } from '../organisms/ContactList/contactList';
import Intro from '../organisms/Intro/intro';
import { Navbar } from '../organisms/Navbar/navbar';
import { animated } from 'react-spring';
import './portfolio.css';
import { useFadeIn } from '../Hooks/useAnimation';
import { WorkExperience } from '../organisms/Exp/Exp';
import { POST_NAME, PRE_NAME, PROJECTS, workExp } from '../constants';
import { CardGroup } from '../organisms/CardGroup/cardGroup';

type Headers = 'About Me' | 'Experience' | 'Projects' | 'Resume';

export default function Portfolio() {
    const HEADERS: Array<Headers> = [
        'About Me',
        'Experience',
        'Projects',
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
                    topic === 'Experience' &&
                    <div className='experience-container'>
                        <WorkExperience experience={workExp}/>
                    </div>
                }
                {
                    topic === 'Projects' &&
                    <div className='projects-container'>
                        <CardGroup cards={projects} />
                    </div>
                }
            </div>
            
            <animated.div style={useFadeIn({ delay: 4000 })} className='navbar'>
               <Navbar headerDetails={headerGroup}/> 
            </animated.div>

            <animated.div style={useFadeIn({ delay: 4000 })}>
              <ContactList />
            </animated.div>
            
        </div>
    );
}
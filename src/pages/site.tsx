import './site.css';
import React from 'react';
import { Intro } from '../_components/Intro';
import { ContactList } from '../components/ContactList/contactList';

export const Site = () => {
    return (
        <div className='container'>
            <div className='about-container'>
                <Intro />
                <ContactList />
            </div>
            <div>
                <div style={{width: '42rem'}}></div>
                {/* <Intro /> */}
                {/* <WorkExp /> */}
                {/* <Projects /> */}
                {/* <Footer /> */}
            </div>
        </div>
    )
}
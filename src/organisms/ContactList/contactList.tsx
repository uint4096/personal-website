import React, { useState } from 'react';
import './contactList.css';
import { faGithub, faLinkedin, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

interface ContactProps {
    icon?: IconDefinition;
    link?: string;
};

function Contact({ icon, link }: ContactProps) {

    const [iconColor, setIconColor] = useState<string>('#b4b4b4');

    return (
        <div className={'contact'}>
            <div className={'line'}>
            </div>
            {icon && link &&
            <div
                className={'icon'}
                onMouseEnter={() => setIconColor('#64ffda')}
                onMouseLeave={() => setIconColor('#b4b4b4')}
            >
                <a href={link} target="_blank" rel="noreferrer">
                    <FontAwesomeIcon
                        icon={icon}
                        color={iconColor}
                    />
                </a>
            </div>}
        </div>
    )
}

export function ContactList() {
    return (
        <div className={'list'}>
            <Contact icon={faGithub} link={'https://github.com/uint4096'}/>
            <Contact icon={faLinkedin} link={'https://linkedin.com/in/abhishek-kr7'}/>
            <Contact icon={faEnvelope} link={'https://mail.google.com/mail/?view=cm&fs=1&to=abhishek.kumar251095@gmail.com'}/>
            <Contact />
        </div>
    )
}
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './icon.css';

export interface IconProps {
    icon: IconDefinition;
    link: string;
    size?: 'very-small' | 'small' | 'medium' | 'large';
};

export function Icon({ icon, link, size }: IconProps) {

    const [iconColor, setIconColor] = useState<string>('#b4b4b4');
    const className = !!size ? size : 'small';

    return (
        icon && link ?
        <div
            className={!!size ? 'icons' : 'p'}
            onMouseEnter={() => setIconColor('#EEBBC3')}
            onMouseLeave={() => setIconColor('#b4b4b4')}
        >
            <a href={link} target="_blank" rel="noreferrer">
                <FontAwesomeIcon
                    className={`icon ${className}-icon`}
                    icon={icon}
                    color={iconColor}
                />
            </a>
        </div>
        :<></>
    );
}
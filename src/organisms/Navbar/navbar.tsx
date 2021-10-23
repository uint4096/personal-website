import React from 'react';
import { animated } from 'react-spring';
import { Button, ButtonProps } from '../../atoms/button';
import { useFadeIn } from '../../Hooks/useAnimation';
import './navbar.css';

export type Topics = 'About Me' | 'Work Experience' | 'Skills' | 'Projects'
interface NavbarProps {
    buttonData: Array<ButtonProps>;
}

export function Navbar({ buttonData }: NavbarProps) {
    return (
        <animated.div style={useFadeIn({ delay: 2000 })} className={'navbar'}>
            {buttonData.map(b => (
                <div className={'nav-button'}>
                    <Button text={b.text} onClick={b.onClick}/>
                </div>
            ))}
        </animated.div>
    )
}
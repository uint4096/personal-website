import React from 'react';
import { Button, ButtonProps } from '../../atoms/button';
import './navbar.css';

interface NavbarProps {
    buttonData: Array<ButtonProps>
}

export function Navbar({ buttonData }: NavbarProps) {
    return (
        <div className={'navbar'}>
            {buttonData.map(b => (
                <div className={'nav-button'}>
                    <Button text={b.text} onClick={b.onClick}/>
                </div>
            ))}
        </div>
    )
}
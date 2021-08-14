import React from 'react';
import './button.css';

export interface ButtonProps {
    text: string;
    onClick: () => void;
}

export function Button({ text, onClick }: ButtonProps) {
    return (
        <button onClick={onClick} className={'button'}>{ text }</button>
    )
}
import React from 'react';
import './header.css';

export interface HeaderProps {
    text: string;
    serialNumber: string | number;
    isActive: boolean; 
    onClick: () => void;
}

export function Header({ text, serialNumber, onClick, isActive }: HeaderProps) {
    return (
        <span
            onClick={onClick}
            className={isActive ? 'active-header' : 'header'}
        >
            {serialNumber}. { text }
        </span>
    )
}
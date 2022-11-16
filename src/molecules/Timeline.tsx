import React from 'react';
import './timeline.css';

export interface TimelineProps {
    element: {
        company: string;
        dateRange: string;
        role: string;
    };
    isActive: boolean;
    onSelect: () => void;
}

export const Timeline = ({
    element,
    onSelect,
    isActive
}: TimelineProps) => {
    return (
        <div className='timeline-container'>
            <div className={'timeline-axis'}></div>
            <div className={'timeline-index'}>
                <div className={isActive ? 'active-marker active' : 'marker'}></div>
                <div className={'exp-overview'}>
                    <span className={isActive ? 'overview-company-active' : 'overview-company'} onClick={onSelect}>{element.company}</span>
                    <span className='overview-text'>{element.role}</span>
                    <span className='overview-text'>{element.dateRange}</span>
                </div>
            </div>
           
        </div>
    );
}
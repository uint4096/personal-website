import { animated } from '@react-spring/web';
import React, { useEffect, useState } from 'react';
import { useFadeIn } from '../../Hooks/useAnimation'
import './timeline.css';

interface ExpProps {
    company: string;
    role: string;
    dateRange: string;
    highlights: Array<string>;
}

interface TimelineProps {
    elements: Array<string>;
    selectedIndex: number;
    onSelect: React.Dispatch<React.SetStateAction<number>>;
}

function Headers({
    elements,
    onSelect,
    selectedIndex
}: TimelineProps) {

    return (<div className="headers-container">
        <div className="flexbox">
            {elements.map((header, i) => (
                <div
                    className={header === elements[selectedIndex]
                        ? 'selected'
                        : 'header'}
                    onClick={() => onSelect(i)}
                >
                    {header}
                </div>))}
        </div>
        <div><hr/></div>
    </div>);
}

function Description({ workDetails }: { workDetails: ExpProps }) {
    return (<>
        <animated.div style={useFadeIn({ delay: 0 })}>
            <div className='description-container'>
                <div className='subtext'>
                    <div>
                        <span className='role'>{workDetails.role}</span>
                        &nbsp;at&nbsp;
                        <span className='exp-company'>
                            {workDetails.company}
                        </span>
                    </div>
                    <div>{workDetails.dateRange}</div>
                </div>
                <div className='description'>
                    {workDetails.highlights.map(highlight =>
                        <div className="highlight">{highlight}</div>)}
                </div>
            </div>
        </animated.div>
    </>);
}

export function WorkExp({ experienceDetails }: { experienceDetails: Array<ExpProps> }) {

    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [show, toggleShow] = useState<boolean>(false);

    useEffect(() => {
        if (!show) {
            toggleShow(true);
        }
    }, [show]);

    return (<>
        <div className="workexp-container">
            <div>
                <Headers
                    elements={experienceDetails.map(p => p.company)}
                    selectedIndex={selectedIndex}
                    onSelect={(index) => {
                        toggleShow(false)
                        setSelectedIndex(index)
                    }}
                />
            </div>
            {show && <div><Description workDetails={experienceDetails[selectedIndex]} /></div>}
        </div>
    </>)
}
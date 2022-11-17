import { animated } from '@react-spring/web';
import React, { useMemo, useState } from 'react';
import { useFadeIn } from '../../Hooks/useAnimation'
import { Card } from '../../molecules/card';
import { Timeline } from '../../molecules/Timeline';
import './Exp.css';

export interface WorkExp {
    company: string;
    link: string;
    role: string;
    dateRange: string;
    highlights: Array<string>;
}

export function WorkExperience({ experience }: { experience: Array<WorkExp> }) {

    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const expStatements = useMemo(() => {
        return (
            <ul className='exp-list'>
                {
                    experience[selectedIndex].highlights.map(highlight => {
                        return <li className='exp-item'>{highlight}</li>
                    })
                }
            </ul>
        )
    }, [selectedIndex])

    return (<>
        <animated.div style={useFadeIn({ delay: 0 })} className="workexp-container">
            <div>
                {
                    experience.map((exp, index) => (
                        <Timeline
                            element={exp}
                            onSelect={() => setSelectedIndex(index)}
                            isActive={index === selectedIndex}
                            key={index}
                        />
                    ))
                }
            </div>
            <div className='exp-card'>
                <Card
                    size='large'
                    header={
                        <a href={experience[selectedIndex].link} target="_blank">
                            <span className='company'>{experience[selectedIndex].company}</span>
                        </a>
                    }
                    subheader={<span className='role'> - {experience[selectedIndex].role}</span>}
                    content={[expStatements]}
                />
            </div>
        </animated.div>
    </>)
}
import React from "react";
import { animated } from "react-spring";
import { useFadeIn } from "../../Hooks/useAnimation";
import './intro.css';

interface HomePageProps {
    header: string | JSX.Element;
    content: Array<string | JSX.Element>; 
}
export default function Intro({ header, content }: HomePageProps) {
    return (
        <animated.div style={useFadeIn({ delay: 0 })}className={'intro-container'}>
            <p className={'intro-header'}>{header}</p>
            <div>
                {content.map(c => <p className={'intro-content'}>{c}</p>)}
            </div>
        </animated.div>
    );
}
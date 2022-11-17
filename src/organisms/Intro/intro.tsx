import React from "react";
import { animated } from "react-spring";
import { useFadeIn } from "../../Hooks/useAnimation";
import './intro.css';

interface HomePageProps {
    preName: Array<string> | Array<JSX.Element>;
    postName: Array<string> | Array<JSX.Element>; 
}
export default function Intro({ preName, postName }: HomePageProps) {
    return (
        <animated.div style={useFadeIn({ delay: 0 })} className={'intro-container'}>
            <div>
                {preName.map(c => <><span className={'intro-pre-name'}>{c}</span><br/></>)}
            </div>
            <div>
                {postName.map(c => <><span className={'intro-post-name'}>{c}</span><br/></>)}
            </div>
        </animated.div>
    );
}
import React from "react";
import './intro.css';

interface HomePageProps {
    header: string | JSX.Element;
    content: Array<string | JSX.Element>; 
}
export default function Intro({ header, content }: HomePageProps) {
    return (
        <div className={'intro-container'}>
            <p className={'intro-header'}>{header}</p>
            <div>
                {content.map(c => <p className={'intro-content'}>{c}</p>)}
            </div>
        </div>
    );
}
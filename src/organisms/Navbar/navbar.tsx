import React from 'react';
import { animated } from 'react-spring';
import { Header, HeaderProps } from '../../atoms/header';
import { useFadeIn } from '../../Hooks/useAnimation';
import './navbar.css';

interface NavbarProps {
    headerDetails: Array<Omit<HeaderProps, 'serialNumber'>>;
}

export function Navbar({ headerDetails }: NavbarProps) {
    return (
        <animated.div style={useFadeIn({ delay: 2000 })} className={"nav"}>
                {headerDetails.map((b, i) => (
                    <div> 
                        <Header
                            text={b.text}
                            serialNumber={i+1}
                            onClick={b.onClick}
                            isActive={b.isActive}
                        />
                    </div>
                ))}
                <div>
                    <a
                        href={import.meta.env.VITE_RESUME_LINK}
                        download="resume.pdf"
                        target='_blank'
                    >
                        <Header
                            text={'Resume'}
                            serialNumber={headerDetails.length + 1}
                            onClick={() => {}}
                            isActive={false}
                        />
                    </a> 
                </div>
        </animated.div>
    )
}
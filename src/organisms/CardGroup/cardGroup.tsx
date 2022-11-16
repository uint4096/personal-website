import React from 'react';
import { animated } from 'react-spring';
import { Card, CardProps } from '../../molecules/card';
import { useFadeIn } from "../../Hooks/useAnimation";
import './cardGroup.css';

export const CardGroup = ({ cards }: { cards: Array<CardProps> }) => {
    return (

        <animated.div style={useFadeIn({ delay: 0 })} className={'card-group'}>
            {
                cards.map((card, i) => (
                    <Card
                        content={card.content}
                        header={card.header}
                        links={card.links}
                        size={card.size}
                        tags={card.tags}
                        key={i}
                        subheader={card.subheader}
                    />
                ))
            }
        </animated.div>
    );
}
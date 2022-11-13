import React from 'react';
import { Card, CardProps } from '../../molecules/card';
import './cardGroup.css';

export const CardGroup = ({ cards }: { cards: Array<CardProps> }) => {
    return (
        <div className={'card-group'}>
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
        </div>
    );
}
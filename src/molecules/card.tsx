import './card.css';
import React from 'react';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { Icon, IconProps as Link } from '../atoms/icon';

export interface CardProps {
    size: "small" | "medium" | "large";
    header: string | JSX.Element;
    subheader?: string;
    links: Array<Link>;
    content: Array<string> | Array<JSX.Element>;
    tags: Array<string>;
};

export const Card = (props: CardProps) => {
    const {
        content,
        header,
        links,
        size,
        tags,
        subheader
    } = props;

    console.log(content)

    return (
        <div className={`card-base ${size}`}>
            <div className={'card-head'}>
                {
                    typeof header === 'string'
                        ? <span className={'card-header'}>
                            {header}
                        </span>
                        : {header}
                }
                {
                    !!subheader && (
                        <>
                            <span className={'header-separator'}>-</span>
                            <span className={'card-subheader'}>{subheader}</span>
                        </>
                    ) 
                }
                <div className={'links-container'}>
                    {links.map((l, i) => <Icon key={i} icon={l.icon} link={l.link} size={l.size}></Icon>)}
                </div>
            </div>
            <div className={'card-body'}>
                {
                    content.map((c, i) => {
                        return typeof c === 'string'
                            ? <span key={i} className='card-content'>{c}</span>
                            : {c}
                    })
                }
            </div>
            <div className='card-tags'>
                {tags.map((tag, i) => <span key={i} className='tag'>{tag}</span>)}
            </div>
        </div>
    )
}
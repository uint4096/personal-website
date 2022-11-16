import './card.css';
import React from 'react';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { Icon, IconProps as Link } from '../atoms/icon';

export interface CardProps {
    size: "small" | "medium" | "large";
    header: string | JSX.Element;
    subheader?: string | JSX.Element;
    links?: Array<Link>;
    content: Array<string> | Array<JSX.Element>;
    tags?: Array<string>;
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

    return (
        <div className={`card-base ${size}`}>
            <div className={'card-head'}>
                <div className='header-container'>
                    {
                        typeof header === 'string'
                            ? <span className={'card-header'}>
                                {header}
                            </span>
                            : header
                    }
                    {
                        !!subheader && (
                            typeof header === 'string'
                                ? <span className={'card-header'}>
                                    {subheader}
                                </span>
                                : subheader
                        )
                    }
                </div>
                {
                    !!links && (
                        <div className={'links-container'}>
                            {links?.map((l, i) => <Icon key={i} icon={l.icon} link={l.link} size={l.size}></Icon>)}
                        </div>
                    )
                }
            </div>
            <div className={'card-body'}>
                {
                    content.map((c, i) => {
                        return typeof c === 'string'
                            ? <span key={i} className='card-content'>{c}</span>
                            : c
                    })
                }
            </div>
                {
                    !!tags && (
                        <div className='card-tags'>
                            {tags?.map((tag, i) => <span key={i} className='tag'>{tag}</span>)}
                        </div>
                    )
                }
        </div>
    )
}
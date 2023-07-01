import React from 'react';
import { Card } from '../utilities/card';
import './work.css';

interface Work {
  title: string;
  link: string;
  tags: Array<string>;
  description: string;
  dateRange?: string;
  subtitle?: string;
}

export const Work = ({ work, header, id }: { work: Array<Work>, header: string, id: string; }) => {
  return (
    <div id={id}>
      <div className="work-header">{header}</div>
      <div className="work-list">
        {work.map((w) => (
          <Card
            description={w.description}
            title={w.title}
            tags={w.tags}
            dateRange={w.dateRange}
            subtitle={w.subtitle}
            link={w.link}
          />
        ))} 
      </div>
    </div>
  );
}

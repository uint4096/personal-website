import React from 'react';
import { Card } from './card';
import styled from '@emotion/styled';

interface Work {
  title: string;
  link: string;
  tags: Array<string>;
  description: string;
  dateRange?: string;
  subtitle?: string;
}

export const Work = ({ work, header, id }: { work: Array<Work>, header: string, id: string; }) => {

  const Work = styled.div`
    padding-top: 4rem;
  `;

  const Header = styled.div`
    color: rgba(var(--color-tertiary));
    font-size: 2rem;
    width: 20rem;
    opacity: 0.8;
    border-bottom: 1px solid rgba(var(--color-background));
    font-weight: 1000;
  `;

  const List = styled.div`
    color: var(--color-primary);
    display: flex;
    margin-top: 4rem;
    flex-direction: column;
    min-width: 0;
    gap: 3rem;
    margin-bottom: 5rem;
  `;

  return (
      <div id={id}>
        <Work>
          <Header>{header}</Header>
          <List>
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
          </List>
        </Work>
      </div>
  );
}

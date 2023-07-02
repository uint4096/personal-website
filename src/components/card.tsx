/** @jsx jsx */

import { jsx } from '@emotion/react'
import { Header } from "./link";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface CardProps {
  title: string;
  subtitle?: string;
  dateRange?: string;
  description: string;
  tags: Array<string>;
  link: string;
}

export const Card = ({
  title,
  subtitle,
  dateRange,
  description,
  tags,
  link
}: CardProps) => {

  const Link = styled.a`
    text-decoration: none;
    color: unset;
  `;

  const cardHeader = css`
    white-space: nowrap;
    min-width: 12rem;
  `;

  const card = css`
    display: flex;
    padding: 1rem;
    border-radius: 0.5rem;
    @media (max-width: 1023px) {
      flex-direction: column;
      gap: 2rem;
    }
    &:hover {
      background-color: rgba(var(--color-background), 0.2);
      cursor: pointer
    }

    &:hover .card-header {
      color: rgb(var(--color-tertiary))
    }
  `;

  const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    margin-left: 3rem;
    min-width: 0;
    max-width: 35rem;
  `;

  const Subtext = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
    align-items: end;
  `;
   
  const Subtitle = styled.span`
    font-size: var(--font-size-medium);
    opacity: 0.9;
  `;

  const Date = styled.span`
    font-size: 1.3rem;
    opacity: 0.7;
  `;

  const Description = styled.div`
    font-size: 1.3rem;
    display: flex;
    opacity: 0.7;
    line-height: 1.8rem;
  `;
  
  const Tags = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  `;

  const Tag = styled.div`
    background-color: rgba(var(--color-tertiary), 0.2);
    display: flex;
    height: 1.5rem;
    align-items: end;
    opacity: 0.7;
    color: #ffffff;
    font-weight: 800;
    padding: 0.2rem 0.5rem;
    border-radius: 0.8rem;
    font-size: var(--font-size-small);
  `;
  
  return (
    <Link href={link} target="_blank">
      <div css={card}>
        <div css={cardHeader} className="card-header">
          <Header text={title} variant="title" />
        </div>
        <Content>
          {(subtitle || dateRange) && <Subtext>
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
            {dateRange && <Date>({dateRange})</Date>}
          </Subtext>}
          <Description>{description}</Description>
          <Tags>
            {tags.map((tag) => (
              <Tag>{tag}</Tag>
            ))}
          </Tags>
        </Content>
      </div>
    </Link>
  );
};

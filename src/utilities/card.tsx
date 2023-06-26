import React from "react";
import "./card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Header } from "./link";

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
  return (
    <a href={link} target="_blank" className="link">
      <div className="card">
        <div className="card-header">
          <Header text={title} variant="title" />
        </div>
        <div className="card-content">
          {(subtitle || dateRange) && <div className="card-subtext">
            {subtitle && <span className="card-subtitle">{subtitle}</span>}
            {dateRange && <span className="card-date">({dateRange})</span>}
          </div>}
          <span className="card-description">{description}</span>
          <span className="card-tags">
            {tags.map((tag) => (
              <div className="card-tag">{tag}</div>
            ))}
          </span>
        </div>
      </div>
    </a>
  );
};

/** @jsx jsx */

import {
  faArrowRight,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/react";

export interface HeaderProps {
  text: string;
  variant: "title" | "content";
  onClick?: () => void;
}

export function Header({ text, onClick, variant }: HeaderProps) {

  const TitleHeader = styled.span`
    font-size: var(--font-size-large);
    cursor: pointer;
    font-weight: 600;
  `;

  const ContentHeader = styled.span`
    color: var(--color-primary);
    cursor: pointer;
    font-size: var(--font-size-medium);
    &:hover {
      border-bottom: 1px solid;
      border-color: rgba(var(--color-tertiary), 1);
    };
    &:hover .link-arrow {
      margin-left: 0.4rem;
    }
  `;

  const linkArrow = css`
    margin-left: 0.1rem;
    vertical-align: middle !important;
    transition: margin-left 0.2s ease-in-out;
  `;
  
  const Header = variant === 'title' ? TitleHeader : ContentHeader;

  return (
    <Header
      onClick={onClick ?? (() => {})}
      className={variant === "title" ? "title-header" : "content-header"}
    >
      {variant === "content" && (
        <span>
          {text}{" "}
          <FontAwesomeIcon
            size="xs"
            css={linkArrow}
            icon={faArrowRight}
            className={'link-arrow'}
          />
        </span>
      )}
      {variant === "title" && (
        <span>
          <FontAwesomeIcon css={linkArrow} size="xs" className="link-arrow" icon={faLink} />{" "}
          {text}
        </span>
      )}
    </Header>
  );
}

import React from "react";
import "./link.css";
import { faArrowRight, faArrowUpRightDots, faArrowUpRightFromSquare, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface HeaderProps {
  text: string;
  variant: 'title' | 'content';
  onClick?: () => void;
}

export function Header({ text, onClick, variant }: HeaderProps) {
  return (
    <span onClick={onClick ?? (() => {})} className={variant === 'title' ? "title-header" : 'content-header'}>
      {
        variant === 'content' && <>
          {text}{" "}
        <FontAwesomeIcon size="xs" className="link-arrow" icon={faArrowRight} />
        </>
      }
      {
        variant === 'title' && <>
        <FontAwesomeIcon size="xs" className="link-arrow" icon={faLink} />
          {" "}
          {text}
        </>
      }
    </span>
  );
}

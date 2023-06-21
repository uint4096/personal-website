import React from "react";
import "./link.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface HeaderProps {
  text: string;
  onClick?: () => void;
}

export function Header({ text, onClick }: HeaderProps) {
  return (
    <span onClick={onClick ?? (() => {})} className={"header"}>
      {text}{" "}
      <FontAwesomeIcon size="xs" className="link-arrow" icon={faArrowRight} />
    </span>
  );
}

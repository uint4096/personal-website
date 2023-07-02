/**@jsx jsx */

import { css, jsx } from "@emotion/react";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export interface IconProps {
  icon: IconDefinition;
  link: string;
  size?: "very-small" | "small" | "medium" | "large";
}

export function Icon({ icon, link, size }: IconProps) {

  const iconStyle = css`
    font-size: 2rem;
    cursor: pointer;
  `; 

  const [iconColor, setIconColor] = useState<string>("#b4b4b4");

  return (
    <div
      onMouseEnter={() => setIconColor("rgba(var(--color-tertiary))")}
      onMouseLeave={() => setIconColor("#b4b4b4")}
    >
      <a href={link} target="_blank" rel="noreferrer">
        <FontAwesomeIcon
          css={iconStyle}
          icon={icon}
          color={iconColor}
        />
      </a>
    </div>
  );
}

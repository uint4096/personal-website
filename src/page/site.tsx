/** @jsx jsx */

import { Intro } from "../components/intro";
import { ContactList } from "../components/contact-list";
import { Work } from "../components/work";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown, faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { useObserver } from "../hooks/useObserver";
import { exp, projects } from "./content";
import { css, jsx, keyframes } from "@emotion/react";

type Elements = "work" | "projects";
type MobileElements = Elements | "header";
export const Site = () => {
  const container = css`
    display: flex;
    @media (max-width: 1023px) {
      flex-direction: column;
      padding: 2rem;
    }
    @media (min-width: 1024px) {
      margin: auto;
      height: 100vh;
      height: auto;
      justify-content: center;
      gap: 1rem;
      padding: 0 8rem;
    }
  `;

  const about = css`
    @media (max-width: 1023px) {
      position: inherit;
    }
    @media (min-width: 1024px) {
      position: sticky;
      max-width: 40%;
      padding: 8rem;
      display: flex;
      top: 0;
      height: 70vh;
      flex-direction: column;
      justify-content: space-between;
    }
  `;

  const experience = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 1023px) {
      padding-top: 8rem;
    }
    @media (min-width: 1024px) {
      padding-top: 4rem;
    }
  `;

  const scrollArrow = css`
    @media (max-width: 1023px) {
      display: none;
    }
    @media (min-width: 1024px) {
      position: fixed;
      bottom: 4rem;
      right: 4rem;
      color: rgba(var(--color-header), 0.5);
      z-index: 100;
      &:hover {
        color: rgba(var(--color-secondary), 0.7);
      }
    }
  `;

  const scrollArrowMobile = css`
    @media (max-width: 1023px) {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      color: rgba(var(--color-header), 0.5);
      z-index: 100;
      &:hover {
        color: rgba(var(--color-secondary), 0.7)
      }
    }
    @media (min-width: 1024px) {
      display: none;
    }
  `;

  const bounceTop = keyframes`
    0% {
        transform: translateY(-100%);
        color: rgba(var(--color-secondary), 0.7);
    }
    100% {
        transform: translateY(0);
    }
  `;

  const bounceBottom = keyframes`
    0% {
        transform: translateY(100%);
        color: rgba(var(--color-secondary), 0.7);
    }
    100% {
        transform: translateY(0);
    }
  `;

  const arrowTop = css`
    animation: 1s ease-in-out 0s 1 ${bounceBottom};
  `;

  const arrowBottom = css`
    animation: 1s ease-in-out 0s 1 ${bounceTop};
  `;

  const scrollMap = {
    work: "projects",
    projects: "work",
  } as const;

  const mobileScrollMap = {
    header: "work",
    work: "projects",
    projects: "header",
  } as const;

  const element = useObserver<Elements>("projects", scrollMap);
  const mobileElement = useObserver<MobileElements>(
    "work",
    mobileScrollMap,
    0.3
  );

  return (
    <div css={container}>
      <a href={`#${mobileElement}`}>
        {mobileElement === "header" && (
          <div css={[scrollArrowMobile, arrowTop]}>
            <FontAwesomeIcon icon={faAnglesUp} size="2x" />
          </div>
        )}
        {(mobileElement === "work" || mobileElement === "projects") && (
          <div css={[scrollArrowMobile, arrowBottom]}>
            <FontAwesomeIcon icon={faAnglesDown} size="2x" />
          </div>
        )}
      </a>
      <a href={`#${element}`}>
        {element != "projects" && (
          <div css={[scrollArrow, arrowTop]}>
            <FontAwesomeIcon icon={faAnglesUp} size="3x" />
          </div>
        )}
        {element === "projects" && (
          <div css={[scrollArrow, arrowBottom]}>
            <FontAwesomeIcon icon={faAnglesDown} size="3x" />
          </div>
        )}
      </a>
      <div css={about}>
        <Intro />
        <ContactList />
      </div>
      <div css={experience}>
        <Work work={exp} header="Work Experience" id="work" />
        <Work work={projects} header="Projects" id="projects" />
      </div>
    </div>
  );
};

import styled from "@emotion/styled";
import { Header } from "../utilities/link";
import React from "react";

export const Intro = () => {
  const Intro = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    color: var(--color-primary);
    @media(max-width: 1023px) {
      padding-top: 2rem;
    }
  `;

  const Name = styled.span`
    font-weight: 600;
    @media(max-width: 1023px) {
      font-size: 3.2rem;
      font-size-adjust: 0.6;
    }
    @media (min-width: 1024px) {
      font-size: var(--font-size-massive);
    }
  `;

  const Designation = styled.span`
    padding: 0 0.2rem;
    font-weight: 600;
    @media(max-width: 1023px) {
      font-size: 1.3rem;
    }
    @media (min-width: 1024px) {
      font-size: var(--font-size-large);
    }
  `;

  const About = styled.div`
    padding: 0.4rem 0;
    opacity: 0.7;
    @media(max-width: 1023px) {
      font-size: 1.2rem;
      line-height: 1.8rem;
    }
    @media (min-width: 1024px) {
      font-size: var(--font-size-medium);
      line-height: 2rem;
    }
  `;

  const HighlightedText = styled.span`
    color: var(--color-secondary);
  `;

  const ResumeLink = styled.div`
    padding: 3rem 0;
  `;

  const Link = styled.a`
    text-decoration: none;
  `;

  return (
    <div id={'header'}>
      <Intro>
        <Name>Abhishek Kumar</Name>
        <Designation>Backend Engineer at Vita Mojo</Designation>
        <About>
          <p>
            {" "}
            I am a full stack developer with slightly more preference towards
            backend technologies. In other words, I am passionate about building
            web applications that scale!
          </p>
          <p>
            {" "}
            In over 5 years as a developer, I have worked with a number of
            languages and frameworks. These days I focus primarily on{" "}
            <HighlightedText>TypeScript</HighlightedText> and{" "}
            <HighlightedText>node.js</HighlightedText>, although I've also
            started to dabble in <HighlightedText>Rust</HighlightedText>.
          </p>
          <p>
            {" "}
            For my day job, I help Vita Mojo build scalable solutions for our
            clients in the hospitality industry.
          </p>
        </About>
        <ResumeLink>
          <Link
            href={import.meta.env.VITE_RESUME_LINK}
            download="resume.pdf"
            target="_blank"
          >
            <Header text={"View Résumé"} variant="content" />
          </Link>
        </ResumeLink>
      </Intro>
    </div>
  );
};

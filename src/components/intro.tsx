import styled from "@emotion/styled";
import { Header } from "./link";
import React from "react";

export const Intro = () => {
  const Intro = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    color: var(--color-primary);
    @media (max-width: 1023px) {
      padding-top: 2rem;
    }
  `;

  const Name = styled.span`
    font-weight: 600;
    @media (max-width: 1023px) {
      font-size: 3.2rem;
      font-size-adjust: 0.6;
    }
    @media (min-width: 1024px) {
      font-size: var(--font-xl);
    }
  `;

  const Designation = styled.span`
    padding: 0 0.2rem;
    font-weight: 600;
    @media (max-width: 1023px) {
      font-size: var(--font-sm);
    }
    @media (min-width: 1024px) {
      font-size: var(--font-l);
    }
  `;

  const About = styled.div`
    padding: 0.4rem 0;
    opacity: 0.7;
    @media (max-width: 1023px) {
      font-size: 1.2rem;
      line-height: 1.8rem;
    }
    @media (min-width: 1024px) {
      font-size: var(--font-m);
      line-height: 2rem;
    }
  `;

  const HighlightedText = styled.span`
    color: rgba(var(--color-secondary), 1);
  `;

  const ResumeLink = styled.div`
    padding: 3rem 0;
  `;

  const Link = styled.a`
    text-decoration: none;
  `;

  return (
    <div id={"header"}>
      <Intro>
        <Name>Abhishek Kumar</Name>
        <Designation>Backend Engineer at Vita Mojo</Designation>
        <About>
          <p>
            {" "}
            I'm a <HighlightedText>full-stack developer</HighlightedText> with a passion for building web applications that scale!
          </p>
          <p>
            {" "}
            Over the past 7+ years, I've had the chance to work with a variety of languages and frameworks.
            These days, you'll find me knee-deep in <HighlightedText>TypeScript</HighlightedText> and <HighlightedText>Node.js</HighlightedText>,
            with a side of <HighlightedText>Rust</HighlightedText> for good measure.
          </p>
          <p>
            {" "}
            When I'm not tinkering with personal projects, I'm helping Vita Mojo craft robust
            and efficient solutions for our clients in the hospitality industry.
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

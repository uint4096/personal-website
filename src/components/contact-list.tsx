import React from "react";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Icon as Contact } from "./icon";
import styled from "@emotion/styled";

export function ContactList() {
  const ContactList = styled.div`
    width: 65%;
    display: flex;
    gap: 3rem;
    opacity: 0.7;
    padding: 0 0rem;
  `;

  return (
    <ContactList>
      <Contact icon={faGithub} link={"https://github.com/uint4096"} />
      <Contact
        icon={faLinkedin}
        link={"https://linkedin.com/in/abhishek-kr7"}
      />
      <Contact
        icon={faEnvelope}
        link={
          "https://mail.google.com/mail/?view=cm&fs=1&to=abhishek.kumar251095@gmail.com"
        }
      />
    </ContactList>
  );
}

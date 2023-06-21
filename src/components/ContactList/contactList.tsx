import React from "react";
import "./contactList.css";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Icon as Contact } from "../../utilities/icon";

export function ContactList() {
  return (
    <div className={"list"}>
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
    </div>
  );
}

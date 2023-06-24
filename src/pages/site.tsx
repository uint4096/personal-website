import "./site.css";
import React from "react";
import { Intro } from "../components/Intro";
import { ContactList } from "../components/ContactList/contactList";
import { WorkExp } from "../components/experience";

export const Site = () => {
  return (
    <div className="container">
      <div className="about-container">
        <Intro />
        <ContactList />
      </div>
      <div className="exp">
        {/* <Intro /> */}
        <WorkExp />
        {/* <Projects /> */}
        {/* <Footer /> */}
      </div>
    </div>
  );
};

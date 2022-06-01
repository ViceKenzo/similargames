import React, { useEffect } from "react";
import AboutPanel from "../components/AboutPanel.js";
import "../styles/AboutPage.css";
import { GAFirePageView } from "../tracking/GA_Events_Tracker";

function AboutPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);

    GAFirePageView(window.location.pathname + window.location.search);
  }, []);

  return (
    <div className="about-wrapper">
      <AboutPanel />
    </div>
  );
}

export default AboutPage;

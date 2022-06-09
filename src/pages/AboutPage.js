import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Config from "../config/config";
import "../styles/AboutPage.css";

import AboutPanel from "../components/AboutPanel.js";

function AboutPage() {
  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Functions
  return (
    <HelmetProvider>
      <Helmet>
        <meta
          name="description"
          content="You want to find a game that plays, looks and feels like a game you’ve loved, such that you can fall in love again? What a coincidence! This website was created exactly for that!"
        />
        <meta name="keywords" content={Config.metaTags} />
        <title>Similar Games - About</title>
      </Helmet>
      <div className="about-wrapper">
        <AboutPanel />
      </div>
    </HelmetProvider>
  );
}

export default AboutPage;

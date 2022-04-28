import React, { Component } from "react";
import AboutPanel from "../components/AboutPanel.jsx";
import "./AboutPage.css";
import { GAFirePageView } from "../tracking/GA_Events_Tracker";

class AboutPage extends Component {
  state = {};
  render() {
    return (
      <div className="about-wrapper">
        <AboutPanel />
      </div>
    );
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    GAFirePageView(window.location.pathname + window.location.search);
  }
}

export default AboutPage;

import React, { Component } from "react";
import AboutPanel from "../components/AboutPanel.jsx";
import "./AboutPage.css";

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
  }
}

export default AboutPage;

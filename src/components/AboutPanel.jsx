import React, { Component } from "react";
import LogoEpicGamesStore from "../images/logo_epicgamesstore.png";
import LogoGog from "../images/logo_gog.png";
import LogoSteamStore from "../images/logo_steam.png";
import "./AboutPanel.css";

class AboutPanel extends Component {
  state = {};
  render() {
    return (
      <div className="about-panel-wrapper">
        <div className="about-title">Find the games you’ll love</div>
        <div className="about-description-wrapper">
          <div className="about-description-panel">
            <p>
              You want to find a game that plays, looks and feels like a game
              you’ve loved, such that you can fall in love again?
            </p>
            <p>What a coincidence!</p>
          </div>
          <div className="about-description-panel">
            This website was created for just that. To have a place where people
            can come to, simply to find out about and explore new games they’ve
            never heard about. Or games they didn’t know were similar to the
            ones they already liked and played.
          </div>
        </div>
        <div className="about-games-source-info-wrapper">
          <div className="about-games-source-description">
            The 21.744 games from our database were found on the following
            sources:
          </div>
          <div className="about-games-source-links-wrapper">
            <a href="https://www.epicgames.com/store" target="_blank">
              <img
                className="about-games-source-image"
                id="about-epic-image"
                src={LogoEpicGamesStore}
              />
            </a>
            <a href="https://www.gog.com/" target="_blank">
              <img
                className="about-games-source-image"
                id="about-gog-image"
                src={LogoGog}
              />
            </a>

            <a href="https://store.steampowered.com/" target="_blank">
              <img
                className="about-games-source-image"
                id="about-steam-image"
                src={LogoSteamStore}
              />
            </a>
          </div>
        </div>
        <div className="about-contact-request-text">
          If you would like to ask us a question, report a bug, or submit
          feedback then feel free to send us an email!
        </div>
        <div className="about-contact-info-wrapper">
          <div className="about-contact-info-announcer">Contact Info</div>
          <div className="about-contact-info">someone@email.com</div>
        </div>
      </div>
    );
  }
}

export default AboutPanel;
import React, { Component } from "react";
import "./GameDetailCard.css";
import LogoEpicGamesStore from "../images/logo_epicgames.png";
import LogoGog from "../images/logo_gog.png";
import LogoSteamStore from "../images/logo_steam.png";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class GameDetailCard extends Component {
  state = {};

  GetReleaseDateElements = (release_date) => {
    if (release_date) {
      return (
        <div className="game-detail-additional-wrapper">
          <div className="game-detail-additional-announcer">Release Date</div>
          <div className="game-detail-additional-info">{release_date}</div>
        </div>
      );
    }
  };

  GetDeveloperElements = (developer) => {
    if (developer) {
      return (
        <div className="game-detail-additional-wrapper">
          <div className="game-detail-additional-announcer">Developer</div>
          <div className="game-detail-additional-info">{developer}</div>
        </div>
      );
    }
  };

  GetPublisherElements = (publisher) => {
    if (publisher) {
      return (
        <div className="game-detail-additional-wrapper">
          <div className="game-detail-additional-announcer">Publisher</div>
          <div className="game-detail-additional-info">{publisher}</div>
        </div>
      );
    }
  };

  GetDescriptionElements = (description) => {
    if (description) {
      return (
        <div className="detail-card-description-wrapper">
          <div className="detail-card-description-announcer">Description</div>
          <div className="detail-card-description">{description}</div>
        </div>
      );
    }
  };

  GetSteamButton = () => {
    if (!this.state.game.sources || this.state.game.sources.length <= 0) return;

    for (let i = 0; i < this.state.game.sources.length; ++i) {
      if (
        !this.state.game.sources[i].name ||
        this.state.game.sources[i].name == ""
      )
        continue;
      if (this.state.game.sources[i].name.toLowerCase().Contains("steam")) {
        return (
          <a className="game-detail-source-button">
            <div className="game-detail-source-image-wrapper">
              <img className="game-detail-source-image" src={LogoSteamStore} />
            </div>
            <div className="game-detail-source-name">View on Steam</div>
            <div className="game-detail-source-exit-icon-wrapper">
              <FontAwesomeIcon
                className="game-detail-source-exit-icon"
                icon={faArrowUpRightFromSquare}
              />
            </div>
          </a>
        );
      }
    }
  };

  GetGogButton = () => {};

  GetEpicGamesButton = () => {};

  render() {
    return (
      <div className="game-detail-card">
        <div className="game-detail-left-hand-wrapper">
          <div className="detail-card-image-title-wrapper">
            <div className="detail-card-title" id="game-detail-mobile-title">
              {this.props.game.title}
            </div>
            <div className="detail-card-image-wrapper">
              <img
                className="detail-card-image"
                src={
                  "http://localhost:1234/header_images/" +
                  this.props.game.image_id +
                  ".jpg"
                }
              />
            </div>
            <div className="detail-card-title" id="game-detail-desktop-title">
              {this.props.game.title}
            </div>
          </div>
          <div className="detail-card-tags-wrapper">
            {this.props.game.tags.map((tag, index) => {
              return (
                <div className="detail-card-tag" key={index + tag}>
                  {tag}
                </div>
              );
            })}
          </div>
          {this.GetDescriptionElements(this.props.game.description)}
        </div>
        <div className="game-detail-right-hand-wrapper">
          <div className="game-detail-additionals">
            {this.GetReleaseDateElements(this.props.game.release_date)}
            {this.GetDeveloperElements(this.props.game.developer)}
            {this.GetPublisherElements(this.props.game.publisher)}
          </div>

          <div className="game-detail-source-link-wrapper">
            <a className="game-detail-source-button">
              <div className="game-detail-source-image-wrapper">
                <img className="game-detail-source-image" src={LogoGog} />
              </div>
              <div className="game-detail-source-name"> View on Gog</div>
              <div className="game-detail-source-exit-icon-wrapper">
                <FontAwesomeIcon
                  className="game-detail-source-exit-icon"
                  icon={faArrowUpRightFromSquare}
                />
              </div>
            </a>

            <a className="game-detail-source-button">
              <div className="game-detail-source-image-wrapper">
                <img
                  className="game-detail-source-image"
                  src={LogoEpicGamesStore}
                />
              </div>
              <div className="game-detail-source-name">View on Epic Games</div>
              <div className="game-detail-source-exit-icon-wrapper">
                <FontAwesomeIcon
                  className="game-detail-source-exit-icon"
                  icon={faArrowUpRightFromSquare}
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default GameDetailCard;

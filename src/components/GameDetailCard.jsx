import React, { Component } from "react";
import "./GameDetailCard.css";
import PlaceholderImage from "../placeholders/thumbnail.jpg";
import LogoEpicGamesStore from "../images/logo_epicgames.png";
import LogoGog from "../images/logo_gog.png";
import LogoSteamStore from "../images/logo_steam.png";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class GameDetailCard extends Component {
  state = {};
  render() {
    return (
      <div className="game-detail-card">
        <div className="game-detail-left-hand-wrapper">
          <div className="detail-card-image-title-wrapper">
            <div className="detail-card-title" id="game-detail-mobile-title">
              {this.props.game.name}
            </div>
            <div className="detail-card-image-wrapper">
              <img className="detail-card-image" src={PlaceholderImage} />
            </div>
            <div className="detail-card-title" id="game-detail-desktop-title">
              {this.props.game.name}
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
          <div className="detail-card-description-wrapper">
            <div className="detail-card-description-announcer">Description</div>
            <div className="detail-card-description">
              {this.props.game.description}
            </div>
          </div>
        </div>
        <div className="game-detail-right-hand-wrapper">
          <div className="game-detail-additionals">
            <div className="game-detail-additional-wrapper">
              <div className="game-detail-additional-announcer">
                Release Date
              </div>
              <div className="game-detail-additional-info">
                {this.props.game.releaseDate}
              </div>
            </div>
            <div className="game-detail-additional-wrapper">
              <div className="game-detail-additional-announcer">Developer</div>
              <div className="game-detail-additional-info">
                {this.props.game.developer}
              </div>
            </div>
            <div className="game-detail-additional-wrapper">
              <div className="game-detail-additional-announcer">Publisher</div>
              <div className="game-detail-additional-info">
                {this.props.game.publisher}
              </div>
            </div>
          </div>

          <div className="game-detail-source-link-wrapper">
            <a className="game-detail-source-button">
              <div className="game-detail-source-image-wrapper">
                <img
                  className="game-detail-source-image"
                  src={LogoSteamStore}
                />
              </div>
              <div className="game-detail-source-name">View on Steam</div>
              <div className="game-detail-source-exit-icon-wrapper">
                <FontAwesomeIcon
                  className="game-detail-source-exit-icon"
                  icon={faArrowUpRightFromSquare}
                />
              </div>
            </a>
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

import React from "react";
import "../styles/GameDetailCard.css";
import LogoEpicGamesStore from "../images/logo_epicgames.png";
import LogoGog from "../images/logo_gog.png";
import LogoSteamStore from "../images/logo_steam.png";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThumbnailImage from "../placeholders/thumbnail.jpg";
import { GAFireEvent } from "../tracking/GA_Events_Tracker";

function GameDetailCard(props) {
  const GetReleaseDateElements = (release_date) => {
    if (release_date) {
      return (
        <div className="game-detail-additional-wrapper">
          <div className="game-detail-additional-announcer">Release Date</div>
          <div className="game-detail-additional-info">{release_date}</div>
        </div>
      );
    }
  };

  const GetDeveloperElements = (developer) => {
    if (developer) {
      return (
        <div className="game-detail-additional-wrapper">
          <div className="game-detail-additional-announcer">Developer</div>
          <div className="game-detail-additional-info">{developer}</div>
        </div>
      );
    }
  };

  const GetPublisherElements = (publisher) => {
    if (publisher) {
      return (
        <div className="game-detail-additional-wrapper">
          <div className="game-detail-additional-announcer">Publisher</div>
          <div className="game-detail-additional-info">{publisher}</div>
        </div>
      );
    }
  };

  const GetDescriptionElements = (description) => {
    if (description) {
      return (
        <div className="detail-card-description-wrapper">
          <div className="detail-card-description-announcer">Description</div>
          <div className="detail-card-description">{description}</div>
        </div>
      );
    }
  };

  const GetSteamButton = () => {
    if (!props.game || !props.game.sources || props.game.sources.length <= 0)
      return;

    for (let i = 0; i < props.game.sources.length; ++i) {
      if (!props.game.sources[i].name || props.game.sources[i].name == "") {
        continue;
      }

      if (props.game.sources[i].name.toLowerCase().includes("steam")) {
        return (
          <a
            className="game-detail-source-button"
            href={props.game.sources[i].link}
            target="_blank"
            onClick={() => {
              GAFireEvent("External Link Click", "Game Detail", "Steam");
            }}
          >
            <div className="game-detail-source-image-wrapper">
              <img
                className="game-detail-source-image"
                src={LogoSteamStore}
                alt={"Find " + props.game.title + " on Steam"}
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
        );
      }
    }
  };

  const GetGogButton = () => {
    if (!props.game || !props.game.sources || props.game.sources.length <= 0)
      return;

    for (let i = 0; i < props.game.sources.length; ++i) {
      if (!props.game.sources[i].name || props.game.sources[i].name == "") {
        continue;
      }

      if (props.game.sources[i].name.toLowerCase().includes("gog")) {
        return (
          <a
            className="game-detail-source-button"
            href={props.game.sources[i].link}
            target="_blank"
            onClick={() => {
              GAFireEvent("External Link Click", "Game Detail", "Gog");
            }}
          >
            <div className="game-detail-source-image-wrapper">
              <img
                className="game-detail-source-image"
                src={LogoGog}
                alt={"Find " + props.game.title + " on Gog"}
              />
            </div>
            <div className="game-detail-source-name"> View on Gog</div>
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

  const GetEpicGamesButton = () => {
    if (!props.game || !props.game.sources || props.game.sources.length <= 0)
      return;

    for (let i = 0; i < props.game.sources.length; ++i) {
      if (!props.game.sources[i].name || props.game.sources[i].name == "") {
        continue;
      }

      if (props.game.sources[i].name.toLowerCase().includes("epic games")) {
        return (
          <a
            className="game-detail-source-button"
            href={props.game.sources[i].link}
            target="_blank"
            onClick={() => {
              GAFireEvent(
                "External Link Click",
                "Game Detail",
                "Epic Games Store"
              );
            }}
          >
            <div className="game-detail-source-image-wrapper">
              <img
                className="game-detail-source-image"
                src={LogoEpicGamesStore}
                alt={"Find " + props.game.title + " on Epic Games"}
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
        );
      }
    }
  };

  return (
    <div className="game-detail-card">
      <div className="game-detail-left-hand-wrapper">
        <div className="detail-card-image-title-wrapper">
          <div className="detail-card-title" id="game-detail-mobile-title">
            {props.game.title}
          </div>
          <div className="detail-card-image-wrapper">
            <img
              className="detail-card-image"
              src={
                props.serverAddress +
                "/header_images/" +
                props.game.image_id +
                ".jpg"
              }
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // This is to make sure there won't be any accidental looping!
                currentTarget.src = ThumbnailImage;
              }}
              alt={props.game.title + " Image"}
            />
          </div>
          <div className="detail-card-title" id="game-detail-desktop-title">
            {props.game.title}
          </div>
        </div>
        <div className="detail-card-tags-wrapper">
          {props.game.tags.map((tag, index) => {
            return (
              <div className="detail-card-tag" key={index + tag}>
                {tag}
              </div>
            );
          })}
        </div>
        {GetDescriptionElements(props.game.description)}
      </div>
      <div className="game-detail-right-hand-wrapper">
        <div className="game-detail-additionals">
          {GetReleaseDateElements(props.game.release_date)}
          {GetDeveloperElements(props.game.developer)}
          {GetPublisherElements(props.game.publisher)}
        </div>

        <div className="game-detail-source-link-wrapper">
          {GetSteamButton()}
          {GetGogButton()}
          {GetEpicGamesButton()}
        </div>
      </div>
    </div>
  );
}

export default GameDetailCard;

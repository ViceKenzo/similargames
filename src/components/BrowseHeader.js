import React from "react";
import "../styles/BrowseHeader.css";
import ThumbnailImage from "../placeholders/thumbnail.jpg";
import { Link } from "react-router-dom";
import { GAFireEvent } from "../tracking/GA_Events_Tracker";

function BrowseHeader(props) {
  const getGameTitle = () => {
    if (props.targetGame) {
      return props.targetGame.title;
    } else return null;
  };

  const getDeveloper = () => {
    if (props.targetGame) {
      return props.targetGame.developer;
    } else return null;
  };

  const getPublisher = () => {
    if (props.targetGame) {
      return props.targetGame.publisher;
    } else return null;
  };

  const getReleaseDate = () => {
    if (props.targetGame) {
      return props.targetGame.release_date;
    } else return null;
  };

  const getLinkTo = () => {
    if (props.targetGame) {
      return "/game?id=" + props.targetGame.id;
    } else return "";
  };

  const getImageAlt = () => {
    if (props.targetGame) {
      return props.targetGame.title;
    } else return "Find games that play like..";
  };

  const getImageSrc = () => {
    if (props.targetGame) {
      return (
        props.serverAddress +
        "/header_images/" +
        props.targetGame.image_id +
        ".jpg"
      );
    } else return { ThumbnailImage };
  };

  const getDeveloperClass = () => {
    let cName = "browse-header-developer";

    if (
      !props.targetGame ||
      !props.targetGame.developer ||
      props.targetGame.developer == ""
    ) {
      cName += " no-display";
    }

    return cName;
  };

  const getPublisherClass = () => {
    let cName = "browse-header-publisher";

    if (
      !props.targetGame ||
      !props.targetGame.publisher ||
      props.targetGame.publisher == ""
    ) {
      cName += " no-display";
    }

    return cName;
  };

  const getInfoPanelRightClass = () => {
    let cName = "browse-header-game-info-right";

    if (
      !props.targetGame ||
      !props.targetGame.release_date ||
      props.targetGame.release_date == ""
    ) {
      cName += " no-display";
    }

    return cName;
  };

  const getInfoPanelLeftClass = () => {
    let cName = "browse-header-game-info-left";

    if (
      !props.targetGame ||
      (!props.targetGame.developer && !props.targetGame.publisher)
    ) {
      cName += " no-display";
    } else if (
      !props.targetGame.release_date ||
      props.targetGame.release_date == ""
    ) {
      cName += " no-release-date";
    }

    return cName;
  };

  const getBrowseHeaderClass = () => {
    let cName = "browse-header";

    if (!props.targetGame) {
      cName += " no-game";
    }

    return cName;
  };

  return (
    <div className={getBrowseHeaderClass()}>
      <div className="browse-header-search-announcer">Search for a game</div>
      <div className="browse-header-left">
        <Link
          to={getLinkTo()}
          className="browse-header-image-wrapper"
          onClick={() => {
            if (props.targetGame) {
              GAFireEvent(
                "Game Detail Click",
                "BrowseHeader, Image",
                props.targetGame.title
              );
            }
          }}
        >
          <img
            alt={getImageAlt()}
            className="browse-header-image"
            src={getImageSrc()}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // This is to make sure there won't be any accidental looping!
              currentTarget.src = ThumbnailImage;
            }}
          />
        </Link>
        <div className="browse-header-announcer-wrapper">
          <div className="browse-header-gameslike-announcer">Games like:</div>
          <Link
            to={getLinkTo()}
            className="browse-header-game-title"
            onClick={() => {
              if (props.targetGame) {
                GAFireEvent(
                  "Game Detail Click",
                  "BrowseHeader, Title",
                  props.targetGame.title
                );
              }
            }}
          >
            {getGameTitle()}
          </Link>
        </div>
      </div>
      <div className="browse-header-right">
        <div className={getInfoPanelLeftClass()}>
          <div className={getDeveloperClass()}>
            {"Developer: " + getDeveloper()}
          </div>
          <div className={getPublisherClass()}>
            {"Publisher: " + getPublisher()}
          </div>
        </div>
        <div className={getInfoPanelRightClass()}>
          <div className="browse-header-release-date-announcer">
            Release Date:
          </div>
          <div className="browse-header-release-date">{getReleaseDate()}</div>
        </div>
      </div>
    </div>
  );
}

export default BrowseHeader;

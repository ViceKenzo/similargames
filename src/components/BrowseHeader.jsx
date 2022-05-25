import React, { Component } from "react";
import "./BrowseHeader.css";
import ThumbnailImage from "../placeholders/thumbnail.jpg";
import { Link } from "react-router-dom";
import { GAFireEvent } from "../tracking/GA_Events_Tracker";

class BrowseHeader extends Component {
  state = {};

  constructor(props) {
    super(props);
  }

  getGameTitle = () => {
    if (this.props.targetGame) {
      return this.props.targetGame.title;
    } else return null;
  };

  getDeveloper = () => {
    if (this.props.targetGame) {
      return this.props.targetGame.developer;
    } else return null;
  };

  getPublisher = () => {
    if (this.props.targetGame) {
      return this.props.targetGame.publisher;
    } else return null;
  };

  getReleaseDate = () => {
    if (this.props.targetGame) {
      return this.props.targetGame.release_date;
    } else return null;
  };

  getLinkTo = () => {
    if (this.props.targetGame) {
      return "/game?id=" + this.props.targetGame.id;
    } else return "";
  };

  getImageAlt = () => {
    if (this.props.targetGame) {
      return this.props.targetGame.title;
    } else return "Find games that play like..";
  };

  getImageSrc = () => {
    if (this.props.targetGame) {
      return (
        this.props.serverAddress +
        "/header_images/" +
        this.props.targetGame.image_id +
        ".jpg"
      );
    } else return { ThumbnailImage };
  };

  getDeveloperClass = () => {
    let cName = "browse-header-developer";

    if (
      !this.props.targetGame ||
      !this.props.targetGame.developer ||
      this.props.targetGame.developer == ""
    ) {
      cName += " no-display";
    }

    return cName;
  };

  getPublisherClass = () => {
    let cName = "browse-header-publisher";

    if (
      !this.props.targetGame ||
      !this.props.targetGame.publisher ||
      this.props.targetGame.publisher == ""
    ) {
      cName += " no-display";
    }

    return cName;
  };

  getInfoPanelRightClass = () => {
    let cName = "browse-header-game-info-right";

    if (
      !this.props.targetGame ||
      !this.props.targetGame.release_date ||
      this.props.targetGame.release_date == ""
    ) {
      cName += " no-display";
    }

    return cName;
  };

  getInfoPanelLeftClass = () => {
    let cName = "browse-header-game-info-left";

    if (
      !this.props.targetGame ||
      (!this.props.targetGame.developer && !this.props.targetGame.publisher)
    ) {
      cName += " no-display";
    } else if (
      !this.props.targetGame.release_date ||
      this.props.targetGame.release_date == ""
    ) {
      cName += " no-release-date";
    }

    return cName;
  };

  getBrowseHeaderClass = () => {
    let cName = "browse-header";

    if (!this.props.targetGame) {
      cName += " no-game";
    }

    return cName;
  };

  render() {
    return (
      <div className={this.getBrowseHeaderClass()}>
        <div className="browse-header-search-announcer">Search for a game</div>
        <div className="browse-header-left">
          <Link
            to={this.getLinkTo()}
            className="browse-header-image-wrapper"
            onClick={() => {
              if (this.props.targetGame) {
                GAFireEvent(
                  "Game Detail Click",
                  "BrowseHeader, Image",
                  this.props.targetGame.title
                );
              }
            }}
          >
            <img
              alt={this.getImageAlt()}
              className="browse-header-image"
              src={this.getImageSrc()}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // This is to make sure there won't be any accidental looping!
                currentTarget.src = ThumbnailImage;
              }}
            />
          </Link>
          <div className="browse-header-announcer-wrapper">
            <div className="browse-header-gameslike-announcer">Games like:</div>
            <Link
              to={this.getLinkTo()}
              className="browse-header-game-title"
              onClick={() => {
                if (this.props.targetGame) {
                  GAFireEvent(
                    "Game Detail Click",
                    "BrowseHeader, Title",
                    this.props.targetGame.title
                  );
                }
              }}
            >
              {this.getGameTitle()}
            </Link>
          </div>
        </div>
        <div className="browse-header-right">
          <div className={this.getInfoPanelLeftClass()}>
            <div className={this.getDeveloperClass()}>
              {"Developer: " + this.getDeveloper()}
            </div>
            <div className={this.getPublisherClass()}>
              {"Publisher: " + this.getPublisher()}
            </div>
          </div>
          <div className={this.getInfoPanelRightClass()}>
            <div className="browse-header-release-date-announcer">
              Release Date:
            </div>
            <div className="browse-header-release-date">
              {this.getReleaseDate()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BrowseHeader;

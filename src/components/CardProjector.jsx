import React, { Component } from "react";
import "./CardProjector.css";
import ThumbnailImage from "../placeholders/thumbnail.jpg";
import { Link } from "react-router-dom";
import { GAFireEvent } from "../tracking/GA_Events_Tracker";

class CardProjector extends Component {
  state = {};

  constructor(props) {
    super(props);
  }

  getProjection = () => {
    if (!this.props.searchResults || this.props.searchResults.length == 0) {
      return this.getNoSearchResultsCard(this.props.searchResultMessage);
    } else {
      return this.getSearchResultsProjection();
    }
  };

  getReleaseDate = (game) => {
    if (game.release_date && !game.release_date.includes("1970"))
      return game.release_date;
    else return null;
  };

  getSearchResultsProjection = () => {
    return this.props.searchResults.map((game, index) => {
      return (
        <Link
          key={index + "card"}
          className="card"
          to={"/game?id=" + game.id}
          onClick={() => {
            GAFireEvent("Similar Game Click", "Browse Page", game.title);
          }}
        >
          <div
            key={index + "card-image-wrapper"}
            className="card-image-wrapper"
          >
            <img
              key={index + "card-image"}
              className="card-image"
              src={
                this.props.serverAddress +
                "/header_images/" +
                game.image_id +
                ".jpg"
              }
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // This is to make sure there won't be any accidental looping!
                currentTarget.src = ThumbnailImage;
              }}
            />
          </div>
          <div key={index + "card-text-wrapper"} className="card-text-wrapper">
            <div key={index + "card-title"} className="card-title">
              {game.title}
            </div>
            <div key={index + "card-tags"} className="card-tags">
              {game.tags.join(" | ")}
            </div>
          </div>
          <div key={index + "card-release-date"} className="card-release-date">
            {this.getReleaseDate(game)}
          </div>
        </Link>
      );
    });
  };

  getNoSearchResultsCard = (cardDescription) => {
    return (
      <div className="card" id="no-search-result-card">
        <div className="card-image-wrapper">
          <img className="card-image" src={ThumbnailImage} />
        </div>
        <div className="card-text-wrapper">
          <div className="card-title">{cardDescription}</div>
        </div>
      </div>
    );
  };

  render() {
    return <div className="card-projector">{this.getProjection()}</div>;
  }
}

export default CardProjector;

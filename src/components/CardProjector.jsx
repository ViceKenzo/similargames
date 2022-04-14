import React, { Component } from "react";
import "./CardProjector.css";
import ThumbnailImage from "../placeholders/thumbnail.jpg";
import { Link } from "react-router-dom";

class CardProjector extends Component {
  state = {};

  getProjection = () => {
    if (!this.props.searchResults || this.props.searchResults == []) {
      return this.getNoSearchResultsCard(this.props.searchResultMessage);
    } else {
      return this.getSearchResultsProjection();
    }
  };

  getSearchResultsProjection = () => {
    return this.props.searchResults.map((game, index) => {
      return (
        <Link key={index + "card"} className="card" to={"/game?id=" + game.id}>
          <div
            key={index + "card-image-wrapper"}
            className="card-image-wrapper"
          >
            <img
              key={index + "card-image"}
              className="card-image"
              src={
                "http://localhost:1234/header_images/" + game.image_id + ".jpg"
              }
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
            {game.release_date}
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

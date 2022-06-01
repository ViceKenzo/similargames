import React from "react";
import "../styles/CardProjector.css";

import ThumbnailImage from "../placeholders/thumbnail.jpg";
import { Link } from "react-router-dom";

function CardProjector(props) {
  // Functions
  const getProjection = () => {
    if (!props.searchResults || props.searchResults.length == 0) {
      return getNoSearchResultsCard(props.searchResultMessage);
    } else {
      return getSearchResultsProjection();
    }
  };

  const getReleaseDate = (game) => {
    if (
      game.release_date &&
      !game.release_date.includes("1970") &&
      !game.release_date.includes("1969")
    )
      return game.release_date;
    else return null;
  };

  const getSearchResultsProjection = () => {
    return props.searchResults.map((game, index) => {
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
                props.serverAddress + "/header_images/" + game.image_id + ".jpg"
              }
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // This is to make sure there won't be any accidental looping!
                currentTarget.src = ThumbnailImage;
              }}
              alt={game.title}
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
            {getReleaseDate(game)}
          </div>
        </Link>
      );
    });
  };

  const getNoSearchResultsCard = (cardDescription) => {
    return (
      <div className="card" id="no-search-result-card">
        <div className="card-image-wrapper">
          <img
            className="card-image"
            src={ThumbnailImage}
            alt="Search For Similar Games Question Mark Image"
          />
        </div>
        <div className="card-text-wrapper">
          <div className="card-title">{cardDescription}</div>
        </div>
      </div>
    );
  };

  return <div className="card-projector">{getProjection()}</div>;
}

export default CardProjector;

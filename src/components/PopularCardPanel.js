import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/PopularCardPanel.css";

import ThumbnailImage from "../placeholders/thumbnail.jpg";

function PopularCardPanel(props) {
  // Variables
  const [popularGames, setPopularGames] = useState([]);

  // Effects
  useEffect(() => {
    requestPopularGames();
  }, []);

  // Functions
  const requestPopularGames = () => {
    const xhttp = new XMLHttpRequest();

    let requestUrl = props.serverAddress + "/populargames";

    xhttp.open("get", requestUrl, true);

    xhttp.send();

    xhttp.onload = () => {
      if (!xhttp.response) return;

      let tempPopularGames = JSON.parse(xhttp.response);
      setPopularGames(tempPopularGames);
    };
  };

  return (
    <div className="popular-card-panel">
      <div className="popular-card-panel-header">Popular</div>
      <div className="popular-card-projector">
        {popularGames.map((game, index) => {
          return (
            <div className="popular-card" key={index}>
              <div
                className="popular-card-image-wrapper"
                key={index + "image-wrapper"}
              >
                <Link to={"/game?id=" + game.id}>
                  <img
                    className="popular-card-image"
                    key={index + "card-image"}
                    src={
                      props.serverAddress +
                      "/header_images/" +
                      game.image_id +
                      ".jpg"
                    }
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // This is to make sure there won't be any accidental looping!
                      currentTarget.src = ThumbnailImage;
                    }}
                    alt={game.title}
                  />
                </Link>
              </div>
              <div
                className="popular-card-text-wrapper"
                key={index + "card-text-wrapper"}
              >
                <div className="popular-card-title" key={index + "card-title"}>
                  {game.title}
                </div>
                <div className="popular-card-tags" key={index + "card-tags"}>
                  <p>{game.tags.join(" | ")}</p>
                </div>
              </div>
              <Link
                className="popular-card-button"
                key={index + "card-button"}
                to={"/find-games-like?q=" + game.web_name}
              >
                <span
                  className="popular-card-button-text"
                  key={index + "card-button-text"}
                >
                  Find Games Like This
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PopularCardPanel;

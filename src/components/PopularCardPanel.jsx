import React, { Component } from "react";
import "./PopularCardPanel.css";
import { GameData } from "../placeholders/GameData.js";
import ThumbnailImage from "../placeholders/thumbnail.jpg";
import { Link } from "react-router-dom";

class PopularCardPanel extends Component {
  state = {
    popularGames: GameData,
  };
  render() {
    return (
      <div className="popular-card-panel">
        <div className="popular-card-panel-header">Popular</div>
        <div className="popular-card-projector">
          {this.state.popularGames.map((game, index) => {
            return (
              <div className="popular-card" key={index}>
                <div
                  className="popular-card-image-wrapper"
                  key={index + "image-wrapper"}
                >
                  <img
                    className="popular-card-image"
                    key={index + "card-image"}
                    src={ThumbnailImage}
                  />
                </div>
                <div
                  className="popular-card-text-wrapper"
                  key={index + "card-text-wrapper"}
                >
                  <div
                    className="popular-card-title"
                    key={index + "card-title"}
                  >
                    {game.name}
                  </div>
                  <div className="popular-card-tags" key={index + "card-tags"}>
                    <p>{game.tags_short.join(" | ")}</p>
                  </div>
                </div>
                <Link
                  className="popular-card-button"
                  key={index + "card-button"}
                  to={"/Game?name=" + game.name}
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
}

export default PopularCardPanel;

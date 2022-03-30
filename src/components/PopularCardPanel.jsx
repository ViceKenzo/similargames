import React, { Component } from "react";
import "./PopularCardPanel.css";
import { Link } from "react-router-dom";

class PopularCardPanel extends Component {
  state = {
    popularGames: [],
  };

  requestPopularGames = () => {
    const xhttp = new XMLHttpRequest();

    let requestUrl = "http://localhost:1234/populargames";

    xhttp.open("get", requestUrl, true);

    xhttp.send();

    xhttp.onload = () => {
      if (!xhttp.response) return;

      let tempPopularGames = JSON.parse(xhttp.response);
      this.setState({ popularGames: tempPopularGames });
    };
  };

  componentDidMount() {
    this.requestPopularGames();
  }

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
                    src={
                      "http://localhost:1234/header_images/" +
                      game.image_id +
                      ".jpg"
                    }
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
                    {game.title}
                  </div>
                  <div className="popular-card-tags" key={index + "card-tags"}>
                    <p>{game.tags.join(" | ")}</p>
                  </div>
                </div>
                <Link
                  className="popular-card-button"
                  key={index + "card-button"}
                  to={"/game?id=" + game.id}
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

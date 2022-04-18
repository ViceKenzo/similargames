import React, { Component } from "react";
import "./PopularCardPanel.css";
import { Link } from "react-router-dom";

class PopularCardPanel extends Component {
  state = {
    popularGames: [],
  };

  constructor(props) {
    super(props);
  }

  requestPopularGames = () => {
    const xhttp = new XMLHttpRequest();

    let requestUrl = this.props.serverAddress + "/populargames";

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
                      this.props.serverAddress +
                      "/header_images/" +
                      game.image_id +
                      ".jpg"
                    }
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // This is to make sure there won't be any accidental looping!
                      currentTarget.src =
                        this.serverAddress +
                        "/header_images/" +
                        game.image_id +
                        ".png";
                    }}
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

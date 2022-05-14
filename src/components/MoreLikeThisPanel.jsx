import React, { Component } from "react";
import "./MoreLikeThisPanel.css";
import ThumbnailImage from "../placeholders/thumbnail.jpg";
import { Link } from "react-router-dom";
import { GAFireEvent } from "../tracking/GA_Events_Tracker";

class MoreLikeThisPanel extends Component {
  state = {};

  getGamesProjection = () => {
    if (this.props.games != null && this.props.games.length > 0) {
      return this.props.games.map((game, index) => {
        return (
          <Link
            key={index + "link"}
            className="morelikethis-game"
            to={"/game?id=" + game.id}
            onClick={() => {
              GAFireEvent(
                "MoreLikeThis Game Click",
                this.props.mainGame.title,
                game.title
              );
              this.props.requestAndSetGameDetail(game.id);
            }}
          >
            <img
              key={index + "image"}
              className="morelikethis-game-image"
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
            <div key={index + "title"} className="morelikethis-game-title">
              <p key={index + "title-p"}>{game.title}</p>
            </div>
          </Link>
        );
      });
    } else return;
  };

  render() {
    return (
      <div className="morelikethis-panel">
        <div className="morelikethis-title-wrapper">
          <Link
            to={"/find-games-like?q=" + this.props.mainGame.web_name}
            className="morelikethis-title"
          >
            More like this
          </Link>
        </div>
        <div className="morelikethis-game-wrapper">
          {this.getGamesProjection()}
        </div>
      </div>
    );
  }
}

export default MoreLikeThisPanel;

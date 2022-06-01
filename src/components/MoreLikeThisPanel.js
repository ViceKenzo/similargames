import React from "react";
import "../styles/MoreLikeThisPanel.css";
import ThumbnailImage from "../placeholders/thumbnail.jpg";
import { Link } from "react-router-dom";
import { GAFireEvent } from "../tracking/GA_Events_Tracker";

function MoreLikeThisPanel(props) {
  const getGamesProjection = () => {
    if (props.games != null && props.games.length > 0) {
      return props.games.map((game, index) => {
        return (
          <Link
            key={index + "link"}
            className="morelikethis-game"
            to={"/game?id=" + game.id}
            onClick={() => {
              GAFireEvent(
                "MoreLikeThis Game Click",
                props.mainGame.title,
                game.title
              );
              props.requestAndSetGameDetail(game.id);
            }}
          >
            <img
              key={index + "image"}
              className="morelikethis-game-image"
              src={
                props.serverAddress + "/header_images/" + game.image_id + ".jpg"
              }
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // This is to make sure there won't be any accidental looping!
                currentTarget.src = ThumbnailImage;
              }}
              alt={game.title}
            />
            <div key={index + "title"} className="morelikethis-game-title">
              <p key={index + "title-p"}>{game.title}</p>
            </div>
          </Link>
        );
      });
    } else return;
  };

  return (
    <div className="morelikethis-panel">
      <div className="morelikethis-title-wrapper">
        <Link
          to={"/find-games-like?q=" + props.mainGame.web_name}
          className="morelikethis-title"
          onClick={() => {
            GAFireEvent(
              "MoreLikeThis Title (Browse) Click",
              props.mainGame.title
            );
          }}
        >
          More like this
        </Link>
      </div>
      <div className="morelikethis-game-wrapper">{getGamesProjection()}</div>
    </div>
  );
}

export default MoreLikeThisPanel;

import React, { Component } from "react";
import GameDetailCard from "../components/GameDetailCard.jsx";
import "./GameDetailPage.css";
import { GAFirePageView } from "../tracking/GA_Events_Tracker";

class GameDetailPage extends Component {
  state = {
    game: null,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    let gameId = this.getGameIdFromQueryParameters();

    if (gameId && gameId != "") {
      this.requestAndSetGameDetail(gameId);
    } else window.location.href = "/Error";
  }

  requestAndSetGameDetail = (gameId) => {
    const xhttp = new XMLHttpRequest();
    let requestUrl = this.props.serverAddress + "/gamedetail/" + gameId;

    xhttp.open("get", requestUrl, true);

    xhttp.send();

    xhttp.onload = () => {
      if (xhttp.statusText.toLowerCase() != "ok") {
        window.location.href = "/Error";
        return;
      }

      let requestedGame = JSON.parse(xhttp.response);
      this.setState({ game: requestedGame }, () => {
        GAFirePageView(
          window.location.pathname + "/" + this.state.game.web_name
        );
      });
    };
  };

  getGameIdFromQueryParameters = () => {
    let qParam = new URLSearchParams(this.props.locationHook.search).get("id");

    return qParam;
  };

  getCardRender = () => {
    if (this.state.game)
      return (
        <GameDetailCard
          serverAddress={this.props.serverAddress}
          game={this.state.game}
        />
      );
  };

  render() {
    return <div className="game-detail-wrapper">{this.getCardRender()}</div>;
  }
}

export default GameDetailPage;

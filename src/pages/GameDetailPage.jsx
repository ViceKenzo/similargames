import React, { Component } from "react";
import GameDetailCard from "../components/GameDetailCard.jsx";
import "./GameDetailPage.css";
import { GAFirePageView } from "../tracking/GA_Events_Tracker";
import MoreLikeThisPanel from "../components/MoreLikeThisPanel.jsx";

class GameDetailPage extends Component {
  state = {
    game: null,
    moreLikeThisGames: null,
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

      this.requestMoreLikeThisGames(gameId);
    };
  };

  requestMoreLikeThisGames = (gameId) => {
    let amountRequested = 8;

    const xhttp = new XMLHttpRequest();
    let requestUrl =
      this.props.serverAddress + "/gameslike/" + gameId + "/" + amountRequested;

    xhttp.open("get", requestUrl, true);

    xhttp.send();

    xhttp.onload = () => {
      if (xhttp.statusText.toLowerCase() != "ok") {
        window.location.href = "/Error";
        return;
      }

      let requestedGames = JSON.parse(xhttp.response);

      this.setState({ moreLikeThisGames: requestedGames.similarGames });
    };
  };

  getGameIdFromQueryParameters = () => {
    let qParam = new URLSearchParams(this.props.locationHook.search).get("id");

    return qParam;
  };

  getCardRender = () => {
    if (this.state.game)
      return (
        <React.Fragment>
          <GameDetailCard
            serverAddress={this.props.serverAddress}
            game={this.state.game}
          />
          <MoreLikeThisPanel
            games={this.state.moreLikeThisGames}
            serverAddress={this.props.serverAddress}
            gameClickEvent={this.requestAndSetGameDetail}
            mainGame={this.state.game}
          />
        </React.Fragment>
      );
  };

  render() {
    return <div className="game-detail-wrapper">{this.getCardRender()}</div>;
  }
}

export default GameDetailPage;

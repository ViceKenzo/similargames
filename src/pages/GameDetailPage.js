import React, { useState, useEffect } from "react";
import GameDetailCard from "../components/GameDetailCard.js";
import "../styles/GameDetailPage.css";
import MoreLikeThisPanel from "../components/MoreLikeThisPanel.js";
import { useLocation } from "react-router-dom";

function GameDetailPage(props) {
  const [game, setGame] = useState(null);
  const [moreLikeThisGames, setMoreLikeThisGames] = useState(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    let gameId = getGameIdFromQueryParameters();

    if (gameId && gameId != "") {
      requestAndSetGameDetail(gameId);
    } else window.location.href = "/Error";
  }, []);

  const requestAndSetGameDetail = (gameId) => {
    const xhttp = new XMLHttpRequest();
    let requestUrl = props.serverAddress + "/gamedetail/" + gameId;

    xhttp.open("get", requestUrl, true);

    xhttp.send();

    xhttp.onload = () => {
      if (xhttp.statusText.toLowerCase() != "ok") {
        window.location.href = "/Error";
        return;
      }

      let requestedGame = JSON.parse(xhttp.response);
      setGame(requestedGame);

      requestMoreLikeThisGames(gameId);
    };
  };

  const requestMoreLikeThisGames = (gameId) => {
    let amountRequested = 8;

    const xhttp = new XMLHttpRequest();
    let requestUrl =
      props.serverAddress + "/gameslike/" + gameId + "/" + amountRequested;

    xhttp.open("get", requestUrl, true);

    xhttp.send();

    xhttp.onload = () => {
      if (xhttp.statusText.toLowerCase() != "ok") {
        window.location.href = "/Error";
        return;
      }

      let requestedGames = JSON.parse(xhttp.response);

      setMoreLikeThisGames(requestedGames.similarGames);
    };
  };

  const getGameIdFromQueryParameters = () => {
    let qParam = new URLSearchParams(location.search).get("id");

    return qParam;
  };

  const getCardRender = () => {
    if (game)
      return (
        <React.Fragment>
          <GameDetailCard serverAddress={props.serverAddress} game={game} />
          <MoreLikeThisPanel
            games={moreLikeThisGames}
            serverAddress={props.serverAddress}
            gameClickEvent={requestAndSetGameDetail}
            mainGame={game}
          />
        </React.Fragment>
      );
  };

  return <div className="game-detail-wrapper">{getCardRender()}</div>;
}

export default GameDetailPage;

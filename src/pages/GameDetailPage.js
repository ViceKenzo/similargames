import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/GameDetailPage.css";

import GameDetailCard from "../components/GameDetailCard.js";
import MoreLikeThisPanel from "../components/MoreLikeThisPanel.js";

function GameDetailPage(props) {
  // Variables
  const [game, setGame] = useState(null);
  const [moreLikeThisGames, setMoreLikeThisGames] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.search]);

  useEffect(() => {
    let qParam = new URLSearchParams(location.search).get("id");

    if (qParam && qParam > 0) {
      requestAndSetGameDetail(qParam);
    } else navigate("/Error");
  }, [location.search]);

  // Element Gets
  const getCardRender = () => {
    if (game)
      return (
        <React.Fragment>
          <GameDetailCard serverAddress={props.serverAddress} game={game} />
          <MoreLikeThisPanel
            games={moreLikeThisGames}
            serverAddress={props.serverAddress}
            requestAndSetGameDetail={requestAndSetGameDetail}
            mainGame={game}
          />
        </React.Fragment>
      );
  };

  // Functions
  const requestAndSetGameDetail = (gameId) => {
    setMoreLikeThisGames([]);

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

  return <div className="game-detail-wrapper">{getCardRender()}</div>;
}

export default GameDetailPage;

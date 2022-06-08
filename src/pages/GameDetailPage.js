import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Config from "../config/config";
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
          <GameDetailCard serverAddress={Config.serverAddress} game={game} />
          <MoreLikeThisPanel
            games={moreLikeThisGames}
            serverAddress={Config.serverAddress}
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
    let requestUrl = Config.serverAddress + "/gamedetail/" + gameId;

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
      Config.serverAddress + "/gameslike/" + gameId + "/" + amountRequested;

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

  const getSourcesMetaDesc = () => {
    if (game.sources.length == 1) return game.sources[0].name;
    if (game.sources.length == 2)
      return "" + game.sources[0].name + " and " + game.sources[1].name;

    let output = "" + game.sources[0].name;
    for (let i = 1; i < game.sources.length - 1; ++i) {
      output += ", " + game.sources[i].name;
    }
    output += " and " + game.sources[game.sources.length - 1].name;

    return output;
  };

  const getMoreGamesLikeMetaDesc = () => {
    if (moreLikeThisGames.length == 0) return "";

    let output =
      "Some other games are similar to " +
      props.game.title +
      " are: " +
      moreLikeThisGames[0].title;

    if (moreLikeThisGames.length == 2)
      output += " and " + moreLikeThisGames[1].title;
    else {
      output +=
        ", " +
        moreLikeThisGames[1].title +
        " and " +
        moreLikeThisGames[2].title;
    }

    output += ".";

    return output;
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>SimilerGames - {game.title}</title>
        <meta
          name="description"
          content={
            game.title +
            " can be found on " +
            getSourcesMetaDesc() +
            ". " +
            getMoreGamesLikeMetaDesc()
          }
        />
        <meta name="keywords" content={game.title + ", " + Config.metaTags} />
      </Helmet>
      <div className="game-detail-wrapper">{getCardRender()}</div>
    </React.Fragment>
  );
}

export default GameDetailPage;

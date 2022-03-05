import React, { Component } from "react";
import GameDetailCard from "../components/GameDetailCard.jsx";
import { GameData } from "../placeholders/GameData.js";
import "./GameDetailPage.css";

class GameDetailPage extends Component {
  state = {
    game: null,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    let gameName = this.getGameNameFromQueryParameters();

    if (gameName && gameName != "") {
      let tempGame = GameData.find((game) => {
        return game.name == gameName;
      });
      this.setState({ game: tempGame });
    } else window.location.href = "/Error";
  }

  getGameNameFromQueryParameters = () => {
    let qParam = new URLSearchParams(this.props.locationHook.search).get(
      "name"
    );

    return qParam;
  };

  getCardRender = () => {
    if (this.state.game) return <GameDetailCard game={this.state.game} />;
  };

  render() {
    return <div className="game-detail-wrapper">{this.getCardRender()}</div>;
  }
}

export default GameDetailPage;

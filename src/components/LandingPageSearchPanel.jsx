import React, { Component } from "react";
import "./LandingPageSearchPanel.css";
import SearchBar from "./SearchBar.jsx";
import LogoEpicGamesStore from "../images/logo_epicgamesstore.png";
import LogoGog from "../images/logo_gog.png";
import LogoSteamStore from "../images/logo_steam.png";
import SimilarGamesHeaderImage from "../images/similargames_title.png";
import { GAFireEvent } from "../tracking/GA_Events_Tracker";

class LandingPageSearchPanel extends Component {
  state = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="landing-page-search-panel">
        <img className="search-panel-header" src={SimilarGamesHeaderImage} />
        <div className="search-panel-search-bar">
          <SearchBar
            styleHeight="50px"
            submitSearch={this.props.submitSearch}
            ref={this.searchBar}
            searchSuggestions={this.props.searchSuggestions}
            handleSearchInputChange={this.props.handleSearchInputChange}
            clearSearchSuggestions={this.props.clearSearchSuggestions}
            searchInputValue={this.props.searchInputValue}
            handleSuggestionClick={this.props.handleSuggestionClick}
            serverAddress={this.props.serverAddress}
          ></SearchBar>
        </div>
        <div className="search-panel-main-phrase">
          Find the games you'll love.
        </div>
        <div className="search-panel-footer">
          <span className="search-panel-icon-announcer">On:</span>
          <div className="search-panel-icon-wrapper">
            <a
              href="https://www.epicgames.com/store"
              target="_blank"
              onClick={() => {
                GAFireEvent(
                  "External Link Click",
                  "Landing Page",
                  "Epic Games Store"
                );
              }}
            >
              <img className="logo-epic" src={LogoEpicGamesStore} />
            </a>
            <a
              href="https://www.gog.com/"
              target="_blank"
              onClick={() => {
                GAFireEvent("External Link Click", "Landing Page", "Gog");
              }}
            >
              <img className="logo-gog" src={LogoGog} />
            </a>
            <a
              href="https://store.steampowered.com/"
              target="_blank"
              onClick={() => {
                GAFireEvent("External Link Click", "Landing Page", "Steam");
              }}
            >
              <img className="logo-steam " src={LogoSteamStore} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPageSearchPanel;

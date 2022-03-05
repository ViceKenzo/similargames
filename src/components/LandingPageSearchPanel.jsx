import React, { Component } from "react";
import "./LandingPageSearchPanel.css";
import SearchBar from "./SearchBar.jsx";
import LogoEpicGamesStore from "../images/logo_epicgamesstore.png";
import LogoGog from "../images/logo_gog.png";
import LogoSteamStore from "../images/logo_steam.png";

class LandingPageSearchPanel extends Component {
  state = {};

  render() {
    return (
      <div className="landing-page-search-panel">
        <div className="search-panel-header">SimilarGames</div>
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
          ></SearchBar>
        </div>
        <div className="search-panel-main-phrase">
          Find the games you'll love.
        </div>
        <div className="search-panel-footer">
          <span className="search-panel-icon-announcer">On:</span>
          <div className="search-panel-icon-wrapper">
            <a href="https://www.epicgames.com/store" target="_blank">
              <img className="logo-epic" src={LogoEpicGamesStore} />
            </a>
            <a href="https://www.gog.com/" target="_blank">
              <img className="logo-gog" src={LogoGog} />
            </a>
            <a href="https://store.steampowered.com/" target="_blank">
              <img className="logo-steam " src={LogoSteamStore} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPageSearchPanel;

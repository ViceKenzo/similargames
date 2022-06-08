import React from "react";
import "../styles/LandingPageSearchPanel.css";

import SearchBar from "./SearchBar.js";

import LogoEpicGamesStore from "../images/logo_epicgamesstore.png";
import LogoGog from "../images/logo_gog.png";
import LogoSteamStore from "../images/logo_steam.png";
import SimilarGamesHeaderImage from "../images/similargames_title.png";

function LandingPageSearchPanel(props) {
  // Functions
  return (
    <div className="landing-page-search-panel">
      <div className="search-panel-image-wrapper">
        <img
          className="search-panel-header"
          src={SimilarGamesHeaderImage}
          alt="Similar Games Logo"
        />
      </div>
      <div className="search-panel-search-bar">
        <SearchBar
          submitSearch={props.submitSearch}
          searchSuggestions={props.searchSuggestions}
          handleSearchInputChange={props.handleSearchInputChange}
          clearSearchSuggestions={props.clearSearchSuggestions}
          searchInputValue={props.searchInputValue}
          serverAddress={props.serverAddress}
        ></SearchBar>
      </div>
      <div className="search-panel-main-phrase">
        Find the games you&apos;ll love.
      </div>
      <div className="search-panel-footer">
        <span className="search-panel-icon-announcer">On:</span>
        <div className="search-panel-icon-wrapper">
          <a href="https://www.epicgames.com/store" target="_blank">
            <img
              className="logo-epic"
              src={LogoEpicGamesStore}
              alt="Epic Games Store Logo"
              width={50}
              height={76.25}
            />
          </a>
          <a href="https://www.gog.com/" target="_blank">
            <img
              className="logo-gog"
              src={LogoGog}
              alt="Gog Logo"
              width={50}
              height={50}
            />
          </a>
          <a href="https://store.steampowered.com/" target="_blank">
            <img
              className="logo-steam "
              src={LogoSteamStore}
              alt="Steam Store Logo"
              width={50}
              height={50}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingPageSearchPanel;

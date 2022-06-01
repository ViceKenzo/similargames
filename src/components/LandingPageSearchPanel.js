import React from "react";
import "../styles/LandingPageSearchPanel.css";
import SearchBar from "./SearchBar.js";
import LogoEpicGamesStore from "../images/logo_epicgamesstore.png";
import LogoGog from "../images/logo_gog.png";
import LogoSteamStore from "../images/logo_steam.png";
import SimilarGamesHeaderImage from "../images/similargames_title.png";
import { GAFireEvent } from "../tracking/GA_Events_Tracker";

function LandingPageSearchPanel(props) {
  return (
    <div className="landing-page-search-panel">
      <img
        className="search-panel-header"
        src={SimilarGamesHeaderImage}
        alt="Similar Games Logo"
      />
      <div className="search-panel-search-bar">
        <SearchBar
          styleHeight="50px"
          submitSearch={props.submitSearch}
          searchSuggestions={props.searchSuggestions}
          handleSearchInputChange={props.handleSearchInputChange}
          clearSearchSuggestions={props.clearSearchSuggestions}
          searchInputValue={props.searchInputValue}
          serverAddress={props.serverAddress}
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
              // GAFireEvent(
              //   "External Link Click",
              //   "Landing Page",
              //   "Epic Games Store"
              // );
            }}
          >
            <img
              className="logo-epic"
              src={LogoEpicGamesStore}
              alt="Epic Games Store Logo"
            />
          </a>
          <a
            href="https://www.gog.com/"
            target="_blank"
            onClick={() => {
              //GAFireEvent("External Link Click", "Landing Page", "Gog");
            }}
          >
            <img className="logo-gog" src={LogoGog} alt="Gog Logo" />
          </a>
          <a
            href="https://store.steampowered.com/"
            target="_blank"
            onClick={() => {
              //GAFireEvent("External Link Click", "Landing Page", "Steam");
            }}
          >
            <img
              className="logo-steam "
              src={LogoSteamStore}
              alt="Steam Store Logo"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingPageSearchPanel;

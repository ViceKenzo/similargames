import React, { Component, useState, useEffect } from "react";
import Config from "../config/config";
import { Helmet } from "react-helmet";

import LandingPageSearchPanel from "../components/LandingPageSearchPanel.js";
import PopularCardPanel from "../components/PopularCardPanel.js";
import Config from "../config/config.js";

function LandingPage(props) {
  // Variables
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      requestSuggestionsFromServer();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchInputValue]);

  // Handlers
  const handleSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  // Functions
  const submitSearch = (event) => {
    if (event) event.preventDefault();

    setSearchSuggestions([]);
  };

  const requestSuggestionsFromServer = () => {
    if (!searchInputValue || searchInputValue == "") return;

    setSearchSuggestions([]);

    const xhttp = new XMLHttpRequest();

    const tempSearchInputValue = searchInputValue.replace(/[\W_]+/g, "");

    xhttp.open(
      "get",
      Config.serverAddress + "/suggestedgames/" + tempSearchInputValue,
      true
    );

    xhttp.send();

    xhttp.onload = () => {
      let suggestedGames = JSON.parse(xhttp.response);
      setSearchSuggestions(suggestedGames);
    };
  };

  return (
    <React.Fragment>
      <Helmet>
        <meta
          name="description"
          content="Find games that look, play and feel like other games you’ve played before. With this new and free 'Games Like Engine', you can explore the entire catalog of games found on Gog, Steam and Epic Games Store."
        />
        <meta name="keywords" content={Config.metaTags} />
        <title>SimilarGames - Find Related Games</title>
      </Helmet>
      <LandingPageSearchPanel
        submitSearch={submitSearch}
        searchSuggestions={searchSuggestions}
        handleSearchInputChange={handleSearchInputChange}
        clearSearchSuggestions={() => {
          setSearchSuggestions([]);
        }}
        searchInputValue={searchInputValue}
        serverAddress={Config.serverAddress}
      />
      <PopularCardPanel serverAddress={Config.serverAddress} />
    </React.Fragment>
  );
}

export default LandingPage;

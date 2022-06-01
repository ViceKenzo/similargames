import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import LandingPageSearchPanel from "../components/LandingPageSearchPanel.js";
import PopularCardPanel from "../components/PopularCardPanel.js";

function LandingPage(props) {
  // Variables
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  let timeOut = null;

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

    const xhttp = new XMLHttpRequest();

    const tempSearchInputValue = searchInputValue.replace(/[\W_]+/g, "");

    xhttp.open(
      "get",
      props.serverAddress + "/suggestedgames/" + tempSearchInputValue,
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
      <Link
        style={{ display: "hidden" }}
        to={"/find-games-like?q=" + searchInputValue}
      />
      <LandingPageSearchPanel
        submitSearch={submitSearch}
        searchSuggestions={searchSuggestions}
        handleSearchInputChange={handleSearchInputChange}
        clearSearchSuggestions={() => {
          setSearchSuggestions([]);
        }}
        searchInputValue={searchInputValue}
        serverAddress={props.serverAddress}
      />
      <PopularCardPanel serverAddress={props.serverAddress} />
    </React.Fragment>
  );
}

export default LandingPage;

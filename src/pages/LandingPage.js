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

  const handleSearchInputChange = (event) => {
    // Set searchinputvalue
    let newSearchInputValue = event.target.value;

    setSearchInputValue(newSearchInputValue);

    // Trigger timeout such that it will only search on the server when the user has not given any input within a given amount of time
    if (timeOut) clearTimeout(timeOut);

    timeOut = setTimeout(() => {
      requestSuggestionsFromServer();
    }, 500);
  };

  return (
    <React.Fragment>
      <Link
        style={{ display: "hidden" }}
        to={"/find-games-like?q=" + searchInputValue}
      />
      <LandingPageSearchPanel
        submitSearch={submitSearch}
        searchSuggestions={searchSuggestions} // done
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

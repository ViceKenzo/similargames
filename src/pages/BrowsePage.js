import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/BrowsePage.css";

import BrowseHeader from "../components/BrowseHeader.js";
import BrowseNavigator from "../components/BrowseNavigator.js";
import BrowseFilters from "../components/BrowseFilters.js";

function BrowsePage(props) {
  // Variables
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [sorting, setSorting] = useState("Relevance");
  const [matchValue, setMatchValue] = useState(60);
  const [showNSFW, setShowNSFW] = useState(false);
  const [showSameDeveloper, setShowSameDeveloper] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageing, setPageing] = useState(20);

  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [targetGame, setTargetGame] = useState(null);
  const [gameData, setGameData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [searchResultMessage, setSearchResultMessage] = useState(
    "Search for a game and see others like it!"
  );

  const location = useLocation();
  const [queryParams, setQueryParams] = location.search;

  let suggestionSearchTimeOut = null;

  //Effects
  useEffect(() => {
    window.scrollTo(0, 0);

    handleQueryParametersInput();

    //GAFirePageView(window.location.pathname + location.search);
  }, []);

  useEffect(() => {
    updateSearchResults();
  }, [gameData]);

  useEffect(() => {
    updateSearchResults();
  }, [sorting]);

  useEffect(() => {
    updateSearchResults();
  }, [showNSFW]);

  useEffect(() => {
    updateSearchResults();
  }, [showSameDeveloper]);

  useEffect(() => {
    handleQueryParametersInput();
  }, [location.search]);

  // Functions
  const handleQueryParametersInput = (name) => {
    if (name && name != "") {
      submitSearch(null, name);
    } else {
      let qParam = new URLSearchParams(location.search).get("q");
      if (!qParam || qParam == "") return;

      submitSearch(null, qParam);
    }
  };

  // Browse Header
  const submitSearch = (event, searchWord) => {
    if (event) event.preventDefault();

    setSearchSuggestions([]);

    if (searchWord) {
      setSearchWord(searchWord);
      requestSimilarGames(searchWord);
    } else {
      setSearchWord(searchInputValue);
      requestSimilarGames(searchInputValue);
    }
  };

  const updateSearchResults = () => {
    if (!targetGame) return;

    // Define the sorting function (such that we can give it external parameters)
    function sortComparator(sortingDef) {
      return function (a, b) {
        switch (sortingDef) {
          case "Release Date":
            let timeValuesA = a.release_date.split("/");
            let timeValuesB = b.release_date.split("/");

            for (let i = 2; i >= 0; --i) {
              if (timeValuesA[i] < timeValuesB[i]) return 1;
              if (timeValuesA[i] > timeValuesB[i]) return -1;
            }
            return 0;
          case "Name":
            if (a.title > b.title) return 1;
            if (a.title < b.title) return -1;
            return 0;
          case "Relevance":
            if (a.matching < b.matching) return 1;
            if (a.matching > b.matching) return -1;
            return 0;
        }
      };
    }

    // Filter the gameData, then sort it
    let newSearchResults = gameData.filter((item) => {
      // If the item matching is lower than the set matching, return false
      if (item.matching < matchValue) {
        return false;
      }

      // If NSFW is not checked, return false for all items with the NSFW tag
      if (!showNSFW) {
        for (let i = 0; i < item.tags.length; ++i) {
          if (item.tags[i] == "NSFW") return false;
        }
      }

      // Developer
      if (!showSameDeveloper) {
        if (item.developer == targetGame.developer) return false;
      }

      return true;
    });
    newSearchResults = newSearchResults.sort(sortComparator(sorting));

    let newTotalPages = 1;
    if (newSearchResults.length > 0)
      newTotalPages = Math.ceil(newSearchResults.length / pageing);
    let newCurrentPage = 1;

    setTotalPages(newTotalPages);
    handlePageChange(newCurrentPage);
    setSearchResults(newSearchResults);

    window.scrollTo(0, 0);
  };

  // Server requests
  const requestSimilarGames = (searchWord) => {
    if (searchWord == null) return;

    const xhttp = new XMLHttpRequest();
    let requestUrl = props.serverAddress + "/similargames" + "/" + searchWord;

    xhttp.open("get", requestUrl, true);

    xhttp.send();

    xhttp.onload = () => {
      if (xhttp.status == 400) {
        setSearchResultMessage(
          "Sorry! The game you entered does not exist in our system."
        );
        setGameData([]);
        return;
      } else if (xhttp.status == 404) {
        setSearchResultMessage(
          "Sorry! The game you entered does not exist in our system."
        );
        setGameData([]);
        return;
      } else if (xhttp.status == 200) {
        if (!xhttp.response) {
          setSearchResultMessage("Sadly, no similar games were found.");
          setGameData([]);
          return;
        }
      }

      let responseObj = JSON.parse(xhttp.response);

      if (responseObj.game == null || responseObj.similarGames == null) return;

      if (responseObj.similarGames.length <= 0) {
        setSearchResultMessage("No similar games were found.");
        setTargetGame(responseObj.game);
        setGameData([]);
      } else {
        setTargetGame(responseObj.game);
        setGameData(responseObj.similarGames);

        if (responseObj.game) {
          setSearchInputValue(responseObj.game.title);
          setSearchWord(responseObj.game.title);
        }
      }
    };
  };

  const requestSuggestionsFromServer = () => {
    if (!searchInputValue || searchInputValue == "") return;

    const xhttp = new XMLHttpRequest();

    xhttp.open(
      "get",
      props.serverAddress + "/suggestedgames/" + searchInputValue,
      true
    );

    xhttp.send();

    xhttp.onload = () => {
      if (!xhttp.response) return;

      let suggestedGames = JSON.parse(xhttp.response);
      setSearchSuggestions(suggestedGames);
    };
  };

  const handleSearchInputChange = (event) => {
    let newSearchInputValue = event.target.value;

    setSearchInputValue(newSearchInputValue);

    // Trigger suggestionSearchTimeOut such that it will only search on the server when the user has not given any input within a given amount of time
    if (suggestionSearchTimeOut) clearTimeout(suggestionSearchTimeOut);

    suggestionSearchTimeOut = setTimeout(() => {
      requestSuggestionsFromServer();
    }, 500);
  };

  const handleSuggestionClick = (name) => {
    handleQueryParametersInput(name);
  };

  // Browse Navigator
  const handleSortChange = (event) => {
    setSorting(event.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    setCurrentPage(newPage);

    window.scrollTo(0, 0);
  };

  // Browse Filters
  let matchingTimeout = null;

  const handleChangeMatching = (event) => {
    // Trigger if slider hasn't been moved for x amount of time
    if (matchingTimeout) clearTimeout(matchingTimeout);

    matchingTimeout = setTimeout(() => {
      updateSearchResults();
    }, 500);

    setMatchValue(event.target.value);
  };

  const handleNSFWClick = () => {
    if (!targetGame) return;

    setShowNSFW(!showNSFW);
  };

  const handleSameDeveloperClick = () => {
    if (!targetGame) return;

    setShowSameDeveloper(!showSameDeveloper);
  };

  return (
    <div className="browsing-wrapper">
      <BrowseHeader
        searchWord={searchWord}
        searchSuggestions={searchSuggestions}
        submitSearch={submitSearch}
        handleSearchInputChange={handleSearchInputChange}
        clearSearchSuggestions={() => {
          setSearchSuggestions([]);
        }}
        searchInputValue={searchInputValue}
        handleSuggestionClick={handleSuggestionClick}
        serverAddress={props.serverAddress}
        targetGame={targetGame}
      />
      <div className="browsing-navigation-filter-wrapper">
        <div className="browsing-filters-wrapper-left">
          <BrowseFilters
            matchValue={matchValue}
            handleChangeMatching={handleChangeMatching}
            handleNSFWClick={handleNSFWClick}
            handleSameDeveloperClick={handleSameDeveloperClick}
          />
        </div>
        <div className="browsing-navigator-wrapper">
          <BrowseNavigator
            currentPage={currentPage}
            totalPages={totalPages}
            sorting={sorting}
            searchResults={searchResults.filter(
              function (item) {
                let itemIsWorthy = false;

                if (this.count >= this.startIdx && this.count < this.endIdx) {
                  itemIsWorthy = true;
                }

                this.count++;
                return itemIsWorthy;
              },
              {
                count: 0,
                startIdx: (currentPage - 1) * pageing,
                endIdx: currentPage * pageing,
              }
            )}
            handleSortChange={handleSortChange}
            handlePageChange={handlePageChange}
            searchResultMessage={searchResultMessage}
            serverAddress={props.serverAddress}
          />
        </div>
        <div className="browsing-filters-wrapper-right">
          <BrowseFilters
            matchValue={matchValue}
            handleChangeMatching={handleChangeMatching}
            handleNSFWClick={handleNSFWClick}
            handleSameDeveloperClick={handleSameDeveloperClick}
          />
        </div>
      </div>
    </div>
  );
}

export default BrowsePage;

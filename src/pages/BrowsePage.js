import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ReactGA from "react-ga";
import Config from "../config/config";
import "../styles/BrowsePage.css";

import BrowseHeader from "../components/BrowseHeader.js";
import BrowseNavigator from "../components/BrowseNavigator.js";
import BrowseFilters from "../components/BrowseFilters.js";

function BrowsePage(props) {
  // Variables
  const [sorting, setSorting] = useState("Relevance");
  const [matchValue, setMatchValue] = useState(60);
  const [matchValueInput, setMatchValueInput] = useState(60);
  const [showNSFW, setShowNSFW] = useState(false);
  const [showSameDeveloper, setShowSameDeveloper] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageing] = useState(20);

  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [targetGame, setTargetGame] = useState(null);
  const [gameData, setGameData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [searchResultMessage, setSearchResultMessage] = useState(
    "Search for a game and see others like it!"
  );

  const location = useLocation();
  ReactGA.initialize(Config.GA_TRACKING_CODE);

  //Effects
  useEffect(() => {
    window.scrollTo(0, 0);
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
    if (location.search && location.search != "") {
      let qParam = new URLSearchParams(location.search).get("q");
      if (!qParam || qParam != "") {
        requestSimilarGames(qParam);
      }
    }
  }, [location.search]);

  useEffect(() => {
    if (targetGame) {
      const delay = setTimeout(() => {
        ReactGA.event({
          category: "Filter Change",
          action: "Match Value",
          label: matchValue,
        });
        updateSearchResults();
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [matchValue]);

  // Handlers
  const handleSortChange = (event) => {
    if (targetGame) {
      ReactGA.event({
        category: "Filter Change",
        action: "Sort Change",
        label: event.target.value,
      });
    }

    setSorting(event.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    setCurrentPage(newPage);

    window.scrollTo(0, 0);
  };

  const handleChangeMatching = (event) => {
    setMatchValue(event.target.value);
    setMatchValueInput(event.target.value);
  };

  const handleChangeMatchingValueInput = (event) => {
    let isNum = /^\d+$/.test(event.target.value);

    if (isNum || event.target.value == "") setMatchValueInput(event.target.value);
  }

  const handleMatchingOnSubmit = (event) => {
    event.preventDefault();
    if(matchValueInput >= 50 && matchValueInput <= 100){
      setMatchValue(matchValueInput);
    } else setMatchValueInput(matchValue);
  }

  const handleNSFWClick = () => {
    if (!targetGame) return;

    if (targetGame) {
      ReactGA.event({
        category: "Filter Change",
        action: "NSFW Click",
        label: !showNSFW + "",
      });
    }

    setShowNSFW(!showNSFW);
  };

  const handleSameDeveloperClick = () => {
    if (!targetGame) return;

    if (targetGame) {
      ReactGA.event({
        category: "Filter Change",
        action: "Same Developer Click",
        label: !showSameDeveloper + "",
      });
    }

    setShowSameDeveloper(!showSameDeveloper);
  };

  // Functions
  const updateSearchResults = () => {
    if (!targetGame) return;

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

  const requestSimilarGames = (tempSearchWord) => {
    if (tempSearchWord == null) return;

    setGameData([]);

    const xhttp = new XMLHttpRequest();
    let requestUrl =
      Config.serverAddress + "/similargames" + "/" + tempSearchWord;

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
        let highestMatch = -1;
        responseObj.similarGames.forEach((game) => {
          if(highestMatch > game.matching) highestMatch = game.matching;
        });

        if(highestMatch < 0.6 && highestMatch != -1){
          setMatchValueInput(50);
          setMatchValue(50);
        }

        setTargetGame(responseObj.game);
        setGameData(responseObj.similarGames);
      }
    };
  };

  return (
    <HelmetProvider>
      <div className="browsing-wrapper">
        <Helmet>
          <meta
            name="description"
            content={
              "Search for any game from Steam, Gog and Epic Games Store to find similar games. Similar Games is the fastest, most efficient 'Games Like' engine out there with more than 21 000 games to compare."
            }
          />
          <meta name="keywords" content={Config.metaTags} />
          <title>{"Search for Similar Games"}</title>
        </Helmet>
        <BrowseHeader
          searchSuggestions={searchSuggestions}
          clearSearchSuggestions={() => {
            setSearchSuggestions([]);
          }}
          serverAddress={Config.serverAddress}
          targetGame={targetGame}
        />
        <div className="browsing-navigation-filter-wrapper">
          <div className="browsing-filters-wrapper-left">
            <BrowseFilters
              matchValue={matchValue}
              matchValueInput={matchValueInput}
              handleChangeMatchingValueInput={handleChangeMatchingValueInput}
              handleMatchingOnSubmit={handleMatchingOnSubmit}
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
                function () {
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
              config={Config}
            />
          </div>
          <div className="browsing-filters-wrapper-right">
            <BrowseFilters
              matchValue={matchValue}
              matchValueInput={matchValueInput}
              handleChangeMatchingValueInput={handleChangeMatchingValueInput}
              handleMatchingOnSubmit={handleMatchingOnSubmit}
              handleChangeMatching={handleChangeMatching}
              handleNSFWClick={handleNSFWClick}
              handleSameDeveloperClick={handleSameDeveloperClick}
            />
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default BrowsePage;

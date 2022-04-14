import React, { Component } from "react";
import BrowseHeader from "../components/BrowseHeader.jsx";
import BrowseNavigator from "../components/BrowseNavigator.jsx";
import BrowseFilters from "../components/BrowseFilters.jsx";
import "./BrowsePage.css";
import { counter } from "@fortawesome/fontawesome-svg-core";

class BrowsePage extends Component {
  state = {
    searchInputValue: "",

    searchWord: "",
    sorting: "Relevance",
    matchValue: 50,
    showNSFW: false,
    showSameDeveloper: false,

    currentPage: 1,
    totalPages: 1,
    pageing: 20,

    searchSuggestions: [], // The search suggestions that appear when typing in the search bar
    gameData: [], // Is where the input data for the games arrives
    searchResults: [], // The gamedata after filters and sorting has been applied

    searchResultMessage: "Search for a game and see others like it!",
  };

  suggestionSearchTimeOut = null;

  constructor(props) {
    super(props);

    this.browseNav = React.createRef();
    this.browseHeader = React.createRef();
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    this.handleQueryParametersInput();
  }

  handleQueryParametersInput = (name) => {
    if (name && name != "") {
      this.setState({ searchInputValue: name });

      this.submitSearch(null, name);
    } else {
      let qParam = new URLSearchParams(this.props.locationHook.search).get("q");
      if (!qParam || qParam == "") return;

      // Set the searchinputvalue of browseheader
      this.setState({ searchInputValue: qParam });

      this.submitSearch(null, qParam);
    }
  };

  // Browse Header
  submitSearch = (event, searchWord) => {
    if (event) event.preventDefault();

    this.setState({ searchSuggestions: [] });

    if (searchWord) {
      this.setState({ searchWord: searchWord });
      this.requestSimilarGames(searchWord);
    } else {
      this.setState({
        searchWord: this.state.searchInputValue,
      });
      this.requestSimilarGames(this.state.searchInputValue);
    }
  };

  setSearchSuggestions = (newFilterData) => {
    this.setState({ searchSuggestions: newFilterData });
  };

  setGameData = (newGameData) => {
    this.setState({ gameData: newGameData }, () => {
      this.updateSearchResults();
    });
  };

  updateSearchResults = () => {
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
          default:
            if (a.matching > b.matching) return 1;
            if (a.matching > b.matching) return -1;
            return 0;
        }
      };
    }

    // Filter the gameData, then sort it
    let newSearchResults = this.state.gameData.filter((item) => {
      // If the item matching is lower than the set matching, return false
      if (item.matching < this.state.matchValue) {
        return false;
      }

      // If NSFW is not checked, return false for all items with the NSFW tag
      if (!this.state.showNSFW) {
        for (let i = 0; i < item.tags.length; ++i) {
          if (item.tags[i] == "NSFW") return false;
        }
      }

      // Developer

      return true;
    });
    newSearchResults = newSearchResults.sort(
      sortComparator(this.state.sorting)
    );

    let newTotalPages = 1;
    if (newSearchResults.length > 0)
      newTotalPages = Math.ceil(newSearchResults.length / this.state.pageing);
    let newCurrentPage = 1;

    this.setState({ totalPages: newTotalPages });
    this.setState({ currentPage: newCurrentPage });
    this.setState({ searchResults: newSearchResults });
  };

  // Server requests
  requestSimilarGames = (searchWord) => {
    if (this.state.searchWord == null) return;

    const xhttp = new XMLHttpRequest();
    let requestUrl = "http://localhost:1234/similargames" + "/" + searchWord;

    xhttp.open("get", requestUrl, true);

    xhttp.send();

    xhttp.onload = () => {
      if (xhttp.status == 400) {
        this.setState({
          searchResultMessage:
            "The game you entered does not exist in our system.",
        });
        this.setGameData([]);
        return;
      } else if (xhttp.status == 404) {
        this.setState({
          searchResultMessage:
            "The game you entered does not exist in our system.",
        });
        this.setGameData([]);
        return;
      } else if (xhttp.status == 200) {
        if (!xhttp.response) {
          this.setState({
            searchResultMessage: "No similar games were found.",
          });
          this.setGameData([]);
          return;
        }
      }

      let similarGames = JSON.parse(xhttp.response);

      if (similarGames.length <= 0) {
        this.setState({
          searchResultMessage: "No similar games were found.",
        });
        this.setGameData([]);
        return;
      }

      this.setGameData(similarGames);
    };
  };

  requestSuggestionsFromServer = () => {
    if (!this.state.searchInputValue || this.state.searchInputValue == "")
      return;

    const xhttp = new XMLHttpRequest();

    xhttp.open(
      "get",
      "http://localhost:1234/suggestedgames/" + this.state.searchInputValue,
      true
    );

    xhttp.send();

    xhttp.onload = () => {
      if (!xhttp.response) return;

      let suggestedGames = JSON.parse(xhttp.response);
      this.setSearchSuggestions(suggestedGames);
    };
  };

  handleSearchInputChange = (event) => {
    let newSearchInputValue = event.target.value;

    this.setState({
      searchInputValue: newSearchInputValue,
    });

    // Trigger suggestionSearchTimeOut such that it will only search on the server when the user has not given any input within a given amount of time
    if (this.suggestionSearchTimeOut)
      clearTimeout(this.suggestionSearchTimeOut);

    this.suggestionSearchTimeOut = setTimeout(() => {
      this.requestSuggestionsFromServer();
    }, 500);
  };

  handleSuggestionClick = (name) => {
    this.handleQueryParametersInput(name);
  };

  // Browse Navigator
  handleSortChange = (event) => {
    this.setState({ sorting: event.target.value }, () => {
      this.updateSearchResults();
    });
  };

  handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > this.state.totalPages) return;

    this.setState({ currentPage: newPage });
    this.browseNav.current.setPageInputs(newPage);
  };

  // Browse Filters
  matchingTimeout = null;

  handleChangeMatching = (event) => {
    // Trigger if slider hasn't been moved for x amount of time
    if (this.matchingTimeout) clearTimeout(this.matchingTimeout);

    this.matchingTimeout = setTimeout(() => {
      this.updateSearchResults();
    }, 500);

    this.setState({ matchValue: event.target.value });
  };

  handleNSFWClick = () => {
    this.setState({ showNSFW: !this.state.showNSFW }, () => {
      this.updateSearchResults();
    });
  };

  handleSameDeveloperClick = () => {
    this.setState({ showSameDeveloper: !this.state.showSameDeveloper }, () => {
      this.updateSearchResults();
    });
  };

  render() {
    return (
      <div className="browsing-wrapper">
        <BrowseHeader
          searchWord={this.state.searchWord}
          searchSuggestions={this.state.searchSuggestions}
          submitSearch={this.submitSearch}
          ref={this.browseHeader}
          handleSearchInputChange={this.handleSearchInputChange}
          clearSearchSuggestions={() => {
            this.setSearchSuggestions([]);
          }}
          searchInputValue={this.state.searchInputValue}
          handleSuggestionClick={this.handleSuggestionClick}
        />
        <div className="browsing-navigation-filter-wrapper">
          <div className="browsing-filters-wrapper-left">
            <BrowseFilters
              matchValue={this.state.matchValue}
              handleChangeMatching={this.handleChangeMatching}
              handleNSFWClick={this.handleNSFWClick}
              handleSameDeveloperClick={this.handleSameDeveloperClick}
            />
          </div>
          <div className="browsing-navigator-wrapper">
            <BrowseNavigator
              currentPage={this.state.currentPage}
              totalPages={this.state.totalPages}
              sorting={this.state.sorting}
              searchResults={this.state.searchResults.filter(
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
                  startIdx: (this.state.currentPage - 1) * this.state.pageing,
                  endIdx: this.state.currentPage * this.state.pageing,
                }
              )}
              handleSortChange={this.handleSortChange}
              handlePageChange={this.handlePageChange}
              searchResultMessage={this.state.searchResultMessage}
              ref={this.browseNav}
            />
          </div>
          <div className="browsing-filters-wrapper-right">
            <BrowseFilters
              matchValue={this.state.matchValue}
              handleChangeMatching={this.handleChangeMatching}
              handleNSFWClick={this.handleNSFWClick}
              handleSameDeveloperClick={this.handleSameDeveloperClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BrowsePage;

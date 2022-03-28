import React, { Component } from "react";
import BrowseHeader from "../components/BrowseHeader.jsx";
import BrowseNavigator from "../components/BrowseNavigator.jsx";
import BrowseFilters from "../components/BrowseFilters.jsx";
import "./BrowsePage.css";

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

    searchSuggestions: [],
    searchResults: [],

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

  // Server requests
  requestSimilarGames = (searchWord) => {
    if (this.state.searchWord == null) return;

    const xhttp = new XMLHttpRequest();
    let requestUrl =
      "http://localhost:1234/similargames" +
      "/" +
      searchWord +
      "/" +
      this.state.currentPage +
      "/" +
      this.state.matchValue +
      "/" +
      this.state.showNSFW +
      "/" +
      this.state.showSameDeveloper +
      "/" +
      this.state.sorting;

    xhttp.open("get", requestUrl, true);

    xhttp.send();

    xhttp.onload = () => {
      if (xhttp.status == 400) {
        this.setState({
          searchResultMessage:
            "The game you entered does not exist in our system.",
        });
        this.setState({ searchResults: [] });
        return;
      } else if (xhttp.status == 404) {
        this.setState({
          searchResultMessage:
            "The game you entered does not exist in our system.",
        });
        this.setState({ searchResults: [] });
        return;
      } else if (xhttp.status == 200) {
        if (!xhttp.response) {
          this.setState({
            searchResultMessage: "No similar games were found.",
          });
          this.setState({ searchResults: [] });
          return;
        }
      }

      let similarGames = JSON.parse(xhttp.response);

      if (similarGames.length <= 0) {
        this.setState({
          searchResultMessage: "No similar games were found.",
        });
        this.setState({ searchResults: [] });
        return;
      }

      this.setState({ searchResults: similarGames });
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
      this.submitSearch();
    });
  };

  handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > this.state.totalPages) return;

    this.setState({ currentPage: newPage }, () => {
      this.submitSearch();
    });
    this.browseNav.current.setPageInputs(newPage);
  };

  // Browse Filters
  matchingTimeout = null;

  handleChangeMatching = (event) => {
    // Trigger form submit after the slider hasn't been moved for x amount of time
    if (this.matchingTimeout) clearTimeout(this.matchingTimeout);

    this.matchingTimeout = setTimeout(() => {
      this.submitSearch();
    }, 500);

    this.setState({ matchValue: event.target.value });
  };

  handleNSFWClick = () => {
    this.setState({ showNSFW: !this.state.showNSFW }, () => {
      this.submitSearch();
    });
  };

  handleSameDeveloperClick = () => {
    this.setState({ showSameDeveloper: !this.state.showSameDeveloper }, () => {
      this.submitSearch();
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
              searchResults={this.state.searchResults}
              handleSortChange={this.handleSortChange}
              handlePageChange={this.handlePageChange}
              currentPageSearchResults={this.state.searchResults}
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

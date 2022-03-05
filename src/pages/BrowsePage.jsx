import React, { Component } from "react";
import BrowseHeader from "../components/BrowseHeader.jsx";
import BrowseNavigator from "../components/BrowseNavigator.jsx";
import BrowseFilters from "../components/BrowseFilters.jsx";
import "./BrowsePage.css";
import { GameData } from "../placeholders/GameData.js";

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
    searchResults: GameData,

    searchResultMessage: "Search for a game to see other games like it!",
  };

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

    if (searchWord) this.setState({ searchWord: searchWord });
    else {
      this.setState({
        searchWord: this.state.searchInputValue,
      });
    }
  };

  setSearchSuggestions = (newFilterData) => {
    this.setState({ searchSuggestions: newFilterData });
  };

  handleSearchInputChange = (event) => {
    let newSearchInputValue = event.target.value;

    this.setState({
      searchInputValue: newSearchInputValue,
    });

    var newFilterData = GameData.filter((game) => {
      if (newSearchInputValue == "") {
        return;
      }

      if (game.name.toLowerCase().includes(newSearchInputValue.toLowerCase())) {
        return game;
      }
    });

    this.setState({ searchSuggestions: newFilterData });
  };

  handleSuggestionClick = (name) => {
    this.handleQueryParametersInput(name);
  };

  // Browse Navigator
  handleSortChange = (event) => {
    // Enter back-end for sort change

    this.setState({ sorting: event.target.value });
  };

  handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > this.state.totalPages) return;

    // Enter back-end for page change

    this.setState({ currentPage: newPage });
    this.browseNav.current.setPageInputs(newPage);
  };

  // Browse Filters
  handleChangeMatching = (event) => {
    // Enter back-end for matching change

    this.setState({ matchValue: event.target.value });
  };

  handleNSFWClick = () => {
    // Enter back-end for NSFW toggle

    this.setState({ showNSFW: !this.state.showNSFW });
  };

  handleSameDeveloperClick = () => {
    // Enterback-end for NSFW toggle

    this.setState({ showSameDeveloper: !this.state.showSameDeveloper });
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

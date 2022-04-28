import React, { Component } from "react";
import { Link } from "react-router-dom";
import LandingPageSearchPanel from "../components/LandingPageSearchPanel.jsx";
import PopularCardPanel from "../components/PopularCardPanel.jsx";
import { GAFireEvent, GAFirePageView } from "../tracking/GA_Events_Tracker";

class LandingPage extends Component {
  state = {
    searchInputValue: "",
    searchSuggestions: [],
  };

  timeOut = null;

  constructor(props) {
    super(props);

    this.landingRoutingEl = React.createRef();

    GAFirePageView(window.location.pathname + window.location.search);
  }

  submitSearch = (event) => {
    if (event) event.preventDefault();

    this.setSearchSuggestions([]);

    this.landingRoutingEl.current.click();
  };

  requestSuggestionsFromServer = () => {
    if (!this.state.searchInputValue || this.state.searchInputValue == "")
      return;

    const xhttp = new XMLHttpRequest();

    xhttp.open(
      "get",
      this.props.serverAddress +
        "/suggestedgames/" +
        this.state.searchInputValue,
      true
    );

    xhttp.send();

    xhttp.onload = () => {
      let suggestedGames = JSON.parse(xhttp.response);
      this.setSearchSuggestions(suggestedGames);
    };
  };

  handleSearchInputChange = (event) => {
    // Set searchinputvalue
    let newSearchInputValue = event.target.value;

    this.setState({
      searchInputValue: newSearchInputValue,
    });

    // Trigger timeout such that it will only search on the server when the user has not given any input within a given amount of time
    if (this.timeOut) clearTimeout(this.timeOut);

    this.timeOut = setTimeout(() => {
      this.requestSuggestionsFromServer();
    }, 500);
  };

  handleSuggestionClick = (gameTitle) => {
    GAFireEvent("Search Suggestion Click", "Landing Page", gameTitle);
  };

  setSearchSuggestions = (newFilterData) => {
    this.setState({ searchSuggestions: newFilterData });
  };

  render() {
    return (
      <React.Fragment>
        <Link
          style={{ display: "hidden" }}
          to={"/find-games-like?q=" + this.state.searchInputValue}
          ref={this.landingRoutingEl}
        />
        <LandingPageSearchPanel
          submitSearch={this.submitSearch}
          searchSuggestions={this.state.searchSuggestions} // done
          handleSearchInputChange={this.handleSearchInputChange}
          clearSearchSuggestions={() => {
            this.setSearchSuggestions([]);
          }}
          searchInputValue={this.state.searchInputValue}
          handleSuggestionClick={this.handleSuggestionClick}
          serverAddress={this.props.serverAddress}
        />
        <PopularCardPanel serverAddress={this.props.serverAddress} />
      </React.Fragment>
    );
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
}

export default LandingPage;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import LandingPageSearchPanel from "../components/LandingPageSearchPanel.jsx";
import PopularCardPanel from "../components/PopularCardPanel.jsx";
import { GameData } from "../placeholders/GameData.js";

class LandingPage extends Component {
  state = {
    searchInputValue: "",
    searchSuggestions: [],
  };

  timeOut = null;

  constructor(props) {
    super(props);

    this.landingRoutingEl = React.createRef();
  }

  submitSearch = (event) => {
    if (event) event.preventDefault();

    this.setSearchSuggestions([]);

    this.landingRoutingEl.current.click();
  };

  requestSuggestionsFromServer = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open(
      "get",
      "http://localhost:1234/suggestedgames/" + this.state.searchInputValue,
      true
    );

    xhttp.send();

    xhttp.onload = () => {
      let suggestedGames = JSON.parse(xhttp.response);
      this.setSearchSuggestions(suggestedGames);
    };
  };

  handleSearchInputChange = (event) => {
    // Trigger timeout such that it will only search on the server when the user has not given any input within a given amount of time
    if (this.timeOut) clearTimeout(this.timeOut);

    this.timeOut = setTimeout(() => {
      this.requestSuggestionsFromServer();
    }, 500);

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

  handleSuggestionClick = () => {};

  setSearchSuggestions = (newFilterData) => {
    this.setState({ searchSuggestions: newFilterData });
  };

  render() {
    return (
      <React.Fragment>
        <Link
          style={{ display: "hidden" }}
          to={"/Search?q=" + this.state.searchInputValue}
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
        />
        <PopularCardPanel />
      </React.Fragment>
    );
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
}

export default LandingPage;

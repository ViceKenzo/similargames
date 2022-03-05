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

  constructor(props) {
    super(props);

    this.landingRoutingEl = React.createRef();
  }

  submitSearch = (event) => {
    if (event) event.preventDefault();

    this.setSearchSuggestions([]);

    this.landingRoutingEl.current.click();
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

import React, { Component, createRef } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class SearchBar extends Component {
  state = {
    searchBarHidden: true,
    xIconVisible: false,
  };

  constructor(props) {
    super(props);

    this.compSearchInput = React.createRef();
    this.compSearchResults = React.createRef();
    this.searchBar = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    this.compSearchInput.current.focus();

    window.addEventListener("mousedown", this.handleClickOutside, false);
  }

  componentWillUnmount() {
    window.removeEventListener("mousedown", this.handleClickOutside, false);
  }

  handleChange = (event) => {
    if (this.compSearchInput.current.value == "") {
      this.setState({ searchBarHidden: true });
      this.setState({ xIconVisible: false });
    } else {
      this.setState({ searchBarHidden: false });
      this.setState({ xIconVisible: true });
    }

    if (this.props.handleSearchInputChange)
      this.props.handleSearchInputChange(event);
  };

  handleIconClick = () => {
    if (this.state.xIconVisible) {
      this.props.handleSearchInputChange({ target: { value: "" } });
      if (this.props.clearSearchSuggestions)
        this.props.clearSearchSuggestions();
      this.setState({ searchBarHidden: true });
    }

    this.compSearchInput.current.focus();

    this.setState({ xIconVisible: !this.state.xIconVisible });
  };

  handleClickOutside = (event) => {
    if (this.searchBar && !this.searchBar.current.contains(event.target)) {
      this.setState({ searchBarHidden: true });
    }
  };

  handleClickSearchInput = (event) => {
    if (this.compSearchInput.current.value.length > 0) {
      this.setState({ searchBarHidden: false });
    }
  };

  handleSuggestionClick = (suggestionName) => {
    this.compSearchInput.current.value = suggestionName;
    this.props.submitSearch();
  };

  getSearchIconClass = () => {
    var temp = "search-bar-icon ";
    temp +=
      temp + this.state.xIconVisible ? "sbi-xmark" : "sbi-magnifying-glass";

    return temp;
  };

  getSearchResultsClass = () => {
    var temp = "search-results ";

    if (this.state.searchBarHidden) temp += "inactive";

    return temp;
  };

  render() {
    return (
      <div className="search-bar" ref={this.searchBar}>
        <div
          className="search-bar-input"
          style={{ height: this.props.styleHeight }}
        >
          <form onSubmit={this.props.submitSearch}>
            <input
              type="text"
              onChange={this.handleChange}
              value={this.props.searchInputValue}
              placeholder="Search for games that play like..."
              ref={this.compSearchInput}
              onClick={this.handleClickSearchInput}
              maxLength="100"
            />
            <input
              type="submit"
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
              }}
              tabIndex="-1"
            />
          </form>

          <FontAwesomeIcon
            className={this.getSearchIconClass()}
            icon={this.state.xIconVisible ? faXmark : faMagnifyingGlass}
            onClick={() => {
              this.handleIconClick();
            }}
          />
        </div>

        <div
          className={this.getSearchResultsClass()}
          ref={this.compSearchResults}
          style={{ right: this.props.stylingRight }}
        >
          {this.props.searchSuggestions.length != 0 &&
            this.props.searchSuggestions.map((game, index) => {
              return (
                <div key={index}>
                  <Link
                    key={index + "result"}
                    className="search-product-result"
                    to={"/find-games-like?q=" + game.title}
                    onClick={() => {
                      this.props.handleSuggestionClick(game.title);
                    }}
                  >
                    <div
                      key={index + "result-image"}
                      className="search-product-result-image"
                    >
                      <img
                        src={
                          "http://localhost:1234/header_images/" +
                          game.image_id +
                          ".jpg"
                        }
                      ></img>
                    </div>
                    <div
                      key={index + "result-desc"}
                      className="search-product-result-desc"
                    >
                      <div
                        key={index + "result-title"}
                        className="search-product-result-title"
                      >
                        {game.title}
                      </div>
                      <div
                        key={index + "result-tags"}
                        className="search-product-result-tags"
                      >
                        {game.tags.join(" | ")}
                      </div>
                    </div>
                    <div
                      key={index + "result-release"}
                      className="search-product-result-release"
                    >
                      {game.release_date}
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default SearchBar;

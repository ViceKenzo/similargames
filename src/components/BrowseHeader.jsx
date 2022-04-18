import React, { Component } from "react";
import "./BrowseHeader.css";
import SearchBar from "./SearchBar.jsx";

class BrowseHeader extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.searchBar = React.createRef();
  }

  getHeaderSelectedTitle = () => {
    if (!this.props.searchWord || this.props.searchWord == "") return "[ ? ]";
    else return this.props.searchWord;
  };

  render() {
    return (
      <div className="browse-header">
        <div className="browse-header-text-wrapper">
          <div className="browse-header-game-announcer">
            Games that play like:
          </div>
          <div className="browse-header-selected-title">
            {this.getHeaderSelectedTitle()}
          </div>
        </div>
        <div className="browse-search-bar-wrapper">
          <SearchBar
            className="browse-search-bar"
            stylingRight="18.75%"
            submitSearch={this.props.submitSearch}
            ref={this.searchBar}
            searchSuggestions={this.props.searchSuggestions}
            handleSearchInputChange={this.props.handleSearchInputChange}
            clearSearchSuggestions={this.props.clearSearchSuggestions}
            searchInputValue={this.props.searchInputValue}
            handleSuggestionClick={this.props.handleSuggestionClick}
            serverAddress={this.props.serverAddress}
          />
        </div>
        <div className="browse-header-text-wrapper-mobile">
          <div className="browse-header-game-announcer">
            Games that play like:
          </div>
          <div className="browse-header-selected-title">
            {this.getHeaderSelectedTitle()}
          </div>
        </div>
      </div>
    );
  }
}

export default BrowseHeader;

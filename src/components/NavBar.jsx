import React, { Component } from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import { GAFireEvent } from "../tracking/GA_Events_Tracker";

class NavBar extends Component {
  state = {
    menuItems: [
      {
        title: "Browse",
        href: "/find-games-like",
        cName: "nav-links",
      },
      {
        title: "About",
        href: "/about",
        cName: "nav-links",
      },
    ],

    clicked: false,

    // Search Bar
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
    GAFireEvent("Search Suggestion Click", "Navbar", gameTitle);
  };

  setSearchSuggestions = (newFilterData) => {
    this.setState({ searchSuggestions: newFilterData });
  };

  getSearchBarNavBarWrapperClass = () => {
    if (this.props.locationHook.pathname == "/") {
      return "search-bar-hidden";
    } else {
      return "search-bar-visible";
    }
  };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <div className="navbar-wrapper">
        <nav className="NavBarItems">
          <Link to="/" className="navbar-logo" href="/">
            SimilarGames
          </Link>
          <div className={this.getSearchBarNavBarWrapperClass()}>
            <Link
              style={{ display: "hidden" }}
              to={"/find-games-like?q=" + this.state.searchInputValue}
              ref={this.landingRoutingEl}
            />
            <SearchBar
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
          </div>
          <div className="menu-icon">
            <FontAwesomeIcon
              onClick={this.handleClick}
              icon={this.state.clicked ? faXmark : faBars}
            />
          </div>
          <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
            {this.state.menuItems.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    key={index + item.cName}
                    className={item.cName}
                    to={item.href}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Menu, hidden */}
        <ul
          className={
            this.state.clicked ? "nav-menu-mobile active" : "nav-menu-mobile"
          }
        >
          {this.state.menuItems.map((item, index) => {
            return (
              <Link
                key={index * 2 + item.cName}
                className={item.cName}
                to={item.href}
              >
                {item.title}
              </Link>
            );
          })}
        </ul>

        <div
          className={
            "search-bar-mobile " + this.getSearchBarNavBarWrapperClass()
          }
        >
          <SearchBar
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
        </div>
      </div>
    );
  }
}

export default NavBar;

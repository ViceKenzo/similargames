import React, { useState, useRef, useEffect } from "react";
import "../styles/NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useHref } from "react-router-dom";
import SearchBar from "./SearchBar.js";
import { GAFireEvent } from "../tracking/GA_Events_Tracker";

function NavBar(props) {
  // Variables
  const [menuItems, setMenuItems] = useState([
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
  ]);
  const [clicked, setClicked] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  // Refs
  const landingRoutingEl = useRef(null);

  const submitSearch = (event) => {
    if (event) event.preventDefault();

    setSearchSuggestions([]);

    landingRoutingEl.current.click();
  };

  const requestSuggestionsFromServer = () => {
    if (!searchInputValue || searchInputValue == "") return;

    const xhttp = new XMLHttpRequest();

    let tempSearchInputValue = searchInputValue.replace(/[\W_]+/g, "");

    xhttp.open(
      "get",
      props.serverAddress + "/suggestedgames/" + tempSearchInputValue,
      true
    );

    xhttp.send();

    xhttp.onload = () => {
      let suggestedGames = JSON.parse(xhttp.response);
      setSearchSuggestions(suggestedGames);
    };
  };

  let timeOut;
  const handleSearchInputChange = (event) => {
    // Set searchinputvalue
    let newSearchInputValue = event.target.value;

    setSearchInputValue(newSearchInputValue);

    // Trigger timeout such that it will only search on the server when the user has not given any input within a given amount of time
    if (timeOut) clearTimeout(timeOut);

    timeOut = setTimeout(() => {
      requestSuggestionsFromServer();
    }, 500);
  };

  const handleSuggestionClick = (gameTitle) => {
    GAFireEvent("Search Suggestion Click", "Navbar", gameTitle);
  };

  const getSearchBarNavBarWrapperClass = () => {
    if (props.locationHook.pathname == "/") {
      return "search-bar-hidden";
    } else {
      return "search-bar-visible";
    }
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div className="navbar-wrapper">
      <nav className="NavBarItems">
        <Link to="/" className="navbar-logo" href="/">
          SimilarGames
        </Link>
        <div className={getSearchBarNavBarWrapperClass()}>
          <Link
            style={{ display: "hidden" }}
            to={"/find-games-like?q=" + searchInputValue}
            ref={landingRoutingEl}
          />
          <SearchBar
            submitSearch={submitSearch}
            searchSuggestions={searchSuggestions} // done
            handleSearchInputChange={handleSearchInputChange}
            clearSearchSuggestions={() => {
              setSearchSuggestions([]);
            }}
            searchInputValue={searchInputValue}
            handleSuggestionClick={handleSuggestionClick}
            serverAddress={props.serverAddress}
          />
        </div>
        <div className="menu-icon">
          <FontAwesomeIcon
            onClick={handleClick}
            icon={clicked ? faXmark : faBars}
          />
        </div>
        <ul className={clicked ? "nav-menu active" : "nav-menu"}>
          {menuItems.map((item, index) => {
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
      <ul className={clicked ? "nav-menu-mobile active" : "nav-menu-mobile"}>
        {menuItems.map((item, index) => {
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

      <div className={"search-bar-mobile " + getSearchBarNavBarWrapperClass()}>
        <SearchBar
          submitSearch={submitSearch}
          searchSuggestions={searchSuggestions} // done
          handleSearchInputChange={handleSearchInputChange}
          clearSearchSuggestions={() => {
            setSearchSuggestions([]);
          }}
          searchInputValue={searchInputValue}
          handleSuggestionClick={handleSuggestionClick}
          serverAddress={props.serverAddress}
        />
      </div>
    </div>
  );
}

export default NavBar;

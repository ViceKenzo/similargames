import React, { Component } from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {
    menuItems: [
      {
        title: "Browse",
        href: "/Search",
        cName: "nav-links",
      },
      {
        title: "About",
        href: "/About",
        cName: "nav-links",
      },
    ],

    clicked: false,
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
      </div>
    );
  }
}

export default NavBar;

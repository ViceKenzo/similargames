import React, { Component } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

class Footer extends Component {
  state = {
    menuItems: [
      {
        title: "Browse",
        href: "/Search",
      },
      {
        title: "About",
        href: "/About",
      },
    ],
  };

  render() {
    return (
      <div className="footer">
        <div className="footer-contact">
          <div>Contact & Feedback</div>
          <div>somecompany@gmail.com</div>
        </div>
        <div className="footer-title">
          <Link to="/">SimilarGames</Link>
        </div>
        <div className="footer-nav">
          {this.state.menuItems.map((item, index) => {
            return (
              <Link key={index * 3} to={item.href}>
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Footer;
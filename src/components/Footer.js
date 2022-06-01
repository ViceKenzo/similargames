import React, { useState } from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

function Footer(props) {
  const [menuItems, setMenuItems] = useState([
    {
      title: "Browse",
      href: "/find-games-like",
    },
    {
      title: "About",
      href: "/about",
    },
  ]);

  return (
    <div className="footer">
      <div className="footer-contact">
        <div>Contact & Feedback</div>
        <div>contact@similargames.io</div>
      </div>
      <div className="footer-title">
        <Link to="/">SimilarGames</Link>
      </div>
      <div className="footer-nav">
        {menuItems.map((item, index) => {
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

export default Footer;

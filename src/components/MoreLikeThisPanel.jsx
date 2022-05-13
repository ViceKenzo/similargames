import React, { Component } from "react";
import "./MoreLikeThisPanel.css";
import ThumbnailImage from "../placeholders/thumbnail.jpg";
import { Link } from "react-router-dom";

class MoreLikeThisPanel extends Component {
    state = {};
    render() {
      return (
        <div className="morelikethis-panel">
            <Link to="/game?id=0"></Link>
            <div className="morelikethis-title-wrapper"><div className="morelikethis-title">More like this</div></div>
            <div className="morelikethis-game-wrapper">
                <Link className="morelikethis-game" to="/game?id=0">
                    <img className="morelikethis-game-image" src={ThumbnailImage}/>
                    <div className="morelikethis-game-title"><p>Witcher 3</p></div>
                </Link>
                <Link className="morelikethis-game" to="/game?id=0">
                    <img className="morelikethis-game-image" src={ThumbnailImage}/>
                    <div className="morelikethis-game-title"><p>Witcher 3</p></div>
                </Link>
                <Link className="morelikethis-game" to="/game?id=0">
                    <img className="morelikethis-game-image" src={ThumbnailImage}/>
                    <div className="morelikethis-game-title"><p>Witcher 3</p></div>
                </Link>
                <Link className="morelikethis-game" to="/game?id=0">
                    <img className="morelikethis-game-image" src={ThumbnailImage}/>
                    <div className="morelikethis-game-title"><p>Witcher 3</p></div>
                </Link>
                <Link className="morelikethis-game" to="/game?id=0">
                    <img className="morelikethis-game-image" src={ThumbnailImage}/>
                    <div className="morelikethis-game-title"><p>Witcher 3</p></div>
                </Link>
                <Link className="morelikethis-game" to="/game?id=0">
                    <img className="morelikethis-game-image" src={ThumbnailImage}/>
                    <div className="morelikethis-game-title"><p>Witcher 3</p></div>
                </Link>
                <Link className="morelikethis-game" to="/game?id=0">
                    <img className="morelikethis-game-image" src={ThumbnailImage}/>
                    <div className="morelikethis-game-title"><p>Witcher 3</p></div>
                </Link>
                <Link className="morelikethis-game" to="/game?id=0">
                    <img className="morelikethis-game-image" src={ThumbnailImage}/>
                    <div className="morelikethis-game-title"><p>Witcher 3</p></div>
                </Link>
            </div>
        </div>
      );
    }
  }
  
  export default MoreLikeThisPanel;
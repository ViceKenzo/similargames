import React, { Component } from "react";
import "./Error.css";
import ErrorImage from "../images/page_not_found.jpg";

class Error extends Component {
  state = {};
  render() {
    return (
      <div className="error-wrapper">
        <div className="error-text-wrapper">
          <div className="error-header">Page not found!</div>
          <div className="error-report">
            (If you've found a bug, please report it at our contact email.)
          </div>
        </div>
        <div className="error-image-wrapper">
          <img
            className="error-image"
            src={ErrorImage}
            alt="Error image and funny meme about a man with sand"
          />
        </div>
      </div>
    );
  }
}

export default Error;

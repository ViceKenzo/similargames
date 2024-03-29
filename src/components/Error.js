import React from "react";
import "../styles/Error.css";

import ErrorImage from "../images/page_not_found.jpg";

function Error() {
  // Functions
  return (
    <div className="error-wrapper">
      <div className="error-text-wrapper">
        <h1 className="error-header">Page not found!</h1>
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

export default Error;

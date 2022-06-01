import React, { useState } from "react";
import "../styles/ArrowButton.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function ArrowButton(props) {
  // Variables
  const [arrowDirection] = useState(props.arrowDirection);

  // Class Gets
  const getClassName = () => {
    let classText = "arrow-button";

    if (!props.isActive) classText += " inactive";

    return classText;
  };

  // Element Gets
  const getDirectionArrow = () => {
    if (!arrowDirection) return faAngleLeft;
    else if (arrowDirection == "right") return faAngleRight;
    else return faAngleLeft;
  };

  // Handlers
  const handleClick = () => {
    if (!arrowDirection) return;
    if (arrowDirection == "right") {
      props.navigateRight();
    } else {
      props.navigateLeft();
    }
  };

  // Functions
  return (
    <div className={getClassName()} onClick={handleClick}>
      <FontAwesomeIcon icon={getDirectionArrow()} />
    </div>
  );
}

export default ArrowButton;

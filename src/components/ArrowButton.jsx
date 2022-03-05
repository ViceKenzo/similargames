import React, { Component } from "react";
import "./ArrowButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

class ArrowButton extends Component {
  state = {
    arrowDirection: this.props.arrowDirection,
  };

  getDirectionArrow = () => {
    if (!this.state.arrowDirection) return faAngleLeft;
    else if (this.state.arrowDirection == "right") return faAngleRight;
    else return faAngleLeft;
  };

  getClassName = () => {
    let classText = "arrow-button";

    if (!this.props.isActive) classText += " inactive";

    return classText;
  };

  handleClick = () => {
    if (!this.state.arrowDirection) return;
    if (this.state.arrowDirection == "right") {
      this.props.navigateRight();
    } else {
      this.props.navigateLeft();
    }
  };

  render() {
    return (
      <div className={this.getClassName()} onClick={this.handleClick}>
        <FontAwesomeIcon icon={this.getDirectionArrow()} />
      </div>
    );
  }
}

export default ArrowButton;

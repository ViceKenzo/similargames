import React, { Component } from "react";
import "./ProjectorControlPanel.css";
import ArrowButton from "./ArrowButton.jsx";

class ProjectorControlPanel extends Component {
  state = {
    sortByIsVisible: this.props.sortByIsVisible,
    pageInput: this.props.currentPage,
  };

  constructor(props) {
    super(props);

    this.pageInput = React.createRef();
  }

  getDropDownClass = () => {
    var className = "drop-down-wrapper";

    if (!this.state.sortByIsVisible) {
      className += "-hidden";
    }

    return className;
  };

  handlePageInputChange = (event) => {
    let isNum = /^\d+$/.test(event.target.value);

    if (isNum || event.target.value == "")
      this.setState({ pageInput: event.target.value });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();

    let isNum = /^\d+$/.test(this.state.pageInput);
    let tempPageInput = parseInt(this.state.pageInput);

    if (isNum) {
      if (tempPageInput < 1 || tempPageInput > this.props.totalPages) {
        this.setPageInput(this.props.currentPage);
      } else {
        this.props.handlePageChange(tempPageInput);
      }
    }
  };

  setPageInput = (newPageInput) => {
    this.setState({ pageInput: newPageInput });
  };

  getArrowLeftActive = () => {
    if (this.props.currentPage > 1) return true;
    else return false;
  };

  getArrowRightActive = () => {
    if (this.props.currentPage < this.props.totalPages) return true;
    else return false;
  };

  handleNavigateRight = () => {
    if (this.props.currentPage >= this.props.totalPages) return;
    this.props.handlePageChange(this.props.currentPage + 1);
  };

  handleNavigateLeft = () => {
    if (this.props.currentPage <= 1) return;
    this.props.handlePageChange(this.props.currentPage - 1);
  };

  render() {
    return (
      <div className="projector-controller">
        <div className="page-display">
          <div className="page-announcer">Page</div>
          <form onSubmit={this.handleOnSubmit}>
            <input
              type="text"
              className="page-text-navigator"
              value={this.state.pageInput}
              onChange={this.handlePageInputChange}
              ref={this.pageInput}
            />
            <input
              type="submit"
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
              }}
              tabIndex="-1"
            />
          </form>
          <div className="page-display-in-between">of</div>
          <div className="page-max-page-announcer">{this.props.totalPages}</div>
        </div>
        <div className={this.getDropDownClass()}>
          <div className="drop-down-description">Sort by:</div>
          <select
            className="drop-down-list"
            value={this.props.sorting}
            onChange={this.props.handleSortChange}
          >
            <option value="Relevance">Relevance</option>
            <option value="Release Date">Release Date</option>
            <option value="Name">Name</option>
          </select>
        </div>
        <div className="nav-button-wrapper">
          <div className="navigate-prev">
            <ArrowButton
              arrowDirection="left"
              isActive={this.getArrowLeftActive()}
              navigateLeft={this.handleNavigateLeft}
            />
          </div>
          <div className="navigate-next">
            <ArrowButton
              arrowDirection="right"
              isActive={this.getArrowRightActive()}
              navigateRight={this.handleNavigateRight}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectorControlPanel;

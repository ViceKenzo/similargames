import React, { useEffect, useState } from "react";
import "../styles/ProjectorControlPanel.css";
import ArrowButton from "./ArrowButton.js";

function ProjectorControlPanel(props) {
  // Variables
  const [sortByIsVisible, setSortByIsVisible] = useState(props.sortByIsVisible);
  const [pageInput, setPageInput] = useState(props.currentPage);

  useEffect(() => {
    setPageInput(props.currentPage);
  }, [props.currentPage]);

  const getDropDownClass = () => {
    var className = "drop-down-wrapper";

    if (!sortByIsVisible) {
      className += "-hidden";
    }

    return className;
  };

  const handlePageInputChange = (event) => {
    let isNum = /^\d+$/.test(event.target.value);

    if (isNum || event.target.value == "") setPageInput(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    let isNum = /^\d+$/.test(pageInput);
    let tempPageInput = parseInt(pageInput);

    if (isNum) {
      if (tempPageInput < 1 || tempPageInput > props.totalPages) {
        setPageInput(props.currentPage);
      } else {
        props.handlePageChange(tempPageInput);
      }
    }
  };

  const getArrowLeftActive = () => {
    if (props.currentPage > 1) return true;
    else return false;
  };

  const getArrowRightActive = () => {
    if (props.currentPage < props.totalPages) return true;
    else return false;
  };

  const handleNavigateRight = () => {
    if (props.currentPage >= props.totalPages) return;
    props.handlePageChange(props.currentPage + 1);
  };

  const handleNavigateLeft = () => {
    if (props.currentPage <= 1) return;
    props.handlePageChange(props.currentPage - 1);
  };

  return (
    <div className="projector-controller">
      <div className="page-display">
        <div className="page-announcer">Page</div>
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            className="page-text-navigator"
            value={pageInput}
            onChange={handlePageInputChange}
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
        <div className="page-max-page-announcer">{props.totalPages}</div>
      </div>
      <div className={getDropDownClass()}>
        <div className="drop-down-description">Sort by:</div>
        <select
          className="drop-down-list"
          value={props.sorting}
          onChange={props.handleSortChange}
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
            isActive={getArrowLeftActive()}
            navigateLeft={handleNavigateLeft}
          />
        </div>
        <div className="navigate-next">
          <ArrowButton
            arrowDirection="right"
            isActive={getArrowRightActive()}
            navigateRight={handleNavigateRight}
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectorControlPanel;

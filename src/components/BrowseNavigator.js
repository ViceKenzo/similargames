import React from "react";
import "../styles/BrowseNavigator.css";

import ProjectorControlPanel from "./ProjectorControlPanel.js";
import CardProjector from "./CardProjector.js";

function BrowseNavigator(props) {
  // Functions
  return (
    <div>
      <div className="projector-control-panel-top">
        <ProjectorControlPanel
          sortByIsVisible={true}
          currentPage={props.currentPage}
          totalPages={props.totalPages}
          sorting={props.sorting}
          handleSortChange={props.handleSortChange}
          handlePageChange={props.handlePageChange}
        />
      </div>
      <CardProjector
        searchResults={props.searchResults}
        searchResultMessage={props.searchResultMessage}
        config={props.config}
      />
      <ProjectorControlPanel
        sortByIsVisible={false}
        className="projector-control-panel-bottom"
        currentPage={props.currentPage}
        totalPages={props.totalPages}
        sorting={props.sorting}
        handleSortChange={props.handleSortChange}
        handlePageChange={props.handlePageChange}
      />
    </div>
  );
}

export default BrowseNavigator;

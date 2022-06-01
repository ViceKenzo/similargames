import React from "react";
import ProjectorControlPanel from "./ProjectorControlPanel.js";
import CardProjector from "./CardProjector.js";
import "../styles/BrowseNavigator.css";

function BrowseNavigator(props) {
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
        serverAddress={props.serverAddress}
      />
      <ProjectorControlPanel
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

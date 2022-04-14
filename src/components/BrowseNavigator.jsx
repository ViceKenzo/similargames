import React, { Component } from "react";
import ProjectorControlPanel from "./ProjectorControlPanel.jsx";
import CardProjector from "./CardProjector.jsx";
import "./BrowseNavigator.css";

class BrowseNavigator extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.projectorControlPanelTop = React.createRef();
    this.projectorControlPanelBottom = React.createRef();
  }

  setPageInputs = (newPageInput) => {
    this.projectorControlPanelTop.current.setPageInput(newPageInput);
    this.projectorControlPanelBottom.current.setPageInput(newPageInput);
  };

  render() {
    return (
      <div>
        <div className="projector-control-panel-top">
          <ProjectorControlPanel
            sortByIsVisible={true}
            currentPage={this.props.currentPage}
            totalPages={this.props.totalPages}
            sorting={this.props.sorting}
            handleSortChange={this.props.handleSortChange}
            handlePageChange={this.props.handlePageChange}
            ref={this.projectorControlPanelTop}
          />
        </div>
        <CardProjector
          searchResults={this.props.searchResults}
          searchResultMessage={this.props.searchResultMessage}
        />
        <ProjectorControlPanel
          className="projector-control-panel-bottom"
          currentPage={this.props.currentPage}
          totalPages={this.props.totalPages}
          sorting={this.props.sorting}
          handleSortChange={this.props.handleSortChange}
          handlePageChange={this.props.handlePageChange}
          ref={this.projectorControlPanelBottom}
        />
      </div>
    );
  }
}

export default BrowseNavigator;

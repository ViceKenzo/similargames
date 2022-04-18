import React, { Component } from "react";
import BrowsePage from "./BrowsePage.jsx";
import { useLocation } from "react-router-dom";

export default function BrowsePageWrapper(props) {
  const location = useLocation();

  return (
    <BrowsePage serverAddress={props.serverAddress} locationHook={location} />
  );
}

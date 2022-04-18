import React, { Component } from "react";
import GameDetailPage from "./GameDetailPage.jsx";
import { useLocation, useNavigate } from "react-router-dom";

export default function BrowsePageWrapper(props) {
  const location = useLocation();

  return (
    <GameDetailPage
      serverAddress={props.serverAddress}
      locationHook={location}
    />
  );
}

import React, { Component } from "react";
import GameDetailPage from "./GameDetailPage.jsx";
import { useLocation, useNavigate } from "react-router-dom";

export default function BrowsePageWrapper() {
  const location = useLocation();

  return <GameDetailPage locationHook={location} />;
}

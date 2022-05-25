import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import { useLocation } from "react-router-dom";

export default function NavBarWrapper(props) {
  const location = useLocation();

  return <NavBar serverAddress={props.serverAddress} locationHook={location} />;
}

import React from "react";
import NavBar from "./NavBar.js";
import { useLocation } from "react-router-dom";

export default function NavBarWrapper(props) {
  const location = useLocation();

  return <NavBar serverAddress={props.serverAddress} locationHook={location} />;
}

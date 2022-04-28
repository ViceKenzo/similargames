import React, { Component } from "react";
import Error from "../components/Error.jsx";
import { GAFirePageView } from "../tracking/GA_Events_Tracker";

class ErrorPage extends Component {
  state = {};

  render() {
    return <Error />;
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    GAFirePageView(window.location.pathname + window.location.search);
  }
}

export default ErrorPage;

import React, { Component } from "react";
import Error from "../components/Error.jsx";

class ErrorPage extends Component {
  state = {};

  render() {
    return <Error />;
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
}

export default ErrorPage;

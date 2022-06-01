import React, { useEffect } from "react";
import Error from "../components/Error.js";

function ErrorPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Error />;
}

export default ErrorPage;

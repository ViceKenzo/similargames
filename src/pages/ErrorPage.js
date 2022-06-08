import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import Error from "../components/Error.js";

function ErrorPage() {
  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Functions
  return (
    <React.Fragment>
      <Helmet>
        <title> Error - 404 </title>
      </Helmet>
      <Error />
    </React.Fragment>
  );
}

export default ErrorPage;

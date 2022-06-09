import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Error from "../components/Error.js";

function ErrorPage() {
  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Functions
  return (
    <HelmetProvider>
      <Helmet>
        <title> Error - 404 </title>
      </Helmet>
      <Error />
    </HelmetProvider>
  );
}

export default ErrorPage;

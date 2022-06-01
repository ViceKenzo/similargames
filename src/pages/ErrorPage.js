import React, { useEffect } from "react";

import Error from "../components/Error.js";

function ErrorPage() {
  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Functions
  return <Error />;
}

export default ErrorPage;

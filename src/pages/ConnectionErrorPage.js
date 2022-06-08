import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import ConnectionErrorPanel from "../components/ConnectionErrorPanel.js";

function ConnectionErrorPage() {
  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Functions
  return (
    <React.Fragment>
      <Helmet>
        <title>Connection Error</title>
      </Helmet>
      <ConnectionErrorPanel />
    </React.Fragment>
  );
}

export default ConnectionErrorPage;

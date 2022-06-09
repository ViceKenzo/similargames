import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import ConnectionErrorPanel from "../components/ConnectionErrorPanel.js";

function ConnectionErrorPage() {
  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Functions
  return (
    <HelmetProvider>
      <Helmet>
        <title>Connection Error</title>
      </Helmet>
      <ConnectionErrorPanel />
    </HelmetProvider>
  );
}

export default ConnectionErrorPage;

import React, { useEffect } from "react";

import ConnectionErrorPanel from "../components/ConnectionErrorPanel.js";

function ConnectionErrorPage() {
  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Functions
  return <ConnectionErrorPanel />;
}

export default ConnectionErrorPage;

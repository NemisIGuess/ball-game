import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { AppStateProvider } from "./components/app/app-context";
import App from "./components/app/app";

import "./CoreContainer.css";

function CoreContainer() {
  const initialState = JSON.parse(
    localStorage.getItem(process.env.CUSTOM_APP) ?? "{}"
  );

  return (
    <AppStateProvider value={initialState}>
      <App />
    </AppStateProvider>
  );
}

export default CoreContainer;

import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { CommandsServiceProvider } from "../../services/commands-service.provider";
import CommandsService from "../../services/commands-service";
import { useAppStateDispatch, useAppState } from "./app-context";
import DashbardPage from "../../pages/dashboard/dashboard";
export default function App() {
  const appDispatch = useAppStateDispatch();
  const appState = useAppState();
  const [wsClient, setWsClient] = useState();

  useEffect(() => {
    let client = new W3CWebSocket("ws://localhost:8080", "echo-protocol");
    setWsClient(client);
  }, []);

  return (
    <CommandsServiceProvider
      value={CommandsService(appState, appDispatch, wsClient)}
    >
      <div className="App">
        <DashbardPage></DashbardPage>
      </div>
    </CommandsServiceProvider>
  );
}

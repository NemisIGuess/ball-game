import React from "react";
import ReactDOM from "react-dom";
import CoreContainer from "./CoreContainer";
import * as dotenv from "dotenv";

dotenv.config({
  path: "./environments/.env.dev",
});

ReactDOM.render(
  <React.StrictMode>
    <CoreContainer />
  </React.StrictMode>,
  document.getElementById("root")
);

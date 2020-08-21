import React from "react";
import App from "./components/App";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// Logger configuration
const log4js = require("log4js");
log4js.configure("./config/log4js-config.json");

var log = log4js.getLogger("index");

import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

const store = configureStore();

log.info("Starting");
log.warn("THIS is warning");
log.error("THIs is error");

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);

// import core dependencies
import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";

// import styles
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// import components
import App from "./components/App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();

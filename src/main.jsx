import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import routes, { renderRoutes } from "./routes/main";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const BASENAME = "";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router basename={BASENAME}>{renderRoutes(routes)}</Router>
);

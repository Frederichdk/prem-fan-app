import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      {/** Ending here for the weekend I have just installed the auth0 dependencies and placed
       * domain and client IDs in env, wrap App in in <Auth0Provider> and continue from there
       */}
      <App />
    </HashRouter>
  </React.StrictMode>
);

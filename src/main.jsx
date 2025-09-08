import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const onRedirectCallback = (appState) => {
  let target = appState?.returnTo || window.location.hash || "#/";
  if (!target.startsWith("#")) {
    target = "#" + (target.startsWith("/") ? target : `/${target}`);
  }
  const finalUrl = window.location.origin + target;
  window.location.replace(finalUrl);
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        onRedirectCallback={onRedirectCallback}
      >
        <App />
      </Auth0Provider>
    </HashRouter>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import Store from "./State/Store";
import { ConnectionsProvider } from "./Contexts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={Store}>
      <ConnectionsProvider>
        <App />
      </ConnectionsProvider>
    </Provider>
  </React.StrictMode>
);

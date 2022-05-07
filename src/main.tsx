import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Store from "./State/Store";
import App from "./App";
import WebRTC from "./Contexts/WebRTC";
import WebSocket from "./Contexts/WebSocket";
import "./index.css";

WebRTC;
WebSocket;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>
);

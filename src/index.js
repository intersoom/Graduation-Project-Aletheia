import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import firebase from "./Firebase";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

console.log(firebase);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

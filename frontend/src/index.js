import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import FragranceEditor from "./FragranceEditor/FragranceEditor";
import LabelEditor from "./LabelEditor/LabelEditor";

Modal.setAppElement("#root");

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<LabelEditor />} />
        <Route path="backend" element={<FragranceEditor />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import FragranceEditor from "./FragranceEditor/FragranceEditor";
import LabelEditor from "./LabelEditor/LabelEditor";
import { StateProvider } from "./StateProvider";
import FragranceProductEditor from "./FragranceProductEditor/FragranceProductEditor";
import FragranceEditForm from "./FragranceEditForm/FragranceEditForm";

Modal.setAppElement("#root");

ReactDOM.render(
  <BrowserRouter>
    <StateProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<LabelEditor />} />
          <Route path="fragrances" element={<FragranceEditor />}>
            <Route path="create" element={<FragranceEditForm />} />
            <Route path=":fragranceId" element={<FragranceEditForm />}>
              <Route path="create" element={<FragranceEditForm />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </StateProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

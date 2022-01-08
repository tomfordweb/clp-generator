import "./App.scss";

import { PDFViewer } from "@react-pdf/renderer";
import bwipjs from "bwip-js";
import { useContext, useEffect, useState } from "react";

import FragranceEditor from "./FragranceEditor/FragranceEditor";
import LabelDisplay from "./LabelDisplay/LabelDisplay";
import LabelForm from "./LabelForm/LabelForm";
import { fetchProductList } from "./utility";
import { Outlet, NavLink } from "react-router-dom";
import { store } from "./StateProvider";

function App() {
  const [fragrances, updateFragranceList] = useState([]);
  const [form, setForm] = useState(null);
  const [eanCode, setEanCode] = useState(null);
  const [activeTab, setActiveTab] = useState("label");
  const globalState = useContext(store);
  const { dispatch } = globalState;

  useEffect(() => {
    fetchProductList().then(function (myJson) {
      dispatch({ type: "setFragrances", value: myJson });
    });
  }, []);

  useEffect(() => {
    try {
      let canvas =
        form &&
        form.ean &&
        bwipjs.toCanvas("eandisplay", {
          bcid: "ean13", // Barcode type
          text: form.ean,
          scale: 3, // 3x scaling factor
          height: 10, // Bar height, in millimeters
          includetext: true, // Show human-readable text
          textxalign: "center", // Always good to set this
        });
      if (canvas) {
        setEanCode(canvas.toDataURL("image/png"));
      }
    } catch (error) {
      alert(error);
    }
  }, [form]);

  return (
    <main className="App">
      <header className="row bg-dark mb-5 py-3">
        <h1 className="col-12 col-md-8 text-light m-0">CLP Generator</h1>
        <nav className="col-12 col-md-4 text-right">
          <ul className="nav nav-pills m-0 mt-1">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  (isActive ? "active" : "") + " text-light nav-link"
                }
              >
                Label Editor
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/fragrances"
                className={({ isActive }) =>
                  (isActive ? "active" : "") + " text-light nav-link"
                }
              >
                Product Editor
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </main>
  );
}

export default App;

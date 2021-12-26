import "./App.scss";

import { PDFViewer } from "@react-pdf/renderer";
import bwipjs from "bwip-js";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce/lib";

import FragranceEditor from "./FragranceEditor/FragranceEditor";
import LabelDisplay from "./LabelDisplay/LabelDisplay";
import LabelForm from "./LabelForm/LabelForm";
import { fetchProductList } from "./utility";

function App() {
  const [fragrances, updateFragranceList] = useState([]);
  const [form, setForm] = useState(null);
  const [eanCode, setEanCode] = useState(null);
  const [activeTab, setActiveTab] = useState("label");
  const [formValue] = useDebounce(form, 1000);

  const getFragrances = () =>
    fetchProductList().then(function (myJson) {
      updateFragranceList(myJson);
    });
  useEffect(() => {
    getFragrances();
  }, []);

  useEffect(() => {
    // The return value is the canvas element
    try {
      console.log("canvas", form);
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
        <h1 className="col-md-8 text-light m-0">CLP Generator</h1>
        <nav className="col-md-4 text-right">
          <ul className="nav nav-pills m-0 mt-1">
            <li className="nav-item">
              <span
                className={`text-light nav-link ${
                  activeTab === "label" ? "active" : ""
                }`}
                aria-current="page"
                onClick={() => setActiveTab("label")}
              >
                Label Editor
              </span>
            </li>
            <li className="nav-item">
              <span
                onClick={() => setActiveTab("fragrance")}
                className={`text-light nav-link ${
                  activeTab === "fragrance" ? "active" : ""
                }`}
              >
                Product Editor
              </span>
            </li>
          </ul>
        </nav>
      </header>
      {activeTab === "label" ? (
        <section className="row">
          <article className="PdfViewer col-12 col-md-8">
            {" "}
            {formValue ? (
              <div>
                <PDFViewer style={{ height: "500px" }}>
                  <LabelDisplay
                    eanBase64={eanCode}
                    labelCount={1}
                    orientation="portrait"
                    size={[190, 190]}
                    form={formValue}
                  />
                </PDFViewer>
              </div>
            ) : (
              <div className="alert alert-secondary" role="alert">
                Selct a Fragrance and product!
              </div>
            )}
            <canvas style={{ display: "none" }} id="eandisplay"></canvas>
          </article>
          <aside className="col-12 col-md-4">
            <LabelForm
              fragrances={fragrances}
              propagateFormChange={(value) => {
                setForm({
                  ...value,
                });
              }}
            />
          </aside>
        </section>
      ) : (
        <div className="col-12">
          <FragranceEditor
            onFormUpdate={getFragrances}
            fragrances={fragrances}
          />
        </div>
      )}
    </main>
  );
}

export default App;

import "./App.scss";

import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

import LabelDisplay from "./LabelDisplay/LabelDisplay";
import LabelForm from "./LabelForm/LabelForm";
import FragranceEditor from "./FragranceEditor/FragranceEditor";

function App() {
  const [fragrances, updateFragranceList] = useState([]);
  const [form, setForm] = useState(null);
  const getAllFragrances = () => {
    fetch("products.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        updateFragranceList(myJson.payload);
      });
  };

  useEffect(() => {
    getAllFragrances();
  }, []);

  return (
    <main className="App">
      <section className="row">
        <header className="col-12">
          <h1>CLP Generator</h1>
        </header>
        <article className="PdfViewer col-8">
          {form && (
            <PDFViewer>
              <LabelDisplay
                labelCount={1}
                orientation="portrait"
                size={[180, 180]}
                form={form}
              />
            </PDFViewer>
          )}
        </article>
        <aside className="col-4">
          <LabelForm
            products={fragrances}
            propagateFormChange={(value) => {
              setForm({
                ...value,
              });
              console.log("propagateFormChange", value);
            }}
          />
        </aside>
      </section>
      <FragranceEditor fragrances={fragrances} />
    </main>
  );
}

export default App;

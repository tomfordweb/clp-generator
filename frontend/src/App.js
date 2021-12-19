import "./App.scss";

import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

import FragranceEditor from "./FragranceEditor/FragranceEditor";
import LabelDisplay from "./LabelDisplay/LabelDisplay";
import LabelForm from "./LabelForm/LabelForm";
import { useDebounce } from "use-debounce/lib";

function App() {
  const [fragrances, updateFragranceList] = useState([]);
  const [form, setForm] = useState(null);
  const [formValue] = useDebounce(form, 1000);

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
        <article className="PdfViewer col-12 col-md-8">
          {formValue ? (
            <PDFViewer>
              <LabelDisplay
                labelCount={1}
                orientation="portrait"
                size={[190, 190]}
                form={formValue}
              />
            </PDFViewer>
          ) : (
            <div className="alert alert-secondary" role="alert">
              Selct a Fragrance and product!
            </div>
          )}
        </article>
        <aside className="col-12 col-md-4">
          <LabelForm
            products={fragrances}
            propagateFormChange={(value) => {
              console.log("new form", value);
              setForm({
                ...value,
              });
            }}
          />
        </aside>
        <div className="col-12">
          <FragranceEditor fragrances={fragrances} />
        </div>
      </section>
    </main>
  );
}

export default App;
